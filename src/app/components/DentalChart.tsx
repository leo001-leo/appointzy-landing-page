import { useState, type ReactNode } from "react";
import { Reveal } from "./Reveal";

// Mirrors the dental chart in the Appointzy app: FDI numbering, the app's own
// Macedonian labels and its colour language (red finding, dashed red planned,
// blue done here, grey existing). The patient and her entries are illustrative.

type Paint = "finding" | "planned" | "done" | "existing";
type Status = Paint | "resolved";
type Surface = "M" | "O" | "D";

const COLOUR: Record<Paint, string> = {
  finding: "#d92d20",
  planned: "#d92d20",
  done: "#2a78d6",
  existing: "#475467",
};
const OUTLINE = "#98a1ae";

interface Drawing {
  crown?: Paint;
  canal?: Paint;
  marks?: { paint: Paint; surfaces: Surface[] }[];
  missing?: boolean;
}

interface ToothRecord {
  drawing: Drawing;
  items: { name: string; status: Status; date: string }[];
  note?: string;
  history: { date: string; text: string; by: string }[];
}

const RECORDS: Record<number, ToothRecord> = {
  16: {
    drawing: { crown: "existing" },
    items: [{ name: "Коронка", status: "existing", date: "02.09" }],
    history: [{ date: "02.09", text: "Внесено: Коронка, постоечко", by: "д-р Трајковски" }],
  },
  11: {
    drawing: { marks: [{ paint: "done", surfaces: ["M"] }] },
    items: [{ name: "Пломба М", status: "done", date: "09.09" }],
    history: [{ date: "09.09", text: "Завршено: Пломба М", by: "д-р Николовска" }],
  },
  26: {
    drawing: {
      marks: [
        { paint: "finding", surfaces: ["O"] },
        { paint: "planned", surfaces: ["M", "O"] },
      ],
    },
    items: [
      { name: "Кариес", status: "finding", date: "23.09" },
      { name: "Пломба МО", status: "planned", date: "23.09" },
    ],
    history: [
      { date: "23.09", text: "Планирано: Пломба МО", by: "д-р Трајковски" },
      { date: "23.09", text: "Внесено: Кариес", by: "д-р Трајковски" },
    ],
  },
  36: {
    drawing: { canal: "done", marks: [{ paint: "done", surfaces: ["O", "D"] }] },
    items: [
      { name: "Канал, 3 канали", status: "done", date: "14.09" },
      { name: "Пломба ОД", status: "done", date: "21.09" },
      { name: "Кариес", status: "resolved", date: "21.09" },
    ],
    note: "Осетлив на ладно по третманот. Контрола за шест месеци.",
    history: [
      { date: "21.09", text: "Завршено: Пломба ОД", by: "д-р Николовска" },
      { date: "14.09", text: "Завршено: Канал", by: "д-р Николовска" },
      { date: "02.09", text: "Внесено: Кариес", by: "д-р Трајковски" },
    ],
  },
  46: {
    drawing: { missing: true },
    items: [{ name: "Недостасува", status: "existing", date: "02.09" }],
    history: [{ date: "02.09", text: "Внесено: Недостасува", by: "д-р Трајковски" }],
  },
  47: {
    drawing: { marks: [{ paint: "finding", surfaces: ["O"] }] },
    items: [{ name: "Кариес", status: "finding", date: "23.09" }],
    history: [{ date: "23.09", text: "Внесено: Кариес", by: "д-р Трајковски" }],
  },
};

const TYPE = [
  "",
  "Централен секутич",
  "Латерален секутич",
  "Канин",
  "Прв премолар",
  "Втор премолар",
  "Прв молар",
  "Втор молар",
  "Трет молар",
];
const SIDE = ["", "горе десно", "горе лево", "долу лево", "долу десно"];

const STATUS: Record<Status, { label: string; colour: string; dated: boolean }> = {
  finding: { label: "Активно", colour: COLOUR.finding, dated: false },
  planned: { label: "Планирано", colour: COLOUR.planned, dated: false },
  done: { label: "Завршено", colour: COLOUR.done, dated: true },
  existing: { label: "Постоечко", colour: COLOUR.existing, dated: false },
  resolved: { label: "Решено", colour: "#78716c", dated: true },
};

