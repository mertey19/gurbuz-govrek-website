import type { AppointmentFormData } from "@/types";

export type AppointmentResult = {
  ok: boolean;
  message: string;
  referenceId?: string;
};

export async function submitAppointment(
  data: AppointmentFormData,
): Promise<AppointmentResult> {
  try {
    const response = await fetch("/api/appointments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = (await response.json()) as Partial<AppointmentResult>;

    if (!response.ok || !result.ok) {
      return {
        ok: false,
        message:
          result.message ||
          "Randevu talebi şu anda alınamadı. Lütfen telefon veya e-posta üzerinden iletişime geçin.",
      };
    }

    return {
      ok: true,
      message: result.message || "Randevu talebiniz alındı.",
      referenceId: result.referenceId,
    };
  } catch {
    return {
      ok: false,
      message:
        "Bağlantı kurulamadı. Lütfen internet bağlantınızı kontrol edip tekrar deneyin veya doğrudan iletişime geçin.",
    };
  }
}
