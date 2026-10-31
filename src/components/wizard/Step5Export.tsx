"use client";

import React, { useState, useMemo } from "react";
import { GeneratedFile, WizardFormData } from "@/types/wizard";
import { generateCliCommand } from "@/lib/templateEngine";
import { exportProjectZip } from "@/lib/exporter";
import { FileTree } from "./FileTree";
import { CodeViewer } from "./CodeViewer";
import { Download, Terminal, Copy, Check, Sparkles, FolderArchive, Layers } from "lucide-react";

interface Step5Props {
  data: WizardFormData;
  files: GeneratedFile[];
}

export const Step5Export: React.FC<Step5Props> = ({ data, files }) => {
  const isTr = data.locale === "tr";
  const [selectedFile, setSelectedFile] = useState<GeneratedFile | null>(
    files.length > 0 ? files[0] : null
  );
  const [cliCopied, setCliCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const cliCommand = useMemo(() => generateCliCommand(data), [data]);

  const handleDownloadZip = async () => {
    try {
      setDownloading(true);
      await exportProjectZip(files, data.memoryBank.projectName);
    } catch (err) {
      console.error(err);
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
        <button
          type="button"
          onClick={handleDownloadZip}
          disabled={downloading}
          className="flex items-center justify-center gap-2.5 px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-500 via-indigo-600 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white font-bold text-sm shadow-lg shadow-indigo-600/30 transition-all hover:scale-[1.02] active:scale-[0.98] shrink-0"
        >
          <Download className="w-4 h-4 stroke-[2.5]" />
          <span>
            {downloading
              ? isTr
                ? "Paketleniyor..."
                : "Packaging..."
              : isTr
              ? "Proje Paketini İndir (.ZIP)"
              : "Download Project Pack (.ZIP)"}
          </span>
        </button>
      </div>

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
            <div className="text-base font-bold text-white font-mono">{data.constraints.maxLines} satır</div>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-purple-950/80 text-purple-400 border border-purple-800/60">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[11px] text-slate-400">{isTr ? "Hedef AI Sayısı" : "Target AI Tools"}</div>
            <div className="text-base font-bold text-white font-mono">{data.targetPlatforms.length} Araç</div>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-cyan-950/80 text-cyan-400 border border-cyan-800/60">
            <Terminal className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[11px] text-slate-400">{isTr ? "Denetim Skoru" : "Doc Bar"}</div>
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
        <div className="p-3 rounded-lg bg-slate-950 border border-slate-800/80 font-mono text-xs text-indigo-300 overflow-x-auto select-all">
          {cliCommand}
        </div>
      </div>

      {/* Main Two-Panel Layout (Left: File Tree, Right: Code Viewer) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[560px]">
        {/* Left Column: File Tree */}
        <div className="lg:col-span-4 h-full">
          <FileTree
            files={files}
            selectedFile={selectedFile}
            onSelectFile={(f) => setSelectedFile(f)}
            locale={data.locale}
          />
        </div>

        {/* Right Column: Code Viewer */}
        <div className="lg:col-span-8 h-full">
          <CodeViewer file={selectedFile} locale={data.locale} />
        </div>
      </div>
    </div>
  );
};
