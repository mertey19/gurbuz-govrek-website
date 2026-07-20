import assert from "node:assert/strict";
import { DatabaseSync } from "node:sqlite";
import test from "node:test";

class D1Statement {
  constructor(database, query) {
    this.database = database;
    this.query = query;
    this.values = [];
  }

  bind(...values) {
    this.values = values;
    return this;
  }

  async first() {
    return this.database.prepare(this.query).get(...this.values) ?? null;
  }

  async run() {
    try {
      this.database.prepare(this.query).run(...this.values);
      return { success: true };
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : "Unknown error" };
    }
  }
}

class D1Database {
  constructor() {
    this.database = new DatabaseSync(":memory:");
  }

  prepare(query) {
    return new D1Statement(this.database, query);
  }

  async batch(statements) {
    const results = [];
    for (const statement of statements) results.push(await statement.run());
    return results;
  }

  countAppointments() {
    return this.database.prepare("SELECT COUNT(*) AS count FROM appointments").get().count;
  }

  close() {
    this.database.close();
  }
}

async function loadWorker() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  return worker;
}

function request(payload) {
  return new Request("http://localhost/api/appointments", {
    method: "POST",
    headers: { "Content-Type": "application/json", Origin: "http://localhost" },
    body: JSON.stringify(payload),
  });
}

const validPayload = {
  fullName: "Codex Test Kaydı",
  phone: "05011112233",
  email: "codex-test@example.com",
  gradeLevel: "12. sınıf",
  service: "Tercih Danışmanlığı",
  meetingType: "Online",
  message: "Üretim backend doğrulama kaydıdır.",
  consent: true,
  website: "",
};

test("randevu API'si doğrulanmış talebi kaydeder ve tekrarı engeller", async () => {
  const worker = await loadWorker();
  const db = new D1Database();
  const env = { DB: db };
  const ctx = { waitUntil() {}, passThroughOnException() {} };

  try {
    const created = await worker.fetch(request(validPayload), env, ctx);
    assert.equal(created.status, 201);
    const createdBody = await created.json();
    assert.equal(createdBody.ok, true);
    assert.match(createdBody.referenceId, /^[0-9a-f-]{36}$/i);
    assert.equal(db.countAppointments(), 1);

    const duplicate = await worker.fetch(request(validPayload), env, ctx);
    assert.equal(duplicate.status, 429);
    assert.equal(db.countAppointments(), 1);

    const invalid = await worker.fetch(
      request({ ...validPayload, email: "geçersiz" }),
      env,
      ctx,
    );
    assert.equal(invalid.status, 400);
  } finally {
    db.close();
  }
});
