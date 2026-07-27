import { Card, CardContent } from "./ui/card";
import { FileText, Calculator, Users, ListFilter } from "lucide-react";
import { motion } from "motion/react";

const features = [
  {
    icon: <FileText className="w-6 h-6" />,
    title: "Внес на фактури",
    description: "Добавувач, број на фактура, датум на внес, рок на плаќање и статус — со едно копче „плаtено“"
  },
  {
    icon: <Calculator className="w-6 h-6" />,
    title: "Автоматска пресметка на ДДВ",
    description: "Нето, ДДВ, рабат и вкупно се пресметуваат сами, дури и кога фактурата има повеќе ДДВ стапки"
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "Производи и добавувачи",
    description: "Изберете од листа со пребарување или внесете нов — цена, единица и ДДВ стапка се пополнуваат сами"
  },
  {
    icon: <ListFilter className="w-6 h-6" />,
    title: "Преглед со филтри",
    description: "Листа на сите фактури со вкупни износи и детална страница за секоја одделно"
  }
];

export function InvoicesFeature() {
  return (
    <section className="w-full px-4 py-12 md:py-20 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4 mb-12"
        >
          <span className="inline-block px-3 py-1 text-sm bg-primary/10 text-primary rounded-full">
            Ново
          </span>
          <h2 className="text-3xl md:text-4xl">Влезни фактури, на едно место</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Следете ги фактурите од добавувачите директно во Appointzy — без Excel, без посебна сметководствена алатка.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
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

        {/* Mini invoice mockup */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-2xl mx-auto"
        >
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-border">
            <div className="px-5 py-4 border-b border-border flex items-center justify-between">
              <div>
                <div className="text-sm text-muted-foreground">Добавувач</div>
                <div>Добавувач 1</div>
              </div>
              <span className="px-3 py-1 text-xs rounded-full bg-accent/15 text-accent-foreground">
                Платено
              </span>
            </div>
            <div className="px-5 py-4 space-y-2">
              <div className="grid grid-cols-4 gap-2 text-xs text-muted-foreground pb-2 border-b border-border">
                <span>Производ</span>
                <span className="text-right">Кол.</span>
                <span className="text-right">Цена</span>
                <span className="text-right">ДДВ</span>
              </div>
              {[
                { name: "Стоматолошки ракавици", qty: "10", price: "450", vat: "18%" },
                { name: "Заштитни маски", qty: "50", price: "180", vat: "18%" },
              ].map((row, i) => (
                <div key={i} className="grid grid-cols-4 gap-2 text-sm py-1">
                  <span>{row.name}</span>
                  <span className="text-right text-muted-foreground">{row.qty}</span>
                  <span className="text-right text-muted-foreground">{row.price}</span>
                  <span className="text-right text-muted-foreground">{row.vat}</span>
                </div>
              ))}
            </div>
            <div className="px-5 py-4 bg-muted/40 space-y-1 text-sm">
              <div className="flex justify-between text-muted-foreground">
                <span>Нето</span>
                <span>13.500 мкд.</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>ДДВ (18%)</span>
                <span>2.430 мкд.</span>
              </div>
              <div className="flex justify-between pt-1 border-t border-border">
                <span>Вкупно</span>
                <span>15.930 мкд.</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
