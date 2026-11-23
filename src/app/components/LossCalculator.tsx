import { useState } from "react";
import { Reveal } from "./Reveal";
import { useT } from "../../i18n";

// Four digit sums stay plain, like the page's "1500"; longer ones are grouped.
const grouped = (n: number, sep: string) =>
  n < 10000 ? String(n) : String(n).replace(/\B(?=(\d{3})+(?!\d))/g, sep);

// The break-even count never goes past 8 (40 € at 5 €), so three forms cover it.
const unitKey = (n: number): "one" | "few" | "many" => (n === 1 ? "one" : n < 5 ? "few" : "many");

/**
 * What missed appointments cost a practice, from the visitor's own two
 * numbers. The loss is always shown. That Appointzy pays off is said only
 * when a month's loss covers its price; below that the visitor reads what
 * else comes with it, so the calculator never argues against signing up.
 */
export function LossCalculator() {
  const t = useT().calculator;
  const [missed, setMissed] = useState(t.missedStart);
  const [price, setPrice] = useState(t.priceStart);

  const money = (n: number) => `${grouped(n, t.thousands)} ${t.currency}`;
  const month = missed * price;
  const paysOff = month >= t.monthlyPrice;
  const needed = Math.ceil(t.monthlyPrice / price);
  const line = t.paysOff[unitKey(needed)];

  const slider = (
    id: string,
    label: string,
    value: number,
    min: number,
    max: number,
    step: number,
    shown: string,
    set: (n: number) => void
  ) => (
    <div>
      <div className="flex items-baseline justify-between gap-4">
        <label htmlFor={id} className="text-sm text-muted-foreground">
          {label}
        </label>
        <span className="shrink-0 font-[Manrope] text-lg font-extrabold">{shown}</span>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        aria-valuetext={shown}
        onChange={(e) => set(Number(e.target.value))}
        className="mt-2 h-6 w-full cursor-pointer accent-primary"
      />
    </div>
  );

  const sum = (label: string, value: number, strong: boolean) => (
    <div className={`min-w-0 rounded-2xl p-4 ${strong ? "bg-secondary" : "bg-muted"}`}>
      <div className={`text-sm ${strong ? "text-secondary-foreground" : "text-muted-foreground"}`}>{label}</div>
      <div className={`mt-1 break-words font-[Manrope] text-2xl font-extrabold tracking-[-0.02em] ${strong ? "text-primary" : ""}`}>
        {money(value)}
      </div>
    </div>
  );

  return (
    <section id="calculator" className="w-full bg-background px-4 py-20 md:py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal variant="left">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-primary">
            {t.eyebrow}
          </p>
          <h2 className="mt-4 max-w-xl text-3xl leading-[1.08] tracking-[-0.025em] md:text-5xl">
            {t.title}
          </h2>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-muted-foreground">
            {t.text}
          </p>
        </Reveal>

        <Reveal variant="right" delay={80}>
          <div className="rounded-3xl border border-border bg-white p-6 shadow-[0_30px_80px_-40px_rgba(28,25,23,0.35)]">
            <div className="space-y-5">
              {slider("calc-missed", t.missedLabel, missed, 1, 30, 1, String(missed), setMissed)}
              {slider("calc-price", t.priceLabel, price, t.priceMin, t.priceMax, t.priceStep, money(price), setPrice)}
            </div>

            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              {sum(t.monthLabel, month, false)}
              {sum(t.yearLabel, month * 12, true)}
            </div>

            <p
              aria-live="polite"
              className={`mt-3 flex items-start gap-2.5 rounded-xl px-4 py-3 text-sm leading-relaxed ${
                paysOff ? "bg-secondary text-secondary-foreground" : "border border-border text-muted-foreground"
              }`}
            >
              {paysOff && (
                <svg className="mt-0.5 h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              )}
              {paysOff ? (
                <span>
                  {line.before}
                  <strong className="font-semibold">{line.bold.replace("{n}", String(needed))}</strong>
                  {line.after}
                </span>
              ) : (
                t.otherwise
              )}
            </p>

            <a
              href="#cta"
              className="mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#ea580c] to-[#f97316] font-semibold text-white shadow-[0_10px_30px_-10px_rgba(234,88,12,0.8)] transition-transform duration-200 active:scale-[0.98]"
            >
              {t.cta}
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
