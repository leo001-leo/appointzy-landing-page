import { useId, useRef, useState, type ChangeEvent, type ReactNode } from "react";
import { dictionaries, LANGS, useLang, useT, type Lang } from "../../i18n";
import { leadOrigin } from "../attribution";

// Only the live site talks to the live API, Leo's sheet and the Meta Pixel
// (index.html loads the pixel there only). The dev server and local previews
// post to a local API (VITE_API_ROOT, else the API's own dev port) and never
// to the sheet, so a test can never add a real request or a sheet row.
const LIVE = typeof window !== "undefined" && window.location.hostname === "info.appointzy.app";
const API_ROOT = LIVE
  ? "https://api.appointzy.app"
  : (import.meta.env.VITE_API_ROOT as string | undefined) ?? "http://localhost:5115";
// The Appointzy API saves the request for the admin area (Барања); public
// endpoint, CORS allows this site, POST, no credentials.
const ENDPOINT = `${API_ROOT}/api/public/access-requests`;
// The page also posts the row to Leo's Sheetmonkey sheet: after the API has
// saved it, and on its own when the API cannot be reached, so a lead is never
// lost. Note: the API's AccessRequestForwarder posts to this same form too
// while its SheetmonkeyUrl setting is set.
const SHEETMONKEY = LIVE ? "https://api.sheetmonkey.io/form/eGhahDSCJG5fH7oEaBxnS1" : null;

const OTHER = 99;
const MAX_TEXT = 100;
const MAX_EMAIL = 200;
const MAX_PHONE = 50;
// The same checks as the API (AccessRequestRules) and the app's own form.
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE = /^[0-9+()./\s-]+$/;

// No country field: the Montenegrin page means Montenegro, the others
// Macedonia. Leo asks on the call when it is somewhere else.
const DEFAULT_COUNTRY: Record<Lang, string> = { mk: "MK", me: "ME", en: "MK" };

type Field =
  | "contactName"
  | "phone"
  | "practiceType"
  | "practiceTypeOther"
  | "practiceName"
  | "city"
  | "email"
  | "website";

type Values = Record<Field, string>;
// "details" is the optional second step, shown once the request is saved.
type Status = "idle" | "loading" | "details" | "detailsLoading" | "done";

declare global {
  interface Window {
    // Meta Pixel; index.html defines it on the live site only.
    fbq?: (...args: unknown[]) => void;
  }
}

// Once per page view, whichever of the page's two forms is touched first:
// tells "nobody starts the form" apart from "people start it and give up".
let formStartSent = false;
function trackFormStart() {
  if (formStartSent) return;
  formStartSent = true;
  window.fbq?.("trackCustom", "FormStart");
}

/**
 * The sheet row, in the same columns and format as the API's
 * AccessRequestForwarder, so rows from either side read the same. Only the
 * source says more: "Landing (Facebook ad: <campaign>)" for a lead from the ad.
 */
function sheetRow(v: Values, lang: Lang, details: boolean) {
  const type = Number(v.practiceType);
  const label = dictionaries.mk.form.practiceTypes.find((p) => p.value === type)?.label ?? "";
  const origin = leadOrigin();
  const source = origin ? `Landing (${origin})` : "Landing";
  return {
    date: new Date().toISOString().slice(0, 16).replace("T", " ") + " UTC",
    practice: v.practiceName,
    type: type === OTHER ? `${label}: ${v.practiceTypeOther}` : label,
    city: v.city,
    country: DEFAULT_COUNTRY[lang],
    contact: v.contactName,
    email: v.email,
    phone: v.phone,
    language: LANGS[lang].htmlLang,
    source: details ? `${source} (details)` : source,
  };
}

// crypto.randomUUID needs a 2022+ browser; older ones get the same v4 shape.
function newUid(): string {
  if (typeof crypto.randomUUID === "function") return crypto.randomUUID();
  const b = crypto.getRandomValues(new Uint8Array(16));
  b[6] = (b[6] & 0x0f) | 0x40;
  b[8] = (b[8] & 0x3f) | 0x80;
  const h = Array.from(b, (x) => x.toString(16).padStart(2, "0")).join("");
  return `${h.slice(0, 8)}-${h.slice(8, 12)}-${h.slice(12, 16)}-${h.slice(16, 20)}-${h.slice(20)}`;
}

const fieldBase =
  "h-12 w-full rounded-xl border border-white/12 bg-white/[0.06] px-4 transition-all duration-200 focus:border-flame/60 focus:bg-white/[0.09] focus:outline-none focus:ring-4 focus:ring-flame/15 aria-[invalid=true]:border-red-400/70";
