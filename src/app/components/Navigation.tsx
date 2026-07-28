import logoImage from "../../assets/logo.png";

export function Navigation() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/85 px-4 py-3 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between">
        <a href="/" className="flex items-center">
          <img src={logoImage} alt="Appointzy" width={420} height={241} className="h-[46px] w-auto md:h-[50px]" />
        </a>
        <a
          href="#cta"
          className="flex h-11 items-center rounded-xl bg-primary px-5 text-sm font-medium text-primary-foreground shadow-md transition-all hover:bg-accent hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 active:scale-[0.98]"
        >
          Започнете бесплатно
        </a>
      </div>
    </nav>
  );
}
