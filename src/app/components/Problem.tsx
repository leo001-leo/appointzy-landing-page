import { Reveal } from "./Reveal";

const pains = [
  {
    title: "Телефонот ѕвони среде интервенција",
    text: "Со ракавици на рацете, нема кој да крене. Пациентот се јавува трипати, па се откажува.",
  },
  {
    title: "Пациентот не дојде",
    text: "Никој не го потсетил. Столот стои празен, а часот е изгубен.",
  },
  {
    title: "Тетратката е полна прецртани имиња",
    text: "Никој не знае кој термин важи, а кој е откажан уште минатата недела.",
  },
];

export function Problem() {
  return (
    <section className="w-full bg-white px-4 py-14 md:py-20">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <h2 className="max-w-xl text-3xl md:text-4xl">Ви звучи познато?</h2>
        </Reveal>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {pains.map((pain, i) => (
            <Reveal key={pain.title} delay={i * 80}>
              <div className="h-full rounded-2xl border border-border bg-background p-6">
                <div className="mb-3 h-1.5 w-10 rounded-full bg-accent" aria-hidden="true" />
                <h3 className="font-medium">{pain.title}</h3>
                <p className="mt-2 text-muted-foreground">{pain.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
