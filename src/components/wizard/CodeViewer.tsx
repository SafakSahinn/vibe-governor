"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { Copy, Check, Download, FileCode, Loader2 } from "lucide-react";
import type { GeneratedFile } from "@/types/wizard";
import { downloadSingleFile } from "@/lib/exporter";

// Monaco touches `window`, so it is loaded on the client only.
const MonacoEditor = dynamic(() => import("@monaco-editor/react").then((m) => m.default), {
  ssr: false,
  loading: () => <EditorLoading />,
});

function EditorLoading() {
  return (
    <div className="h-full flex items-center justify-center text-slate-500 text-xs gap-2">
      <Loader2 className="w-4 h-4 animate-spin" />
      <span>Monaco Editor…</span>
    </div>
  );
}

/** Maps our file language ids to Monaco language ids. */
function monacoLanguage(language: string): string {
  switch (language) {
    case "markdown":
    case "python":
    case "yaml":
    case "shell":
      return language;
    default:
      return "plaintext";
  }
}

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

  const lineCount = file.content.replace(/\n$/, "").split("\n").length;

  return (
    <div className="flex flex-col h-full min-h-[560px] border border-slate-800 rounded-2xl bg-slate-950/90 overflow-hidden shadow-2xl">
      <div className="flex items-center justify-between px-4 py-3 bg-slate-900/90 border-b border-slate-800">
        <div className="flex items-center gap-2.5 min-w-0">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shrink-0" />
          <span className="font-mono text-xs text-white font-medium truncate">{file.path}</span>
          <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700/60">
            {file.language}
          </span>
          <span className="text-[11px] text-slate-500 font-mono">
            {lineCount} {isTr ? "satır" : "lines"}
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

      <div className="flex-1 min-h-[500px]">
        <MonacoEditor
          height="100%"
          theme="vs-dark"
          path={file.path}
          language={monacoLanguage(file.language)}
          value={file.content}
          loading={<EditorLoading />}
          options={{
            readOnly: true,
            domReadOnly: true,
            minimap: { enabled: false },
            fontSize: 12,
            scrollBeyondLastLine: false,
            wordWrap: "on",
            renderLineHighlight: "none",
            automaticLayout: true,
          }}
        />
      </div>
    </div>
  );
};
