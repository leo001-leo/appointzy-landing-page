import { Check } from "lucide-react";
import { motion } from "motion/react";

export function HowItWorks() {
  const steps = [
    {
      number: "1",
      title: "Подесување на системот",
      description: "Ние го подесуваме системот за вашата ординација"
    },
    {
      number: "2",
      title: "Внес на термин",
      description: "Вашиот персонал лесно внесува и менаџира термини"
    },
    {
      number: "3",
      title: "Менаџирање на денови",
      description: "Преглед и менаџирање на термините на едно место"
    }
  ];

  return (
    <section className="w-full px-4 py-12 md:py-20">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4 mb-12"
        >
          <h2 className="text-3xl md:text-4xl">Како функционира</h2>
          <p className="text-lg text-muted-foreground">
            Започнете во само 3 чекори
          </p>
        </motion.div>
        <div className="space-y-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex gap-6 items-start"
            >
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center text-accent-foreground">
                  <Check className="w-6 h-6" />
                </div>
              </div>
              <div className="flex-1 pt-1">
                <div className="text-sm text-muted-foreground mb-1">Step {step.number}</div>
                <h3 className="mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}