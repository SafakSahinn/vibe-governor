"use client";

import React from "react";
import { CodingLanguage, TargetPlatform, WizardFormData } from "@/types/wizard";
import { Bot, Terminal, Code2, Wind, Cpu, Sparkles, Check } from "lucide-react";

interface Step1Props {
  data: WizardFormData;
  updateData: (fields: Partial<WizardFormData>) => void;
}

const PLATFORMS: {
  id: TargetPlatform;
  name: string;
  descTr: string;
  descEn: string;
  fileTarget: string;
  icon: React.ReactNode;
}[] = [
  {
    id: "ANTIGRAVITY",
    name: "AntiGravity AI Agent",
    descTr: "Kök dizinde ANTIGRAVITY.md ile otonom kodlama ve hafıza yürütme protocolü.",
    descEn: "Autonomous protocol with ANTIGRAVITY.md in root.",
    fileTarget: "ANTIGRAVITY.md",
    icon: <Sparkles className="w-5 h-5 text-indigo-400" />,
  },
  {
    id: "CLAUDE_CLI",
    name: "Claude CLI",
    descTr: "Terminal üzerinden 'claude' komutu ile çalışan otomatik kural seti.",
    descEn: "Automatic rules for terminal 'claude' sessions.",
    fileTarget: "CLAUDE.md",
    icon: <Terminal className="w-5 h-5 text-amber-400" />,
  },
  {
    id: "CURSOR",
    name: "Cursor IDE",
    descTr: "Cursor IDE için context ve mimari kısıtlama kuralları.",
    descEn: "Context & architectural constraints for Cursor IDE.",
    fileTarget: ".cursorrules",
    icon: <Code2 className="w-5 h-5 text-cyan-400" />,
  },
  {
    id: "WINDSURF",
    name: "Windsurf IDE",
    descTr: "Cascade yapay zeka asistanı için sistem talimatları.",
    descEn: "System instructions for Cascade AI assistant in Windsurf.",
    fileTarget: ".windsurfrules",
    icon: <Wind className="w-5 h-5 text-emerald-400" />,
  },
  {
    id: "CLINE",
    name: "VS Code + Cline",
    descTr: "Roo Code / Cline eklentisi için kural yönergeleri.",
    descEn: "Rules for Cline / Roo Code extensions in VS Code.",
    fileTarget: ".clinerules",
    icon: <Bot className="w-5 h-5 text-purple-400" />,
  },
  {
    id: "GITHUB_COPILOT",
    name: "GitHub Copilot",
    descTr: "Copilot Chat ve kod tamamlama özel talimatları.",
    descEn: "Custom instructions for GitHub Copilot Workspace.",
    fileTarget: ".github/copilot-instructions.md",
    icon: <Cpu className="w-5 h-5 text-sky-400" />,
  },
];

const SOFTWARE_LANGS: CodingLanguage[] = ["Rust", "TypeScript", "Python", "C++", "Go"];
const HARDWARE_LANGS: CodingLanguage[] = ["Verilog", "VHDL"];

