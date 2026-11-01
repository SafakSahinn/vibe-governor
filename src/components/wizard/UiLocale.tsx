"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import type { Language } from "@/types/wizard";

/**
 * Interface language of the web app. Independent from the *output* language
 * (the `locale` field of the form), which decides the language of generated files.
 */

const STORAGE_KEY = "vibe-governor-ui-locale";

interface UiLocaleValue {
  locale: Language;
  isTr: boolean;
  setLocale: (l: Language) => void;
}

const UiLocaleContext = createContext<UiLocaleValue>({ locale: "tr", isTr: true, setLocale: () => undefined });

function readStored(): Language | null {
  try {
    const v = window.localStorage.getItem(STORAGE_KEY);
    return v === "tr" || v === "en" ? v : null;
  } catch {
    return null;
  }
}

export const UiLocaleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [locale, setLocaleState] = useState<Language>("tr");

  useEffect(() => {
    const initial = readStored() ?? (navigator.language?.toLowerCase().startsWith("tr") ? "tr" : "en");
    setLocaleState(initial);
    // Runs once on mount; the static HTML is prerendered in Turkish.
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const setLocale = (l: Language) => {
    setLocaleState(l);
    try {
      window.localStorage.setItem(STORAGE_KEY, l);
    } catch {
      /* storage unavailable (private mode) — keep the in-memory choice */
    }
  };

  return (
    <UiLocaleContext.Provider value={{ locale, isTr: locale === "tr", setLocale }}>{children}</UiLocaleContext.Provider>
  );
};

/** Current interface language. */
export function useUiLocale(): UiLocaleValue {
  return useContext(UiLocaleContext);
}
