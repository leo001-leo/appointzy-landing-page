import { useEffect, useRef, useState, type MouseEvent, type PointerEvent } from "react";
import { Reveal } from "./Reveal";
import { useT } from "../../i18n";

// Every quote keeps its initials avatar. A quote with a `photo` (a real one,
// sent by the practice) or the practice's `logo` also shows it large above
// the quote. A `photo` fills its space, so a logo that comes on its own
// background (Naturalija) is given as a photo; a `logo` is shown whole on
// white. We do not use stock or AI-generated faces for real, named
// customers.
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

// The row drifts on its own at this speed (CSS px per second). It waits
// IDLE ms after the visitor touches it and HOLD ms at either end.
const DRIFT = 45;
const IDLE = 5000;
const HOLD = 2500;

const behavior = (): ScrollBehavior =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";

/** Where each card starts as a scroll position, and its width. */
function cardStops(row: HTMLDivElement) {
  const cards = Array.from(row.children) as HTMLElement[];
  const origin = cards[0]?.offsetLeft ?? 0;
  return cards.map((c) => ({ left: c.offsetLeft - origin, width: c.offsetWidth }));
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
 * count as a strip above it so it is seen first. Phones and tablets swipe the row natively;
 * with a mouse it can be dragged, and from tablet width up the arrows on its
 * sides move one screen of cards at a time. While nobody touches it, the row
 * drifts slowly to the end and then goes back to the start.
 */
export function Proof() {
  const dict = useT();
  const t = dict.proof;
  const quotes = t.quotes;
  const cta = dict.form.title;

  const areaRef = useRef<HTMLDivElement | null>(null);
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
        const start = row.scrollLeft <= 2;
        const end = row.scrollLeft >= max - 2;
        // The drift scrolls every frame; only re-render when an edge changes.
        setEdges((e) => (e.start === start && e.end === end ? e : { start, end }));
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

  // The slow drift. It runs only while the row is on screen, and stops while
  // the mouse is over it, while it has keyboard focus, and for IDLE ms after
  // any touch, click, wheel or key. Reduced motion turns it off.
  useEffect(() => {
    const row = rowRef.current;
    const area = areaRef.current;
    if (!row || !area) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let last = 0;
    let pos = row.scrollLeft;
    let visible = false;
    let hovered = false;
    let focused = false;
    let waitUntil = 0;
    let rewind = false;

    const tick = (now: number) => {
      frame = requestAnimationFrame(tick);
      const dt = Math.min(now - last, 100);
      last = now;
      if (!visible || hovered || focused || reduce.matches || drag.current || now < waitUntil) return;
      if (rewind) {
        rewind = false;
        row.scrollTo({ left: 0, behavior: "smooth" });
        waitUntil = now + HOLD;
        return;
      }
      // Picks up where the visitor, the arrows or the rewind left the row.
      if (Math.abs(row.scrollLeft - pos) > 2) pos = row.scrollLeft;
      const max = row.scrollWidth - row.clientWidth;
      if (pos >= max - 1) {
        rewind = true;
        waitUntil = now + HOLD;
        return;
      }
      // Snapping would pull every small step back to the card.
      if (row.style.scrollSnapType !== "none") row.style.scrollSnapType = "none";
      pos = Math.min(pos + (DRIFT * dt) / 1000, max);
      row.scrollLeft = pos;
    };

    const wait = () => {
      waitUntil = performance.now() + IDLE;
    };
    const enter = (e: globalThis.PointerEvent) => {
      if (e.pointerType === "mouse") hovered = true;
    };
    const leave = (e: globalThis.PointerEvent) => {
      if (e.pointerType === "mouse") hovered = false;
    };
    // Only keyboard focus: a clicked arrow keeps focus after the mouse leaves.
    const focusIn = (e: FocusEvent) => {
      if ((e.target as Element).matches(":focus-visible")) focused = true;
    };
    const focusOut = (e: FocusEvent) => {
      if (!area.contains(e.relatedTarget as Node | null)) {
        focused = false;
        wait();
      }
    };
    const io = new IntersectionObserver(
      ([entry]) => {
        const inView = entry.intersectionRatio >= 0.5;
        // Give the visitor a moment with the first cards before moving.
        if (inView && !visible) waitUntil = Math.max(waitUntil, performance.now() + HOLD);
        visible = inView;
      },
      { threshold: [0, 0.5] }
    );

    io.observe(row);
    area.addEventListener("pointerenter", enter);
    area.addEventListener("pointerleave", leave);
    area.addEventListener("pointerdown", wait);
    area.addEventListener("wheel", wait, { passive: true });
    area.addEventListener("touchstart", wait, { passive: true });
    area.addEventListener("keydown", wait);
    area.addEventListener("focusin", focusIn);
    area.addEventListener("focusout", focusOut);
    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
      io.disconnect();
      area.removeEventListener("pointerenter", enter);
      area.removeEventListener("pointerleave", leave);
      area.removeEventListener("pointerdown", wait);
      area.removeEventListener("wheel", wait);
      area.removeEventListener("touchstart", wait);
      area.removeEventListener("keydown", wait);
      area.removeEventListener("focusin", focusIn);
      area.removeEventListener("focusout", focusOut);
    };
  }, []);

  function page(dir: -1 | 1) {
    const row = rowRef.current;
    if (!row) return;
    const style = getComputedStyle(row);
    const view = row.clientWidth - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight);
    const gap = parseFloat(style.columnGap || "0");
    const at = row.scrollLeft;
    const cards = cardStops(row);
    // Forward: start at the first card that is not fully in view. Back: go
    // as far as keeps the card that was first in view just past the edge.
    let i =
      dir === 1
        ? cards.findIndex((c) => c.left + c.width > at + view + 1)
        : cards.findIndex((c) => c.left >= at - view - gap - 1);
    if (i < 0) i = cards.length - 1;
    if (Math.abs(cards[i].left - at) < 2) i = Math.min(Math.max(i + dir, 0), cards.length - 1);
    row.scrollTo({ left: cards[i].left, behavior: behavior() });
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
    const nearest = cardStops(row).reduce(
      (best, c) => (Math.abs(c.left - row.scrollLeft) < Math.abs(best - row.scrollLeft) ? c.left : best),
      0
    );
    row.scrollTo({ left: nearest, behavior: behavior() });
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

        {/* The same count as a strip, the first thing seen before the cards */}
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

        <div ref={areaRef} className="relative mt-10">
          {/* Arrows on either side of the row, from tablet width up; on
              wide screens they sit half outside the cards. Phones swipe. */}
          <div className="absolute left-1 top-[calc(50%-0.75rem)] z-10 hidden -translate-y-1/2 md:block lg:-left-6">
            <Arrow dir={-1} label={t.prev} disabled={edges.start} onClick={() => page(-1)} />
          </div>
          <div className="absolute right-1 top-[calc(50%-0.75rem)] z-10 hidden -translate-y-1/2 md:block lg:-right-6">
            <Arrow dir={1} label={t.next} disabled={edges.end} onClick={() => page(1)} />
          </div>

          {/* A soft shadow on each edge of the row while more cards are
              hidden that way. It spans the cards' height and fades out
              towards their top and bottom. */}
          <div
            aria-hidden="true"
            className={`pointer-events-none absolute -left-4 bottom-8 top-2 z-[5] w-12 bg-[radial-gradient(ellipse_at_left,rgba(28,25,23,0.16),transparent_70%)] transition-opacity duration-300 md:w-16 ${
              edges.start ? "opacity-0" : "opacity-100"
            }`}
          />
          <div
            aria-hidden="true"
            className={`pointer-events-none absolute -right-4 bottom-8 top-2 z-[5] w-12 bg-[radial-gradient(ellipse_at_right,rgba(28,25,23,0.16),transparent_70%)] transition-opacity duration-300 md:w-16 ${
              edges.end ? "opacity-0" : "opacity-100"
            }`}
          />

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
            className={`-mx-4 -mb-6 flex snap-x snap-mandatory scroll-px-4 gap-4 overflow-x-auto overscroll-x-contain px-4 pb-8 pt-2 [scrollbar-width:none] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 md:gap-5 md:select-none [&::-webkit-scrollbar]:hidden ${
              dragging ? "cursor-grabbing select-none" : "md:cursor-grab"
            }`}
          >
            {quotes.map((q, i) => {
              const quote = (
                <>
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
                </>
              );
              const image = q.photo ?? q.logo;
              return image ? (
                <div key={`${q.name}-${q.role}`} className={slide}>
                  <figure className="lift flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-white">
                    {/* At least 13rem tall, and it takes any height the row
                        has to spare. A photo fills it; a logo sits inside it
                        with room on every side. The name is in the caption,
                        so no alt. */}
                    <div className={`relative min-h-52 flex-1 ${q.photo ? "bg-secondary" : "border-b border-border"}`}>
                      <img
                        src={image}
                        alt=""
                        loading="lazy"
                        decoding="async"
                        draggable={false}
                        className={`absolute inset-0 h-full w-full ${
                          q.photo ? "object-cover object-[50%_30%]" : "object-contain p-10"
                        }`}
                      />
                    </div>
                    <div className="flex flex-col p-7">{quote}</div>
                  </figure>
                </div>
              ) : (
                <div key={`${q.name}-${q.role}`} className={slide}>
                  <figure className="lift flex h-full flex-col rounded-2xl border border-border bg-white p-7">
                    {quote}
                  </figure>
                </div>
              );
            })}

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
      </div>
    </section>
  );
}
