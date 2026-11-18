import { Reveal } from "./Reveal";
import { useT } from "../../i18n";

// One icon per action, in the order of t.actions: books, edits, moves, cancels.
const ACTION_ICONS = [
  "M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2ZM12 13v5M9.5 15.5h5",
  "M17 3a2.8 2.8 0 0 1 4 4L7.5 20.5 2 22l1.5-5.5Z",
  "M4 8h13M13 4l4 4-4 4M20 16H7M11 12l-4 4 4 4",
  "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20ZM15 9l-6 6M9 9l6 6",
];

const icon = (d: string, className: string) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d={d} />
  </svg>
);

/**
 * The AI assistant inside the app, shown as one short chat. The chat is
 * made up but only shows what the assistant really does: it offers free
 * times only and asks when there is a choice to make. The bubbles appear
 * one after another once the window scrolls into view.
 */
export function AiAssistant() {
  const t = useT().assistant;
  const [ask, offer, answer, confirm] = t.chat;

  const mine = "ml-auto max-w-[80%] rounded-2xl rounded-tr-sm bg-primary px-4 py-2.5 text-sm text-white shadow-sm";
  const theirs = "max-w-[85%] rounded-2xl rounded-tl-sm bg-white px-4 py-2.5 text-sm shadow-sm";

  return (
    <section id="ai-assistant" className="grain relative overflow-hidden bg-ink px-4 py-20 text-ink-fg md:py-28">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="aurora-a absolute -right-40 top-1/2 h-[32rem] w-[32rem] -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(234,88,12,0.32),transparent_65%)] blur-3xl" />
      </div>

      {/* The text side is a little wider, so the Macedonian headline's
          second line fits on one line on a desktop. */}
      <div className="relative mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-16">
        <Reveal variant="left">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-flame">
            {t.eyebrow}
          </p>
          <h2 className="mt-4 text-3xl leading-[1.05] tracking-[-0.03em] md:text-5xl">
            {t.titleBefore}
            {/* Its own line, so it never breaks right after "AI". */}
            <span className="block bg-gradient-to-r from-[#fdba74] to-[#f97316] bg-clip-text text-transparent">
              {t.titleHighlight}
            </span>
          </h2>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-ink-muted">
            {t.text}
          </p>
          <ul className="mt-8 grid max-w-md grid-cols-2 gap-3">
            {t.actions.map((action, i) => (
              <li key={action} className="flex items-center gap-3 rounded-xl border border-ink-border bg-white/[0.04] px-4 py-3 font-medium">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-flame/15 text-flame">
                  {icon(ACTION_ICONS[i], "h-4 w-4")}
                </span>
                {action}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal variant="right" delay={80}>
          <div className="mx-auto w-full max-w-md overflow-hidden rounded-3xl bg-white text-foreground shadow-[0_40px_100px_-30px_rgba(234,88,12,0.45)]">
            <div className="flex items-center gap-3 bg-primary px-5 py-4 text-white">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9ZM19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8Z" />
                </svg>
              </span>
              <span className="font-semibold">{t.chatTitle}</span>
            </div>

            <div className="space-y-3 bg-muted/60 p-5">
              <div className={`chat-bubble chat-bubble-1 ${mine}`}>{ask}</div>
              <div className={`chat-bubble chat-bubble-2 ${theirs}`}>{offer}</div>
              <div className={`chat-bubble chat-bubble-3 ${mine} w-fit`}>{answer}</div>
              <div className={`chat-bubble chat-bubble-4 ${theirs}`}>
                {confirm}
                <span className="mt-2 flex items-center gap-2 rounded-lg bg-secondary px-3 py-2 text-xs font-medium text-secondary-foreground">
                  {icon("M20 6 9 17l-5-5", "h-3.5 w-3.5 shrink-0")}
                  {t.done}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 border-t border-border px-5 py-3" aria-hidden="true">
              <span className="flex-1 text-sm text-muted-foreground">{t.placeholder}</span>
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-white">
                {icon("M5 12h14M13 6l6 6-6 6", "h-4 w-4")}
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
