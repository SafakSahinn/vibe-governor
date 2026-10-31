"use client";

import React, { useState, useMemo } from "react";
import { WizardFormData } from "@/types/wizard";
import { generateProjectFiles } from "@/lib/templateEngine";
import { Stepper } from "./Stepper";
import { Step1Platform } from "./Step1Platform";
import { Step2Constraints } from "./Step2Constraints";
import { Step3MemoryBank } from "./Step3MemoryBank";
import { Step4Automation } from "./Step4Automation";
import { Step5Export } from "./Step5Export";
import { ArrowLeft, ArrowRight, ShieldAlert, Sparkles, CheckCircle2 } from "lucide-react";

const INITIAL_DATA: WizardFormData = {
  locale: "tr",
  targetPlatforms: ["ANTIGRAVITY", "CLAUDE_CLI", "CURSOR", "WINDSURF", "CLINE", "GITHUB_COPILOT"],
  languages: ["TypeScript", "Python", "Rust"],
  constraints: {
    maxLines: 800,
    docScoreThreshold: 8,
    rustNoUnsafe: true,
    rustLimitClone: true,
    tsNoAny: true,
    pyTypeHints: true,
    pyNoGlobalState: true,
    cppNoRawPointers: true,
    goCheckErrors: true,
    hdlAssignmentRules: true,
    hdlLatchPrevention: true,
  },
  memoryBank: {
    projectName: "Vibe-Master-App",
    projectBrief: "Büyük ölçekli, yüksek performanslı ve AI destekli modüler kurumsal yazılım platformu.",
    productContext: "Yapay zeka modellerinin uzun oturumlarda bağlam kaybı yaşamasını engellemek, geliştiriciye tavizsiz mimari rehberlik sunmak.",
    systemPatterns: "Modüler Crate / Clean Architecture. UI Katmanı, Core Logic ve Data Access birbirinden bağımsızdır.",
    techContext: "TypeScript, Python, Rust | Sıkı tip denetimi, 800 satır kuralı ve otomatik CI entegrasyonu.",
    activeContext: "Proje iskeletinin oluşturulması ve Memory Bank anayasa kural dosyasının yürürlüğe sokulması.",
    progress: "Temel mimari kararlaştırıldı. CI ve yerel pre-commit kancaları aktif hale getirildi.",
  },
  automation: {
    includeCheckGuidelines: true,
    includePreCommitHook: true,
    includeGitHubCI: true,
    includeAuditPrompt: true,
    includeGitignore: true,
  },
};

export const Wizard: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<WizardFormData>(INITIAL_DATA);

  const updateFormData = (fields: Partial<WizardFormData>) => {
    setFormData((prev) => ({ ...prev, ...fields }));
  };

  const isTr = formData.locale === "tr";
  const generatedFiles = useMemo(() => generateProjectFiles(formData), [formData]);

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      {/* Top Header & Brand */}
      <header className="mb-10 text-center relative">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-950/70 border border-indigo-700/50 text-indigo-300 text-xs font-semibold mb-4 backdrop-blur shadow-inner">
          <Sparkles className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
          <span>Vibe Governor v1.0 • Master AI Constitution Generator</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-3 bg-clip-text text-transparent bg-gradient-to-r from-white via-indigo-100 to-indigo-300">
          Vibe Governor Web Sihirbazı
        </h1>
        <p className="max-w-2xl mx-auto text-sm sm:text-base text-slate-400">
          {isTr
            ? "Yapay zeka destekli projelerde hafıza kaybını, 800 satır kuralı ihlallerini ve spagetti kod sapmalarını önleyin. Anayasa ve denetim araçlarınızı tek adımda üretin."
            : "Eliminate context drift, enforce modular 800-line architecture, and generate persistent Memory Bank configs in one unified wizard."}
        </p>
      </header>

      {/* Stepper Navigation */}
      <Stepper
        currentStep={currentStep}
        totalSteps={5}
        onStepClick={(step) => setCurrentStep(step)}
        locale={formData.locale}
      />

      {/* Step Content Area */}
      <main className="min-h-[500px]">
        {currentStep === 1 && (
          <Step1Platform data={formData} updateData={updateFormData} />
        )}
        {currentStep === 2 && (
          <Step2Constraints data={formData} updateData={updateFormData} />
        )}
        {currentStep === 3 && (
          <Step3MemoryBank data={formData} updateData={updateFormData} />
        )}
        {currentStep === 4 && (
          <Step4Automation data={formData} updateData={updateFormData} />
        )}
        {currentStep === 5 && (
          <Step5Export data={formData} files={generatedFiles} />
        )}
      </main>

      {/* Footer Navigation Bar */}
      <footer className="mt-10 pt-6 border-t border-slate-800/80 flex items-center justify-between">
        <button
          type="button"
          onClick={handleBack}
          disabled={currentStep === 1}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold border transition-all ${
            currentStep === 1
              ? "opacity-40 cursor-not-allowed border-slate-800 text-slate-600 bg-slate-900/50"
              : "border-slate-700 bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-white"
          }`}
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{isTr ? "Önceki Adım" : "Back"}</span>
        </button>

        <div className="flex items-center gap-3">
          {currentStep < 5 ? (
            <button
              type="button"
              onClick={handleNext}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-bold shadow-lg shadow-indigo-600/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>{isTr ? "Sonraki Adım" : "Next Step"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-4 py-2 rounded-xl">
              <CheckCircle2 className="w-4 h-4" />
              <span>{isTr ? "Tüm Adımlar Tamamlandı!" : "All Steps Configured!"}</span>
            </div>
          )}
        </div>
      </footer>
    </div>
  );
};
