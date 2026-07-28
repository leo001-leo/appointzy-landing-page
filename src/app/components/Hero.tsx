import { LeadForm } from "./LeadForm";
import calendarScreenshot from "../../assets/calendarScreenshot.png";

export function Hero() {
  return (
    <section id="hero" className="w-full px-4 pt-10 pb-14 md:pt-16 md:pb-20">
      <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2 lg:gap-14">
        {/* Copy + form */}
        <div>
          <span className="mb-4 inline-block rounded-full bg-secondary px-3 py-1 text-sm text-secondary-foreground">
            30 дена бесплатно
          </span>
          <h1 className="text-[2rem] leading-[1.12] md:text-5xl">
            Празен стол значи изгубен час и изгубени пари.
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Appointzy автоматски им праќа СМС потсетник на пациентите. Кај нашите
            корисници, пропуштените термини паднаа од 9 месечно на само 1.
          </p>
          <div className="mt-6 max-w-md">
            <LeadForm />
          </div>
        </div>

        {/* Product visual */}
        <div className="relative">
          {/* Soft glow behind the screenshot */}
          <div
            aria-hidden="true"
            className="glow-drift absolute -inset-6 rounded-[2rem] bg-accent/15 blur-3xl"
          />
          <div className="relative overflow-hidden rounded-2xl border border-border bg-white shadow-2xl">
            <img
              src={calendarScreenshot}
              alt="Неделен календар во Appointzy со закажани термини"
              width={1210}
              height={765}
              className="h-auto w-full"
            />
          </div>
          {/* SMS reminder arriving — the core action, animated once on load */}
          <div className="sms-arrive absolute -bottom-5 left-3 right-3 sm:left-auto sm:right-6 sm:w-80">
            <div className="rounded-2xl border border-border bg-white p-4 shadow-xl">
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-secondary">
                  <svg className="h-5 w-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-medium">СМС до Марија П.</div>
                  <p className="mt-0.5 text-sm text-muted-foreground">
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
    </section>
  );
}
