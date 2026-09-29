import { Reveal } from "./Reveal";

// `photo` is intentionally left empty: real practice photos can be dropped in
// later and the initials avatar is the fallback. We do not use stock or
// AI-generated faces for real, named customers.
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
    text: "Нашите пациенти доаѓаат на серии од повеќе терапии. Серијата ја внесувам еднаш и за секоја терапија стигнува посебен потсетник. Порано секој термин го потврдував со повик.",
    name: "Мите",
    role: "Физиотерапевтска ординација Ivanum",
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
    text: "Распоредот го гледам на телефон, каде и да сум. Потсетниците одат сами, па пациентите ретко забораваат термин, а јас не губам време на повици.",
    name: "Бојан",
    role: "Физиотерапевтска ординација Физио Динамик",
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

const avatarTints = [
  "from-primary to-accent",
  "from-accent to-[#f59e0b]",
  "from-[#b45309] to-primary",
  "from-primary to-[#ea580c]",
  "from-[#c2410c] to-[#fb923c]",
  "from-[#9a3412] to-accent",
];

export function Proof() {
  return (
    <section className="w-full bg-background px-4 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-primary">
            Доверба
          </p>
          <h2 className="mt-4 max-w-2xl text-3xl leading-[1.08] tracking-[-0.025em] md:text-5xl">
            Наш производ, создаден со нашите ординации
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Appointzy е развиен во Македонија, заедно со стоматолозите и
            физиотерапевтите што го користат секој ден. Нивните предлози
            стануваат дел од апликацијата, а поддршката ја добивате на македонски,
            од луѓе што знаат како работи една ординација.
          </p>
        </Reveal>

        {/* Phones: a swipeable row with the next card peeking in.
            Tablet and up: a grid, two rows of four on wide screens. */}
        <Reveal
          stagger
          className="-mx-4 mt-14 flex snap-x snap-mandatory scroll-pl-4 gap-4 overflow-x-auto px-4 pb-2 [scrollbar-width:none] md:mx-0 md:grid md:grid-cols-2 md:gap-5 md:overflow-visible md:px-0 md:pb-0 xl:grid-cols-4 [&::-webkit-scrollbar]:hidden"
        >
          {quotes.map((q, i) => (
            <div key={`${q.name}-${q.role}`} className="w-[84%] shrink-0 snap-start md:w-auto">
              <figure className="lift flex h-full flex-col rounded-2xl border border-border bg-white p-7 xl:p-6">
                <div className="mb-4 flex gap-0.5 text-accent" aria-hidden="true">
                  {[...Array(5)].map((_, s) => (
                    <svg key={s} className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                      <path d="m12 17.27 6.18 3.73-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                </div>
                <blockquote className="flex-1 leading-relaxed text-foreground/90">
                  „{q.text}"
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
        </Reveal>
      </div>
    </section>
  );
}
