"use client";

import React, { useState } from "react";
import { useUiLocale } from "./UiLocale";
import { MemoryBankData, WizardFormData } from "@/types/wizard";
import { AUTO_MEMORY_FIELDS, type AutoMemory, type AutoMemoryField } from "@/lib/autoFill";
import { FileText, Sparkles, RotateCcw, FolderArchive, Layers, Wrench, Focus, BarChart3 } from "lucide-react";

interface Step3Props {
  data: WizardFormData;
  autoMemory: AutoMemory;
  updateData: (fields: Partial<WizardFormData>) => void;
  projectNameError?: string;
}

type TabKey = keyof Omit<MemoryBankData, "projectName">;

export const Step3MemoryBank: React.FC<Step3Props> = ({ data, autoMemory, updateData, projectNameError }) => {
  const { isTr } = useUiLocale();
  const { memoryBank } = data;
  const [activeTab, setActiveTab] = useState<TabKey>("projectBrief");

  const updateMemoryBank = <K extends keyof MemoryBankData>(
    key: K,
    value: MemoryBankData[K]
  ) => {
    updateData({
      memoryBank: {
        ...memoryBank,
        [key]: value,
      },
    });
  };

  const isAutoField = (key: TabKey): key is AutoMemoryField => (AUTO_MEMORY_FIELDS as readonly string[]).includes(key);

  /** Rewrites every derivable field from the current settings. */
  const handleAutoFill = () => {
    const next = { ...memoryBank };
    for (const f of AUTO_MEMORY_FIELDS) next[f] = autoMemory[f];
    updateData({ memoryBank: next });
  };

  const tabs: {
    key: TabKey;
    filename: string;
    labelTr: string;
    labelEn: string;
    icon: React.ReactNode;
    placeholderTr: string;
    placeholderEn: string;
  }[] = [
    {
      key: "projectBrief",
      filename: "projectbrief.md",
      labelTr: "Proje Özeti",
      labelEn: "Project Brief",
      icon: <FileText className="w-4 h-4 text-indigo-400" />,
      placeholderTr: "Projenin ana varlık nedeni, vizyonu ve çekirdek hedefleri...",
      placeholderEn: "Primary vision, core purpose and key milestones...",
    },
    {
      key: "productContext",
      filename: "productContext.md",
      labelTr: "Ürün Bağlamı",
      labelEn: "Product Context",
      icon: <FolderArchive className="w-4 h-4 text-blue-400" />,
      placeholderTr: "Çözülen problem, kullanıcı deneyimi ve temel beklentiler...",
      placeholderEn: "Problem being solved, user experience and functional expectations...",
    },
    {
      key: "systemPatterns",
      filename: "systemPatterns.md",
      labelTr: "Sistem Desenleri",
      labelEn: "System Patterns",
      icon: <Layers className="w-4 h-4 text-purple-400" />,
      placeholderTr: "Mimari desenler, modül hiyerarşisi ve veri akış yapısı...",
      placeholderEn: "Architectural patterns, component hierarchy and data flow...",
    },
    {
      key: "techContext",
      filename: "techContext.md",
      labelTr: "Teknoloji Yığını",
      labelEn: "Tech Context",
      icon: <Wrench className="w-4 h-4 text-emerald-400" />,
      placeholderTr: "Diller, bağımlılıklar, derleme/çalıştırma komutları...",
      placeholderEn: "Languages, dependencies, build/test commands and constraints...",
    },
    {
      key: "activeContext",
      filename: "activeContext.md",
      labelTr: "Aktif Oturum",
      labelEn: "Active Context",
      icon: <Focus className="w-4 h-4 text-amber-400" />,
      placeholderTr: "Mevcut odak noktası, son değişiklikler ve sonraki adımlar...",
      placeholderEn: "Current development focus, recent changes and immediate next steps...",
    },
    {
      key: "progress",
      filename: "progress.md",
      labelTr: "İlerleme & Borç",
      labelEn: "Progress & Debt",
      icon: <BarChart3 className="w-4 h-4 text-rose-400" />,
      placeholderTr: "Tamamlanan modüller, mevcut çalışma durumu ve teknik borçlar...",
      placeholderEn: "Completed modules, working status and known technical debts...",
    },
  ];

  const currentTabConfig = tabs.find((t) => t.key === activeTab)!;

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Step Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-slate-900/90 border border-slate-800">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <span>{isTr ? "3. Memory Bank Formu (6 Çekirdek Dosya)" : "3. Memory Bank Form (6 Core Files)"}</span>
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            {isTr
              ? "Önceki adımlardan çıkarılabilen alanlar otomatik dolduruldu; dilediğiniz alanı elle düzenleyip ekleme yapabilirsiniz."
              : "Fields that follow from the previous steps are filled in automatically; edit or extend any of them by hand."}
          </p>
        </div>

        <button
          type="button"
          onClick={handleAutoFill}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-950/80 hover:bg-indigo-900 text-indigo-300 border border-indigo-700/60 text-xs font-semibold transition-all self-start sm:self-auto shadow-sm"
        >
          <Sparkles className="w-4 h-4" />
          <span>{isTr ? "Ayarlardan Yeniden Doldur" : "Refill from Settings"}</span>
        </button>
      </div>

      {/* Project Name Field */}
      <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800">
        <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-2">
          {isTr ? "Proje Adı (Project Name)" : "Project Name"}
        </label>
        <input
          type="text"
          value={memoryBank.projectName}
          onChange={(e) => updateMemoryBank("projectName", e.target.value)}
          placeholder={isTr ? "Örn: my-awesome-project" : "e.g., my-awesome-project"}
          aria-invalid={Boolean(projectNameError)}
          className={`w-full bg-slate-950 border rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:ring-1 ${
            projectNameError
              ? "border-rose-600 focus:border-rose-500 focus:ring-rose-500"
              : "border-slate-800 focus:border-indigo-500 focus:ring-indigo-500"
          }`}
        />
        {projectNameError && <p className="mt-2 text-xs text-rose-400">{projectNameError}</p>}
      </div>

      {/* Tabs & Editor Container */}
      <div className="border border-slate-800 rounded-2xl bg-slate-900/60 overflow-hidden">
        {/* Tab Buttons */}
        <div className="flex flex-wrap border-b border-slate-800 bg-slate-950/80 p-1.5 gap-1">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.key;
            const hasContent = Boolean(memoryBank[tab.key]?.trim());
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                  isActive
                    ? "bg-slate-800 text-white shadow-sm border border-slate-700"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-900"
                }`}
              >
                {tab.icon}
                <span>{isTr ? tab.labelTr : tab.labelEn}</span>
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    hasContent ? "bg-emerald-400" : "bg-slate-600"
                  }`}
                />
              </button>
            );
          })}
        </div>

        {/* Tab Content Active Area */}
        <div className="p-5 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-indigo-400 bg-indigo-950/60 px-2.5 py-1 rounded-md border border-indigo-800/60">
                .memory_bank/{currentTabConfig.filename}
              </span>
              <span className="text-xs text-slate-400">
                ({isTr ? currentTabConfig.labelTr : currentTabConfig.labelEn})
              </span>
            </div>
            <span className="text-[11px] text-slate-500 font-mono">
              {(memoryBank[activeTab] || "").length} / 5000 {isTr ? "karakter" : "chars"}
            </span>
          </div>

          <AutoStatus
            isTr={isTr}
            auto={isAutoField(activeTab) ? autoMemory[activeTab] : null}
            value={memoryBank[activeTab]}
            onRestore={() => isAutoField(activeTab) && updateMemoryBank(activeTab, autoMemory[activeTab])}
          />

          <textarea
            rows={7}
            value={memoryBank[activeTab]}
            onChange={(e) => updateMemoryBank(activeTab, e.target.value)}
            placeholder={isTr ? currentTabConfig.placeholderTr : currentTabConfig.placeholderEn}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 font-mono resize-y"
          />
        </div>
      </div>
    </div>
  );
};