const inputClass = `${fieldBase} text-ink-fg`;

// Native dropdowns follow the page's colour scheme, so dark keeps the open
// list readable; options are styled too for browsers that ignore it.
const selectClass = `${fieldBase} cursor-pointer appearance-none pr-10 [color-scheme:dark]`;
const optionClass = "bg-ink-soft text-ink-fg";

const buttonClass =
  "group relative mt-4 h-13 w-full cursor-pointer overflow-hidden rounded-xl bg-gradient-to-r from-[#ea580c] to-[#f97316] text-base font-semibold text-white shadow-[0_10px_30px_-10px_rgba(234,88,12,0.8)] transition-all duration-200 hover:shadow-[0_16px_40px_-10px_rgba(234,88,12,0.95)] focus:outline-none focus-visible:ring-4 focus-visible:ring-flame/30 active:scale-[0.985] disabled:cursor-default disabled:opacity-70";

const check = (
  <svg className="h-7 w-7 text-success" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

/**
 * "Бесплатна презентација од 15 минути": the single conversion action on the
 * page, in two steps. The first asks only what a call back needs (name,
 * phone, type) and is the lead. The second, once that is saved, offers the
 * practice's name, city and email so Leo can prepare; it is optional and
 * never blocks anything. Success means the API saved it, or, when the API
 * cannot be reached, the sheet did. Typed values are never cleared on
 * failure; one uid per form and a sent flag for the sheet mean a retry never
 * makes a second request or a second row.
 */
export function LeadForm({ showPrice = true }: { showPrice?: boolean }) {
  const t = useT().form;
  const lang = useLang();
  const id = useId();
  const formRef = useRef<HTMLFormElement>(null);
  // Made on the first send and reused by every retry of this form.
  const requestUid = useRef<string | null>(null);
  // Set once the sheet has the row, so a retry never adds it twice.
  const sheetSent = useRef(false);
  // Whether the API has the request, so the second step can go there too.
  const apiSaved = useRef(false);

  const [values, setValues] = useState<Values>({
    contactName: "",
    phone: "",
    practiceType: "",
    practiceTypeOther: "",
    practiceName: "",
    city: "",
    email: "",
    website: "",
  });
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<{ message: string; field?: Field } | null>(null);

  const set = (field: Field) => (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setValues((v) => ({ ...v, [field]: e.target.value }));

  const isOther = Number(values.practiceType) === OTHER;

  const trimmed = (): Values =>
    Object.fromEntries(
      Object.entries(values).map(([k, val]) => [k, k === "website" ? val : val.trim()])
    ) as Values;

  function checkFirst(v: Values): { message: string; field?: Field } | null {
    // In on-screen order, so the focus lands on the first empty field.
    if (!v.contactName) return { message: t.errors.required, field: "contactName" };
    if (!v.phone) return { message: t.errors.required, field: "phone" };
    if (!PHONE.test(v.phone) || v.phone.replace(/\D/g, "").length < 6) {
      return { message: t.errors.phone, field: "phone" };
    }
    if (!v.practiceType) return { message: t.errors.required, field: "practiceType" };
    if (isOther && !v.practiceTypeOther) return { message: t.errors.required, field: "practiceTypeOther" };
    return null;
  }

  function show(problem: { message: string; field?: Field }) {
    setError(problem);
    if (problem.field) {
      (formRef.current?.elements.namedItem(problem.field) as HTMLElement | null)?.focus();
    }
  }

  // Best effort. Never for a filled honeypot: the API quietly drops bots,
  // and so does the sheet. No keepalive: some browsers refuse it on a
  // cross-origin JSON post, and the page stays open after sending anyway.
  async function sendToSheet(v: Values, details = false): Promise<boolean> {
    if (!SHEETMONKEY || v.website) return false;
    if (!details && sheetSent.current) return true;
    try {
      const res = await fetch(SHEETMONKEY, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(sheetRow(v, lang, details)),
      });
      if (res.ok && !details) sheetSent.current = true;
      return res.ok;
    } catch {
      return false;
    }
  }

  // The request is in: offer the second step and count one Lead for the
  // Meta Pixel, with the request uid as event id. Never for a filled
  // honeypot, which the API answers with a quiet 200 as well.
  function succeed(v: Values) {
    setStatus(v.website ? "done" : "details");
    if (!v.website) window.fbq?.("track", "Lead", {}, { eventID: requestUid.current });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "loading") return;

    const v = trimmed();
    const problem = checkFirst(v);
    if (problem) {
      show(problem);
      return;
    }

    setError(null);
    setStatus("loading");
    requestUid.current ??= newUid();

    let res: Response;
    try {
      res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "omit",
        body: JSON.stringify({
          uid: requestUid.current,
          practiceType: Number(v.practiceType),
          practiceTypeOther: isOther ? v.practiceTypeOther : null,
          country: DEFAULT_COUNTRY[lang],
          contactName: v.contactName,
          phone: v.phone,
          language: LANGS[lang].htmlLang,
          source: "landing",
          website: v.website,
        }),
      });
    } catch {
      // The API cannot be reached: the sheet alone still keeps the lead.
      if (await sendToSheet(v)) {
        succeed(v);
        return;
      }
      setStatus("idle");
      show({ message: t.errors.failed });
      return;
    }

    if (res.ok) {
      apiSaved.current = true;
      void sendToSheet(v);
      succeed(v);
      return;
    }

    // Rejected requests never reach the sheet.
    if (res.status === 429) {
      setStatus("idle");
      show({ message: t.errors.tooMany });
      return;
    }
    if (res.status === 400) {
      setStatus("idle");
      show({ message: t.errors.required });
      return;
    }

    // Any other answer (a server error): fall back to the sheet as well.
    if (await sendToSheet(v)) {
      succeed(v);
      return;
    }
    setStatus("idle");
    show({ message: t.errors.failed });
  }

  // The second step. Whatever happens, the visitor is thanked: the request
  // itself is already in, and these details are only a help for the call.
  async function handleDetails(e: React.FormEvent) {
    e.preventDefault();
    if (status === "detailsLoading") return;

    const v = trimmed();
    if (!v.practiceName && !v.city && !v.email) {
      setStatus("done");
      return;
    }
    if (v.email && !EMAIL.test(v.email)) {
      show({ message: t.errors.email, field: "email" });
      return;
    }

    setError(null);
    setStatus("detailsLoading");

    let saved = false;
    if (apiSaved.current) {
      try {
        const res = await fetch(`${ENDPOINT}/${requestUid.current}/details`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "omit",
          body: JSON.stringify({ practiceName: v.practiceName, city: v.city, email: v.email }),
        });
        if (res.status === 400) {
          const body = (await res.json().catch(() => null)) as { message?: string } | null;
          if (body?.message === "EMAIL_NOT_VALID") {
            setStatus("details");
            show({ message: t.errors.email, field: "email" });
            return;
          }
        }
        saved = res.ok;
      } catch {
        saved = false;
      }
    }
    if (!saved) await sendToSheet(v, true);

    window.fbq?.("trackCustom", "LeadDetails");
    setStatus("done");
  }

  const fid = (field: Field) => `${id}-${field}`;
  const invalid = (field: Field) => (error?.field === field ? true : undefined);

  const field = (name: Field, label: ReactNode, control: ReactNode, wide = false) => (
    <div className={wide ? "@md:col-span-2" : undefined}>
      <label htmlFor={fid(name)} className="mb-1.5 block text-sm text-ink-muted">
        {label}
      </label>
      {control}
    </div>
  );

  const text = (name: Field, max: number, extra: React.InputHTMLAttributes<HTMLInputElement> = {}) => (
    <input
      id={fid(name)}
      name={name}
      type="text"
      maxLength={max}
      value={values[name]}
      onChange={set(name)}
      aria-invalid={invalid(name)}
      aria-describedby={invalid(name) ? `${id}-error` : undefined}
      className={inputClass}
      {...extra}
    />
  );

  const errorLine = error && (
    <p id={`${id}-error`} role="alert" className="mt-4 text-sm text-red-400">
      {error.message}
    </p>
  );

  const arrow = (
    <svg className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );

  if (status === "done") {
    return (
      <div role="status" className="rounded-2xl border border-success/30 bg-success/10 p-7 text-center backdrop-blur-sm">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-success/20">{check}</div>
        <p className="text-lg font-medium text-ink-fg">{t.successTitle}</p>
        <p className="mt-1.5 text-sm text-ink-muted">
          {t.successBefore}
          <span className="whitespace-nowrap text-ink-fg">{values.phone.trim()}</span>
          {t.successAfter}
        </p>
      </div>
    );
  }

  if (status === "details" || status === "detailsLoading") {
    return (
      <form ref={formRef} onSubmit={handleDetails} noValidate aria-labelledby={`${id}-title`} className="@container relative">
        <div role="status" className="flex items-start gap-3 rounded-2xl border border-success/30 bg-success/10 p-4">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-success/20 [&>svg]:h-5 [&>svg]:w-5">{check}</span>
          <div>
            <p className="font-medium text-ink-fg">{t.successTitle}</p>
            <p className="mt-0.5 text-sm text-ink-muted">
              {t.successBefore}
              <span className="whitespace-nowrap text-ink-fg">{values.phone.trim()}</span>
              {t.successAfter}
            </p>
          </div>
        </div>

        <p id={`${id}-title`} className="mb-4 mt-6 text-base font-semibold text-ink-fg">
          {t.detailsTitle} <span className="font-normal text-white/40">{t.optional}</span>
        </p>

        <div className="grid grid-cols-1 items-end gap-x-3 gap-y-3.5 @md:grid-cols-2">
          {field("practiceName", t.practiceName, text("practiceName", MAX_TEXT, { autoComplete: "organization" }), true)}
          {field("city", t.city, text("city", MAX_TEXT, { autoComplete: "address-level2" }))}
          {field(
            "email",
            t.email,
            text("email", MAX_EMAIL, {
              type: "email",
              inputMode: "email",
              autoComplete: "email",
              autoCapitalize: "none",
              spellCheck: false,
            })
          )}
        </div>

        {errorLine}

        <button type="submit" disabled={status === "detailsLoading"} className={buttonClass}>
          <span className="relative z-10 inline-flex items-center justify-center gap-2">
            {status === "detailsLoading" ? t.sending : t.detailsSubmit}
            {status !== "detailsLoading" && arrow}
          </span>
        </button>
      </form>
    );
  }

  const chevron = (
    <svg className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/45" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m6 9 6 6 6-6" />
    </svg>
  );

  return (
    // A container, so the fields pair up by the form's own width: two per
    // row in the wide hero column, one per row on phones and in the CTA card.
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      onFocus={trackFormStart}
      noValidate
      aria-labelledby={`${id}-title`}
      className="@container relative"
    >
      <p id={`${id}-title`} className="mb-4 text-lg font-semibold text-ink-fg">
        {t.title}
      </p>

      <div className="grid grid-cols-1 items-end gap-x-3 gap-y-3.5 @md:grid-cols-2">
        {field("contactName", t.contactName, text("contactName", MAX_TEXT, { autoComplete: "name" }))}

        {field("phone", t.phone, text("phone", MAX_PHONE, { type: "tel", inputMode: "tel", autoComplete: "tel" }))}

        {field(
          "practiceType",
          t.practiceType,
          <div className="relative">
            <select
              id={fid("practiceType")}
              name="practiceType"
              value={values.practiceType}
              onChange={set("practiceType")}
              aria-invalid={invalid("practiceType")}
              aria-describedby={invalid("practiceType") ? `${id}-error` : undefined}
              className={`${selectClass} ${values.practiceType ? "text-ink-fg" : "text-white/40"}`}
            >
              <option value="" disabled className={optionClass}>
                {t.choose}
              </option>
              {t.practiceTypes.map((type) => (
                <option key={type.value} value={type.value} className={optionClass}>
                  {type.label}
                </option>
              ))}
            </select>
            {chevron}
          </div>,
          !isOther
        )}

        {isOther && field("practiceTypeOther", t.practiceTypeOther, text("practiceTypeOther", MAX_TEXT))}
      </div>

      {/* Not for people: off screen, hidden from screen readers and the tab
          order. A bot that fills it gets a success and nothing is saved. */}
      <div aria-hidden="true" style={{ position: "absolute", left: "-10000px", top: "auto", width: 1, height: 1, overflow: "hidden" }}>
        <label htmlFor={fid("website")}>Website</label>
        <input
          id={fid("website")}
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values.website}
          onChange={set("website")}
        />
      </div>

      {errorLine}

      <button type="submit" disabled={status === "loading"} className={buttonClass}>
        <span className="relative z-10 inline-flex items-center justify-center gap-2">
          {status === "loading" ? t.sending : t.submit}
          {status !== "loading" && arrow}
        </span>
      </button>

      <div className="mt-3.5 flex items-center gap-3">
        <span
          aria-hidden="true"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/[0.07] text-flame"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
        </span>
        <p className="text-sm leading-snug text-ink-muted">
          {t.contact}
          {showPrice && <span className="block">{t.price}</span>}
          <span className="block text-white/40">{t.noCard}</span>
        </p>
      </div>
    </form>
  );
}
