import { useEffect, useRef, useState, type MouseEvent, type PointerEvent } from "react";
import { Reveal } from "./Reveal";
import { useT } from "../../i18n";

// `photo` is intentionally left empty: real practice photos can be dropped in
// later and the initials avatar is the fallback. We do not use stock or
// AI-generated faces for real, named customers.
const avatarTints = [
  "from-primary to-accent",
  "from-accent to-[#f59e0b]",
  "from-[#b45309] to-primary",
  "from-primary to-[#ea580c]",
  "from-[#c2410c] to-[#fb923c]",
  "from-[#9a3412] to-accent",
];

// Every slide has the same width, so the next card peeks in at the edge.
const slide = "w-[84%] shrink-0 snap-start sm:w-[60%] md:w-[45%] lg:w-[30%]";

const behavior = (): ScrollBehavior =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";

/** One card plus the gap after it. */
function slideStep(row: HTMLDivElement) {
  const first = row.firstElementChild as HTMLElement | null;
  return (first?.getBoundingClientRect().width ?? row.clientWidth) + parseFloat(getComputedStyle(row).columnGap || "0");
}

function Arrow({ dir, label, disabled, onClick }: { dir: -1 | 1; label: string; disabled: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-white text-foreground shadow-[0_12px_30px_-12px_rgba(28,25,23,0.35)] transition-[color,border-color,opacity] duration-200 hover:border-primary/40 hover:text-primary focus:outline-none focus-visible:ring-4 focus-visible:ring-primary/15 disabled:pointer-events-none disabled:opacity-0"
    >
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d={dir === 1 ? "M5 12h14M13 6l6 6-6 6" : "M19 12H5M11 6l-6 6 6 6"} />
      </svg>
    </button>
  );
}

/**
 * Testimonials in one sliding row that ends with a "30+" card, plus the same
 * count as a strip under it so it is seen without sliding. Phones and tablets swipe the row natively;
 * with a mouse it can be dragged, and from tablet width up the arrows on its
 * sides move one screen of cards at a time.
 */
