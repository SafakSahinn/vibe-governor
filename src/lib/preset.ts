import type { WizardFormData } from "../types/wizard";
import { DEFAULT_FORM_DATA, wizardSchema } from "./schema";

/**
 * `--preset` payload codec shared by the web wizard (encode) and the CLI (decode).
 * Format: base64url(UTF-8 JSON of WizardFormData). Works in browsers and Node >= 18.
 */

function toBase64Url(bytes: Uint8Array): string {
  let bin = "";
  for (const b of bytes) bin += String.fromCharCode(b);
  return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function fromBase64Url(text: string): Uint8Array {
  const b64 = text.replace(/-/g, "+").replace(/_/g, "/");
  const bin = atob(b64 + "=".repeat((4 - (b64.length % 4)) % 4));
  return Uint8Array.from(bin, (c) => c.charCodeAt(0));
}

/** Encodes the wizard state into a URL/shell-safe preset string. */
export function encodePreset(data: WizardFormData): string {
  return toBase64Url(new TextEncoder().encode(JSON.stringify(data)));
}

export type PresetResult = { ok: true; data: WizardFormData } | { ok: false; error: string };

/**
 * Validates a wizard configuration coming from a preset, a vibe-governor.json
 * file (the `config` field is unwrapped) or any JSON value. Keys added in newer
 * versions are filled with their defaults so older configs keep working.
 */
export function parseConfig(input: unknown, label = "Config"): PresetResult {
  let raw = input;
  if (raw && typeof raw === "object" && "config" in raw && "formatVersion" in raw) {
    raw = (raw as { config: unknown }).config;
  }
  if (!raw || typeof raw !== "object") return { ok: false, error: `${label} is not a JSON object.` };
  const obj = { ...(raw as Record<string, unknown>) };
  if (obj.constraints && typeof obj.constraints === "object") {
    obj.constraints = { ...DEFAULT_FORM_DATA.constraints, ...(obj.constraints as object) };
  }
  if (obj.automation && typeof obj.automation === "object") {
    obj.automation = { ...DEFAULT_FORM_DATA.automation, ...(obj.automation as object) };
  }
  const parsed = wizardSchema.safeParse(obj);
  if (!parsed.success) {
    const issues = parsed.error.issues.map((i) => `${i.path.join(".") || "(root)"}: ${i.message}`);
    return { ok: false, error: `${label} failed validation -> ${issues.join("; ")}` };
  }
  return { ok: true, data: parsed.data };
}

/** Decodes and validates a preset string produced by {@link encodePreset}. */
export function decodePreset(preset: string): PresetResult {
  let raw: unknown;
  try {
    raw = JSON.parse(new TextDecoder().decode(fromBase64Url(preset.trim())));
  } catch {
    return { ok: false, error: "Preset is not valid base64url-encoded JSON." };
  }
  return parseConfig(raw, "Preset");
}
