"use client";

import React from "react";
import { useUiLocale } from "./UiLocale";
import { checkboxCardProps, FOCUS_RING } from "./a11y";
import { HDL_LANGUAGES, SOFTWARE_LANGUAGES } from "@/lib/schema";
import { CodingLanguage, TargetPlatform, WizardFormData } from "@/types/wizard";
import { Bot, Terminal, Code2, Wind, Cpu, Sparkles, Check, FileText, Gem } from "lucide-react";
import { PLATFORM_FILES } from "@/lib/templates/ideRules";

interface Step1Props {
  data: WizardFormData;
  updateData: (fields: Partial<WizardFormData>) => void;
}

const PLATFORMS: {
  id: TargetPlatform;
  name: string;
  descTr: string;
  descEn: string;
  icon: React.ReactNode;
}[] = [
  {
    id: "AGENTS_MD",
    name: "AGENTS.md (Standard)",
    descTr: "Açık standart: Codex, Jules, Aider, Zed, Junie, Amp, Devin ve 20+ araç okur. Cursor, Windsurf ve Copilot da destekler.",
    descEn: "Open standard read by Codex, Jules, Aider, Zed, Junie, Amp, Devin and 20+ tools; Cursor, Windsurf and Copilot support it too.",
    icon: <FileText className="w-5 h-5 text-indigo-300" />,
  },
  {
    id: "CLAUDE_CLI",
    name: "Claude Code",
    descTr: "Terminal ve IDE'deki Claude Code oturumlarında otomatik yüklenir.",
    descEn: "Loaded automatically in Claude Code sessions (terminal and IDE).",
    icon: <Terminal className="w-5 h-5 text-amber-400" />,
  },
  {
    id: "GEMINI_CLI",
    name: "Gemini CLI",
    descTr: "Gemini CLI her istemde proje kökündeki GEMINI.md dosyasını bağlama ekler.",
    descEn: "Gemini CLI adds the project-root GEMINI.md to every prompt.",
    icon: <Gem className="w-5 h-5 text-sky-300" />,
  },
  {
    id: "ANTIGRAVITY",
    name: "Google Antigravity",
    descTr: "Antigravity çalışma alanı kuralları (.agents/rules). AGENTS.md ve GEMINI.md'yi de okur.",
    descEn: "Antigravity workspace rules (.agents/rules). It also reads AGENTS.md and GEMINI.md.",
    icon: <Sparkles className="w-5 h-5 text-indigo-400" />,
  },
  {
    id: "CURSOR",
    name: "Cursor",
    descTr: "Güncel proje kuralı biçimi (.mdc, alwaysApply). Eski .cursorrules yerine.",
    descEn: "Current project-rule format (.mdc, alwaysApply), replacing legacy .cursorrules.",
    icon: <Code2 className="w-5 h-5 text-cyan-400" />,
  },
  {
    id: "WINDSURF",
    name: "Windsurf / Devin",
    descTr: "Cascade için her zaman etkin kural (trigger: always_on). Eski .windsurfrules yerine.",
    descEn: "Always-on rule for Cascade (trigger: always_on), replacing legacy .windsurfrules.",
    icon: <Wind className="w-5 h-5 text-emerald-400" />,
  },
  {
    id: "CLINE",
    name: "Cline",
    descTr: "Cline'ın kural klasörü (.clinerules/). Tüm .md dosyalarını birleştirerek okur.",
    descEn: "Cline's rules folder (.clinerules/); all .md files in it are combined.",
    icon: <Bot className="w-5 h-5 text-purple-400" />,
  },
  {
    id: "GITHUB_COPILOT",
    name: "GitHub Copilot",
    descTr: "Depo genelindeki Copilot talimatları (sohbet, kod incelemesi, ajan).",
    descEn: "Repository-wide Copilot instructions (chat, code review, agent).",
    icon: <Cpu className="w-5 h-5 text-sky-400" />,
  },
];

type ProjectType = "software" | "hardware" | "mixed" | "none";

const SOFTWARE_LANGS: readonly CodingLanguage[] = SOFTWARE_LANGUAGES;
const HARDWARE_LANGS: readonly CodingLanguage[] = HDL_LANGUAGES;

