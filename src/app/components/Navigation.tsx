import { useEffect, useState } from "react";
import logoImage from "../../assets/logoTrimmed.png";

export function Navigation() {
  // Starts transparent over the dark hero, turns into a light bar on scroll.
  // Initial state matches on server and client so hydration is clean.
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 w-full px-4 transition-all duration-300 ${
        scrolled
          ? "border-b border-border bg-background/85 py-2.5 backdrop-blur-md"
          : "border-b border-transparent py-4"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3">
        <a href="/" className="flex items-center">
          <img
            src={logoImage}
            alt="Appointzy"
            width={385}
            height={49}
            className="h-[19px] w-auto transition-all duration-300 md:h-[26px]"
          />
        </a>
        <a
          href="#cta"
          className={`flex h-9 shrink-0 items-center rounded-lg px-3.5 text-xs font-medium transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 active:scale-[0.98] ${
            scrolled
              ? "bg-foreground text-background hover:bg-foreground/85 focus-visible:ring-foreground/40"
              : "border border-white/20 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20 focus-visible:ring-white/40"
          }`}
        >
          Започнете бесплатно
        </a>
      </div>
    </nav>
  );
}
