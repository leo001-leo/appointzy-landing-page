import { Reveal } from "./Reveal";

// Native <details>/<summary>: keyboard-accessible accordion with zero JS.
const items = [
  {
    q: "Дали Appointzy е софтвер за стоматолошка ординација?",
    a: "Да. Appointzy е софтвер за закажување термини за стоматолошки ординации, физиотерапевтски и останати приватни ординации. Истите функции работат за секоја пракса што работи со термини.",
  },
  {
    q: "Што ако веќе користиме друга програма?",
    a: "Не е проблем. При поставувањето заедно ги внесуваме постоечките термини, така што од првиот ден работите со полн календар.",
  },
  {
    q: "Дали е тешко за учење?",
    a: "Не. Ако знаете да користите Viber, знаете да користите Appointzy. Внесувањето термин трае десетина секунди, а сè друго оди само.",
  },
  {
    q: "Дали пациентите мора да инсталираат нешто?",
    a: "Не. Пациентите добиваат обична СМС порака. Не им треба апликација, ниту интернет.",
  },
  {
    q: "Што ќе се случи со термините од тетратката?",
    a: "При поставувањето заедно ги внесуваме постоечките термини. Од првиот ден работите со полн календар.",
  },
  {
    q: "Работи ли на телефон?",
    a: "Да. Appointzy се отвора во прелистувачот на кој било телефон, таблет или компјутер, без инсталација.",
  },
  {
    q: "Кој ги праќа потсетниците?",
    a: "Системот, автоматски, ден пред терминот. Вие само го внесувате терминот и ништо повеќе.",
  },
];

export function FAQ() {
  return (
    <section className="w-full bg-white px-4 py-20 md:py-28">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-primary">
            Прашања
          </p>
          <h2 className="mt-4 text-3xl leading-[1.08] tracking-[-0.025em] md:text-5xl">
            Најчести прашања
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