export const Step1Platform: React.FC<Step1Props> = ({ data, updateData }) => {
  const { isTr } = useUiLocale();

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
      next = data.languages.filter((l) => l !== lang); // an empty selection is allowed

    } else {
      next = [...data.languages, lang];
    }
    updateData({ languages: next });
  };

  const isHdl = (l: CodingLanguage) => HARDWARE_LANGS.includes(l);
  const selectedSw = data.languages.filter((l) => !isHdl(l));
  const selectedHdl = data.languages.filter(isHdl);
  const projectType: ProjectType =
    selectedSw.length && selectedHdl.length ? "mixed" : selectedHdl.length ? "hardware" : selectedSw.length ? "software" : "none";

  /** Quick project-type choice: keeps the user's picks of the kept group, adds a sensible default when empty. */
  const applyProjectType = (type: ProjectType) => {
    const sw = selectedSw.length ? selectedSw : (["TypeScript"] as CodingLanguage[]);
    const hdl = selectedHdl.length ? selectedHdl : (["Verilog"] as CodingLanguage[]);
    const next = type === "software" ? sw : type === "hardware" ? hdl : type === "mixed" ? [...sw, ...hdl] : [];
    updateData({ languages: next });
  };

  const PROJECT_TYPES: { id: ProjectType; tr: string; en: string }[] = [
    { id: "software", tr: "Yazılım", en: "Software" },
    { id: "hardware", tr: "Donanım (HDL)", en: "Hardware (HDL)" },
    { id: "mixed", tr: "Karma", en: "Mixed" },
    { id: "none", tr: "Dil seçmeden", en: "No language" },
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header & Language Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-slate-900/90 border border-slate-800">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <span>{isTr ? "1. Dil ve Hedef AI Platform Seçimi" : "1. Language & Target AI Platform"}</span>
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            {isTr
              ? "Projenizde çalışacak yapay zeka asistanlarını ve kodlama dillerini belirleyin."
              : "Select the AI coding assistants and project languages for your repository."}
          </p>
        </div>

        {/* Output locale (language of the generated files) */}
        <div className="flex flex-col gap-1.5 self-start sm:self-auto">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
          {isTr ? "Üretilecek dosyaların dili" : "Language of generated files"}
        </span>
        <div className="flex items-center gap-1.5 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
          <button
            type="button"
            onClick={() => updateData({ locale: "tr" })}
            aria-pressed={data.locale === "tr"}
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
            aria-pressed={data.locale === "en"}
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
                {...checkboxCardProps(isSelected, () => togglePlatform(platform.id), `${platform.name} (${PLATFORM_FILES[platform.id]})`)}
                className={`${FOCUS_RING} relative cursor-pointer p-4 rounded-xl border transition-all duration-200 group flex flex-col justify-between ${
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
                        {PLATFORM_FILES[platform.id]}
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
        <div>
          <div className="flex items-center justify-between mb-3">
            <span id="project-type-label" className="text-sm font-semibold text-slate-200">
              {isTr ? "Proje Türü" : "Project Type"}
            </span>
            <span className="text-xs text-slate-500">
              {isTr ? "Dil seçimi isteğe bağlıdır" : "Language selection is optional"}
            </span>
          </div>
          <div className="flex flex-wrap gap-2" role="group" aria-labelledby="project-type-label">
            {PROJECT_TYPES.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => applyProjectType(t.id)}
                aria-pressed={projectType === t.id}
                className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 ${
                  projectType === t.id
                    ? "bg-indigo-600 text-white border-indigo-500"
                    : "bg-slate-900/80 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-slate-200"
                }`}
              >
                {isTr ? t.tr : t.en}
              </button>
            ))}
          </div>
          {projectType === "none" && (
            <p className="mt-3 text-xs text-slate-400 p-2.5 rounded-lg bg-slate-900/70 border border-slate-800">
              {isTr
                ? "Dil seçilmedi: yalnızca dilden bağımsız kurallar uygulanır (satır sınırı, Memory Bank, dokümantasyon ve test kuralları). Dile özel güvenlik anahtarları pakete girmez."
                : "No language selected: only language-independent rules apply (line limit, Memory Bank, documentation and test rules). Language-specific safety switches are not exported."}
            </p>
          )}
        </div>

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
                  aria-pressed={isSelected}
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
              {isTr ? "Sentez & Zamanlama" : "Synthesis & Timing"}
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
                  aria-pressed={isSelected}
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
