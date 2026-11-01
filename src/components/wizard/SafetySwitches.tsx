"use client";

import React from "react";
import { ShieldCheck } from "lucide-react";
import type { CodingLanguage, ProjectConstraints, WizardFormData } from "@/types/wizard";

type BoolKey = {
  [K in keyof ProjectConstraints]: ProjectConstraints[K] extends boolean ? K : never;
}[keyof ProjectConstraints];

interface SwitchDef {
  key: BoolKey;
  badge: string;
  badgeClass: string;
  languages: CodingLanguage[];
  titleTr: string;
  titleEn: string;
  descTr: string;
  descEn: string;
}

const AMBER = "text-amber-400 bg-amber-950/60 border-amber-800/60";
const BLUE = "text-blue-400 bg-blue-950/60 border-blue-800/60";
const YELLOW = "text-yellow-400 bg-yellow-950/60 border-yellow-800/60";
const PURPLE = "text-purple-400 bg-purple-950/60 border-purple-800/60";
const CYAN = "text-cyan-300 bg-cyan-950/80 border-cyan-700/60";

const SWITCHES: SwitchDef[] = [
  {
    key: "rustNoUnsafe", badge: "Rust", badgeClass: AMBER, languages: ["Rust"],
    titleTr: "Unsafe Blok Yasağı", titleEn: "Ban unsafe Blocks",
    descTr: "Yapay zekanın bellek yönetiminde unsafe bloklarına kaçmasını yasaklar.",
    descEn: "Strictly forbids AI from taking shortcuts with unsafe blocks in Rust.",
  },
  {
    key: "rustLimitClone", badge: "Rust", badgeClass: AMBER, languages: ["Rust"],
    titleTr: "Gereksiz .clone() Kısıtı", titleEn: "Restrict Unnecessary .clone()",
    descTr: "Performans israfını önler; borrow checker mekanizmalarını zorlar (denetçide uyarı).",
    descEn: "Enforces ownership & borrowing instead of wasteful .clone() calls (checker warning).",
  },
  {
    key: "tsNoAny", badge: "TypeScript", badgeClass: BLUE, languages: ["TypeScript"],
    titleTr: "No `any` Tipi Yasağı", titleEn: "No `any` Type",
    descTr: "`any` veri tipi kullanımını tamamen engeller; katı tipleri zorunlu tutar.",
    descEn: "Zero tolerance for 'any' types; enforces explicit interfaces and types.",
  },
  {
    key: "pyTypeHints", badge: "Python", badgeClass: YELLOW, languages: ["Python"],
    titleTr: "Type Hint Zorunluluğu", titleEn: "Mandatory Type Hints",
    descTr: "Tüm fonksiyon parametreleri ve dönüş tipleri için tip ipucu zorunludur.",
    descEn: "All function parameters and return types must be annotated.",
  },
  {
    key: "pyNoGlobalState", badge: "Python", badgeClass: YELLOW, languages: ["Python"],
    titleTr: "Global Değişken & import * Yasağı", titleEn: "No Globals & Wildcard Imports",
    descTr: "`global` değişkenleri ve `from module import *` kullanımını yasaklar.",
    descEn: "Bans `global` variables and `from module import *` wildcards.",
  },
  {
    key: "cppNoRawPointers", badge: "C++", badgeClass: PURPLE, languages: ["C++"],
    titleTr: "Ham İşaretçi (Raw Pointer) Yasağı", titleEn: "Raw Pointer Ban",
    descTr: "Manuel `new`/`delete` ve `reinterpret_cast` yerine smart pointer ve güvenli cast ister.",
    descEn: "Replaces manual new/delete and reinterpret_cast with smart pointers and safe casts.",
  },
  {
    key: "goCheckErrors", badge: "Go", badgeClass: CYAN, languages: ["Go"],
    titleTr: "Hata Denetim (Err) Zorunluluğu", titleEn: "Explicit Error Checks",
    descTr: "`_` ile hata göz ardı etmeyi yasaklar; açık hata kontrolü ve goroutine koruması ister.",
    descEn: "Forbids ignoring err with `_`; enforces explicit error checks and goroutine safety.",
  },
  {
    key: "hdlAssignmentRules", badge: "Verilog & VHDL", badgeClass: CYAN, languages: ["Verilog", "VHDL"],
    titleTr: "Non-blocking (<=) / Blocking (=) Ayrımı", titleEn: "Non-blocking (<=) / Blocking (=) Separation",
    descTr: "Ardışıl devrelerde `<=`, kombinasyonel devrelerde `=` zorunlu; VHDL'de yalnızca `ieee.numeric_std`.",
    descEn: "`<=` for sequential and `=` for combinational logic; VHDL must use `ieee.numeric_std` only.",
  },
  {
    key: "hdlLatchPrevention", badge: "Verilog & VHDL", badgeClass: CYAN, languages: ["Verilog", "VHDL"],
    titleTr: "Mandal (Latch) Önleme", titleEn: "Latch Prevention",
    descTr: "Kombinasyonel `case/if` bloklarında `default` ve eksiksiz duyarlılık listesi zorunludur.",
    descEn: "Combinational `case/if` blocks need a `default` and complete sensitivity lists.",
  },
];

interface Props {
  data: WizardFormData;
  isTr: boolean;
  onToggle: (key: BoolKey, value: boolean) => void;
}

/** Language-specific safety switches of step 2. Switches for unselected languages are inactive. */
export const SafetySwitches: React.FC<Props> = ({ data, isTr, onToggle }) => (
  <div>
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-2">
        <ShieldCheck className="w-5 h-5 text-indigo-400" />
        <h3 className="text-sm font-semibold text-white">
          {isTr ? "Dile Özel Güvenlik Anahtarları" : "Language-Specific Safety Gates"}
        </h3>
      </div>
      <span className="text-xs text-slate-500">
        {isTr ? "Yalnızca seçili dillerin kuralları pakete girer" : "Only rules of selected languages are exported"}
      </span>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {SWITCHES.map((s) => {
        const relevant = s.languages.some((l) => data.languages.includes(l));
        const checked = data.constraints[s.key];
        return (
          <label
            key={s.key}
            className={`p-4 rounded-xl border transition-all cursor-pointer ${
              relevant ? "bg-slate-900/90 border-slate-700" : "bg-slate-950/40 border-slate-800/50 opacity-60"
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`text-xs font-mono font-bold px-1.5 py-0.5 rounded border ${s.badgeClass}`}>{s.badge}</span>
                  <span className="text-sm font-semibold text-white">{isTr ? s.titleTr : s.titleEn}</span>
                  {!relevant && (
                    <span className="text-[10px] text-slate-500">
                      {isTr ? "(dil seçili değil)" : "(language not selected)"}
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-400 mt-2">{isTr ? s.descTr : s.descEn}</p>
              </div>
              <input
                type="checkbox"
                checked={checked}
                onChange={(e) => onToggle(s.key, e.target.checked)}
                className="w-5 h-5 rounded border-slate-700 text-indigo-600 focus:ring-indigo-500 bg-slate-800 cursor-pointer mt-1 shrink-0"
              />
            </div>
          </label>
        );
      })}
    </div>
  </div>
);
