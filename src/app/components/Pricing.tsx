import { Button } from "./ui/button";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Check } from "lucide-react";
import { motion } from "motion/react";

export function Pricing() {
  const plans = [
    {
      name: "Starter",
      price: "$19",
      period: "/month",
      description: "Perfect for solo practitioners and small teams",
      features: [
        "Up to 100 appointments/month",
        "1 staff member",
        "Email reminders",
        "Mobile app access",
        "Basic analytics"
      ],
      popular: false
    },
    {
      name: "Professional",
      price: "$49",
      period: "/month",
      description: "For growing businesses that need more power",
      features: [
        "Unlimited appointments",
        "Up to 5 staff members",
        "SMS & email reminders",
        "Mobile app access",
        "Advanced analytics",
        "Custom branding",
        "Priority support"
      ],
      popular: true
    },
    {
      name: "Business",
      price: "$99",
      period: "/month",
      description: "For established businesses with multiple locations",
      features: [
        "Unlimited appointments",
        "Unlimited staff members",
        "SMS & email reminders",
        "Mobile app access",
        "Advanced analytics",
        "Custom branding",
        "Priority support",
        "API access",
        "Multiple locations"
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
            Choose the plan that's right for your business. All plans include a 14-day free trial.
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
                        Most Popular
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
                    Start free trial
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
          All plans include 14-day free trial. No credit card required.
        </motion.p>
      </div>
    </section>
  );
}
