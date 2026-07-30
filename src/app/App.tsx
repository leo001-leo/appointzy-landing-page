import { Navigation } from "./components/Navigation";
import { Hero } from "./components/Hero";
import { Migration } from "./components/Migration";
import { Problem } from "./components/Problem";
import { HowItWorks } from "./components/HowItWorks";
import { Features } from "./components/Features";
import { Proof } from "./components/Proof";
import { FAQ } from "./components/FAQ";
import { FinalCTA } from "./components/FinalCTA";
import { Footer } from "./components/Footer";
import { StickyCTA } from "./components/StickyCTA";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1">
        <Hero />
        <Migration />
        <Problem />
        <HowItWorks />
        <Features />
        <Proof />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
      <StickyCTA />
    </div>
  );
}
