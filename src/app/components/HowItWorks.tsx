import { Reveal } from "./Reveal";

const steps = [
  {
    title: "Оставате е-маил",
    text: "Ние ве контактираме и поставуваме сè за вашата пракса. Постоечките термини ги внесуваме заедно.",
  },
  {
    title: "Внесувате термини",
    text: "Нов термин се внесува за десетина секунди, од компјутер или од телефон.",
  },
  {
    title: "Пациентите добиваат потсетник",
    text: "СМС пораката се испраќа сама, ден пред терминот. Вие не правите ништо.",
  },
];

export function HowItWorks() {
  return (
    <section className="w-full px-4 py-14 md:py-20">
      <div className="mx-auto max-w-4xl">
        <Reveal>
          <h2 className="text-3xl md:text-4xl">Како до првиот термин</h2>
          <p className="mt-3 text-lg text-muted-foreground">Три чекори, ништо повеќе.</p>
        </Reveal>
        <ol className="mt-10 space-y-8">
          {steps.map((step, i) => (
            <Reveal key={step.title} delay={i * 80}>
              <li className="flex items-start gap-5">
                <span
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary font-[Manrope] text-lg font-extrabold text-primary-foreground"
                  aria-hidden="true"
                >
                  {i + 1}
                </span>
                <div className="pt-1">
                  <h3 className="font-medium">{step.title}</h3>
                  <p className="mt-1 text-muted-foreground">{step.text}</p>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
