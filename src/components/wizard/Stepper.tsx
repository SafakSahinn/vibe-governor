"use client";

import React from "react";
import { Check } from "lucide-react";

interface StepperProps {
  currentStep: number;
  totalSteps: number;
  onStepClick: (step: number) => void;
  locale: "tr" | "en";
}

const STEP_LABELS_TR = [
  { title: "Platform & Diller", desc: "Hedef AI ve Diller" },
  { title: "Kısıtlar & Kurallar", desc: "Satır ve Güvenlik Sınırları" },
  { title: "Memory Bank", desc: "6 Temel Bağlam Dosyası" },
  { title: "Otomasyon & CI", desc: "Denetçi ve Kancalar" },
  { title: "Ön İzleme & Dışa Aktar", desc: "Paket ve CLI Hub'ı" },
];

const STEP_LABELS_EN = [
  { title: "Platform & Languages", desc: "Target AI & Tooling" },
  { title: "Constraints & Rules", desc: "Line & Safety Limits" },
  { title: "Memory Bank", desc: "6 Core Context Docs" },
  { title: "Automation & CI", desc: "Auditor & Hooks" },
  { title: "Preview & Export", desc: "Zip & CLI Hub" },
];

export const Stepper: React.FC<StepperProps> = ({
  currentStep,
  totalSteps,
  onStepClick,
  locale,
}) => {
  const steps = locale === "tr" ? STEP_LABELS_TR : STEP_LABELS_EN;

  return (
    <div className="w-full mb-8">
      {/* Mobile step indicator */}
      <div className="flex md:hidden items-center justify-between bg-slate-900/80 backdrop-blur border border-slate-800 rounded-xl p-4 mb-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400">
            {locale === "tr" ? `ADIM ${currentStep} / ${totalSteps}` : `STEP ${currentStep} / ${totalSteps}`}
          </span>
          <h2 className="text-sm font-bold text-white mt-0.5">{steps[currentStep - 1].title}</h2>
        </div>
        <div className="text-xs text-slate-400">
          {Math.round((currentStep / totalSteps) * 100)}%
        </div>
      </div>

      {/* Desktop Stepper */}
      <div className="hidden md:flex items-center justify-between relative">
        <div className="absolute top-5 left-8 right-8 h-0.5 bg-slate-800 -z-0" />
        <div
          className="absolute top-5 left-8 h-0.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 transition-all duration-300 -z-0"
          style={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 92}%` }}
        />

        {steps.map((s, idx) => {
          const stepNumber = idx + 1;
          const isDone = stepNumber < currentStep;
          const isActive = stepNumber === currentStep;

          return (
            <button
              key={stepNumber}
              type="button"
              onClick={() => onStepClick(stepNumber)}
              aria-current={isActive ? "step" : undefined}
              className="flex flex-col items-center group relative z-10 focus:outline-none"
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 border-2 ${
                  isDone
                    ? "bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-600/30"
                    : isActive
                    ? "bg-slate-900 border-indigo-400 text-indigo-300 ring-4 ring-indigo-500/20 shadow-lg shadow-indigo-500/20 scale-110"
                    : "bg-slate-900 border-slate-800 text-slate-500 group-hover:border-slate-700 group-hover:text-slate-400"
                }`}
              >
                {isDone ? <Check className="w-4 h-4 stroke-[3]" /> : stepNumber}
              </div>
              <div className="mt-3 text-center">
                <p
                  className={`text-xs font-semibold transition-colors ${
                    isActive
                      ? "text-indigo-300"
                      : isDone
                      ? "text-slate-300"
                      : "text-slate-500"
                  }`}
                >
                  {s.title}
                </p>
                <p className="text-[10px] text-slate-500 hidden lg:block mt-0.5">{s.desc}</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
