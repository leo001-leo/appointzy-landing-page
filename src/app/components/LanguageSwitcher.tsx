import { useEffect, useId, useRef, useState } from "react";
import { LANGS, useLang, useT, type Lang } from "../../i18n";
import { Flag } from "./Flags";

const ORDER = Object.keys(LANGS) as Lang[];

/** Nav dropdown: flag + short code. Each option is a plain link to that language's page. */
export function LanguageSwitcher({ overDark }: { overDark: boolean }) {
  const lang = useLang();
  const t = useT();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const menuId = useId();

  useEffect(() => {
    if (!open) return;
    const onPointer = (e: PointerEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={menuId}
        aria-label={`${t.language.choose}: ${LANGS[lang].name}`}
        onClick={() => setOpen((o) => !o)}
        className={`flex h-9 cursor-pointer items-center gap-1.5 rounded-lg px-2 text-xs font-semibold transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
          overDark
            ? "border border-white/20 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20 focus-visible:ring-white/40"
            : "border border-border bg-white text-foreground hover:bg-muted focus-visible:ring-foreground/30"
        }`}
      >
        <Flag lang={lang} />
        {LANGS[lang].code}
        <svg
          className={`hidden h-3 w-3 opacity-60 transition-transform duration-200 sm:block ${open ? "rotate-180" : ""}`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      {open && (
        <ul
          id={menuId}
          className="pop-in absolute right-0 top-full mt-2 w-52 rounded-xl border border-border bg-white p-1 text-foreground shadow-[0_18px_40px_-16px_rgba(28,25,23,0.35)]"
        >
          {ORDER.map((l) => (
            <li key={l}>
              <a
                href={LANGS[l].path}
                hrefLang={l}
                lang={l}
                aria-current={l === lang ? "true" : undefined}
                className={`flex min-h-11 items-center gap-3 rounded-lg px-3 text-sm transition-colors duration-150 hover:bg-muted focus:outline-none focus-visible:bg-muted ${
                  l === lang ? "bg-secondary/60" : ""
                }`}
              >
                <Flag lang={l} />
                <span className="font-semibold">{LANGS[l].code}</span>
                <span className="text-muted-foreground">{LANGS[l].name}</span>
                {l === lang && (
                  <svg className="ml-auto h-4 w-4 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                )}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/** Footer: both languages always visible. */
export function LanguageLinks() {
  const lang = useLang();
  return (
    <div className="flex items-center gap-5">
      {ORDER.map((l) => (
        <a
          key={l}
          href={LANGS[l].path}
          hrefLang={l}
          lang={l}
          aria-current={l === lang ? "true" : undefined}
          className={`inline-flex min-h-[44px] items-center gap-2 text-sm transition-colors duration-200 ${
            l === lang ? "font-medium text-ink-fg" : "text-ink-muted hover:text-ink-fg"
          }`}
        >
          <Flag lang={l} />
          {LANGS[l].name}
        </a>
      ))}
    </div>
  );
}
