import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

type Variant = "up" | "scale" | "left" | "right";

const variantClass: Record<Variant, string> = {
  up: "",
  scale: "reveal-scale",
  left: "reveal-left",
  right: "reveal-right",
};

/**
 * Adds .reveal-in when the element scrolls into view; CSS does the rest.
 * SSR-safe: the observer only runs in an effect, and the server and client
 * both render the un-revealed state so hydration matches.
 */
export function Reveal({
  children,
  delay = 0,
  variant = "up",
  stagger = false,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  variant?: Variant;
  stagger?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const style = delay ? ({ "--d": `${delay}ms` } as CSSProperties) : undefined;

  return (
    <div
      ref={ref}
      style={style}
      className={[
        "reveal",
        variantClass[variant],
        stagger ? "stagger" : "",
        shown ? "reveal-in" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </div>
  );
}
