import { Card, CardContent } from "./ui/card";
import { Star } from "lucide-react";
import { motion } from "motion/react";

export function Testimonial() {
  return (
    <section className="w-full px-4 py-12 md:py-20">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Card className="border-2">
            <CardContent className="p-8 md:p-12">
              <div className="flex gap-1 mb-6 justify-center md:justify-start">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                ))}
              </div>
              <blockquote className="text-xl md:text-2xl mb-6 text-center md:text-left">
                "Appointzy го трансформираше начинот на кој управуваме со нашиот бизнис. Резервирањето термини сега е лесно, а на нашите клиенти им се допаѓаат СМС потсетниците."
              </blockquote>
              <div className="text-center md:text-left">
                <div className="text-muted-foreground">Срна</div>
                <div className="text-sm text-muted-foreground">Сопственичка на приватна ординација</div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}