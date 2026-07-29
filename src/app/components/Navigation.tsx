import logoImage from "../../assets/logoTrimmed.png";

export function Navigation() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/85 px-4 py-2.5 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3">
        <a href="/" className="flex items-center">
          <img src={logoImage} alt="Appointzy" width={385} height={49} className="h-[19px] w-auto md:h-[26px]" />
        </a>
        <a
          href="#cta"
          className="flex h-9 shrink-0 items-center rounded-lg bg-foreground px-3.5 text-xs font-medium text-background transition-all hover:bg-foreground/85 focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground/40 focus-visible:ring-offset-2 active:scale-[0.98]"
        >
          Започнете бесплатно
        </a>
      </div>
    </nav>
  );
}
