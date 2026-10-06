import { Reveal } from "./Reveal";
import { useT } from "../../i18n";

export function HowItWorks() {
  const t = useT().how;
  const steps = t.steps;
  return (
    <section className="w-full bg-background px-4 py-20 md:py-28">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-primary">
            {t.eyebrow}
          </p>
          <h2 className="mt-4 max-w-2xl text-3xl leading-[1.08] tracking-[-0.025em] md:text-5xl">
            {t.title}
          </h2>
          <p className="mt-5 text-lg text-muted-foreground">{t.subtitle}</p>
        </Reveal>

        <Reveal stagger className="relative mt-14 grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-6">
          {steps.map((step, i) => (
            <div key={step.title} className="relative">
              <div className="flex items-center gap-4 md:block">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary font-[Manrope] text-lg font-extrabold text-primary-foreground shadow-[0_12px_28px_-12px_rgba(194,65,12,0.8)]">
                  {i + 1}
                </span>
                {/* connector between steps on desktop */}
                {i < steps.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="absolute left-14 right-0 top-6 hidden h-px bg-gradient-to-r from-primary/30 to-transparent md:block"
                  />
                )}
              </div>
              <h3 className="mt-5 text-lg font-medium">{step.title}</h3>
              <p className="mt-2 leading-relaxed text-muted-foreground">{step.text}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
