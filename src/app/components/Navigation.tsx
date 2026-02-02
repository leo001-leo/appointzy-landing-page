import { Button } from "./ui/button";
import logoImage from "../../assets/logo.png";

export function Navigation() {
  return (
    <nav className="w-full px-4 py-4 border-b border-border bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src={logoImage} alt="Appointzy" className="h-8 w-auto" />
        </div>
        <div className="flex items-center gap-4">
          <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors hidden sm:inline">
            Features
          </a>
          <a href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors hidden sm:inline">
            Pricing
          </a>
          <Button variant="ghost" size="sm" className="hidden sm:inline-flex">
            Sign in
          </Button>
          <Button size="sm">
            Start free trial
          </Button>
        </div>
      </div>
    </nav>
  );
}