import { Navigation } from "./components/Navigation";
import { Hero } from "./components/Hero";
import { Benefits } from "./components/Benefits";
import { HowItWorks } from "./components/HowItWorks";
import { ProductPreview } from "./components/ProductPreview";
import { Pricing } from "./components/Pricing";
import { Testimonial } from "./components/Testimonial";
import { FinalCTA } from "./components/FinalCTA";
import { Footer } from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1">
        <Hero />
        <Benefits />
        <HowItWorks />
        <ProductPreview />
        <Pricing />
        <Testimonial />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}