"use client";

import React, { useState, useMemo } from "react";
import { useUiLocale } from "./UiLocale";
import { GeneratedFile, WizardFormData } from "@/types/wizard";
import { generateCliCommand } from "@/lib/templateEngine";
import { exportProjectZip } from "@/lib/exporter";
import { FileTree } from "./FileTree";
import { Button } from "@/components/ui/button";
import { CodeViewer } from "./CodeViewer";
import { Download, Terminal, Copy, Check, Sparkles, FolderArchive, Layers, AlertTriangle } from "lucide-react";

/** Longest command line Windows cmd.exe accepts. */
const WINDOWS_CMD_LIMIT = 8191;

interface Step5Props {
  data: WizardFormData;
  files: GeneratedFile[];
}

export const Step5Export: React.FC<Step5Props> = ({ data, files }) => {
  const { isTr, locale: uiLocale } = useUiLocale();
  const [selectedPath, setSelectedPath] = useState<string | null>(files[0]?.path ?? null);
  const selectedFile = files.find((f) => f.path === selectedPath) ?? files[0] ?? null;
  const [zipError, setZipError] = useState(false);
  const [cliCopied, setCliCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const cliCommand = useMemo(() => generateCliCommand(data), [data]);

  const handleDownloadZip = async () => {
    try {
      setDownloading(true);
      setZipError(false);
      await exportProjectZip(files, data.memoryBank.projectName);
    } catch (err) {
      console.error(err);
      setZipError(true);
    } finally {
      setDownloading(false);
    }
  };

  const handleCopyCli = async () => {
    try {
      await navigator.clipboard.writeText(cliCommand);
      setCliCopied(true);
      setTimeout(() => setCliCopied(false), 2000);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Step Header */}
      <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <span>{isTr ? "5. Ön İzleme ve Dışa Aktarma Hub'ı" : "5. Preview & Export Hub"}</span>
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            {isTr
              ? "Tüm anayasa, Memory Bank ve betik dosyalarınız hazır. İnceleyin veya ZIP paketi olarak indirin."
              : "All governance rules, Memory Bank templates, and CI scripts are generated. Inspect or export as ZIP."}
          </p>
        </div>

        {/* Big Download ZIP Button */}
        <Button variant="gradient" size="lg" onClick={handleDownloadZip} disabled={downloading} className="shrink-0">
          <Download className="stroke-[2.5]" />
          <span>
            {downloading
              ? isTr
                ? "Paketleniyor..."
                : "Packaging..."
              : isTr
              ? "Proje Paketini İndir (.ZIP)"
              : "Download Project Pack (.ZIP)"}
          </span>
        </Button>
      </div>

      {zipError && (
        <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-800/60 text-rose-200 text-xs">
          {isTr ? "ZIP paketi oluşturulamadı. Lütfen tekrar deneyin." : "Could not build the ZIP package. Please try again."}
        </div>
      )}

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-indigo-950/80 text-indigo-400 border border-indigo-800/60">
            <FolderArchive className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[11px] text-slate-400">{isTr ? "Toplam Dosya" : "Total Files"}</div>
            <div className="text-base font-bold text-white font-mono">{files.length}</div>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-emerald-950/80 text-emerald-400 border border-emerald-800/60">
            <Layers className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[11px] text-slate-400">{isTr ? "Dosya Sınırı" : "Line Ceiling"}</div>
            <div className="text-base font-bold text-white font-mono">{data.constraints.maxLines} {isTr ? "satır" : "lines"}</div>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-purple-950/80 text-purple-400 border border-purple-800/60">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[11px] text-slate-400">{isTr ? "Hedef AI Sayısı" : "Target AI Tools"}</div>
            <div className="text-base font-bold text-white font-mono">{data.targetPlatforms.length} {isTr ? "Araç" : "tools"}</div>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-cyan-950/80 text-cyan-400 border border-cyan-800/60">
            <Terminal className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[11px] text-slate-400">{isTr ? "Dokümantasyon Barajı" : "Doc Threshold"}</div>
            <div className="text-base font-bold text-white font-mono">{data.constraints.docScoreThreshold} / 10</div>
          </div>
        </div>
      </div>

      {/* CLI Command Box */}
      <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-indigo-400" />
            <span className="text-xs font-semibold text-slate-300">
              {isTr ? "Tek Satır CLI Komutu (Terminal Kurulumu)" : "One-Line CLI Command (Direct Scaffolding)"}
            </span>
          </div>
          <button
            type="button"
            onClick={handleCopyCli}
            className="flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700/60 transition-all"
          >
            {cliCopied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">{isTr ? "Kopyalandı" : "Copied"}</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>{isTr ? "Komutu Kopyala" : "Copy Command"}</span>
              </>
            )}
          </button>
        </div>
        <div className="p-3 rounded-lg bg-slate-950 border border-slate-800/80 font-mono text-xs text-indigo-300 break-all max-h-28 overflow-y-auto select-all">
          {cliCommand}
        </div>
        <p className="text-[11px] text-slate-500 leading-relaxed">
          {isTr
            ? "Proje klasörünüzde çalıştırın (Node.js 18+ gerekir). --preset bu sihirbazdaki tüm seçimlerinizi taşır; aynı dosyalar yazılır, varsa .git/hooks/pre-commit kurulur. Mevcut dosyalar korunur (--force ile üzerine yazılır)."
            : "Run it inside your project folder (requires Node.js 18+). --preset carries every choice made in this wizard; the same files are written and .git/hooks/pre-commit is installed when a git repo exists. Existing files are kept (use --force to overwrite)."}
        </p>
        <p className="text-[11px] text-slate-400 leading-relaxed">
          {isTr ? (
            <>
              Ayarlar pakete <code className="text-indigo-300">vibe-governor.json</code> olarak kaydedilir. Sonradan değiştirmek için{" "}
              <code className="text-indigo-300">npx -y vibe-governor update --max-lines=600</code> gibi bir komut yeterlidir; elle düzenlediğiniz dosyalar ve Memory Bank korunur.
            </>
          ) : (
            <>
              Settings are saved in the pack as <code className="text-indigo-300">vibe-governor.json</code>. Change them later with e.g.{" "}
              <code className="text-indigo-300">npx -y vibe-governor update --max-lines=600</code>; hand-edited files and the Memory Bank are preserved.
            </>
          )}
        </p>
        {cliCommand.length > WINDOWS_CMD_LIMIT && (
          <div className="flex items-start gap-2 p-2.5 rounded-lg bg-amber-950/40 border border-amber-800/50 text-amber-200 text-[11px] leading-relaxed">
            <AlertTriangle className="w-4 h-4 shrink-0 text-amber-400" />
            <span>
              {isTr
                ? `Komut ${cliCommand.length.toLocaleString("tr-TR")} karakter. Windows cmd 8.191, PowerShell 32.767 karakterden uzun komutları keser. Memory Bank metinlerini kısaltın ya da ZIP paketini indirin.`
                : `This command is ${cliCommand.length.toLocaleString("en-US")} characters. Windows cmd truncates commands over 8,191 and PowerShell over 32,767 characters. Shorten the Memory Bank texts or download the ZIP pack instead.`}
            </span>
          </div>
        )}
      </div>

      {/* Main Two-Panel Layout (Left: File Tree, Right: Code Viewer) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[560px]">
        {/* Left Column: File Tree */}
        <div className="lg:col-span-4 h-full">
          <FileTree
            files={files}
            selectedFile={selectedFile}
            onSelectFile={(f) => setSelectedPath(f.path)}
            locale={uiLocale}
          />
        </div>

        {/* Right Column: Code Viewer */}
        <div className="lg:col-span-8 h-full">
          <CodeViewer file={selectedFile} locale={uiLocale} />
        </div>
      </div>
    </div>
  );
};
