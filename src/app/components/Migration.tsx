import { Reveal } from "./Reveal";

const entries = [
  { time: "09:00", name: "Марија", cancelled: true },
  { time: "10:30", name: "Стефан", cancelled: false },
  { time: "11:00", name: "Елена", cancelled: true },
  { time: "12:00", name: "Дарко", cancelled: false },
];

// Sits directly under the hero: removes the biggest reason not to switch.
export function Migration() {
  return (
    <section className="w-full bg-background px-4 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal variant="left">
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-primary">
              Почеток
            </p>
            <h2 className="mt-4 text-3xl leading-[1.08] tracking-[-0.025em] md:text-5xl">
              Не почнувате
              <br />
              од нула
            </h2>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-muted-foreground">
              Заедно ги внесуваме постоечките термини пред да почнете. Од првиот
              ден календарот е полн, исто како тетратката, само без прецртување.
            </p>
          </Reveal>

          <Reveal variant="right" delay={100}>
            <div className="relative grid grid-cols-2 gap-4" aria-hidden="true">
              <div className="rounded-2xl border border-border bg-white p-5">
                <div className="mb-4 text-xs uppercase tracking-wider text-muted-foreground">
                  Тетратка
                </div>
                <div className="space-y-2.5">
                  {entries.map(({ time, name, cancelled }) => (
                    <div
                      key={time}
                      className={`text-sm ${
                        cancelled ? "text-muted-foreground/60 line-through" : "text-foreground/80"
                      }`}
                    >
                      {time} {name}
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-primary/20 bg-white p-5 shadow-[0_20px_50px_-25px_rgba(194,65,12,0.5)]">
                <div className="mb-4 text-xs uppercase tracking-wider text-primary">
                  Appointzy
                </div>
                <div className="space-y-2">
                  {entries.map(({ time, name }) => (
                    <div
                      key={time}
                      className="rounded-lg bg-secondary px-2.5 py-1.5 text-sm text-secondary-foreground"
                    >
                      {time} {name}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
