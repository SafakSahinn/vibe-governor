import type { WizardFormData } from "../types/wizard";
import { wizardSchema } from "./schema";

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

/** Decodes and validates a preset string produced by {@link encodePreset}. */
export function decodePreset(preset: string): PresetResult {
  let raw: unknown;
  try {
    raw = JSON.parse(new TextDecoder().decode(fromBase64Url(preset.trim())));
  } catch {
    return { ok: false, error: "Preset is not valid base64url-encoded JSON." };
  }
  const parsed = wizardSchema.safeParse(raw);
  if (!parsed.success) {
    const issues = parsed.error.issues.map((i) => `${i.path.join(".") || "(root)"}: ${i.message}`);
    return { ok: false, error: `Preset failed validation -> ${issues.join("; ")}` };
  }
  return { ok: true, data: parsed.data };
}
