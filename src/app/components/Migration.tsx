import { Reveal } from "./Reveal";

const notebook = [
  { time: "09:00", name: "Марија", cancelled: true },
  { time: "10:30", name: "Стефан", cancelled: false },
  { time: "11:00", name: "Елена", cancelled: true },
  { time: "12:00", name: "Дарко", cancelled: false },
];

// Sits directly under the hero: removes the biggest reason not to switch.
export function Migration() {
  return (
    <section className="w-full bg-secondary px-4 py-12 md:py-16">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="md:flex md:items-center md:gap-14">
            <div className="md:flex-1">
              <h2 className="text-2xl md:text-3xl">Не почнувате од нула</h2>
              <p className="mt-3 text-lg leading-relaxed text-muted-foreground">
                Заедно ги внесуваме постоечките термини пред да почнете. Од првиот
                ден календарот е полн, исто како тетратката, само без прецртување.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-3 md:mt-0 md:flex-1" aria-hidden="true">
              <div className="rounded-xl border border-border bg-white p-4">
                <div className="mb-3 text-xs text-muted-foreground">Тетратка</div>
                <div className="space-y-2">
                  {notebook.map(({ time, name, cancelled }) => (
                    <div
                      key={time}
                      className={`text-xs ${
                        cancelled ? "text-muted-foreground/70 line-through" : ""
                      }`}
                    >
                      {time} {name}
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-xl border border-border bg-white p-4">
                <div className="mb-3 text-xs text-primary">Appointzy</div>
                <div className="space-y-1.5">
                  {notebook.map(({ time, name }) => (
                    <div
                      key={time}
                      className="rounded-md bg-secondary px-2 py-1 text-xs"
                    >
                      {time} {name}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
