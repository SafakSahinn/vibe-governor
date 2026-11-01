"use client";

import React, { createContext, useContext, useEffect, useSyncExternalStore } from "react";
import type { Language } from "@/types/wizard";

/**
 * Interface language of the web app. Independent from the *output* language
 * (the `locale` field of the form), which decides the language of generated files.
 *
 * Implemented as a tiny external store (localStorage + navigator.language) read
 * through useSyncExternalStore: the prerendered HTML uses "tr" (server snapshot)
 * and the client switches right after hydration without a hydration mismatch.
 */

export const UI_LOCALE_STORAGE_KEY = "vibe-governor-ui-locale";
/** Class set on <html> by the inline boot script while an English UI is pending (see layout.tsx). */
export const LOCALE_PENDING_CLASS = "vg-locale-pending";

type Listener = () => void;
const listeners = new Set<Listener>();
let current: Language | null = null;

function detect(): Language {
  try {
    const v = window.localStorage.getItem(UI_LOCALE_STORAGE_KEY);
    if (v === "tr" || v === "en") return v;
  } catch {
    /* storage unavailable (private mode) */
  }
  return navigator.language?.toLowerCase().startsWith("tr") ? "tr" : "en";
}

const store = {
  subscribe(listener: Listener) {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },
  getSnapshot(): Language {
    if (current === null) current = detect();
    return current;
  },
  getServerSnapshot(): Language {
    return "tr";
  },
  set(l: Language) {
    current = l;
    try {
      window.localStorage.setItem(UI_LOCALE_STORAGE_KEY, l);
    } catch {
      /* keep the in-memory choice */
    }
    listeners.forEach((fn) => fn());
  },
};

interface UiLocaleValue {
  locale: Language;
  isTr: boolean;
  setLocale: (l: Language) => void;
}

const UiLocaleContext = createContext<UiLocaleValue>({ locale: "tr", isTr: true, setLocale: () => undefined });

export const UiLocaleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const locale = useSyncExternalStore(store.subscribe, store.getSnapshot, store.getServerSnapshot);

  useEffect(() => {
    document.documentElement.lang = locale;
    // The client now renders in the right language: reveal the page.
    document.documentElement.classList.remove(LOCALE_PENDING_CLASS);
  }, [locale]);

  return (
    <UiLocaleContext.Provider value={{ locale, isTr: locale === "tr", setLocale: store.set }}>
      {children}
    </UiLocaleContext.Provider>
  );
};

/** Current interface language. */
export function useUiLocale(): UiLocaleValue {
  return useContext(UiLocaleContext);
}
