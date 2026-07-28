import { useEffect, useRef, useState } from "react";
import { Reveal } from "./Reveal";
import calendarScreenshot from "../../assets/calendarScreenshot.png";

// Counts up from 0 when scrolled into view; shows the final value
// immediately when the user prefers reduced motion.
function CountUp({ to, duration = 700 }: { to: number; duration?: number }) {
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

// Bento grid: every card shows a small piece of real-looking UI, not an icon.
export function Features() {
  return (
    <section className="w-full bg-white px-4 py-14 md:py-20">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <h2 className="max-w-2xl text-3xl md:text-4xl">
            Сè што ѝ треба на една пракса. Ништо што не ѝ треба.
          </h2>
        </Reveal>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {/* SMS reminders — chat mockup */}
          <Reveal className="md:col-span-2">
            <div className="flex h-full flex-col rounded-2xl border border-border bg-background p-6">
              <h3 className="font-medium">Автоматски СМС потсетници</h3>
              <p className="mt-1 text-muted-foreground">
                Пораката заминува сама, ден пред терминот. Пациентот не заборава, вие не ѕвоните.
              </p>
              <div className="mt-5 space-y-2.5 rounded-xl bg-muted p-4">
                <div className="chat-bubble chat-bubble-1 max-w-[85%] rounded-2xl rounded-tl-sm bg-white px-4 py-2.5 text-sm shadow-sm">
                  Потсетуваме: утре во 10:00 имате термин кај д-р Стојановска.
                </div>
                <div className="chat-bubble chat-bubble-2 ml-auto max-w-[60%] rounded-2xl rounded-tr-sm bg-secondary px-4 py-2.5 text-sm shadow-sm">
                  Ќе дојдам, благодарам!
                </div>
              </div>
            </div>
          </Reveal>

          {/* No-shows: 9 → 1 */}
          <Reveal delay={80}>
            <div className="flex h-full flex-col rounded-2xl border border-border bg-background p-6">
              <h3 className="font-medium">Помалку празни столови</h3>
              <p className="mt-1 text-muted-foreground">
                Од 9 пропуштени термини месечно, на само 1.
              </p>
              <div className="mt-auto flex items-end justify-center gap-8 pt-6" aria-hidden="true">
                <div className="text-center">
                  <div className="chart-bar mx-auto w-14 rounded-t-lg bg-muted-foreground/25" style={{ height: 108 }} />
                  <div className="mt-2 font-[Manrope] text-2xl font-extrabold text-muted-foreground">
                    <CountUp to={9} />
                  </div>
                  <div className="text-xs text-muted-foreground">без потсетник</div>
                </div>
                <div className="text-center">
                  <div className="chart-bar mx-auto w-14 rounded-t-lg bg-accent" style={{ height: 12 }} />
                  <div className="mt-2 font-[Manrope] text-2xl font-extrabold text-primary">
                    <CountUp to={1} duration={1000} />
                  </div>
                  <div className="text-xs text-muted-foreground">со Appointzy</div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Real calendar screenshot */}
          <Reveal className="md:col-span-2">
            <div className="flex h-full flex-col rounded-2xl border border-border bg-background p-6">
              <h3 className="font-medium">Јасен ден и јасна недела</h3>
              <p className="mt-1 text-muted-foreground">
                Целата недела на еден поглед, по вработен. Без прецртување, без гужва во тетратка.
              </p>
              <div className="mt-5 overflow-hidden rounded-xl border border-border shadow-sm">
                <img
                  src={calendarScreenshot}
                  alt="Неделен приказ на календарот во Appointzy"
                  width={1210}
                  height={765}
                  loading="lazy"
                  className="h-auto w-full"
                />
              </div>
            </div>
          </Reveal>

          {/* Works on phone */}
          <Reveal delay={80}>
            <div className="flex h-full flex-col rounded-2xl border border-border bg-background p-6">
              <h3 className="font-medium">Работи на телефон</h3>
              <p className="mt-1 text-muted-foreground">
                Се отвора во прелистувачот. Без инсталација, од каде било.
              </p>
              <div className="mx-auto mt-5 w-36 rounded-[1.4rem] border-4 border-foreground/15 bg-white p-2.5 shadow-md" aria-hidden="true">
                <div className="mx-auto mb-2 h-1 w-10 rounded-full bg-muted-foreground/30" />
                <div className="space-y-1.5">
                  <div className="rounded-md bg-secondary px-2 py-1.5 text-[10px] leading-tight">
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

          {/* Recurring visits */}
          <Reveal className="md:col-span-3">
            <div className="rounded-2xl border border-border bg-background p-6">
              <div className="md:flex md:items-center md:justify-between md:gap-10">
                <div className="max-w-md">
                  <h3 className="font-medium">Повторувачки посети</h3>
                  <p className="mt-1 text-muted-foreground">
                    Серија од десет физиотерапии? Ја внесувате еднаш, а системот ги закажува сите и потсетува за секоја одделно.
                  </p>
                </div>
                <div className="mt-5 flex flex-wrap gap-2 md:mt-0" aria-hidden="true">
                  {["Пон 12.10", "Сре 14.10", "Пет 16.10", "Пон 19.10", "Сре 21.10"].map((d, i) => (
                    <span
                      key={d}
                      className={`rounded-full px-3 py-1.5 text-sm ${
                        i < 3 ? "bg-secondary text-secondary-foreground" : "border border-border bg-white text-muted-foreground"
                      }`}
                    >
                      {i < 3 ? "✓ " : ""}
                      {d}
                    </span>
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
