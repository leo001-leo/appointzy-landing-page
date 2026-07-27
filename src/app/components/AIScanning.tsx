import { Card, CardContent } from "./ui/card";
import { Camera, Sparkles, CheckCircle2, AlertTriangle } from "lucide-react";
import { motion } from "motion/react";

const steps = [
  {
    icon: <Camera className="w-6 h-6" />,
    title: "Сликајте или прикачете",
    description: "Фотографирајте ја хартиената фактура со телефон, или прикачете PDF"
  },
  {
    icon: <Sparkles className="w-6 h-6" />,
    title: "AI ја чита фактурата",
    description: "Добавувач, ставки, цени, ДДВ и вкупни износи се препознаваат автоматски"
  },
  {
    icon: <CheckCircle2 className="w-6 h-6" />,
    title: "Проверете и зачувајте",
    description: "Формата е веќе пополнета — само проверете и потврдете, без пишување"
  }
];

export function AIScanning() {
  return (
    <section className="w-full px-4 py-16 md:py-24 relative overflow-hidden bg-gradient-to-b from-primary/5 via-accent/5 to-transparent">
      <div className="max-w-6xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-5 mb-14"
        >
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 text-sm bg-primary text-primary-foreground rounded-full shadow-md">
            <Sparkles className="w-4 h-4" />
            Прва AI функција во Appointzy
          </span>
          <h2 className="text-3xl md:text-5xl">
            Appointzy сега има вештачка интелигенција
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Наместо рачно да ги внесувате фактурите, сликајте ги и пуштете AI да ја заврши работата.
            Вие само проверувате и потврдувате.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.12 }}
            >
              <Card className="border-2 h-full bg-background/80 backdrop-blur-sm">
                <CardContent className="p-6 space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-primary text-primary-foreground flex items-center justify-center">
                    {step.icon}
                  </div>
                  <div className="text-sm text-muted-foreground">Чекор {index + 1}</div>
                  <h3>{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Scan mockup */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-2xl mx-auto"
        >
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-border">
            <div className="px-5 py-3 border-b border-border flex items-center gap-2 bg-primary/5">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm text-primary">AI пополни 8 од 9 полиња</span>
            </div>
            <div className="p-5 grid grid-cols-2 gap-4 text-sm">
              <div className="space-y-1">
                <div className="text-xs text-muted-foreground">Добавувач</div>
                <div className="px-3 py-2 rounded-lg bg-muted/60">Добавувач 1</div>
              </div>
              <div className="space-y-1">
                <div className="text-xs text-muted-foreground">Број на фактура</div>
                <div className="px-3 py-2 rounded-lg bg-muted/60">123456</div>
              </div>
              <div className="space-y-1">
                <div className="text-xs text-muted-foreground">Датум на внес</div>
                <div className="px-3 py-2 rounded-lg bg-muted/60">27.07.2026</div>
              </div>
              <div className="space-y-1">
                <div className="text-xs text-muted-foreground">Рок на плаќање</div>
                <div className="px-3 py-2 rounded-lg bg-muted/60">10.08.2026</div>
              </div>
              <div className="col-span-2 space-y-1">
                <div className="text-xs text-muted-foreground">Вкупен износ</div>
                <div className="px-3 py-2 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-between">
                  <span>18.450 мкд.</span>
                  <span className="inline-flex items-center gap-1 text-xs text-amber-700">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    Проверете износ
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
