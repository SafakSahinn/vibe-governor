"use client";

import React, { useRef } from "react";
import { BookOpen } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { useUiLocale } from "./UiLocale";
import { GUIDE_SECTIONS, type GuideText } from "./guideContent";
import { SWITCHES } from "./SafetySwitches";
import { RichText } from "./RichText";

interface Props {
  open: boolean;
  onClose: () => void;
}

/** In-app bilingual guide: what the app does, why, and how it works. */
export const GuideModal: React.FC<Props> = ({ open, onClose }) => {
  const { locale, isTr } = useUiLocale();
  const t = (x: GuideText) => x[locale];
  const bodyRef = useRef<HTMLDivElement>(null);

  const jump = (id: string) => {
    bodyRef.current?.querySelector(`#guide-${id}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <Dialog open={open} onOpenChange={(next) => !next && onClose()}>
      <DialogContent
        closeLabel={isTr ? "Kapat" : "Close"}
        className="max-w-4xl max-h-[calc(100vh-2rem)] flex flex-col overflow-hidden"
      >
            <div className="shrink-0 flex items-center gap-2.5 px-5 py-4 pr-14 border-b border-slate-800 bg-slate-900/90">
              <BookOpen className="w-5 h-5 text-indigo-400" />
              <div>
                <DialogTitle>{isTr ? "Vibe Governor Rehberi" : "Vibe Governor Guide"}</DialogTitle>
                <DialogDescription>
                  {isTr ? "Ne yapar, ne işe yarar, nasıl çalışır" : "What it does, why it helps, how it works"}
                </DialogDescription>
              </div>
            </div>

            <nav className="shrink-0 flex flex-wrap gap-1.5 px-5 py-2.5 border-b border-slate-800 bg-slate-950">
              {GUIDE_SECTIONS.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => jump(s.id)}
                  className="shrink-0 px-2.5 py-1 rounded-lg text-[11px] font-semibold text-slate-300 bg-slate-900 border border-slate-800 hover:border-indigo-600 hover:text-white"
                >
                  {t(s.title)}
                </button>
              ))}
            </nav>

            <div ref={bodyRef} className="flex-1 overflow-y-auto px-5 py-5 space-y-8 text-sm text-slate-300 leading-relaxed">
              {GUIDE_SECTIONS.map((s) => (
                <section key={s.id} id={`guide-${s.id}`} className="scroll-mt-4 space-y-3">
                  <h3 className="text-base font-bold text-white">{t(s.title)}</h3>
                  {s.paragraphs?.map((p, i) => (
                    <p key={i}>
                      <RichText text={t(p)} />
                    </p>
                  ))}
                  {s.bullets && (
                    <ul className="space-y-2 list-disc pl-5 marker:text-indigo-400">
                      {s.bullets.map((b, i) => (
                        <li key={i}>
                          <RichText text={t(b)} />
                        </li>
                      ))}
                    </ul>
                  )}
                  {s.steps && (
                    <ol className="space-y-2.5">
                      {s.steps.map((st, i) => (
                        <li key={i} className="flex gap-3">
                          <span className="shrink-0 w-6 h-6 rounded-full bg-indigo-950 border border-indigo-700/60 text-indigo-300 text-xs font-bold flex items-center justify-center">
                            {i + 1}
                          </span>
                          <div>
                            <div className="font-semibold text-white">{t(st.title)}</div>
                            <div className="text-slate-400">
                              <RichText text={t(st.body)} />
                            </div>
                          </div>
                        </li>
                      ))}
                    </ol>
                  )}
                  {s.table && (
                    <dl className="divide-y divide-slate-800 rounded-xl border border-slate-800 overflow-hidden">
                      {s.table.map((row) => (
                        <div key={row.key} className="grid sm:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] gap-1 sm:gap-4 px-3.5 py-2.5 bg-slate-900/40">
                          <dt className="font-mono text-xs text-indigo-300 break-words">{row.key}</dt>
                          <dd className="text-slate-400">
                            <RichText text={t(row.value)} />
                          </dd>
                        </div>
                      ))}
                    </dl>
                  )}
                  {s.code?.map((c) => (
                    <div key={c.command} className="space-y-1">
                      <div className="text-xs text-slate-400">{t(c.label)}</div>
                      <pre className="p-3 rounded-lg bg-slate-900 border border-slate-800 font-mono text-xs text-indigo-200 whitespace-pre-wrap break-all">
                        {c.command}
                      </pre>
                    </div>
                  ))}
                  {s.rulesList && (
                    <ul className="grid sm:grid-cols-2 gap-2">
                      {SWITCHES.map((sw) => (
                        <li key={sw.key} className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded border ${sw.badgeClass}`}>{sw.badge}</span>
                            <span className="text-xs font-semibold text-white">
                              <RichText text={isTr ? sw.titleTr : sw.titleEn} />
                            </span>
                          </div>
                          <p className="text-xs text-slate-400 mt-1">
                            <RichText text={isTr ? sw.descTr : sw.descEn} />
                          </p>
                        </li>
                      ))}
                    </ul>
                  )}
                </section>
              ))}
            </div>
      </DialogContent>
    </Dialog>
  );
};
