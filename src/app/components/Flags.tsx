import { useId } from "react";
import type { Lang } from "../../i18n";

// Drawn as SVG because emoji flags render as plain letters on Windows.

function FlagMK({ className }: { className?: string }) {
  return (
    <svg viewBox="-140 -70 280 140" preserveAspectRatio="xMidYMid slice" className={className} aria-hidden="true">
      <path fill="#d82126" d="M-140-70h280V70h-280z" />
      <path
        fill="#f8e92e"
        d="M-140 14v-28l280 28v-28zm126-84h28L0-15zM14 70h-28L0 15zM-140-70h42L12.86 7.72zm0 140h42L12.86-7.72zM140-70h-42L-12.86 7.72zm0 140h-42L-12.86-7.72z"
      />
      <circle r="25" fill="#d82126" />
      <circle r="21" fill="#f8e92e" />
    </svg>
  );
}

function FlagGB({ className }: { className?: string }) {
  // Unique per instance: the flag appears in more than one place on the page.
  const clip = `gb${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
  return (
    <svg viewBox="0 0 60 30" preserveAspectRatio="xMidYMid slice" className={className} aria-hidden="true">
      <clipPath id={clip}>
        <path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z" />
      </clipPath>
      <path d="M0,0 v30 h60 v-30 z" fill="#012169" />
      <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" />
      <path d="M0,0 L60,30 M60,0 L0,30" clipPath={`url(#${clip})`} stroke="#C8102E" strokeWidth="4" />
      <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10" />
      <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6" />
    </svg>
  );
}

// Drawn at the badge's own proportions rather than the real 1:2, so the
// gold border survives on all four sides. The coat of arms is simplified to
// what reads at 20px: crown, double-headed eagle and the blue shield.
function FlagME({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 140 100" preserveAspectRatio="xMidYMid slice" className={className} aria-hidden="true">
      <rect width="140" height="100" fill="#d3ae3b" />
      <rect x="6" y="6" width="128" height="88" fill="#c40308" />
      <g fill="#d3ae3b">
        <path d="M61 29 63 20l4 4 3-6 3 6 4-4 2 9Z" />
        <circle cx="60" cy="34" r="4.5" />
        <circle cx="80" cy="34" r="4.5" />
        <path d="M66 40 40 30l4 14-4 6 8 4-2 6 20-2Z" />
        <path d="M74 40 100 30l-4 14 4 6-8 4 2 6-20-2Z" />
        <path d="M59 37h22v29l-11 11-11-11Z" />
      </g>
      <path d="M63 44h14v19l-7 7-7-7Z" fill="#1d5e91" />
    </svg>
  );
}

export function Flag({ lang, className = "" }: { lang: Lang; className?: string }) {
  const cls = `block h-3.5 w-5 shrink-0 overflow-hidden rounded-[3px] ring-1 ring-black/10 ${className}`;
  if (lang === "mk") return <FlagMK className={cls} />;
  if (lang === "me") return <FlagME className={cls} />;
  return <FlagGB className={cls} />;
}
