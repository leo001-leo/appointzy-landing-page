import { LeadForm } from "./LeadForm";
import { PhoneDemo } from "./PhoneDemo";
import { useT } from "../../i18n";

export function Hero() {
  const all = useT();
  const t = all.hero;
  const clients = t.clients;
  // Драган from Vesna Dent, the first of the page's testimonials.
  const quote = all.proof.quotes[0];
  return (
    <section id="hero" className="grain relative overflow-hidden bg-ink text-ink-fg">
      {/* Ambient light: two slow-drifting colour fields + a fine grid */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="aurora-a absolute -right-40 -top-56 h-[40rem] w-[40rem] rounded-full bg-[radial-gradient(circle,rgba(234,88,12,0.45),transparent_65%)] blur-3xl" />
        <div className="aurora-b absolute -bottom-64 -left-48 h-[36rem] w-[36rem] rounded-full bg-[radial-gradient(circle,rgba(251,146,60,0.28),transparent_65%)] blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.045)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_at_50%_0%,#000_35%,transparent_78%)]" />
      </div>

      {/* pt matches the height the fixed nav used to occupy in flow */}
      <div className="relative mx-auto max-w-6xl px-4 pb-16 pt-24 md:pb-24 md:pt-32">
        <div className="hero-grid">
          <div className="hero-copy">
            <div className="rise mb-5 flex flex-wrap gap-2" style={{ "--d": "60ms" } as React.CSSProperties}>
              <span className="rounded-full border border-white/12 bg-white/[0.06] px-3 py-1 text-sm text-ink-muted backdrop-blur-sm">
                {t.badgeAudience}
              </span>
              <span className="rounded-full border border-flame/25 bg-flame/10 px-3 py-1 text-sm text-flame backdrop-blur-sm">
                {t.badgeTrial}
              </span>
            </div>

            <h1
              className="rise text-[2.5rem] leading-[1.02] tracking-[-0.035em] md:text-6xl lg:text-[4.25rem]"
              style={{ "--d": "140ms" } as React.CSSProperties}
            >
              {t.titleBefore}
              <span className="bg-gradient-to-r from-[#fdba74] via-[#fb923c] to-[#f97316] bg-clip-text text-transparent">
                {t.titleHighlight}
              </span>
              {t.titleAfter}
            </h1>

            <p
              className="rise mt-5 max-w-md text-lg leading-relaxed text-ink-muted"
              style={{ "--d": "230ms" } as React.CSSProperties}
            >
              {t.subtitle}
            </p>
          </div>

          {/* The product, before anything is asked */}
          <div className="hero-demo rise lg:pl-4" style={{ "--d": "300ms" } as React.CSSProperties}>
            <PhoneDemo />
          </div>

          {/* A dentist who uses it, in his own words */}
          <figure
            className="hero-proof rise max-w-xl rounded-2xl border border-white/10 bg-white/[0.05] p-5 backdrop-blur-sm"
            style={{ "--d": "380ms" } as React.CSSProperties}
          >
            <blockquote className="text-[0.95rem] leading-relaxed text-ink-fg">
              {all.proof.quoteOpen}
              {quote.text}
              {all.proof.quoteClose}
            </blockquote>
            <figcaption className="mt-4 flex items-center gap-3">
              {"photo" in quote && quote.photo && (
                <img
                  src={quote.photo}
                  alt=""
                  width={44}
                  height={44}
                  className="h-11 w-11 shrink-0 rounded-full object-cover ring-2 ring-flame/40"
                />
              )}
              <span className="text-sm leading-snug">
                <span className="block font-semibold text-ink-fg">{quote.name}</span>
                <span className="block text-ink-muted">{quote.role}</span>
              </span>
            </figcaption>
          </figure>

          <div className="hero-form rise max-w-xl" style={{ "--d": "450ms" } as React.CSSProperties}>
            <LeadForm />
          </div>
        </div>

        {/* Real practices already using it */}
        <div className="mt-20 md:mt-24">
          <p className="text-center text-sm text-white/40">
            {t.clientsBefore}
            <span className="font-semibold text-white/85">{t.clientsCount}</span>
            {t.clientsAfter}
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
