import { Reveal } from "./Reveal";

// Native <details>/<summary>: keyboard-accessible accordion with zero JS.
const items = [
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
    <section className="w-full bg-white px-4 py-14 md:py-20">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <h2 className="text-3xl md:text-4xl">Најчести прашања</h2>
        </Reveal>
        <div className="mt-8 space-y-3">
          {items.map((item, i) => (
            <Reveal key={item.q} delay={i * 50}>
              <details className="group rounded-2xl border border-border bg-background px-5">
                <summary className="flex min-h-[44px] cursor-pointer list-none items-center justify-between gap-4 py-4 font-medium [&::-webkit-details-marker]:hidden">
                  {item.q}
                  <svg
                    className="h-5 w-5 shrink-0 text-muted-foreground transition-transform group-open:rotate-180"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </summary>
                <p className="pb-5 text-muted-foreground">{item.a}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
