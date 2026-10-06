import { createContext, useContext, type ReactNode } from "react";
import { mk, type Dict } from "./mk";
import { en } from "./en";
import type { Lang } from "./types";

export type { Lang, Dict };

export const SITE = "https://info.appointzy.app";

// Each language has its own prerendered page. Names are shown in their own
// language so a visitor can always find theirs.
export const LANGS: Record<Lang, { code: string; name: string; path: string }> = {
  mk: { code: "MK", name: "Македонски", path: "/" },
  en: { code: "EN", name: "English", path: "/en/" },
};

export const dictionaries: Record<Lang, Dict> = { mk, en };

export function langFromPath(pathname: string): Lang {
  return /^\/en(\/|$)/.test(pathname) ? "en" : "mk";
}

const LangContext = createContext<Lang>("mk");

export function LangProvider({ lang, children }: { lang: Lang; children: ReactNode }) {
  return <LangContext.Provider value={lang}>{children}</LangContext.Provider>;
}

export function useLang(): Lang {
  return useContext(LangContext);
}

export function useT(): Dict {
  return dictionaries[useContext(LangContext)];
}
