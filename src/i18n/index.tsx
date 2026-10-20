import { createContext, useContext, type ReactNode } from "react";
import { mk, type Dict } from "./mk";
import { en } from "./en";
import { me } from "./me";
import type { Lang } from "./types";

export type { Lang, Dict };

export const SITE = "https://info.appointzy.app";

// Each language has its own prerendered page. Names are shown in their own
// language so a visitor can always find theirs.
//
// htmlLang is the page's real language tag. hreflang is what Google reads,
// and Google only accepts two-letter language codes: Montenegrin has none
// (its code is "cnr"), so its page targets Montenegro as "sr-ME", the usual
// choice for Montenegrin sites.
export const LANGS: Record<
  Lang,
  { code: string; name: string; path: string; htmlLang: string; hreflang: string }
> = {
  mk: { code: "MK", name: "Македонски", path: "/", htmlLang: "mk", hreflang: "mk" },
  en: { code: "EN", name: "English", path: "/en/", htmlLang: "en", hreflang: "en" },
  me: { code: "ME", name: "Crnogorski", path: "/me/", htmlLang: "cnr", hreflang: "sr-ME" },
};

export const dictionaries: Record<Lang, Dict> = { mk, en, me };

export function langFromPath(pathname: string): Lang {
  const first = pathname.split("/")[1];
  return first === "en" || first === "me" ? first : "mk";
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