export const Step1Platform: React.FC<Step1Props> = ({ data, updateData }) => {
  const isTr = data.locale === "tr";

  const togglePlatform = (platform: TargetPlatform) => {
    const exists = data.targetPlatforms.includes(platform);
    let next: TargetPlatform[];
    if (exists) {
      if (data.targetPlatforms.length === 1) return; // keep at least 1
      next = data.targetPlatforms.filter((p) => p !== platform);
    } else {
      next = [...data.targetPlatforms, platform];
    }
    updateData({ targetPlatforms: next });
  };

  const toggleLanguage = (lang: CodingLanguage) => {
    const exists = data.languages.includes(lang);
    let next: CodingLanguage[];
    if (exists) {
      if (data.languages.length === 1) return;
      next = data.languages.filter((l) => l !== lang);
    } else {
      next = [...data.languages, lang];
    }
    updateData({ languages: next });
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header & Language Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-slate-900/90 border border-slate-800">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <span>{isTr ? "1. Dil ve Target AI Platform Seçimi" : "1. Language & Target AI Platform"}</span>
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            {isTr
              ? "Projenizde çalışacak yapay zeka asistanlarını ve kodlama dillerini belirleyin."
              : "Select the AI coding assistants and project languages for your repository."}
          </p>
        </div>

        {/* Locale toggle buttons */}
        <div className="flex items-center gap-1.5 bg-slate-950 p-1.5 rounded-xl border border-slate-800 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => updateData({ locale: "tr" })}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              data.locale === "tr"
                ? "bg-indigo-600 text-white shadow-sm"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            🇹🇷 Türkçe (TR)
          </button>
          <button
            type="button"
            onClick={() => updateData({ locale: "en" })}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              data.locale === "en"
                ? "bg-indigo-600 text-white shadow-sm"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            🇬🇧 English (EN)
          </button>
        </div>
      </div>

      {/* Target Platforms Grid */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <label className="text-sm font-semibold text-slate-200">
            {isTr ? "Hedef AI Araçları (Çoklu Seçim)" : "Target AI Platforms (Multi-select)"}
          </label>
          <span className="text-xs text-indigo-400 font-medium">
            {data.targetPlatforms.length} {isTr ? "seçildi" : "selected"}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {PLATFORMS.map((platform) => {
            const isSelected = data.targetPlatforms.includes(platform.id);
            return (
              <div
                key={platform.id}
                onClick={() => togglePlatform(platform.id)}
                className={`relative cursor-pointer p-4 rounded-xl border transition-all duration-200 group flex flex-col justify-between ${
                  isSelected
                    ? "bg-indigo-950/40 border-indigo-500/60 shadow-lg shadow-indigo-950/50 ring-1 ring-indigo-500/30"
                    : "bg-slate-900/60 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-2.5 rounded-xl border ${
                        isSelected
                          ? "bg-indigo-900/50 border-indigo-700/50"
                          : "bg-slate-800/60 border-slate-700/50 group-hover:border-slate-600"
                      }`}
                    >
                      {platform.icon}
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-white">{platform.name}</h3>
                      <span className="inline-block font-mono text-[11px] text-indigo-300 mt-0.5">
                        {platform.fileTarget}
                      </span>
                    </div>
                  </div>
                  <div
                    className={`w-5 h-5 rounded-md flex items-center justify-center border transition-all ${
                      isSelected
                        ? "bg-indigo-600 border-indigo-500 text-white"
                        : "border-slate-700 bg-slate-800/50"
                    }`}
                  >
                    {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>
                </div>

                <p className="text-xs text-slate-400 mt-3 leading-relaxed">
                  {isTr ? platform.descTr : platform.descEn}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Project Types & Languages */}
      <div className="space-y-6 pt-2">
        {/* Software Languages */}
        <div>
          <label className="text-sm font-semibold text-slate-200 block mb-3">
            {isTr ? "Genel Yazılım Dilleri" : "General Software Languages"}
          </label>
          <div className="flex flex-wrap gap-2.5">
            {SOFTWARE_LANGS.map((lang) => {
              const isSelected = data.languages.includes(lang);
              return (
                <button
                  key={lang}
                  type="button"
                  onClick={() => toggleLanguage(lang)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 border transition-all ${
                    isSelected
                      ? "bg-slate-800 text-indigo-300 border-indigo-500/60 shadow-sm shadow-indigo-500/20"
                      : "bg-slate-900/80 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-slate-300"
                  }`}
                >
                  <span
                    className={`w-2 h-2 rounded-full ${
                      isSelected ? "bg-indigo-400" : "bg-slate-600"
                    }`}
                  />
                  {lang}
                </button>
              );
            })}
          </div>
        </div>

        {/* Hardware (HDL) Languages */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <label className="text-sm font-semibold text-slate-200">
              {isTr ? "Donanım Tanımlama Dilleri (HDL)" : "Hardware Description Languages (HDL)"}
            </label>
            <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-cyan-950/80 text-cyan-400 border border-cyan-800/60">
              Synthesis & Timing
            </span>
          </div>
          <div className="flex flex-wrap gap-2.5">
            {HARDWARE_LANGS.map((lang) => {
              const isSelected = data.languages.includes(lang);
              return (
                <button
                  key={lang}
                  type="button"
                  onClick={() => toggleLanguage(lang)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 border transition-all ${
                    isSelected
                      ? "bg-slate-800 text-cyan-300 border-cyan-500/60 shadow-sm shadow-cyan-500/20"
                      : "bg-slate-900/80 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-slate-300"
                  }`}
                >
                  <span
                    className={`w-2 h-2 rounded-full ${
                      isSelected ? "bg-cyan-400" : "bg-slate-600"
                    }`}
                  />
                  {lang}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
