"use client";

import React, { useState } from "react";
import { GeneratedFile } from "@/types/wizard";
import { Copy, Check, Download, FileCode } from "lucide-react";
import { downloadSingleFile } from "@/lib/exporter";

interface CodeViewerProps {
  file: GeneratedFile | null;
  locale: "tr" | "en";
}

export const CodeViewer: React.FC<CodeViewerProps> = ({ file, locale }) => {
  const [copied, setCopied] = useState(false);
  const isTr = locale === "tr";

  if (!file) {
    return (
      <div className="h-full min-h-[460px] flex flex-col items-center justify-center p-8 text-center text-slate-500 border border-slate-800 rounded-2xl bg-slate-950/70">
        <FileCode className="w-12 h-12 stroke-[1.5] text-slate-700 mb-3" />
        <p className="text-sm font-medium">
          {isTr ? "Görüntülemek için soldaki ağaçtan bir dosya seçin." : "Select a file from the tree to view contents."}
        </p>
      </div>
    );
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(file.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.error(e);
    }
  };

  const lines = file.content.split("\n");

  return (
    <div className="flex flex-col h-full min-h-[500px] border border-slate-800 rounded-2xl bg-slate-950/90 overflow-hidden shadow-2xl">
      {/* Viewer Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-slate-900/90 border-b border-slate-800">
        <div className="flex items-center gap-2.5 min-w-0">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shrink-0" />
          <span className="font-mono text-xs text-white font-medium truncate">
            {file.path}
          </span>
          <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700/60">
            {file.language}
          </span>
          <span className="text-[11px] text-slate-500 font-mono">
            {lines.length} {isTr ? "satır" : "lines"}
          </span>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700/60 transition-all"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">{isTr ? "Kopyalandı" : "Copied"}</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>{isTr ? "Kopyala" : "Copy"}</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() => downloadSingleFile(file)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-950/70 hover:bg-indigo-900 text-indigo-300 border border-indigo-700/60 transition-all"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{isTr ? "İndir" : "Download"}</span>
          </button>
        </div>
      </div>

      {/* Code Content Area with Line Numbers */}
      <div className="flex-1 overflow-auto p-4 font-mono text-xs leading-relaxed">
        <div className="grid grid-cols-[3rem_1fr] gap-4">
          <div className="text-right text-slate-600 select-none space-y-0.5">
            {lines.map((_, i) => (
              <div key={i}>{i + 1}</div>
            ))}
          </div>
          <pre className="text-slate-300 whitespace-pre overflow-x-auto space-y-0.5 font-mono">
            {lines.map((line, i) => (
              <div key={i} className="hover:bg-slate-900/50 px-1 rounded">
                {line || " "}
              </div>
            ))}
          </pre>
        </div>
      </div>
    </div>
  );
};
