import { useEffect, useRef, useState } from "react";
import { Reveal } from "./Reveal";
import calendarScreenshot from "../../assets/calendarScreenshot.png";

// Counts up when scrolled into view; jumps straight to the value when the
// visitor prefers reduced motion.
function CountUp({ to, duration = 900 }: { to: number; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setValue(to);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const p = Math.min((now - start) / duration, 1);
          setValue(Math.round(to * (1 - Math.pow(1 - p, 3))));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.5 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [to, duration]);

  return <span ref={ref}>{value}</span>;
}

const cardBase =
  "lift flex h-full flex-col rounded-2xl border border-border bg-background p-7";

export function Features() {
  return (
    <section id="features" className="w-full bg-white px-4 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-primary">
            Можности
          </p>
          <h2 className="mt-4 max-w-2xl text-3xl leading-[1.08] tracking-[-0.025em] md:text-5xl">
            Сè што ѝ треба на една ординација
          </h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-3">
          {/* SMS reminders */}
          <Reveal className="md:col-span-2">
            <div className={cardBase}>
              <h3 className="text-lg font-medium">Автоматски СМС потсетници</h3>
              <p className="mt-2 leading-relaxed text-muted-foreground">
                Пораката се испраќа сама, ден пред терминот. Пациентот не заборава, вие не ѕвоните.
              </p>
              <div className="mt-6 space-y-2.5 rounded-xl bg-muted p-4">
                <div className="chat-bubble chat-bubble-1 max-w-[85%] rounded-2xl rounded-tl-sm bg-white px-4 py-2.5 text-sm shadow-sm">
                  Потсетуваме: утре во 10:00 имате термин кај д-р Стојановска.
                </div>
                <div className="chat-bubble chat-bubble-2 ml-auto max-w-[62%] rounded-2xl rounded-tr-sm bg-secondary px-4 py-2.5 text-sm text-secondary-foreground shadow-sm">
                  Ќе дојдам, благодарам!
                </div>
              </div>
            </div>
          </Reveal>

          {/* 9 -> 1 */}
          <Reveal delay={80}>
            <div className={cardBase}>
              <h3 className="text-lg font-medium">Помалку празни столови</h3>
              <p className="mt-2 leading-relaxed text-muted-foreground">
                Од 9 пропуштени термини месечно, на само 1.
              </p>
              <div className="mt-auto flex items-end justify-center gap-8 pt-8" aria-hidden="true">
                <div className="text-center">
                  <div className="chart-bar mx-auto w-14 rounded-t-xl bg-muted-foreground/25" style={{ height: 112 }} />
                  <div className="mt-3 font-[Manrope] text-3xl font-extrabold text-muted-foreground">
                    <CountUp to={9} />
                  </div>
                  <div className="text-xs text-muted-foreground">без потсетник</div>
                </div>
                <div className="text-center">
                  <div className="chart-bar mx-auto w-14 rounded-t-xl bg-gradient-to-t from-primary to-accent" style={{ height: 14 }} />
                  <div className="mt-3 font-[Manrope] text-3xl font-extrabold text-primary">
                    <CountUp to={1} duration={1200} />
                  </div>
                  <div className="text-xs text-muted-foreground">со Appointzy</div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* SMS templates */}
          <Reveal className="md:col-span-2">
            <div className={cardBase}>
              <h3 className="text-lg font-medium">СМС шаблони што ги пишувате вие</h3>
              <p className="mt-2 leading-relaxed text-muted-foreground">
                Пораката ја составувате со свои зборови и додавате {"{име}"}, {"{датум}"} и {"{време}"}. Ја поставувате еднаш, системот ја праќа на секој пациент.
              </p>
              <div className="mt-6 space-y-3" aria-hidden="true">
                <div className="rounded-xl border border-border bg-white p-4">
                  <div className="mb-2 text-xs uppercase tracking-wider text-muted-foreground">
                    Вашиот шаблон
                  </div>
                  {/* Punctuation must hug the chips: a newline between an
                      element and following text renders as a space in JSX. */}
                  <p className="text-sm leading-relaxed">
                    {"Почитувана "}
                    <span className="rounded bg-secondary px-1.5 py-0.5 font-medium text-primary">{"{име}"}</span>
                    {", ве потсетуваме за вашиот термин на "}
                    <span className="rounded bg-secondary px-1.5 py-0.5 font-medium text-primary">{"{датум}"}</span>
                    {" во "}
                    <span className="rounded bg-secondary px-1.5 py-0.5 font-medium text-primary">{"{време}"}</span>
                    {"."}
                    <span className="caret ml-0.5 inline-block h-4 w-px translate-y-0.5 bg-primary" />
                  </p>
                </div>
                <div className="flex justify-center text-muted-foreground">
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 5v14M6 13l6 6 6-6" />
                  </svg>
                </div>
                <div className="rounded-xl bg-muted p-4">
                  <div className="mb-2 text-xs uppercase tracking-wider text-muted-foreground">
                    Што добива пациентот
                  </div>
                  <p className="text-sm leading-relaxed">
                    Почитувана Марија, ве потсетуваме за вашиот термин на 12.10 во 10:00.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Works on phone */}
          <Reveal delay={80}>
            <div className={cardBase}>
              <h3 className="text-lg font-medium">Работи на телефон</h3>
              <p className="mt-2 leading-relaxed text-muted-foreground">
                Се отвора во прелистувачот. Без инсталација, од каде било.
              </p>
              <div className="mx-auto mt-6 w-36 rounded-[1.6rem] border-4 border-foreground/12 bg-white p-2.5 shadow-lg" aria-hidden="true">
                <div className="mx-auto mb-2.5 h-1 w-10 rounded-full bg-muted-foreground/25" />
                <div className="space-y-1.5">
                  <div className="rounded-md bg-secondary px-2 py-1.5 text-[10px] leading-tight text-secondary-foreground">
                    09:00 · Марија П.
                  </div>
                  <div className="rounded-md bg-muted px-2 py-1.5 text-[10px] leading-tight">
                    10:30 · Стефан Н.
                  </div>
                  <div className="rounded-md bg-muted px-2 py-1.5 text-[10px] leading-tight">
                    12:00 · Елена Ј.
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Calendar */}
          <Reveal className="md:col-span-2">
            <div className={cardBase}>
              <h3 className="text-lg font-medium">Јасен ден и јасна недела</h3>
              <p className="mt-2 leading-relaxed text-muted-foreground">
                Целата недела на еден поглед, по вработен. Без прецртување, без гужва во тетратка.
              </p>
              <div className="mt-6 overflow-hidden rounded-xl border border-border shadow-sm">
                <img
                  src={calendarScreenshot}
                  alt="Неделен приказ на календарот во Appointzy"
                  width={1607}
                  height={797}
                  loading="lazy"
                  className="h-auto w-full"
                />
              </div>
            </div>
          </Reveal>

          {/* Recurring visits */}
          <Reveal delay={80}>
            <div className={cardBase}>
              <h3 className="text-lg font-medium">Повторувачки посети</h3>
              <p className="mt-2 leading-relaxed text-muted-foreground">
                Серија од десет физиотерапии? Ја внесувате еднаш, а системот ги закажува сите и потсетува за секоја одделно.
              </p>
              <div className="mt-6 flex flex-wrap gap-2" aria-hidden="true">
                {["Пон 12.10", "Сре 14.10", "Пет 16.10", "Пон 19.10", "Сре 21.10"].map((d, i) => (
                  <span
                    key={d}
                    className={`rounded-full px-3 py-1.5 text-sm ${
                      i < 3
                        ? "bg-secondary text-secondary-foreground"
                        : "border border-border bg-white text-muted-foreground"
                    }`}
                  >
                    {i < 3 ? "✓ " : ""}
                    {d}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Patient records */}
          <Reveal className="md:col-span-2">
            <div className={cardBase}>
              <h3 className="text-lg font-medium">Картон и снимки на пациентот</h3>
              <p className="mt-2 leading-relaxed text-muted-foreground">
                Снимките и историјата на посети стојат кај пациентот, во системот. Не барате по фолдери, УСБ или стар компјутер.
              </p>
              <div className="mt-6 rounded-xl bg-muted p-4" aria-hidden="true">
                <div className="mb-4 flex items-center gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-xs font-semibold text-white">
                    МП
                  </span>
                  <div className="min-w-0">
                    <div className="text-sm font-medium">Марија Петровска</div>
                    <div className="text-xs text-muted-foreground">Последна посета: 12.10</div>
                  </div>
                </div>
                <div className="flex gap-2">
                  {["14.03", "12.10"].map((d) => (
                    <div key={d} className="w-20 shrink-0">
                      <div className="relative h-16 overflow-hidden rounded-lg bg-foreground/80">
                        <div className="absolute inset-x-2 bottom-1 top-3 rounded-t-full bg-white/15" />
                      </div>
                      <div className="mt-1 text-[10px] text-muted-foreground">Снимка {d}</div>
                    </div>
                  ))}
                  <div className="min-w-0 flex-1 space-y-1.5">
                    {["Чистење забен камен", "Контрола", "Пломба"].map((v) => (
                      <div key={v} className="truncate rounded-md bg-white px-2 py-1 text-[11px]">
                        {v}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Branding */}
          <Reveal delay={80}>
            <div className={cardBase}>
              <h3 className="text-lg font-medium">Со вашето лого и вашите бои</h3>
              <p className="mt-2 leading-relaxed text-muted-foreground">
                Апликацијата изгледа како ваша. Работните часови, услугите и вработените се поставени како кај вас.
              </p>
              <div
                className="mt-6 overflow-hidden rounded-xl border border-border bg-white shadow-sm"
                aria-hidden="true"
              >
                <div className="flex items-center bg-gradient-to-r from-primary to-accent px-3 py-2.5">
                  <span className="rounded bg-white/95 px-2 py-1 text-[10px] font-semibold tracking-wide text-primary">
                    ВАШЕ ЛОГО
                  </span>
                </div>
                <div className="space-y-2 p-3">
                  <div className="h-2 w-2/3 rounded-full bg-muted" />
                  <div className="h-2 w-1/2 rounded-full bg-muted" />
                  <div className="flex items-center gap-2 pt-2">
                    {[
                      { c: "#c2410c", on: true },
                      { c: "#0f766e", on: false },
                      { c: "#1d4ed8", on: false },
                      { c: "#7e22ce", on: false },
                    ].map(({ c, on }) => (
                      <span
                        key={c}
                        style={{ backgroundColor: c }}
                        className={`h-5 w-5 rounded-full ${
                          on ? "ring-2 ring-foreground/30 ring-offset-2" : ""
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Supplier invoices — deliberately the quietest block: the page is
              about scheduling, this is a secondary capability. */}
          <Reveal className="md:col-span-3">
            <div className="rounded-2xl border border-border bg-muted/40 p-6 md:flex md:items-center md:justify-between md:gap-8">
              <div className="md:max-w-xl">
                <h3 className="text-base font-medium">Влезни фактури и ДДВ</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  Фактурите од добавувачите ги внесувате со автоматска пресметка на ДДВ и вкупни износи. Сликајте ја фактурата со телефон и AI ги пополнува податоците.
                </p>
              </div>
              <div
                className="mt-4 shrink-0 rounded-xl border border-border bg-white px-4 py-3 text-sm md:mt-0 md:w-56"
                aria-hidden="true"
              >
                <div className="flex justify-between text-muted-foreground">
                  <span>Нето</span>
                  <span>13.500</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>ДДВ 18%</span>
                  <span>2.430</span>
                </div>
                <div className="mt-1 flex justify-between border-t border-border pt-1 font-medium">
                  <span>Вкупно</span>
                  <span>15.930</span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
