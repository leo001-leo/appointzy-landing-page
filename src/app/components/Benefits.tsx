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
      title: "Easy scheduling",
      description: "Book appointments in seconds with an intuitive interface"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Daily & weekly calendar view",
      description: "See your entire schedule at a glance, organized by day or week"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Customer management",
      description: "Keep track of customer details and appointment history"
    },
    {
      icon: <Smartphone className="w-6 h-6" />,
      title: "Mobile friendly",
      description: "Access your schedule anywhere, on any device"
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
          <h2 className="text-3xl md:text-4xl">Everything you need to stay organized</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Built for busy professionals who need reliable scheduling
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