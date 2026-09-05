import logoImage from "../../assets/logoTrimmed.png";

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

const MailIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 6-10 7L2 6" />
  </svg>
);

const linkClass =
  "inline-flex min-h-[44px] items-center gap-2.5 text-sm text-ink-muted transition-colors duration-200 hover:text-ink-fg";

export function Footer() {
  return (
    <footer className="w-full border-t border-white/10 bg-ink px-4 py-12 text-ink-fg">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 text-center sm:flex-row sm:items-start sm:justify-between sm:text-left">
        <div className="flex flex-col items-center gap-3 sm:items-start">
          <img src={logoImage} alt="Appointzy" width={385} height={49} className="h-[22px] w-auto" />
          <p className="max-w-xs text-sm leading-relaxed text-ink-muted">
            Закажување термини и СМС потсетници за ординации и физиотерапевти.
            Направено во Македонија.
          </p>
        </div>

        <div className="flex flex-col items-center gap-1 sm:items-end">
          <a href="mailto:info@appointzy.app" className={linkClass}>
            <MailIcon />
            info@appointzy.app
          </a>
          <a
            href="https://www.instagram.com/appointzy.app?igsh=MTk0cXJncnB1eXRnYw=="
            target="_blank"
            rel="noopener noreferrer"
            className={linkClass}
          >
            <InstagramIcon />
            appointzy.app
          </a>
          <p className="mt-3 text-sm text-white/35">
            © 2026 Appointzy. Сите права задржани.
          </p>
        </div>
      </div>
    </footer>
  );
}