export function Proof() {
  const dict = useT();
  const t = dict.proof;
  const quotes = t.quotes;
  const cta = dict.form.title;

  const rowRef = useRef<HTMLDivElement | null>(null);
  const drag = useRef<{ x: number; left: number; moved: boolean } | null>(null);
  // Set when a drag ends, so the click that follows it is not a link click.
  const dragged = useRef(false);
  const [dragging, setDragging] = useState(false);
  // The server renders the start position; the effect corrects it.
  const [edges, setEdges] = useState({ start: true, end: false });

  useEffect(() => {
    const row = rowRef.current;
    if (!row) return;
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const max = row.scrollWidth - row.clientWidth;
        setEdges({ start: row.scrollLeft <= 2, end: row.scrollLeft >= max - 2 });
      });
    };
    update();
    row.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      cancelAnimationFrame(frame);
      row.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  function page(dir: -1 | 1) {
    const row = rowRef.current;
    if (!row) return;
    const step = slideStep(row);
    const style = getComputedStyle(row);
    const inner = row.clientWidth - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight);
    const visible = Math.max(1, Math.floor((inner + parseFloat(style.columnGap || "0")) / step));
    row.scrollBy({ left: dir * visible * step, behavior: behavior() });
  }

  // Mouse only: touch and pen keep the browser's own swipe.
  function onPointerDown(e: PointerEvent<HTMLDivElement>) {
    dragged.current = false;
    if (e.pointerType !== "mouse" || e.button !== 0) return;
    drag.current = { x: e.clientX, left: e.currentTarget.scrollLeft, moved: false };
  }

  function onPointerMove(e: PointerEvent<HTMLDivElement>) {
    const d = drag.current;
    if (!d) return;
    const row = e.currentTarget;
    const dx = e.clientX - d.x;
    if (!d.moved) {
      if (Math.abs(dx) < 6) return;
      d.moved = true;
      row.setPointerCapture(e.pointerId);
      // In a narrow window the cards are selectable; a drag is not a selection.
      window.getSelection()?.removeAllRanges();
      // Snapping would fight the hand-held scroll.
      row.style.scrollSnapType = "none";
      setDragging(true);
    }
    row.scrollLeft = d.left - dx;
  }

  function onPointerUp(e: PointerEvent<HTMLDivElement>) {
    const d = drag.current;
    drag.current = null;
    if (!d?.moved) return;
    const row = e.currentTarget;
    dragged.current = true;
    setDragging(false);
    // Settle on the nearest card, then hand back to snapping.
    const step = slideStep(row);
    row.scrollTo({ left: Math.round(row.scrollLeft / step) * step, behavior: behavior() });
    window.setTimeout(() => {
      if (!drag.current?.moved) row.style.scrollSnapType = "";
    }, 450);
  }

  // A drag that ends on the last card's "Започни бесплатно" link must not
  // follow it.
  function onClickCapture(e: MouseEvent<HTMLDivElement>) {
    if (!dragged.current) return;
    dragged.current = false;
    e.preventDefault();
    e.stopPropagation();
  }

  const statCount = (
    <span className="block bg-gradient-to-r from-[#fdba74] to-[#f97316] bg-clip-text font-[Manrope] text-6xl font-extrabold tracking-[-0.04em] text-transparent md:text-7xl">
      {t.statCount}
    </span>
  );
  const ctaLink = (
    <a
      href="#cta"
      draggable={false}
      className="group relative inline-flex shrink-0 items-center gap-2 font-semibold text-flame transition-colors duration-200 hover:text-[#fdba74] focus:outline-none focus-visible:underline"
    >
      {cta}
      <svg className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M5 12h14M13 6l6 6-6 6" />
      </svg>
    </a>
  );
  const glow = (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(234,88,12,0.45),transparent_65%)] blur-2xl"
    />
  );

  return (
    <section className="w-full bg-background px-4 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-primary">
            {t.eyebrow}
          </p>
          <h2 className="mt-4 max-w-2xl text-3xl leading-[1.08] tracking-[-0.025em] md:text-5xl">
            {t.title}
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            {t.intro}
          </p>
        </Reveal>

        <div className="relative mt-12">
          {/* Arrows on either side of the row, from tablet width up; on
              wide screens they sit half outside the cards. Phones swipe. */}
          <div className="absolute left-1 top-[calc(50%-0.75rem)] z-10 hidden -translate-y-1/2 md:block lg:-left-6">
            <Arrow dir={-1} label={t.prev} disabled={edges.start} onClick={() => page(-1)} />
          </div>
          <div className="absolute right-1 top-[calc(50%-0.75rem)] z-10 hidden -translate-y-1/2 md:block lg:-right-6">
            <Arrow dir={1} label={t.next} disabled={edges.end} onClick={() => page(1)} />
          </div>

          {/* Bleeds 1rem past the container so card shadows and the hover
              lift are not clipped by the scrolling box. */}
          <Reveal
            stagger
            rootRef={rowRef}
            role="region"
            aria-label={t.title}
            tabIndex={0}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
            onClickCapture={onClickCapture}
            className={`-mx-4 -mb-6 flex snap-x snap-mandatory scroll-px-4 gap-4 overflow-x-auto px-4 pb-8 pt-2 [scrollbar-width:none] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 md:gap-5 md:select-none [&::-webkit-scrollbar]:hidden ${
              dragging ? "cursor-grabbing select-none" : "md:cursor-grab"
            }`}
          >
            {quotes.map((q, i) => (
              <div key={`${q.name}-${q.role}`} className={slide}>
                <figure className="lift flex h-full flex-col rounded-2xl border border-border bg-white p-7">
                  <div className="mb-4 flex gap-0.5 text-accent" aria-hidden="true">
                    {[...Array(5)].map((_, s) => (
                      <svg key={s} className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                        <path d="m12 17.27 6.18 3.73-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                    ))}
                  </div>
                  <blockquote className="flex-1 leading-relaxed text-foreground/90">
                    {t.quoteOpen}
                    {q.text}
                    {t.quoteClose}
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

            {/* The last card closes the row with the count and the form link */}
            <div className={slide}>
              <div className="grain relative flex h-full flex-col justify-between overflow-hidden rounded-2xl bg-ink p-7 text-ink-fg">
                {glow}
                <p className="relative">
                  {statCount}
                  <span className="mt-2 block text-lg text-ink-muted">{t.statLabel}</span>
                </p>
                <div className="relative mt-10">{ctaLink}</div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* The same count as a strip, seen without sliding */}
        <Reveal className="mt-10">
          <div className="grain relative flex flex-col gap-6 overflow-hidden rounded-2xl bg-ink p-7 text-ink-fg md:flex-row md:items-center md:justify-between md:px-10">
            {glow}
            <p className="relative flex flex-wrap items-center gap-x-6 gap-y-1">
              {statCount}
              <span className="block text-lg text-ink-muted md:text-xl">{t.statLabel}</span>
            </p>
            {ctaLink}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
