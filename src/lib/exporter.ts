import JSZip from "jszip";
import { GeneratedFile } from "@/types/wizard";

export async function exportProjectZip(
  files: GeneratedFile[],
  projectName: string = "vibe-governor-pack"
): Promise<void> {
  const zip = new JSZip();

  for (const file of files) {
    // Normalise path (use forward slashes)
    const normalizedPath = file.path.replace(/\\/g, "/");
    zip.file(normalizedPath, file.content);
  }

  const content = await zip.generateAsync({
    type: "blob",
    compression: "DEFLATE",
    compressionOptions: { level: 9 },
  });

  const blobUrl = URL.createObjectURL(content);
  const link = document.createElement("a");
  const safeName = (projectName || "vibe-governor").toLowerCase().replace(/[^a-z0-9_-]/g, "-");
  link.href = blobUrl;
  link.download = `${safeName}-governor-pack.zip`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(blobUrl);
}

export function downloadSingleFile(file: GeneratedFile): void {
  const blob = new Blob([file.content], { type: "text/plain;charset=utf-8" });
  const blobUrl = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = blobUrl;
  link.download = file.name;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(blobUrl);
}
