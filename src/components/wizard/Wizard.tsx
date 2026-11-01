"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { useForm, useWatch, type FieldErrors, type FieldPath } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Sparkles, CheckCircle2, AlertTriangle, BookOpen, Languages } from "lucide-react";
import type { WizardFormData } from "@/types/wizard";
import { DEFAULT_FORM_DATA, wizardSchema } from "@/lib/schema";
import { generateProjectFiles } from "@/lib/templateEngine";
import { Stepper } from "./Stepper";
import { Step1Platform } from "./Step1Platform";
import { Step2Constraints } from "./Step2Constraints";
import { Step3MemoryBank } from "./Step3MemoryBank";
import { Step4Automation } from "./Step4Automation";
import { Step5Export } from "./Step5Export";
import { errorText } from "./i18n";
import { useUiLocale } from "./UiLocale";
import { GuideModal } from "./GuideModal";
import { Button } from "@/components/ui/button";

const INITIAL_DATA: WizardFormData = {
  ...DEFAULT_FORM_DATA,
  memoryBank: {
    projectName: "Vibe-Master-App",
    projectBrief: "Büyük ölçekli, yüksek performanslı ve AI destekli modüler kurumsal yazılım platformu.",
    productContext: "Yapay zeka modellerinin uzun oturumlarda bağlam kaybı yaşamasını engellemek, geliştiriciye tavizsiz mimari rehberlik sunmak.",
    systemPatterns: "Modüler Crate / Clean Architecture. UI Katmanı, Core Logic ve Data Access birbirinden bağımsızdır.",
    techContext: "TypeScript, Python, Rust | Sıkı tip denetimi, 800 satır kuralı ve otomatik CI entegrasyonu.",
    activeContext: "Proje iskeletinin oluşturulması ve Memory Bank anayasa kural dosyasının yürürlüğe sokulması.",
    progress: "Temel mimari kararlaştırıldı. CI ve yerel pre-commit kancaları aktif hale getirildi.",
  },
};

/** Fields validated before leaving each step. */
const STEP_FIELDS: Record<number, FieldPath<WizardFormData>[]> = {
  1: ["targetPlatforms", "languages"],
  2: ["constraints.maxLines", "constraints.docScoreThreshold"],
  3: [
    "memoryBank.projectName",
    "memoryBank.projectBrief",
    "memoryBank.productContext",
    "memoryBank.systemPatterns",
    "memoryBank.techContext",
    "memoryBank.activeContext",
    "memoryBank.progress",
  ],
  4: ["automation.includeCheckGuidelines"],
  5: [],
};

/** Collects the i18n error keys of the given field paths. */
function collectErrors(errors: FieldErrors<WizardFormData>, fields: FieldPath<WizardFormData>[]): string[] {
  const keys: string[] = [];
  for (const field of fields) {
    let node: unknown = errors;
    for (const part of field.split(".")) {
      node = node && typeof node === "object" ? (node as Record<string, unknown>)[part] : undefined;
    }
    const message = node && typeof node === "object" ? (node as { message?: unknown }).message : undefined;
    if (typeof message === "string" && !keys.includes(message)) keys.push(message);
  }
  return keys;
}

