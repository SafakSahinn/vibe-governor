"use client";

import React from "react";
import { AutomationOptions, WizardFormData } from "@/types/wizard";
import { Terminal, GitBranch, ShieldAlert, Cpu, FileQuestion, Check } from "lucide-react";

interface Step4Props {
  data: WizardFormData;
  updateData: (fields: Partial<WizardFormData>) => void;
}

export const Step4Automation: React.FC<Step4Props> = ({ data, updateData }) => {
  const isTr = data.locale === "tr";
  const { automation } = data;

  // The hook and the CI workflow both execute scripts/check_guidelines.py, so they
  // cannot exist without it: enabling them enables the checker, disabling the checker disables them.
  const toggleOption = (key: keyof AutomationOptions) => {
    const next: AutomationOptions = { ...automation, [key]: !automation[key] };
    if ((key === "includePreCommitHook" || key === "includeGitHubCI") && next[key]) {
      next.includeCheckGuidelines = true;
    }
    if (key === "includeCheckGuidelines" && !next.includeCheckGuidelines) {
      next.includePreCommitHook = false;
      next.includeGitHubCI = false;
    }
    updateData({ automation: next });
  };

  const automations: {
    key: keyof AutomationOptions;
    titleTr: string;
    titleEn: string;
    targetPath: string;
    descTr: string;
    descEn: string;
    icon: React.ReactNode;
    badge: string;
  }[] = [
    {
      key: "includeCheckGuidelines",
      titleTr: "Statik AI Denetçi Betiği",
      titleEn: "Static AI Guidelines Checker",
      targetPath: "scripts/check_guidelines.py",
      descTr:
        `Tüm kod tabanını tarar; ${data.constraints.maxLines} satır sınırını ve yalnızca seçtiğiniz dillerin kurallarını (Rust unsafe, TS any, Python tip ipuçları, C++ ham new, Go hata kontrolü, Verilog atama/latch, VHDL numeric_std) denetler.`,
      descEn:
        `Scans line counts (max ${data.constraints.maxLines}), Memory Bank completeness and only the rules of your selected languages (Rust unsafe, TS any, Python hints, C++ raw new, Go errors, Verilog assignment/latch, VHDL numeric_std).`,
      icon: <Terminal className="w-5 h-5 text-indigo-400" />,
      badge: "Python 3.12+",
    },
    {
      key: "includePreCommitHook",
      titleTr: "Git Pre-Commit Engelleyici Kanca",
      titleEn: "Git Pre-Commit Blocking Hook",
      targetPath: "scripts/pre-commit-hook.sh",
      descTr:
        "Commit yapmadan önce otomatik denetçiyi çalıştırır. Kural ihlali varsa commit işlemini durdurur.",
      descEn:
        "Blocks git commit if AI guidelines or line limit rules are violated.",
      icon: <GitBranch className="w-5 h-5 text-emerald-400" />,
      badge: "Bash / Git Hook",
    },
    {
      key: "includeGitHubCI",
      titleTr: "GitHub Actions CI/CD Entegrasyonu",
      titleEn: "GitHub Actions CI/CD Integration",
      targetPath: ".github/workflows/ai-guidelines-ci.yml",
      descTr:
        "Push ve Pull Request tetiklendiğinde otomatik kontrol koşturur. Hatalı PR birleştirmelerini önler.",
      descEn:
        "Runs automated checks on push & pull requests to prevent merging non-compliant code.",
      icon: <Cpu className="w-5 h-5 text-cyan-400" />,
      badge: "GitHub Actions",
    },
    {
      key: "includeAuditPrompt",
      titleTr: "Frontier Model Periyodik Denetim İstemi",
      titleEn: "Frontier Model Periodic Audit Prompt",
      targetPath: "AUDIT_PROMPT.md",
      descTr:
        "Claude Opus/Sonnet ve GPT-4o gibi modeller için kodu değiştirmeden teknik borç raporu çıkarma promptu (TR + EN).",
      descEn:
        "Prompt template for periodic technical debt and spaghetti code scans with frontier LLMs.",
      icon: <FileQuestion className="w-5 h-5 text-amber-400" />,
      badge: "Prompt Engineering",
    },
    {
      key: "includeGitignore",
      titleTr: "Memory Bank Korumalı .gitignore",
      titleEn: "Memory Bank-Safe .gitignore",
      targetPath: ".gitignore",
      descTr:
        "Geçici denetim raporlarını ve geçici dosyaları dışlar, ancak `.memory_bank/` dosyalarını zorunlu olarak git takibinde tutar.",
      descEn:
        "Excludes temporary audit files while explicitly tracking `.memory_bank/` files.",
      icon: <ShieldAlert className="w-5 h-5 text-rose-400" />,
      badge: "Git Config",
    },
  ];

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Step Header */}
      <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <span>{isTr ? "4. Otomasyon ve Denetçi Betikleri" : "4. Automation & Auditor Scripts"}</span>
        </h2>
        <p className="text-sm text-slate-400 mt-1">
          {isTr
            ? "Yapay zekanın koyduğunuz kurallara sadık kalmasını garanti altına alan yerel ve CI/CD denetim araçları."
            : "Enforce persistent adherence with automated local hooks and continuous integration checks."}
        </p>
      </div>

      {/* Automations List */}
      <div className="space-y-4">
        {automations.map((item) => {
          const isSelected = Boolean(automation[item.key]);
          return (
            <div
              key={item.key}
              onClick={() => toggleOption(item.key)}
              className={`p-4 rounded-xl border cursor-pointer transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                isSelected
                  ? "bg-indigo-950/30 border-indigo-500/50 ring-1 ring-indigo-500/30 shadow-md"
                  : "bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900"
              }`}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`p-2.5 rounded-xl border mt-0.5 ${
                    isSelected
                      ? "bg-indigo-900/50 border-indigo-700/50"
                      : "bg-slate-800/60 border-slate-700/50"
                  }`}
                >
                  {item.icon}
                </div>

                <div>
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <h3 className="text-sm font-semibold text-white">{isTr ? item.titleTr : item.titleEn}</h3>
                    <span className="text-[11px] font-mono text-slate-400 bg-slate-800/80 px-2 py-0.5 rounded border border-slate-700/60">
                      {item.targetPath}
                    </span>
                    <span className="text-[10px] font-mono text-indigo-400 bg-indigo-950/80 px-2 py-0.5 rounded border border-indigo-800/60">
                      {item.badge}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1.5 leading-relaxed max-w-2xl">
                    {isTr ? item.descTr : item.descEn}
                  </p>
                </div>
              </div>

              <div className="shrink-0 self-end sm:self-center">
                <div
                  className={`w-6 h-6 rounded-lg flex items-center justify-center border transition-all ${
                    isSelected
                      ? "bg-indigo-600 border-indigo-500 text-white"
                      : "border-slate-700 bg-slate-800/50"
                  }`}
                >
                  {isSelected && <Check className="w-4 h-4 stroke-[3]" />}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
