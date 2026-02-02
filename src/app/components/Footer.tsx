import logoImage from "../../assets/logo.png";

export function Footer() {
  const links = {
    product: [
      { label: "Карактеристики", href: "#features" },
      { label: "Цени", href: "#pricing" },
      { label: "Контакт", href: "#" }
    ]
  };

  return (
    <footer className="w-full px-4 py-12 border-t border-border bg-muted/20">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Logo and description */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <img src={logoImage} alt="Appointzy" className="h-8 w-auto" />
            </div>
            <p className="text-muted-foreground text-sm">
              Едноставно закажување на термини за мали и средни ординации
            </p>
          </div>

          {/* Links */}
          <div>
            <ul className="space-y-2">
              {links.product.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Empty space for layout */}
          <div></div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-border text-center text-sm text-muted-foreground">
          © 2026 Appointzy. Сите права задржани.
        </div>
      </div>
    </footer>
  );
}