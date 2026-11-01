"use client";

import React from "react";
import { ProjectConstraints, WizardFormData } from "@/types/wizard";
import { AlertTriangle, FileCode2, BookOpenCheck } from "lucide-react";
import { SafetySwitches } from "./SafetySwitches";

interface Step2Props {
  data: WizardFormData;
  updateData: (fields: Partial<WizardFormData>) => void;
}

export const Step2Constraints: React.FC<Step2Props> = ({ data, updateData }) => {
  const isTr = data.locale === "tr";
  const { constraints } = data;

  const updateConstraint = <K extends keyof ProjectConstraints>(
    key: K,
    value: ProjectConstraints[K]
  ) => {
    updateData({
      constraints: {
        ...constraints,
        [key]: value,
      },
    });
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Step Header */}
      <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <span>{isTr ? "2. Mimari ve Kısıtlar Yapılandırması" : "2. Architecture & Constraint Settings"}</span>
        </h2>
        <p className="text-sm text-slate-400 mt-1">
          {isTr
            ? "Yapay zekanın spagetti koda sapmasını ve teknik borç üretmesini engelleyen kesin sınırları belirleyin."
            : "Define strict boundaries to prevent AI context degradation, code bloat, and technical debt."}
        </p>
      </div>

      {/* Core Numeric Constraints */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Max Line Limit */}
        <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-indigo-950/80 text-indigo-400 border border-indigo-800/50">
                  <FileCode2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white">
                    {isTr ? "Dosya Satır Sınırı (Max Lines)" : "File Line Limit (Max Lines)"}
                  </h3>
                  <p className="text-xs text-slate-400">
                    {isTr ? "Tek bir kaynak dosyasındaki tavan sınır" : "Hard ceiling for any single code file"}
                  </p>
                </div>
              </div>
              <span className="font-mono text-base font-bold text-indigo-400 px-3 py-1 rounded-lg bg-indigo-950/60 border border-indigo-800/60">
                {constraints.maxLines}
              </span>
            </div>

            <div className="mt-5 space-y-3">
              <input
                type="range"
                min="200"
                max="1500"
                step="50"
                value={constraints.maxLines}
                onChange={(e) => updateConstraint("maxLines", Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
              />
              <div className="flex justify-between text-[11px] text-slate-500 font-mono">
                <span>{isTr ? "200 satır (Aşırı Katı)" : "200 lines (Very strict)"}</span>
                <span className="text-indigo-400 font-bold">{isTr ? "800 (Önerilen)" : "800 (Recommended)"}</span>
                <span>{isTr ? "1500 satır (Gevşek)" : "1500 lines (Loose)"}</span>
              </div>
            </div>
          </div>

          {constraints.maxLines > 1000 && (
            <div className="mt-4 flex items-center gap-2 p-2.5 rounded-xl bg-amber-950/40 border border-amber-800/40 text-amber-300 text-xs">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>
                {isTr
                  ? "Uyarı: 1000 satır üzeri dosyalar AI modellerinde bağlam kaybına ve halüsinasyona yol açar."
                  : "Warning: Files over 1000 lines frequently trigger AI hallucination and context loss."}
              </span>
            </div>
          )}
        </div>

        {/* Documentation Quality Score */}
        <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-emerald-950/80 text-emerald-400 border border-emerald-800/50">
                  <BookOpenCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white">
                    {isTr ? "Dokümantasyon Puan Barajı" : "Documentation Score Threshold"}
                  </h3>
                  <p className="text-xs text-slate-400">
                    {isTr ? "Public metotlar ve yapılar için öz-puan" : "Self-evaluation score for public APIs"}
                  </p>
                </div>
              </div>
              <span className="font-mono text-base font-bold text-emerald-400 px-3 py-1 rounded-lg bg-emerald-950/60 border border-emerald-800/60">
                {constraints.docScoreThreshold} / 10
              </span>
            </div>

            <div className="mt-5 space-y-3">
              <input
                type="range"
                min="5"
                max="10"
                step="1"
                value={constraints.docScoreThreshold}
                onChange={(e) => updateConstraint("docScoreThreshold", Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
              <div className="flex justify-between text-[11px] text-slate-500 font-mono">
                <span>{isTr ? "5 (Temel)" : "5 (Basic)"}</span>
                <span className="text-emerald-400 font-bold">{isTr ? "8 (Önerilen Baraj)" : "8 (Recommended)"}</span>
                <span>{isTr ? "10 (Kapsamlı JSDoc / Docstring)" : "10 (Full JSDoc / Docstring)"}</span>
              </div>
            </div>
          </div>

          <div className="mt-4 p-2.5 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-400">
            {isTr
              ? "Yapay zeka asistanı, ürettiği her public fonksiyona açıklama ekleyecek ve kaliteyi denetleyecektir."
              : "The AI assistant must document public functions with comprehensive docstrings."}
          </div>
        </div>
      </div>

      <SafetySwitches data={data} isTr={isTr} onToggle={updateConstraint} />
    </div>
  );
};
