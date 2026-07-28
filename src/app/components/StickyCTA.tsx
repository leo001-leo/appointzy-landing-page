import { useEffect, useState } from "react";

// Mobile-only bottom bar: appears once the hero form scrolls out of view,
// hides again while the final CTA form is on screen.
export function StickyCTA() {
  const [heroGone, setHeroGone] = useState(false);
  const [ctaVisible, setCtaVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("hero");
    const cta = document.getElementById("cta");
    if (!hero || !cta) return;

    const heroObserver = new IntersectionObserver(
      ([entry]) => setHeroGone(!entry.isIntersecting),
      { threshold: 0 }
    );
    const ctaObserver = new IntersectionObserver(
      ([entry]) => setCtaVisible(entry.isIntersecting),
      { threshold: 0.2 }
    );
    heroObserver.observe(hero);
    ctaObserver.observe(cta);
    return () => {
      heroObserver.disconnect();
      ctaObserver.disconnect();
    };
  }, []);

  const show = heroGone && !ctaVisible;

  return (
    <div
      aria-hidden={!show}
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-border bg-white/95 p-3 backdrop-blur-sm transition-transform duration-300 md:hidden ${
        show ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <a
        href="#cta"
        tabIndex={show ? 0 : -1}
        className="flex h-12 w-full items-center justify-center rounded-xl bg-primary font-medium text-primary-foreground shadow-md transition-all hover:bg-accent active:scale-[0.98]"
      >
        Пријави се за ран пристап
      </a>
    </div>
  );
}
