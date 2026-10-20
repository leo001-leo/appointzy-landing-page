import { Reveal } from "./Reveal";
import { useT } from "../../i18n";

// `photo` is intentionally left empty: real practice photos can be dropped in
// later and the initials avatar is the fallback. We do not use stock or
// AI-generated faces for real, named customers.
const avatarTints = [
  "from-primary to-accent",
  "from-accent to-[#f59e0b]",
  "from-[#b45309] to-primary",
  "from-primary to-[#ea580c]",
  "from-[#c2410c] to-[#fb923c]",
  "from-[#9a3412] to-accent",
];

export function Proof() {
  const dict = useT();
  const t = dict.proof;
  const quotes = t.quotes;
  const cta = dict.form.submit;
  return (
    <section className="w-full bg-background px-4 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-primary">
            {t.eyebrow}
          </p>
          <h2 className="mt-4 max-w-2xl text-3xl leading-[1.08] tracking-[-0.025em] md:text-5xl">
            {t.title}
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            {t.intro}
          </p>
        </Reveal>

        {/* Phones: a swipeable row with the next card peeking in.
            Tablet and up: a grid. The closing "30+" tile makes twelve, which
            fills two or three columns with no empty slot. */}
        <Reveal
          stagger
          className="-mx-4 mt-14 flex snap-x snap-mandatory scroll-pl-4 gap-4 overflow-x-auto px-4 pb-2 [scrollbar-width:none] md:mx-0 md:grid md:grid-cols-2 md:gap-5 md:overflow-visible md:px-0 md:pb-0 lg:grid-cols-3 [&::-webkit-scrollbar]:hidden"
        >
          {quotes.map((q, i) => (
            <div key={`${q.name}-${q.role}`} className="w-[84%] shrink-0 snap-start md:w-auto">
              <figure className="lift flex h-full flex-col rounded-2xl border border-border bg-white p-7">
                <div className="mb-4 flex gap-0.5 text-accent" aria-hidden="true">
                  {[...Array(5)].map((_, s) => (
                    <svg key={s} className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                      <path d="m12 17.27 6.18 3.73-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                </div>
                <blockquote className="flex-1 leading-relaxed text-foreground/90">
                  {t.quoteOpen}
                  {q.text}
                  {t.quoteClose}
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-border pt-5">
                  <span
                    aria-hidden="true"
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${
                      avatarTints[i % avatarTints.length]
                    } font-[Manrope] text-base font-extrabold text-white`}
                  >
                    {q.name.charAt(0)}
                  </span>
                  <span className="min-w-0">
                    <span className="block font-medium">{q.name}</span>
                    <span className="block text-sm text-muted-foreground">{q.role}</span>
                  </span>
                </figcaption>
              </figure>
            </div>
          ))}

          <div className="w-[84%] shrink-0 snap-start md:w-auto">
            <div className="grain relative flex h-full flex-col justify-between overflow-hidden rounded-2xl bg-ink p-7 text-ink-fg">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(234,88,12,0.45),transparent_65%)] blur-2xl"
              />
              <p className="relative">
                <span className="block bg-gradient-to-r from-[#fdba74] to-[#f97316] bg-clip-text font-[Manrope] text-7xl font-extrabold tracking-[-0.04em] text-transparent">
                  {t.statCount}
                </span>
                <span className="mt-2 block text-lg text-ink-muted">{t.statLabel}</span>
              </p>
              <a
                href="#cta"
                className="group relative mt-10 inline-flex items-center gap-2 font-semibold text-flame transition-colors duration-200 hover:text-[#fdba74] focus:outline-none focus-visible:underline"
              >
                {cta}
                <svg className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
