import { Card, CardContent } from "./ui/card";
import { Calendar, Users, Smartphone, Clock } from "lucide-react";
import { motion } from "motion/react";

interface BenefitCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
}

function BenefitCard({ icon, title, description, index }: BenefitCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className="border-2 hover:shadow-lg transition-shadow h-full">
        <CardContent className="p-6 space-y-4">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
            {icon}
          </div>
          <h3>{title}</h3>
          <p className="text-muted-foreground">{description}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export function Benefits() {
  const benefits = [
    {
      icon: <Calendar className="w-6 h-6" />,
      title: "Лесно закажување",
      description: "Закажи термин во само 10 секунди"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Дневен, неделен и месечен преглед",
      description: "Јасен дневен, неделен и месечен распоред по стоматолог"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Менаџмент на Пациенти",
      description: "Историја на пациенти и нивни термини"
    },
    {
      icon: <Smartphone className="w-6 h-6" />,
      title: "Пристап од мобилен",
      description: "Пристап од секаде, од мобилен телефон"
    }
  ];

  return (
    <section id="features" className="w-full px-4 py-12 md:py-20 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4 mb-12"
        >
          <h2 className="text-3xl md:text-4xl">Останете организирани и ефикасни</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Изградено за професионалци кои имаат потреба од ефикасност
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <BenefitCard key={index} {...benefit} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}