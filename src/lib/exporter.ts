import JSZip from "jszip";
import type { GeneratedFile } from "@/types/wizard";

const EXECUTABLE = /\.(sh|py)$/;

function triggerDownload(blob: Blob, filename: string): void {
  const blobUrl = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = blobUrl;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  // Revoking synchronously can cancel the download in some browsers.
  setTimeout(() => URL.revokeObjectURL(blobUrl), 1000);
}

/** Converts a project name into a safe file name fragment. */
export function safeFileName(projectName: string): string {
  const cleaned = (projectName || "vibe-governor")
    .toLowerCase()
    .replace(/[^a-z0-9_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return cleaned || "vibe-governor";
}

/** Builds the governance pack ZIP (scripts keep their executable bit on Unix). */
export async function buildProjectZip(files: GeneratedFile[]): Promise<Blob> {
  const zip = new JSZip();
  for (const file of files) {
    const path = file.path.replace(/\\/g, "/");
    zip.file(path, file.content, EXECUTABLE.test(path) ? { unixPermissions: 0o755 } : { unixPermissions: 0o644 });
  }
  return zip.generateAsync({
    type: "blob",
    platform: "UNIX",
    compression: "DEFLATE",
    compressionOptions: { level: 9 },
  });
}

/** Downloads every generated file as a single ZIP archive. */
export async function exportProjectZip(files: GeneratedFile[], projectName: string): Promise<void> {
  const blob = await buildProjectZip(files);
  triggerDownload(blob, `${safeFileName(projectName)}-governor-pack.zip`);
}

/** Downloads one generated file. */
export function downloadSingleFile(file: GeneratedFile): void {
  triggerDownload(new Blob([file.content], { type: "text/plain;charset=utf-8" }), file.name);
}
