"use client";

import React, { useMemo } from "react";
import { GeneratedFile } from "@/types/wizard";
import { Folder, FolderOpen, FileCode, Search } from "lucide-react";

interface FileTreeProps {
  files: GeneratedFile[];
  selectedFile: GeneratedFile | null;
  onSelectFile: (file: GeneratedFile) => void;
  locale: "tr" | "en";
}

interface TreeNode {
  name: string;
  fullPath: string;
  isFile: boolean;
  file?: GeneratedFile;
  children: Record<string, TreeNode>;
}

export const FileTree: React.FC<FileTreeProps> = ({
  files,
  selectedFile,
  onSelectFile,
  locale,
}) => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const isTr = locale === "tr";

  const tree = useMemo(() => {
    const root: TreeNode = {
      name: "root",
      fullPath: "",
      isFile: false,
      children: {},
    };

    const filtered = files.filter((f) =>
      f.path.toLowerCase().includes(searchTerm.toLowerCase())
    );

    for (const file of filtered) {
      const parts = file.path.split("/");
      let current = root;

      for (let i = 0; i < parts.length; i++) {
        const part = parts[i];
        const isLeaf = i === parts.length - 1;
        const currentPath = parts.slice(0, i + 1).join("/");

        if (!current.children[part]) {
          current.children[part] = {
            name: part,
            fullPath: currentPath,
            isFile: isLeaf,
            file: isLeaf ? file : undefined,
            children: {},
          };
        }
        current = current.children[part];
      }
    }

    return root;
  }, [files, searchTerm]);

  const renderNode = (node: TreeNode, depth: number = 0) => {
    const entries = Object.values(node.children);

    return (
      <div key={node.fullPath || "root"} className="space-y-0.5">
        {entries.map((child) => {
          if (child.isFile && child.file) {
            const isSelected = selectedFile?.path === child.file.path;
            return (
              <button
                key={child.fullPath}
                type="button"
                onClick={() => onSelectFile(child.file!)}
                style={{ paddingLeft: `${depth * 1.25 + 0.75}rem` }}
                className={`w-full flex items-center justify-between pr-3 py-1.5 rounded-lg text-xs font-mono transition-all text-left group ${
                  isSelected
                    ? "bg-indigo-600/20 text-indigo-300 font-semibold border-l-2 border-indigo-500"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-900"
                }`}
              >
                <div className="flex items-center gap-2 truncate">
                  <FileCode
                    className={`w-3.5 h-3.5 shrink-0 ${
                      isSelected ? "text-indigo-400" : "text-slate-500 group-hover:text-slate-400"
                    }`}
                  />
                  <span className="truncate">{child.name}</span>
                </div>
                <span className="text-[10px] text-slate-600 group-hover:text-slate-500 shrink-0 uppercase font-mono">
                  {child.file.language.slice(0, 3)}
                </span>
              </button>
            );
          }

          // Folder node
          return (
            <div key={child.fullPath} className="space-y-0.5">
              <div
                style={{ paddingLeft: `${depth * 1.25 + 0.5}rem` }}
                className="flex items-center gap-2 py-1.5 text-xs font-semibold text-slate-300 select-none"
              >
                <FolderOpen className="w-4 h-4 text-amber-400/90 shrink-0" />
                <span className="font-mono text-slate-300">{child.name}/</span>
              </div>
              <div>{renderNode(child, depth + 1)}</div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="h-full flex flex-col border border-slate-800 rounded-2xl bg-slate-950/80 overflow-hidden shadow-xl">
      {/* Tree Header */}
      <div className="p-3.5 border-b border-slate-800 bg-slate-900/90 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Folder className="w-4 h-4 text-indigo-400" />
            <span className="text-xs font-bold text-white uppercase tracking-wider">
              {isTr ? "Proje Dosya Ağacı" : "File Explorer"}
            </span>
          </div>
          <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
            {files.length} {isTr ? "dosya" : "files"}
          </span>
        </div>

        {/* Search input */}
        <div className="relative">
          <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={isTr ? "Dosya ara..." : "Filter files..."}
            className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 font-mono"
          />
        </div>
      </div>

      {/* File List */}
      <div className="flex-1 overflow-auto p-2">
        {renderNode(tree)}
      </div>
    </div>
  );
};
