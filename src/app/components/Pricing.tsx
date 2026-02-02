import { Button } from "./ui/button";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Check } from "lucide-react";
import { motion } from "motion/react";

export function Pricing() {
  const plans = [
    {
      name: "Почетен",
      price: "950 мкд.",
      period: "/month",
      description: "Одлично за ординации со 1 вработен",
      features: [
        "До 150 термини месечно",
        "1 вработен",
        "Пристап од мобилен телефон",
        "Основна аналитика"
      ],
      popular: false
    },
    {
      name: "Стандарден",
      price: "1.699 мкд.",
      period: "/month",
      description: "За ординации кои имаат голем раст",
      features: [
        "Неограничен број на термини",
        "До 5 вработени",
        "СМС & емаил потсетници",
        "Пристап од мобилен телефон",
        "Напредна аналитика",
        "Персонализиран брендинг",
        "Поддршка 24/7"
      ],
      popular: true
    },
    {
      name: "Бизнис",
      price: "2.000 мкд.",
      period: "/month",
      description: "За веќе воспоставени бизниси со повеќе локации",
      features: [
        "Неограничен број на термини",
        "Неограничен број на вработени",
        "СМС & емаил потсетници",
        "Пристап од мобилен телефон",
        "Напредна аналитика",
        "Персонализиран брендинг",
        "Поддршка 24/7",
	"Повеќе локации",
      ],
      popular: false
    }
  ];

  return (
    <section id="pricing" className="w-full px-4 py-12 md:py-20">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4 mb-12"
        >
          <h2 className="text-3xl md:text-4xl">Simple, transparent pricing</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Одберете план кој најмногу ви одговара. Сите опции се со 30 дневен тест период.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className={`h-full ${plan.popular ? 'border-primary border-2 shadow-lg' : 'border-2'}`}>
                <CardHeader className="text-center pb-8 pt-8">
                  {plan.popular && (
                    <div className="mb-4">
                      <span className="inline-block px-3 py-1 text-sm bg-primary text-primary-foreground rounded-full">
                        Најпопуларно
                      </span>
                    </div>
                  )}
                  <h3 className="mb-2">{plan.name}</h3>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-4xl">{plan.price}</span>
                    <span className="text-muted-foreground">{plan.period}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-4">{plan.description}</p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex gap-3 items-start">
                        <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    className="w-full"
                    variant={plan.popular ? "default" : "outline"}
                  >
                    Започни бесплатно
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center text-sm text-muted-foreground mt-8"
        >
          Сите опции вклучуваат 30 дневен тест период. Не е потребна платежна картичка
        </motion.p>
      </div>
    </section>
  );
}
