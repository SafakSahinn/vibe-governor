/**
 * Small synchronous content hash (two FNV-1a 32-bit passes with different
 * seeds -> 16 hex chars). Identical in the browser and Node; used only to detect
 * whether a generated file was edited by hand, not for security.
 */
export function contentHash(text: string): string {
  const normalized = text.replace(/\r\n/g, "\n");
  let a = 0x811c9dc5;
  let b = 0x01000193 ^ 0x5bd1e995;
  for (let i = 0; i < normalized.length; i++) {
    const c = normalized.charCodeAt(i);
    a = Math.imul(a ^ c, 0x01000193) >>> 0;
    b = Math.imul(b ^ c, 0x01000193) >>> 0;
    b = (b ^ (b >>> 13)) >>> 0;
  }
  return a.toString(16).padStart(8, "0") + b.toString(16).padStart(8, "0");
}
