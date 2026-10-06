import { Reveal } from "./Reveal";
import { useT } from "../../i18n";

// Native <details>/<summary>: keyboard-accessible accordion with zero JS.
// The FAQ schema in <head> is generated from the same dictionary entries.
export function FAQ() {
  const t = useT().faq;
  const items = t.items;
  return (
    <section className="w-full bg-white px-4 py-20 md:py-28">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-primary">
            {t.eyebrow}
          </p>
          <h2 className="mt-4 text-3xl leading-[1.08] tracking-[-0.025em] md:text-5xl">
            {t.title}
          </h2>
        </Reveal>

        <Reveal stagger className="mt-12 space-y-3">
          {items.map((item) => (
            <details
              key={item.q}
              className="group rounded-2xl border border-border bg-background px-6 transition-colors duration-300 open:bg-white hover:border-primary/30"
            >
              <summary className="flex min-h-[56px] cursor-pointer list-none items-center justify-between gap-4 py-4 font-medium [&::-webkit-details-marker]:hidden">
                {item.q}
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border bg-white text-muted-foreground transition-all duration-300 group-open:rotate-45 group-open:border-primary group-open:bg-primary group-open:text-primary-foreground">
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </span>
              </summary>
              <p className="pb-6 leading-relaxed text-muted-foreground">{item.a}</p>
            </details>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