// Upper jaw left to right as the dentist sees it, then the lower jaw.
const Q1 = [18, 17, 16, 15, 14, 13, 12, 11];
const Q2 = [21, 22, 23, 24, 25, 26, 27, 28];
const Q4 = [48, 47, 46, 45, 44, 43, 42, 41];
const Q3 = [31, 32, 33, 34, 35, 36, 37, 38];

// On a phone the chart shows one side of the mouth at a time, like the app.
const FIRST_ON_SIDE = { right: 16, left: 36 } as const;

const CROWN_WIDTH = [0, 20, 18, 22, 25, 25, 34, 32, 29];

function rootsFor(d: number) {
  const root = (cx: number, hw: number, tip: number) => ({
    path: `M${cx - hw} 60 C${cx - hw} ${tip + 20} ${cx - 1.5} ${tip} ${cx} ${tip} C${cx + 1.5} ${tip} ${cx + hw} ${tip + 20} ${cx + hw} 60 Z`,
    canal: `M${cx} 57 L${cx} ${tip + 8}`,
  });
  if (d === 1) return [root(20, 5.5, 12)];
  if (d === 2) return [root(20, 4.5, 16)];
  if (d === 3) return [root(20, 6, 5)];
  if (d <= 5) return [root(20, 6, 12)];
  const tip = d === 8 ? 22 : 16;
  return [root(13.5, 5, tip + 2), root(26.5, 5, tip)];
}

function crownPath(d: number, l: number, r: number) {
  if (d <= 2) {
    return `M${l + 2} 58 Q${l + 2} 54 ${l + 6} 54 H${r - 6} Q${r - 2} 54 ${r - 2} 58 L${r} 84 Q${r} 90 ${r - 4} 90 H${l + 4} Q${l} 90 ${l} 84 Z`;
  }
  const top = `M${l} 60 Q${l} 54 ${l + 5} 54 H${r - 5} Q${r} 54 ${r} 60`;
  if (d === 3) return `${top} V78 Q${r} 83 20 91 Q${l} 83 ${l} 78 Z`;
  if (d <= 5) return `${top} V78 Q${r} 90 20 90 Q${l} 90 ${l} 78 Z`;
  return `${top} V80 Q${r} 90 ${r - 7} 90 Q20 85 ${l + 7} 90 Q${l} 90 ${l} 80 Z`;
}

/** A tooth drawn in upper-jaw orientation (crown at the bite line), flipped for the lower jaw. */
function ToothSvg({ n, drawing }: { n: number; drawing?: Drawing }) {
  const q = Math.floor(n / 10);
  const d = n % 10;
  const w = CROWN_WIDTH[d];
  const l = 20 - w / 2;
  const r = 20 + w / 2;
  const roots = rootsFor(d);

  // Mesial faces the midline: on the viewer's left half (quadrants 1 and 4)
  // that is the tooth's right edge.
  const mesialRight = q === 1 || q === 4;
  const third = (w - 6) / 3;
  const thirds = { left: [l + 3, l + 3 + third], mid: [l + 3 + third, l + 3 + 2 * third], right: [l + 3 + 2 * third, r - 3] };
  const markRange = (surfaces: Surface[]) => {
    const spans = surfaces.map((s) =>
      s === "O" ? thirds.mid : (s === "M") === mesialRight ? thirds.right : thirds.left
    );
    return [Math.min(...spans.map((s) => s[0])), Math.max(...spans.map((s) => s[1]))];
  };

  const crown = drawing?.crown;

  return (
    <svg viewBox="0 0 40 96" className="block h-auto w-full" aria-hidden="true">
      <g
        transform={q === 3 || q === 4 ? "matrix(1 0 0 -1 0 96)" : undefined}
        opacity={drawing?.missing ? 0.22 : 1}
      >
        {roots.map((root) => (
          <path key={root.path} d={root.path} fill="#fff" stroke={OUTLINE} strokeWidth={1.3} />
        ))}
        {drawing?.canal &&
          roots.map((root) => (
            <path
              key={root.canal}
              d={root.canal}
              fill="none"
              stroke={COLOUR[drawing.canal!]}
              strokeWidth={2.6}
              strokeLinecap="round"
            />
          ))}
        <path
          d={crownPath(d, l, r)}
          fill={crown === "existing" ? "#eceef1" : crown === "done" ? "#e7f0fb" : "#fff"}
          stroke={crown ? COLOUR[crown] : OUTLINE}
          strokeWidth={crown ? 2.6 : 1.3}
          strokeDasharray={crown === "planned" ? "4 3" : undefined}
        />
        {drawing?.marks?.map((m) => {
          const [x0, x1] = markRange(m.surfaces);
          const planned = m.paint === "planned";
          return (
            <rect
              key={m.paint + m.surfaces.join("")}
              x={planned ? x0 - 1.5 : x0}
              y={planned ? 62.5 : 64}
              width={(planned ? x1 + 1.5 : x1) - (planned ? x0 - 1.5 : x0)}
              height={planned ? 21 : 18}
              rx={4}
              fill={planned ? "none" : COLOUR[m.paint]}
              stroke={planned ? COLOUR.planned : "none"}
              strokeWidth={1.4}
              strokeDasharray={planned ? "3 2.5" : undefined}
            />
          );
        })}
      </g>
    </svg>
  );
}

