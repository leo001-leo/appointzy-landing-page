import { LeadForm } from "./LeadForm";
import calendarScreenshot from "../../assets/calendarScreenshot.png";

const clients = [
  "Бадент",
  "Dental Prestige",
  "Весна Дент",
  "ПЗУ Д-р Стојанова",
  "Ortoalex",
];

export function Hero() {
  return (
    <section id="hero" className="grain relative overflow-hidden bg-ink text-ink-fg">
      {/* Ambient light: two slow-drifting colour fields + a fine grid */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="aurora-a absolute -right-40 -top-56 h-[40rem] w-[40rem] rounded-full bg-[radial-gradient(circle,rgba(234,88,12,0.45),transparent_65%)] blur-3xl" />
        <div className="aurora-b absolute -bottom-64 -left-48 h-[36rem] w-[36rem] rounded-full bg-[radial-gradient(circle,rgba(251,146,60,0.28),transparent_65%)] blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.045)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_at_50%_0%,#000_35%,transparent_78%)]" />
      </div>

      {/* pt matches the height the fixed nav used to occupy in flow, so the
          form stays above the fold on a 390px phone */}
      <div className="relative mx-auto max-w-6xl px-4 pb-16 pt-24 md:pb-24 md:pt-32">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
          {/* Copy + form — first in the DOM so it stays above the fold on phones */}
          <div>
            <div className="rise mb-5 flex flex-wrap gap-2" style={{ "--d": "60ms" } as React.CSSProperties}>
              <span className="rounded-full border border-white/12 bg-white/[0.06] px-3 py-1 text-sm text-ink-muted backdrop-blur-sm">
                За приватни ординации и студија
              </span>
              <span className="rounded-full border border-flame/25 bg-flame/10 px-3 py-1 text-sm text-flame backdrop-blur-sm">
                30 дена бесплатно
              </span>
            </div>

            <h1
              className="rise text-[2.5rem] leading-[1.02] tracking-[-0.035em] md:text-6xl lg:text-[4.25rem]"
              style={{ "--d": "140ms" } as React.CSSProperties}
            >
              {"Пропуштен термин, "}
              <span className="bg-gradient-to-r from-[#fdba74] via-[#fb923c] to-[#f97316] bg-clip-text text-transparent">
                изгубени пари
              </span>
              {"."}
            </h1>

            <p
              className="rise mt-5 max-w-md text-lg leading-relaxed text-ink-muted"
              style={{ "--d": "230ms" } as React.CSSProperties}
            >
              Автоматски СМС потсетници за пациентите. Кај нашите корисници,
              пропуштените термини паднаа од 9 на 1 месечно.
            </p>

            <div
              className="rise mt-8 max-w-md"
              style={{ "--d": "320ms" } as React.CSSProperties}
            >
              <LeadForm />
            </div>
          </div>

          {/* Product visual */}
          <div
            className="rise relative lg:pl-4"
            style={{ "--d": "420ms" } as React.CSSProperties}
          >
            <div className="float-y-slow relative">
              <div
                aria-hidden="true"
                className="absolute -inset-8 rounded-[2.5rem] bg-[radial-gradient(circle_at_50%_40%,rgba(234,88,12,0.35),transparent_70%)] blur-2xl"
              />
              <div className="relative overflow-hidden rounded-2xl border border-white/12 bg-white shadow-[0_40px_100px_-30px_rgba(0,0,0,0.9)]">
                <img
                  src={calendarScreenshot}
                  alt="Неделен календар во Appointzy со закажани термини"
                  width={1607}
                  height={797}
                  className="h-auto w-full"
                />
              </div>
            </div>

            {/* The core action, arriving */}
            <div className="sms-arrive absolute -bottom-6 left-2 right-2 sm:left-auto sm:right-4 sm:w-80">
              <div className="rounded-2xl border border-white/12 bg-ink-soft/95 p-4 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.95)] backdrop-blur-md">
                <div className="flex items-start gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-flame/15 text-flame">
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    </svg>
                  </span>
                  <div className="min-w-0">
                    <div className="text-sm font-medium text-ink-fg">СМС до Марија П.</div>
                    <p className="mt-0.5 text-sm leading-snug text-ink-muted">
                      Потсетуваме: утре во 10:00 имате термин. Ве очекуваме!
                    </p>
                  </div>
                  <svg className="ml-auto h-4 w-4 shrink-0 text-success" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Real practices already using it */}
        <div className="mt-20 md:mt-24">
          <p className="text-center text-sm text-white/40">
            Веќе го користат ординации и физиотерапевти во Македонија
          </p>
          <div className="marquee-mask mt-5 overflow-hidden">
            <div className="marquee-track flex gap-10">
              {[...clients, ...clients].map((name, i) => (
                <span
                  key={`${name}-${i}`}
                  className="whitespace-nowrap text-lg text-white/55"
                  aria-hidden={i >= clients.length ? "true" : undefined}
                >
                  {name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Fade into the light body */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-background"
      />
    </section>
  );
}
