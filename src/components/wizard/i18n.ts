import type { Language } from "@/types/wizard";

/** Localized texts for the schema's validation error keys (see lib/schema.ts). */
const ERRORS: Record<string, { tr: string; en: string }> = {
  platforms_min: { tr: "En az bir hedef AI aracı seçmelisiniz.", en: "Select at least one target AI platform." },
  languages_min: { tr: "En az bir programlama/HDL dili seçmelisiniz.", en: "Select at least one programming/HDL language." },
  max_lines_range: { tr: "Satır sınırı 200 ile 1500 arasında bir tam sayı olmalı.", en: "Line limit must be an integer between 200 and 1500." },
  doc_score_range: { tr: "Dokümantasyon barajı 5 ile 10 arasında olmalı.", en: "Documentation threshold must be between 5 and 10." },
  project_name_required: { tr: "Proje adı boş bırakılamaz.", en: "Project name is required." },
  project_name_too_long: { tr: "Proje adı en fazla 80 karakter olabilir.", en: "Project name can be at most 80 characters." },
  text_too_long: { tr: "Memory Bank alanları en fazla 5000 karakter olabilir.", en: "Memory Bank fields can be at most 5000 characters." },
  checker_required: {
    tr: "Pre-commit kancası ve CI, scripts/check_guidelines.py betiğini çalıştırır; denetçi betiği açık olmalı.",
    en: "The pre-commit hook and CI run scripts/check_guidelines.py, so the checker script must be enabled.",
  },
};

/** Resolves an error key to a message in the given locale (falls back to the key). */
export function errorText(key: string, locale: Language): string {
  return ERRORS[key]?.[locale] ?? key;
}
