import { Reveal } from "./Reveal";

const quotes = [
  {
    text: "Appointzy го трансформираше начинот на кој управуваме со нашиот бизнис. Резервирањето термини сега е лесно, а на нашите клиенти им се допаѓаат СМС потсетниците.",
    name: "Срна",
    role: "Сопственичка на приватна ординација",
  },
  {
    text: "Со Appointzy немаме повеќе проблеми со двојни термини и пропуштени закажувања. Сè е јасно, прегледно и персоналот брзо го совлада системот.",
    name: "Блаженка",
    role: "Бадент ординација",
  },
  {
    text: "Appointzy ни даде професионален изглед пред клиентите. СМС потсетниците значително го намалија бројот на неодржани термини и заштедивме многу работно време.",
    name: "Иво",
    role: "Dental Prestige",
  },
  {
    text: "Го препорачувам на секој кој работи со термини. За еден ден го имавме системот поставен и ставен во употреба. Едноставно и практично.",
    name: "Драган",
    role: "Весна Дент",
  },
  {
    text: "Конечно имаме преглед на целата недела без телефонски повици и тетратка. Пациентите доаѓаат навреме благодарение на потсетниците.",
    name: "Александра",
    role: "ПЗУ Д-р Стојанова",
  },
  {
    text: "Контролите што се повторуваат со месеци сега се закажуваат однапред, а потсетниците стигнуваат сами. Огромно олеснување за нас.",
    name: "Александра",
    role: "Ortoalex",
  },
];

export function Proof() {
  return (
    <section className="w-full px-4 py-14 md:py-20">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <h2 className="max-w-2xl text-3xl md:text-4xl">
            Веќе во употреба во Македонија
          </h2>
          <p className="mt-3 max-w-2xl text-lg text-muted-foreground">
            Appointzy веќе го користат стоматолошки ординации и физиотерапевти низ
            земјата. Направено во Македонија, со поддршка на македонски.
          </p>
        </Reveal>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {quotes.map((q, i) => (
            <Reveal key={q.name} delay={(i % 2) * 80}>
              <figure className="flex h-full flex-col rounded-2xl border border-border bg-white p-6">
                <blockquote className="leading-relaxed">„{q.text}"</blockquote>
                <figcaption className="mt-4 pt-4 border-t border-border">
                  <span className="font-medium">{q.name}</span>
                  <span className="block text-sm text-muted-foreground">{q.role}</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