function ToothPanel({ n }: { n: number }) {
  const rec = RECORDS[n];
  const q = Math.floor(n / 10);
  const d = n % 10;

  return (
    <div className="tooth-panel-in">
      <div className="flex items-baseline justify-between gap-3">
        <h3 className="text-lg font-semibold tracking-tight">{`${n} · ${TYPE[d]}`}</h3>
        <span className="shrink-0 text-sm text-muted-foreground">{SIDE[q]}</span>
      </div>

      {!rec ? (
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          Нема записи. Во апликацијата тука внесувате наод, третман или белешка.
        </p>
      ) : (
        <>
          <PanelLabel>Ставки</PanelLabel>
          <ul className="space-y-2">
            {rec.items.map((item) => {
              const s = STATUS[item.status];
              return (
                <li key={item.name} className="flex items-center gap-2.5 text-sm">
                  <span
                    className="h-2.5 w-2.5 shrink-0 rounded-full"
                    style={
                      item.status === "planned"
                        ? { border: `1.5px dashed ${s.colour}` }
                        : { backgroundColor: s.colour }
                    }
                  />
                  <span className={item.status === "resolved" ? "text-muted-foreground line-through" : ""}>
                    {item.name}
                  </span>
                  <span className="ml-auto shrink-0 text-xs font-medium" style={{ color: s.colour }}>
                    {s.dated ? `${s.label} ${item.date}` : s.label}
                  </span>
                </li>
              );
            })}
          </ul>

          {rec.note && (
            <>
              <PanelLabel>Белешки</PanelLabel>
              <p className="rounded-lg bg-muted px-3 py-2.5 text-sm leading-relaxed">{rec.note}</p>
            </>
          )}

          <PanelLabel>Историја на забот</PanelLabel>
          <ol className="relative space-y-3 border-l border-border pl-4">
            {rec.history.map((h) => (
              <li key={h.date + h.text} className="relative text-sm">
                <span className="absolute -left-[21px] top-1.5 h-2 w-2 rounded-full border-2 border-white bg-muted-foreground/60" />
                <div className="flex items-baseline gap-2">
                  <span className="shrink-0 text-xs tabular-nums text-muted-foreground">{h.date}</span>
                  <span>{h.text}</span>
                </div>
                <div className="text-xs text-muted-foreground">{h.by}</div>
              </li>
            ))}
          </ol>
        </>
      )}
    </div>
  );
}

function PanelLabel({ children }: { children: ReactNode }) {
  return (
    <div className="mb-2.5 mt-6 text-xs font-medium uppercase tracking-wider text-muted-foreground">
      {children}
    </div>
  );
}

const LEGEND: { label: string; swatch: ReactNode }[] = [
  { label: "Наод", swatch: <span className="h-3 w-3 rounded-[3px] bg-[#d92d20]" /> },
  { label: "Планирано", swatch: <span className="h-3 w-3 rounded-[3px] border-[1.5px] border-dashed border-[#d92d20]" /> },
  { label: "Направено тука", swatch: <span className="h-3 w-3 rounded-[3px] bg-[#2a78d6]" /> },
  { label: "Постоечко", swatch: <span className="h-3 w-3 rounded-[3px] bg-[#475467]" /> },
  { label: "Недостасува", swatch: <span className="h-3 w-3 rounded-[3px] border border-[#98a1ae] opacity-40" /> },
  { label: "Има белешка", swatch: <span className="mx-[3px] h-1.5 w-1.5 rounded-full bg-foreground" /> },
];