export const Wizard: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const {
    control,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<WizardFormData>({
    resolver: zodResolver(wizardSchema),
    defaultValues: INITIAL_DATA,
    mode: "onChange",
  });

  // Full form state; defaults fill every field, so the value is always complete.
  const formData = useWatch({ control }) as WizardFormData;
  const { locale: uiLocale, isTr, setLocale: setUiLocale } = useUiLocale();
  const [guideOpen, setGuideOpen] = useState(false);
  // The output language follows the interface language until the user picks one in step 1.
  const outputLocaleTouched = useRef(false);
  useEffect(() => {
    if (!outputLocaleTouched.current) setValue("locale", uiLocale);
  }, [uiLocale, setValue]);
  const formKey = JSON.stringify(formData);
  const generatedFiles = useMemo(() => generateProjectFiles(JSON.parse(formKey) as WizardFormData), [formKey]);

  const updateFormData = (fields: Partial<WizardFormData>) => {
    if (fields.locale !== undefined) outputLocaleTouched.current = true;
    (Object.keys(fields) as (keyof WizardFormData)[]).forEach((key) => {
      // setValue's path generics cannot correlate key and value types in a loop.
      setValue(key, fields[key] as never, { shouldValidate: true, shouldDirty: true });
    });
  };

  const stepErrors = collectErrors(errors, STEP_FIELDS[currentStep] ?? []);

  const goTo = async (target: number) => {
    if (target === currentStep) return;
    if (target > currentStep) {
      for (let s = currentStep; s < target; s++) {
        const ok = await trigger(STEP_FIELDS[s]);
        if (!ok) {
          setCurrentStep(s);
          return;
        }
      }
    }
    setCurrentStep(target);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex items-center justify-end gap-2 mb-6">
        <Button variant="outline" size="sm" onClick={() => setGuideOpen(true)}>
          <BookOpen className="text-indigo-400" />
          <span>{isTr ? "Rehber" : "Guide"}</span>
        </Button>
        <div
          className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800"
          role="group"
          aria-label={isTr ? "Arayüz dili" : "Interface language"}
        >
          <Languages className="w-4 h-4 text-slate-500 mx-1" />
          {(["tr", "en"] as const).map((l) => (
            <button
              key={l}
              type="button"
              onClick={() => setUiLocale(l)}
              aria-pressed={uiLocale === l}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                uiLocale === l ? "bg-indigo-600 text-white" : "text-slate-400 hover:text-slate-200"
              }`}
            >
              {l.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <GuideModal open={guideOpen} onClose={() => setGuideOpen(false)} />

      <header className="mb-10 text-center relative">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-950/70 border border-indigo-700/50 text-indigo-300 text-xs font-semibold mb-4 backdrop-blur shadow-inner">
          <Sparkles className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
          <span>Vibe Governor v1.2 • Master AI Constitution Generator</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-3 bg-clip-text text-transparent bg-gradient-to-r from-white via-indigo-100 to-indigo-300">
          {isTr ? "Vibe Governor Web Sihirbazı" : "Vibe Governor Web Wizard"}
        </h1>
        <p className="max-w-2xl mx-auto text-sm sm:text-base text-slate-400">
          {isTr
            ? `Yapay zeka destekli projelerde hafıza kaybını, ${formData.constraints.maxLines} satır kuralı ihlallerini ve spagetti kod sapmalarını önleyin. Anayasa ve denetim araçlarınızı tek adımda üretin.`
            : `Eliminate context drift, enforce a modular ${formData.constraints.maxLines}-line architecture, and generate persistent Memory Bank configs in one unified wizard.`}
        </p>
      </header>

      <Stepper currentStep={currentStep} totalSteps={5} onStepClick={goTo} locale={uiLocale} />

      {stepErrors.length > 0 && (
        <div className="mb-6 flex items-start gap-2.5 p-3.5 rounded-xl bg-rose-950/40 border border-rose-800/60 text-rose-200 text-sm">
          <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0 text-rose-400" />
          <ul className="space-y-0.5">
            {stepErrors.map((key) => (
              <li key={key}>{errorText(key, uiLocale)}</li>
            ))}
          </ul>
        </div>
      )}

      <main className="min-h-[500px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
          >
            {currentStep === 1 && <Step1Platform data={formData} updateData={updateFormData} />}
            {currentStep === 2 && <Step2Constraints data={formData} updateData={updateFormData} />}
            {currentStep === 3 && (
              <Step3MemoryBank
                data={formData}
                updateData={updateFormData}
                projectNameError={
                  errors.memoryBank?.projectName?.message
                    ? errorText(errors.memoryBank.projectName.message, uiLocale)
                    : undefined
                }
              />
            )}
            {currentStep === 4 && <Step4Automation data={formData} updateData={updateFormData} />}
            {currentStep === 5 && <Step5Export data={formData} files={generatedFiles} />}
          </motion.div>
        </AnimatePresence>
      </main>

      <footer className="mt-10 pt-6 border-t border-slate-800/80 flex items-center justify-between">
        <Button variant="outline" onClick={() => goTo(currentStep - 1)} disabled={currentStep === 1}>
          <ArrowLeft />
          <span>{isTr ? "Önceki Adım" : "Back"}</span>
        </Button>

        <div className="flex items-center gap-3">
          {currentStep < 5 ? (
            <Button size="lg" onClick={() => goTo(currentStep + 1)}>
              <span>{isTr ? "Sonraki Adım" : "Next Step"}</span>
              <ArrowRight />
            </Button>
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
