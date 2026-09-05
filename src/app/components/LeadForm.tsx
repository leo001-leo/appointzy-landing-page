import { useId, useState } from "react";

const ENDPOINT = "https://api.sheetmonkey.io/form/eGhahDSCJG5fH7oEaBxnS1";

type Status = "idle" | "loading" | "success" | "error";

const inputClass =
  "h-13 w-full rounded-xl border border-white/12 bg-white/[0.06] px-4 text-ink-fg placeholder:text-white/35 transition-all duration-200 focus:border-flame/60 focus:bg-white/[0.09] focus:outline-none focus:ring-4 focus:ring-flame/15";

/**
 * The single conversion action on the page: email (required) + phone (optional).
 * Posts to Sheetmonkey; only a confirmed 2xx counts as success, and typed
 * values are never cleared on failure.
 */
export function LeadForm() {
  const uid = useId();
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [emailError, setEmailError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setEmailError("Внесете валиден е-маил, на пр. ime@gmail.com");
      return;
    }
    setEmailError("");
    setStatus("loading");
    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ email: trimmed, phone: phone.trim() }),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        role="status"
        className="rounded-2xl border border-success/30 bg-success/10 p-7 text-center backdrop-blur-sm"
      >
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-success/20">
          <svg className="h-7 w-7 text-success" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </div>
        <p className="text-lg font-medium text-ink-fg">Ви благодариме!</p>
        <p className="mt-1.5 text-sm text-ink-muted">
          Ќе ве контактираме наскоро на {email.trim()}.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-3.5">
      <div>
        <label htmlFor={`${uid}-email`} className="mb-1.5 block text-sm text-ink-muted">
          Е-маил
        </label>
        <input
          id={`${uid}-email`}
          type="email"
          name="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="ime@gmail.com"
          aria-invalid={emailError ? true : undefined}
          aria-describedby={emailError ? `${uid}-email-error` : undefined}
          className={inputClass}
        />
        {emailError && (
          <p id={`${uid}-email-error`} className="mt-1.5 text-sm text-red-400">
            {emailError}
          </p>
        )}
      </div>

      <div>
        <label htmlFor={`${uid}-phone`} className="mb-1.5 block text-sm text-ink-muted">
          Телефон <span className="text-white/35">(незадолжително)</span>
        </label>
        <input
          id={`${uid}-phone`}
          type="tel"
          name="phone"
          autoComplete="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="доколку сакате да ве контактираме"
          className={inputClass}
        />
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className="group relative h-13 w-full cursor-pointer overflow-hidden rounded-xl bg-gradient-to-r from-[#ea580c] to-[#f97316] text-base font-semibold text-white shadow-[0_10px_30px_-10px_rgba(234,88,12,0.8)] transition-all duration-200 hover:shadow-[0_16px_40px_-10px_rgba(234,88,12,0.95)] focus:outline-none focus-visible:ring-4 focus-visible:ring-flame/30 active:scale-[0.985] disabled:cursor-default disabled:opacity-70"
      >
        <span className="relative z-10 inline-flex items-center justify-center gap-2">
          {status === "loading" ? "Се испраќа..." : "Пробајте го бесплатно"}
          {status !== "loading" && (
            <svg className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          )}
        </span>
      </button>

      {status === "error" && (
        <p role="alert" className="text-sm text-red-400">
          Нешто тргна наопаку и пријавата не е зачувана. Обидете се повторно.
        </p>
      )}

      <div className="flex items-center gap-3 pt-0.5">
        <span
          aria-hidden="true"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/[0.07] text-flame"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
        </span>
        <p className="text-sm leading-snug text-ink-muted">
          Ќе ве контактира нашиот тим во рок од 24 часа.
          <span className="block text-white/40">Без картичка. Без инсталација.</span>
        </p>
      </div>
    </form>
  );
}
