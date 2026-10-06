import { Reveal } from "./Reveal";
import { useT } from "../../i18n";

export function Problem() {
  const t = useT().problem;
  const pains = t.pains;
  return (
    <section className="w-full bg-white px-4 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-primary">
            {t.eyebrow}
          </p>
          <h2 className="mt-4 max-w-2xl text-3xl leading-[1.08] tracking-[-0.025em] md:text-5xl">
            {t.title}
          </h2>
        </Reveal>

        <Reveal stagger className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          {pains.map((pain, i) => (
            <div
              key={pain.title}
              className="lift group h-full rounded-2xl border border-border bg-background p-7"
            >
              <div className="mb-5 font-[Manrope] text-4xl font-extrabold text-primary/25 transition-colors duration-300 group-hover:text-primary/40">
                0{i + 1}
              </div>
              <h3 className="text-lg font-medium leading-snug">{pain.title}</h3>
              <p className="mt-2.5 leading-relaxed text-muted-foreground">{pain.text}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