interface AutoStatusProps {
  isTr: boolean;
  /** Derived text for this field, or null when the field cannot be derived. */
  auto: string | null;
  value: string;
  onRestore: () => void;
}

/** Tells whether the active field holds the derived text, was edited, or must be written by hand. */
const AutoStatus: React.FC<AutoStatusProps> = ({ isTr, auto, value, onRestore }) => {
  if (auto === null || auto === "") {
    return (
      <p className="text-xs text-slate-500">
        {isTr
          ? "Bu alan projenize özgü olduğu için ayarlardan çıkarılamaz; kendiniz yazın."
          : "This field is specific to your project and cannot be derived from the settings; write it yourself."}
      </p>
    );
  }
  if (value === auto) {
    return (
      <p className="text-xs text-emerald-400 flex items-center gap-1.5">
        <Sparkles className="w-3.5 h-3.5" />
        {isTr
          ? "Önceki adımlardaki seçimlerden otomatik dolduruldu; ayarlar değişince güncellenir. Düzenlerseniz metniniz korunur."
          : "Filled in from your earlier choices and kept in sync with them. Once you edit it, your text is kept."}
      </p>
    );
  }
  return (
    <p className="text-xs text-slate-400 flex items-center gap-2 flex-wrap">
      <span>{isTr ? "Elle düzenlendi; ayarlar değişse de korunur." : "Edited by hand; kept even if the settings change."}</span>
      <button type="button" onClick={onRestore} className="inline-flex items-center gap-1 text-indigo-300 hover:text-indigo-200 underline-offset-2 hover:underline">
        <RotateCcw className="w-3 h-3" />
        {isTr ? "Otomatik metne dön" : "Restore automatic text"}
      </button>
    </p>
  );
};
