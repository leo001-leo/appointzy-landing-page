import { Button } from "./ui/button";
import logoImage from "../../assets/logo.png";

export function Navigation() {
  return (
    <nav className="w-full px-4 py-4 border-b border-border bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <a href="/">
            <img src={logoImage} alt="Appointzy" className="h-[46px] md:h-[50px] w-auto" />
          </a>
        </div>
        <div className="flex items-center gap-2 sm:gap-4">
          <a href="#features" className="text-sm sm:text-base text-muted-foreground hover:text-foreground transition-colors">
            Карактеристики
          </a>
          <a href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors hidden sm:inline">
            Пакети
          </a>
          <a href="#demo">
            <Button size="sm">
              Започни бесплатно
            </Button>
  	  </a>
        </div>
      </div>
    </nav>
  );
}