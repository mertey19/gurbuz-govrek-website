"""
Tercih robotu veri çıkarımı: xlsx -> JSONL.

Çıktı `tmp/` altına yazılır ve .gitignore kapsamındadır. Program verisi HİÇBİR
koşulda repoya commit'lenmez; repo herkese açıktır ve veri Gürbüz Gövrek'in
çalışma varlığıdır. Yükleme adımı `scripts/tercih/import.mjs` ile yapılır.

Kullanım:
    python scripts/tercih/extract.py "C:/yol/2026 TERCIH ROBOTU GURBUZ.xlsx"
"""

import json
import os
import re
import sys

import openpyxl

OUTPUT = os.path.join("tmp", "tercih-programs.jsonl")

# (sayfa adı, seviye, sütun indeksleri) — iki sayfanın sütun düzeni farklı.
SHEETS = {
    # Güncel LİSANS düzeni (çok yıllı sıralama ve kontenjan sütunları).
    # Sıralama olarak 2025 yerleşme sırası, kontenjan olarak 2026 kontenjanı alınır;
    # tercih bu ikisiyle yapılır. PUAN sütunu bu sürümde bulunmuyor.
    "LİSANS": {
        "level": "lisans",
        "cols": {
            "program_code": 0, "kind": 1, "city": 2, "university": 3,
            "faculty": 4, "department": 5, "duration": 6, "score_type": 7,
            "rank": 8, "quota": 12, "conditions": 16, "school_first": 17,
            "prof": 21, "doctor": 22, "lecturers": 23,
            "accredited": 24, "tus": 25, "dus": 26,
        },
    },
    # Güncellenmiş dosyada sayfa "TABLO 4" olarak adlandırılmış, başa bir SR
    # (sıra no) sütunu eklenmiş ve ŞEHİR sütunu kaldırılmıştır. Şehir bilgisi
    # yükleme sırasında program kodu üzerinden eşleştirilerek korunur.
    "TABLO 4": {
        "level": "lisans",
        "cols": {
            "program_code": 1, "kind": 2, "university": 3,
            "faculty": 4, "department": 5, "duration": 6, "score_type": 7,
            "rank": 8, "score": 9, "quota": 10, "school_first": 11,
            "conditions": 15, "prof": 16, "doctor": 17, "lecturers": 18,
            "accredited": 19, "tus": 20, "dus": 21,
        },
    },
    "ÖNLİSANS": {
        "level": "onlisans",
        "cols": {
            "program_code": 0, "kind": 1, "city": 2, "university": 3,
            "faculty": 4, "department": 5, "duration": 6, "score_type": 7,
            "rank": 8, "score": 9, "quota": 10, "school_first": 11,
            "conditions": 14, "accredited": 15,
        },
    },
}


def clean_text(value):
    if value is None:
        return None
    text = re.sub(r"\s+", " ", str(value)).strip()
    return text or None


def to_int(value):
    """'12.500', '12500', 12500.0 -> 12500. Sayı değilse None."""
    if value is None:
        return None
    if isinstance(value, (int, float)):
        return int(value)
    digits = re.sub(r"[^\d]", "", str(value))
    return int(digits) if digits else None


def to_float(value):
    if value is None:
        return None
    if isinstance(value, (int, float)):
        return float(value)
    text = str(value).strip().replace(",", ".")
    try:
        return float(text)
    except ValueError:
        return None


def main():
    if len(sys.argv) < 2:
        print("Kullanım: python scripts/tercih/extract.py <xlsx yolu>")
        return 1

    path = sys.argv[1]
    if not os.path.exists(path):
        print(f"Dosya bulunamadı: {path}")
        return 1

    os.makedirs("tmp", exist_ok=True)
    workbook = openpyxl.load_workbook(path, read_only=True, data_only=True)

    written = 0
    skipped = 0

    with open(OUTPUT, "w", encoding="utf-8") as out:
        for sheet_name, config in SHEETS.items():
            if sheet_name not in workbook.sheetnames:
                print(f"UYARI: {sheet_name} sayfası bulunamadı, atlandı.")
                continue

            sheet = workbook[sheet_name]
            cols = config["cols"]

            for row in sheet.iter_rows(min_row=2, values_only=True):
                if not row or row[0] is None:
                    continue

                def cell(key):
                    index = cols.get(key)
                    if index is None or index >= len(row):
                        return None
                    return row[index]

                score_type = clean_text(cell("score_type"))
                rank = to_int(cell("rank"))

                # Sıralaması veya puan türü olmayan satır robotta kullanılamaz.
                if not score_type or rank is None:
                    skipped += 1
                    continue

                record = {
                    "level": config["level"],
                    "program_code": clean_text(cell("program_code")),
                    "kind": clean_text(cell("kind")),
                    "city": clean_text(cell("city")),
                    "university": clean_text(cell("university")),
                    "faculty": clean_text(cell("faculty")),
                    "department": clean_text(cell("department")),
                    "duration": to_int(cell("duration")),
                    "score_type": score_type.upper(),
                    "rank": rank,
                    "score": to_float(cell("score")),
                    "quota": to_int(cell("quota")),
                    "conditions": clean_text(cell("conditions")),
                    "prof": to_int(cell("prof")),
                    "doctor": to_int(cell("doctor")),
                    "lecturers": to_int(cell("lecturers")),
                    "accredited": clean_text(cell("accredited")),
                    "tus": clean_text(cell("tus")),
                    "dus": clean_text(cell("dus")),
                }

                out.write(json.dumps(record, ensure_ascii=False) + "\n")
                written += 1

    workbook.close()
    print(f"{written} program yazıldı -> {OUTPUT}")
    print(f"{skipped} satır atlandı (puan türü veya sıralama yok).")
    return 0


if __name__ == "__main__":
    sys.exit(main())
