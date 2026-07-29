import { useId, useState } from "react";

const ENDPOINT = "https://api.sheetmonkey.io/form/eGhahDSCJG5fH7oEaBxnS1";

type Status = "idle" | "loading" | "success" | "error";

// The single conversion action on the page: email (required) + phone (optional).
// Submits to Sheetmonkey; success only on a confirmed 2xx response.
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
        className="rounded-2xl border-2 border-success/30 bg-white p-6 text-center"
      >
        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-success/10">
          <svg className="h-6 w-6 text-success" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </div>
        <p className="font-medium">Ви благодариме!</p>
        <p className="text-muted-foreground text-sm mt-1">
          Ќе ве контактираме наскоро на {email.trim()}.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-3">
      <div>
        <label htmlFor={`${uid}-email`} className="mb-1 block text-sm">
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
          className="h-12 w-full rounded-xl border border-border bg-white px-4 transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/25"
        />
        {emailError && (
          <p id={`${uid}-email-error`} className="mt-1 text-sm text-destructive">
            {emailError}
          </p>
        )}
      </div>

      <div>
        <label htmlFor={`${uid}-phone`} className="mb-1 block text-sm">
          Телефон <span className="text-muted-foreground">(незадолжително)</span>
        </label>
        <input
          id={`${uid}-phone`}
          type="tel"
          name="phone"
          autoComplete="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="доколку сакате да ве контактираме"
          className="h-12 w-full rounded-xl border border-border bg-white px-4 transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/25"
        />
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className="h-12 w-full cursor-pointer rounded-xl bg-primary font-medium text-primary-foreground shadow-md transition-all hover:bg-accent hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 active:scale-[0.98] disabled:cursor-default disabled:opacity-70"
      >
        {status === "loading" ? "Се испраќа..." : "Пробајте го бесплатно"}
      </button>

      {status === "error" && (
        <p role="alert" className="text-sm text-destructive">
          Нешто тргна наопаку и пријавата не е зачувана. Обидете се повторно.
        </p>
      )}

      <div className="flex items-center gap-3 pt-1">
        <div
          aria-hidden="true"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary text-primary"
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
        </div>
        <p className="text-sm text-muted-foreground">
          Ќе ве контактира нашиот тим во рок од 24 часа.
          <span className="block">Без картичка. Без инсталација.</span>
        </p>
      </div>
    </form>
  );
}