const iconProps = {
  className: "h-5 w-5",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

const POINTS = [
  {
    title: "Наоди и третмани на забот",
    text: "Кариес, пломба, канал, коронка, мост или имплант, означени на забот и на површината каде што се.",
    icon: (
      <svg {...iconProps}>
        <path d="M7 3c-2 0-3.5 1.6-3.5 4 0 3 1.2 4.4 1.8 7.5.5 2.8 1 6.5 2.7 6.5 1.8 0 1.6-5 4-5s2.2 5 4 5c1.7 0 2.2-3.7 2.7-6.5.6-3.1 1.8-4.5 1.8-7.5 0-2.4-1.5-4-3.5-4-2 0-3 1-5 1S9 3 7 3Z" />
      </svg>
    ),
  },
  {
    title: "Кој, што и кога",
    text: "Секоја промена се запишува со датум и име. Може да видите и како изгледал картонот на кој било ден.",
    icon: (
      <svg {...iconProps}>
        <path d="M3 12a9 9 0 1 0 3-6.7L3 8" />
        <path d="M3 3v5h5M12 7v5l3 2" />
      </svg>
    ),
  },
  {
    title: "План за третман во PDF",
    text: "Планираните третмани со цени, во нумериран PDF за пациентот. Што прифатил, а што одбил, останува запишано.",
    icon: (
      <svg {...iconProps}>
        <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8Z" />
        <path d="M14 3v5h5M9 13h6M9 17h4" />
      </svg>
    ),
  },
  {
    title: "Цени од Стоматолошката комора",
    text: "Стандардните услуги со минималните цени на Стоматолошката комора ги прилагодувате и ги додавате одеднаш.",
    icon: (
      <svg {...iconProps}>
        <path d="M20.6 13.4 13.4 20.6a2 2 0 0 1-2.8 0L3 13V3h10l7.6 7.6a2 2 0 0 1 0 2.8Z" />
        <circle cx="7.5" cy="7.5" r="1.5" />
      </svg>
    ),
  },
];

const summary = Object.values(RECORDS).flatMap((r) => r.items);
const count = (s: Status) => summary.filter((i) => i.status === s).length;

export function DentalChart() {
  const [selected, setSelected] = useState<number>(36);
  const [side, setSide] = useState<"right" | "left">("left");

  const tooth = (n: number, lower: boolean) => {
    const active = n === selected;
    const rec = RECORDS[n];
    const number = (
      <span
        className={`relative text-[10px] font-semibold tabular-nums md:text-[11px] ${
          active ? "text-primary" : "text-muted-foreground"
        }`}
      >
        {n}
        {rec?.note && (
          <span className="absolute -right-2 top-0.5 h-1 w-1 rounded-full bg-foreground" />
        )}
      </span>
    );
    return (
      <button
        key={n}
        type="button"
        onClick={() => setSelected(n)}
        aria-pressed={active}
        aria-label={`Заб ${n}, ${TYPE[n % 10]}, ${SIDE[Math.floor(n / 10)]}${rec ? ", има записи" : ""}`}
        className={`flex min-w-0 cursor-pointer flex-col items-center gap-1 rounded-lg px-0.5 py-1.5 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 ${
          active ? "bg-secondary ring-1 ring-primary/40" : "hover:bg-muted"
        }`}
      >
        {lower && number}
        <ToothSvg n={n} drawing={rec?.drawing} />
        {!lower && number}
      </button>
    );
  };

  const half = (upper: number[], lower: number[], shown: boolean) => (
    <div className={`${shown ? "flex" : "hidden"} min-w-0 flex-1 flex-col md:flex`}>
      <div className="grid grid-cols-8 gap-0.5">{upper.map((n) => tooth(n, false))}</div>
      <div className="my-2 h-px bg-border" />
      <div className="grid grid-cols-8 gap-0.5">{lower.map((n) => tooth(n, true))}</div>
    </div>
  );

  return (
    <section
      id="dental-chart"
      className="w-full bg-gradient-to-b from-secondary/70 to-background px-4 py-20 md:py-28"
    >
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-primary">
            За стоматолошки ординации
          </p>
          <h2 className="mt-4 max-w-3xl text-3xl leading-[1.08] tracking-[-0.025em] md:text-5xl">
            {"Забен картон со историја за "}
            <span className="marker">секој заб</span>
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Допрете заб и гледате сè: дијагноза, третмани, белешки и кој што направил и
            кога. Без барање низ хартиени картони.
          </p>
        </Reveal>

        <Reveal variant="scale" delay={80} className="mt-12">
          <div className="overflow-hidden rounded-3xl border border-border bg-white shadow-[0_30px_80px_-40px_rgba(28,25,23,0.35)]">
            {/* Patient bar */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-3 border-b border-border px-5 py-4 md:px-7">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-xs font-semibold text-white">
                МП
              </span>
              <div className="min-w-0">
                <div className="font-medium">Марија Петровска</div>
                <div className="text-xs text-muted-foreground">Забен картон · 34 год.</div>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#fef3f2] px-3 py-1 text-xs font-medium text-[#b42318]">
                <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0ZM12 9v4M12 17h.01" />
                </svg>
                <span className="sr-only">Медицинско предупредување:</span>
                Алергија на пеницилин
              </span>
              <div className="ml-auto hidden gap-2 text-xs sm:flex">
                {[
                  { label: "Наоди", value: count("finding"), colour: COLOUR.finding },
                  { label: "Планирани", value: count("planned"), colour: COLOUR.planned },
                  { label: "Завршени", value: count("done"), colour: COLOUR.done },
                ].map((s) => (
                  <span key={s.label} className="rounded-full border border-border px-3 py-1 text-muted-foreground">
                    {s.label} <span className="font-semibold" style={{ color: s.colour }}>{s.value}</span>
                  </span>
                ))}
              </div>
            </div>

            <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_21rem]">
              {/* Tooth map */}
              <div className="flex flex-col p-5 md:p-7">
                <p className="mb-5 flex items-center gap-2 text-sm text-muted-foreground">
                  <svg className="h-4 w-4 shrink-0 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M9 11V5a1.5 1.5 0 0 1 3 0v5M12 10V8.5a1.5 1.5 0 0 1 3 0V11M15 10.5a1.5 1.5 0 0 1 3 0V15a6 6 0 0 1-6 6h-1a6 6 0 0 1-5-2.7l-2.2-3.5a1.5 1.5 0 0 1 2.5-1.6L9 15" />
                  </svg>
                  Допрете заб за да ја видите неговата историја.
                </p>

                <div className="mb-4 grid grid-cols-2 gap-1 rounded-xl bg-muted p-1 md:hidden">
                  {(["right", "left"] as const).map((s) => (
                    <button
                      key={s}
                      type="button"
                      aria-pressed={side === s}
                      onClick={() => {
                        setSide(s);
                        setSelected(FIRST_ON_SIDE[s]);
                      }}
                      className={`h-10 cursor-pointer rounded-lg text-sm font-medium transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 ${
                        side === s ? "bg-white text-foreground shadow-sm" : "text-muted-foreground"
                      }`}
                    >
                      {s === "right" ? "Десна страна" : "Лева страна"}
                    </button>
                  ))}
                </div>

                <div className="my-auto flex">
                  {half(Q1, Q4, side === "right")}
                  <div className="mx-1.5 hidden w-px bg-border md:block" aria-hidden="true" />
                  {half(Q2, Q3, side === "left")}
                </div>

                <ul className="flex flex-wrap pt-6 gap-x-4 gap-y-2 text-xs text-muted-foreground" aria-label="Легенда">
                  {LEGEND.map((item) => (
                    <li key={item.label} className="flex items-center gap-1.5">
                      {item.swatch}
                      {item.label}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Selected tooth */}
              <div
                className="border-t border-border bg-background/70 p-5 md:p-7 lg:border-l lg:border-t-0"
                aria-live="polite"
              >
                {/* Keyed so each tooth replays the entrance */}
                <ToothPanel key={selected} n={selected} />
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal stagger className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {POINTS.map((p) => (
            <div key={p.title} className="flex gap-4 rounded-2xl border border-border bg-white/70 p-5 sm:block sm:p-6">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-secondary text-primary">
                {p.icon}
              </span>
              <div className="min-w-0">
                <h3 className="font-medium sm:mt-4">{p.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{p.text}</p>
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
