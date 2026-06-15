import { Card, CardContent } from "./ui/card";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "motion/react";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback } from "react";

const testimonials = [
  {
    quote: "Appointzy го трансформираше начинот на кој управуваме со нашиот бизнис. Резервирањето термини сега е лесно, а на нашите клиенти им се допаѓаат СМС потсетниците.",
    name: "Срна",
    role: "Сопственичка на приватна ординација"
  },
  {
    quote: "Со Appointzy немаме повеќе проблеми со двојни термини и пропуштени закажувања. Сè е јасно, прегледно и персоналот брзо го совлада системот.",
    name: "Блаженка",
    role: "Бадент ординација"
  },
  {
    quote: "Appointzy ни даде професионален изглед пред клиентите. СМС потсетниците значително го намалија бројот на неодржани термини и заштедивме многу работно време.",
    name: "Иво",
    role: "Dental Prestige"
  },
  {
    quote: "Го препорачувам на секој кој работи со термини. За еден ден го имавме системот поставен и ставен во употреба. Едноставно и практично.",
    name: "Драган",
    role: "Весна Дент"
  }
];

export function Testimonial() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <section className="w-full px-4 py-12 md:py-20">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          {/* Arrow buttons — hidden on mobile */}
          <button
            onClick={scrollPrev}
            className="hidden md:flex absolute -left-14 top-1/2 -translate-y-1/2 w-10 h-10 items-center justify-center rounded-full border-2 border-border bg-background hover:bg-muted transition-colors z-10"
            aria-label="Претходно"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={scrollNext}
            className="hidden md:flex absolute -right-14 top-1/2 -translate-y-1/2 w-10 h-10 items-center justify-center rounded-full border-2 border-border bg-background hover:bg-muted transition-colors z-10"
            aria-label="Следно"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Carousel */}
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {testimonials.map((t, index) => (
                <div key={index} className="flex-[0_0_100%] min-w-0">
                  <Card className="border-2">
                    <CardContent className="p-8 md:p-12">
                      <div className="flex gap-1 mb-6 justify-center md:justify-start">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                        ))}
                      </div>
                      <blockquote className="text-xl md:text-2xl mb-6 text-center md:text-left">
                        "{t.quote}"
                      </blockquote>
                      <div className="text-center md:text-left">
                        <div className="text-muted-foreground font-medium">{t.name}</div>
                        <div className="text-sm text-muted-foreground">{t.role}</div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* Dot indicators */}
          <div className="flex justify-center gap-2 mt-6 md:hidden">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => emblaApi?.scrollTo(i)}
                className="w-2 h-2 rounded-full bg-muted-foreground/30 hover:bg-primary transition-colors"
                aria-label={`Оди на ${i + 1}`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
