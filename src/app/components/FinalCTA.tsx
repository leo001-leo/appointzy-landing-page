import { LeadForm } from "./LeadForm";
import { Reveal } from "./Reveal";

export function FinalCTA() {
  return (
    <section
      id="cta"
      className="grain relative overflow-hidden bg-ink px-4 py-20 text-ink-fg md:py-28"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="aurora-a absolute -top-48 left-1/2 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(234,88,12,0.38),transparent_65%)] blur-3xl" />
        <div className="aurora-b absolute -bottom-56 -right-32 h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(circle,rgba(251,146,60,0.22),transparent_65%)] blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-5xl">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal variant="left">
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-flame">
              Започнете
            </p>
            <h2 className="mt-4 text-3xl leading-[1.05] tracking-[-0.03em] md:text-5xl">
              Започнете уште{" "}
              <span className="bg-gradient-to-r from-[#fdba74] to-[#f97316] bg-clip-text text-transparent">
                оваа недела
              </span>
            </h2>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-ink-muted">
              Оставете е-маил и ние ве контактираме за сè да поставиме. Без обврски,
              без картичка.
            </p>

            <ul className="mt-8 space-y-3">
              {[
                "Постоечките термини ги внесуваме заедно",
                "Поддршка на македонски",
                "30 дена бесплатно",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-ink-muted">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-flame/15 text-flame">
                    <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal variant="right" delay={100}>
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-md md:p-8">
              <LeadForm />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
