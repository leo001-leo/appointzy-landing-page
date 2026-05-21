import { Globe, Home, Zap, Smartphone } from "lucide-react";
import { motion } from "motion/react";
import { Card, CardContent } from "./ui/card";
import React from "react";

const features = [
  {
    icon: <Globe className="w-6 h-6" />,
    title: "Директно во прелистувачот",
    description: "Отворете го Appointzy на вашиот телефон — нема преземање, нема инсталација."
  },
  {
    icon: <Home className="w-6 h-6" />,
    title: "Додај на почетниот екран",
    description: "Со еден допир додајте ја иконата и изгледа точно како вистинска апликација."
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Секогаш ажурирано",
    description: "Нема рачно ажурирање — автоматски ги добивате сите нови функции."
  },
  {
    icon: <Smartphone className="w-6 h-6" />,
    title: "iOS и Android",
    description: "Работи беспрекорно на сите уреди, без разлика на оперативниот систем."
  }
];

export function MobileApp() {
  return (
    <section className="w-full px-4 py-12 md:py-20">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4 mb-12"
        >
          <span className="inline-block px-3 py-1 text-sm bg-primary/10 text-primary rounded-full">
            Без инсталација
          </span>
          <h2 className="text-3xl md:text-4xl">Апликација на вашиот телефон — без App Store</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Appointzy работи директно во прелистувачот. Отворете го на телефон, таблет или компјутер — веднаш, без чекање.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="border-2 hover:shadow-lg transition-shadow h-full">
                <CardContent className="p-6 space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                    {feature.icon}
                  </div>
                  <h3>{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex flex-col items-center gap-6"
        >
          {/* Phone mockup */}
          <div className="relative">
            <div className="w-48 h-80 border-4 border-foreground/20 rounded-3xl bg-white shadow-2xl overflow-hidden">
              <div className="h-6 bg-gray-100 flex items-center justify-center">
                <div className="w-16 h-2 bg-gray-300 rounded-full" />
              </div>
              <div className="p-3 space-y-2">
                <div className="h-4 bg-primary/20 rounded w-3/4" />
                <div className="h-3 bg-muted rounded w-1/2" />
                <div className="mt-3 space-y-1.5">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="h-9 bg-muted/60 rounded-lg flex items-center px-2 gap-2">
                      <div className="w-4 h-4 rounded bg-primary/30 flex-shrink-0" />
                      <div className="h-2 bg-muted rounded flex-1" />
                    </div>
                  ))}
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-12 bg-gray-50 border-t border-gray-200 flex items-center justify-around px-4">
                <div className="w-5 h-5 rounded bg-primary/40" />
                <div className="w-5 h-5 rounded bg-muted" />
                <div className="w-5 h-5 rounded bg-muted" />
              </div>
            </div>
            <div className="absolute -right-8 -bottom-3 bg-primary text-primary-foreground text-xs px-3 py-1.5 rounded-full shadow-lg whitespace-nowrap font-medium">
              + Додај на екран
            </div>
          </div>

          <p className="text-sm text-muted-foreground text-center max-w-xs leading-relaxed">
            <strong>Safari (iPhone):</strong> допрете Сподели → "Додај на почетниот екран"<br />
            <strong>Chrome (Android):</strong> допрете Мени → "Инсталирај апликација"
          </p>
        </motion.div>
      </div>
    </section>
  );
}
