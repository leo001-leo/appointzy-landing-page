import logoImage from "figma:asset/6da912c3001d67636d21345f87a49398223e3799.png";

export function Footer() {
  const links = {
    product: [
      { label: "Features", href: "#features" },
      { label: "Pricing", href: "#pricing" },
      { label: "Contact", href: "#" }
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
              Simple appointment scheduling for small and medium businesses
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="mb-4">Product</h4>
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
          © 2025 Appointzy. All rights reserved.
        </div>
      </div>
    </footer>
  );
}