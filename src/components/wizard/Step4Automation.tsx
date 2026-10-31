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

  const toggleOption = (key: keyof AutomationOptions) => {
    updateData({
      automation: {
        ...automation,
        [key]: !automation[key],
      },
    });
  };

  const automations: {
    key: keyof AutomationOptions;
    title: string;
    targetPath: string;
    descTr: string;
    descEn: string;
    icon: React.ReactNode;
    badge: string;
  }[] = [
    {
      key: "includeCheckGuidelines",
      title: "Statik AI Denetçi Betiği",
      targetPath: "scripts/check_guidelines.py",
      descTr:
        "Tüm kod tabanını tarar; 800 satır sınırını, Rust unsafe, TS any, C++ ham new ve Python import * ihlallerini anında yakalar.",
      descEn:
        "Python script that scans line counts, detects unsafe/any usages, and verifies Memory Bank completeness.",
      icon: <Terminal className="w-5 h-5 text-indigo-400" />,
      badge: "Python 3.12+",
    },
    {
      key: "includePreCommitHook",
      title: "Git Pre-Commit Engelleyici Kanca",
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
      title: "GitHub Actions CI/CD Entegrasyonu",
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
      title: "Frontier Model Periyodik Denetim İstemi",
      targetPath: "AUDIT_PROMPT.md",
      descTr:
        "Claude 3.5/3.7 Sonnet, Opus ve GPT-4o modelleri için sıfır-kod-değişikliği ile teknik borç raporu çıkarma promptu.",
      descEn:
        "Prompt template for periodic technical debt and spaghetti code scans with frontier LLMs.",
      icon: <FileQuestion className="w-5 h-5 text-amber-400" />,
      badge: "Prompt Engineering",
    },
    {
      key: "includeGitignore",
      title: "Memory Bank Korumalı .gitignore",
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
                    <h3 className="text-sm font-semibold text-white">{item.title}</h3>
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
