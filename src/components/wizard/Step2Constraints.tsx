"use client";

import React from "react";
import { ProjectConstraints, WizardFormData } from "@/types/wizard";
import { AlertTriangle, ShieldCheck, FileCode2, BookOpenCheck } from "lucide-react";

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

  const hasRust = data.languages.includes("Rust");
  const hasTS = data.languages.includes("TypeScript");
  const hasPy = data.languages.includes("Python");
  const hasCpp = data.languages.includes("C++");
  const hasGo = data.languages.includes("Go");
  const hasHDL = data.languages.includes("Verilog") || data.languages.includes("VHDL");

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
                <span>200 satır (Aşırı Katı)</span>
                <span className="text-indigo-400 font-bold">800 (Önerilen)</span>
                <span>1500 satır (Gevşek)</span>
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
                <span>5 (Temel)</span>
                <span className="text-emerald-400 font-bold">8 (Önerilen Baraj)</span>
                <span>10 (Kapsamlı JSDoc / Docstring)</span>
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

      {/* Language Specific Safety Switches */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-indigo-400" />
            <h3 className="text-sm font-semibold text-white">
              {isTr ? "Dile Özel Güvenlik Anahtarları" : "Language-Specific Safety Gates"}
            </h3>
          </div>
          <span className="text-xs text-slate-500">
            {isTr ? "Seçilen dillere göre otomatik önerilir" : "Recommended based on selected languages"}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Rust No-Unsafe */}
          <div
            className={`p-4 rounded-xl border transition-all ${
              hasRust ? "bg-slate-900/90 border-slate-700" : "bg-slate-950/40 border-slate-800/50 opacity-70"
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-amber-400 px-1.5 py-0.5 rounded bg-amber-950/60 border border-amber-800/60">
                    Rust
                  </span>
                  <span className="text-sm font-semibold text-white">Unsafe Blok Yasağı</span>
                </div>
                <p className="text-xs text-slate-400 mt-2">
                  {isTr
                    ? "Yapay zekanın bellek yönetiminde unsafe bloklarına kaçmasını yasaklar."
                    : "Strictly forbids AI from taking shortcuts with unsafe blocks in Rust."}
                </p>
              </div>
              <input
                type="checkbox"
                checked={constraints.rustNoUnsafe}
                onChange={(e) => updateConstraint("rustNoUnsafe", e.target.checked)}
                className="w-5 h-5 rounded border-slate-700 text-indigo-600 focus:ring-indigo-500 bg-slate-800 cursor-pointer mt-1"
              />
            </div>
          </div>

          {/* Rust Clone limit */}
          <div
            className={`p-4 rounded-xl border transition-all ${
              hasRust ? "bg-slate-900/90 border-slate-700" : "bg-slate-950/40 border-slate-800/50 opacity-70"
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-amber-400 px-1.5 py-0.5 rounded bg-amber-950/60 border border-amber-800/60">
                    Rust
                  </span>
                  <span className="text-sm font-semibold text-white">Gereksiz .clone() Kısıtı</span>
                </div>
                <p className="text-xs text-slate-400 mt-2">
                  {isTr
                    ? "Performans israfını önler; borrow checker mekanizmalarını zorlar."
                    : "Enforces proper ownership & borrowing instead of wasteful .clone() calls."}
                </p>
              </div>
              <input
                type="checkbox"
                checked={constraints.rustLimitClone}
                onChange={(e) => updateConstraint("rustLimitClone", e.target.checked)}
                className="w-5 h-5 rounded border-slate-700 text-indigo-600 focus:ring-indigo-500 bg-slate-800 cursor-pointer mt-1"
              />
            </div>
          </div>

          {/* TypeScript No Any */}
          <div
            className={`p-4 rounded-xl border transition-all ${
              hasTS ? "bg-slate-900/90 border-slate-700" : "bg-slate-950/40 border-slate-800/50 opacity-70"
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-blue-400 px-1.5 py-0.5 rounded bg-blue-950/60 border border-blue-800/60">
                    TypeScript
                  </span>
                  <span className="text-sm font-semibold text-white">No `any` Tipi Yasağı</span>
                </div>
                <p className="text-xs text-slate-400 mt-2">
                  {isTr
                    ? "`any` veri tipi kullanımını tamamen engeller; katı tipleri zorunlu tutar."
                    : "Zero tolerance for 'any' types; enforces explicit interfaces and types."}
                </p>
              </div>
              <input
                type="checkbox"
                checked={constraints.tsNoAny}
                onChange={(e) => updateConstraint("tsNoAny", e.target.checked)}
                className="w-5 h-5 rounded border-slate-700 text-indigo-600 focus:ring-indigo-500 bg-slate-800 cursor-pointer mt-1"
              />
            </div>
          </div>

          {/* Python Type Hints & No Globals */}
          <div
            className={`p-4 rounded-xl border transition-all ${
              hasPy ? "bg-slate-900/90 border-slate-700" : "bg-slate-950/40 border-slate-800/50 opacity-70"
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-yellow-400 px-1.5 py-0.5 rounded bg-yellow-950/60 border border-yellow-800/60">
                    Python
                  </span>
                  <span className="text-sm font-semibold text-white">Type Hints & Global Yasakları</span>
                </div>
                <p className="text-xs text-slate-400 mt-2">
                  {isTr
                    ? "Fonksiyonlarda tip ipuçlarını zorunlu tutar, `from module import *` kullanımını yasaklar."
                    : "Mandatory typing annotations; bans wildcard imports and global mutations."}
                </p>
              </div>
              <input
                type="checkbox"
                checked={constraints.pyTypeHints}
                onChange={(e) => updateConstraint("pyTypeHints", e.target.checked)}
                className="w-5 h-5 rounded border-slate-700 text-indigo-600 focus:ring-indigo-500 bg-slate-800 cursor-pointer mt-1"
              />
            </div>
          </div>

          {/* C++ No Raw Pointers */}
          <div
            className={`p-4 rounded-xl border transition-all ${
              hasCpp ? "bg-slate-900/90 border-slate-700" : "bg-slate-950/40 border-slate-800/50 opacity-70"
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-purple-400 px-1.5 py-0.5 rounded bg-purple-950/60 border border-purple-800/60">
                    C++
                  </span>
                  <span className="text-sm font-semibold text-white">Ham İşaretçi (Raw Pointer) Yasağı</span>
                </div>
                <p className="text-xs text-slate-400 mt-2">
                  {isTr
                    ? "Manuel `new`/`delete` yerine `std::unique_ptr` ve `std::shared_ptr` kullanımını şart koşar."
                    : "Replaces manual new/delete with RAII smart pointers (unique_ptr, shared_ptr)."}
                </p>
              </div>
              <input
                type="checkbox"
                checked={constraints.cppNoRawPointers}
                onChange={(e) => updateConstraint("cppNoRawPointers", e.target.checked)}
                className="w-5 h-5 rounded border-slate-700 text-indigo-600 focus:ring-indigo-500 bg-slate-800 cursor-pointer mt-1"
              />
            </div>
          </div>

          {/* Go Explicit Error Handling */}
          <div
            className={`p-4 rounded-xl border transition-all ${
              hasGo ? "bg-slate-900/90 border-slate-700" : "bg-slate-950/40 border-slate-800/50 opacity-70"
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-cyan-400 px-1.5 py-0.5 rounded bg-cyan-950/60 border border-cyan-800/60">
                    Go
                  </span>
                  <span className="text-sm font-semibold text-white">Hata Denetim (Err) Zorunluluğu</span>
                </div>
                <p className="text-xs text-slate-400 mt-2">
                  {isTr
                    ? "`_` ile hata göz ardı etmeyi yasaklar; açık hata kontrolü ve goroutine koruması ister."
                    : "Forbids ignoring err with `_`; enforces explicit error checks and goroutine safety."}
                </p>
              </div>
              <input
                type="checkbox"
                checked={constraints.goCheckErrors}
                onChange={(e) => updateConstraint("goCheckErrors", e.target.checked)}
                className="w-5 h-5 rounded border-slate-700 text-indigo-600 focus:ring-indigo-500 bg-slate-800 cursor-pointer mt-1"
              />
            </div>
          </div>

          {/* HDL (Verilog / VHDL) */}
          <div
            className={`md:col-span-2 p-4 rounded-xl border transition-all ${
              hasHDL ? "bg-cyan-950/30 border-cyan-700/60" : "bg-slate-950/40 border-slate-800/50 opacity-70"
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-cyan-300 px-1.5 py-0.5 rounded bg-cyan-950/80 border border-cyan-700/60">
                    Verilog & VHDL
                  </span>
                  <span className="text-sm font-semibold text-white">
                    {isTr
                      ? "Non-blocking (<=) / Blocking (=) Ayrımı ve Latch Önleme"
                      : "Non-blocking (<=) / Blocking (=) Separation & Latch Prevention"}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-2">
                  {isTr
                    ? "Ardışıl devrelerde `<=` ve kombinasyonel devrelerde `=` kuralını zorunlu tutar. Eksik `case/if` nedeniyle oluşabilecek mandalları (transparent latches) engeller."
                    : "Enforces strict assignment mechanics (non-blocking for sequential, blocking for combinational) and prevents unintended transparent latches."}
                </p>
              </div>
              <input
                type="checkbox"
                checked={constraints.hdlAssignmentRules}
                onChange={(e) => updateConstraint("hdlAssignmentRules", e.target.checked)}
                className="w-5 h-5 rounded border-cyan-700 text-cyan-500 focus:ring-cyan-500 bg-slate-800 cursor-pointer mt-1"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
