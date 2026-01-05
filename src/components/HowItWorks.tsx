"use client";

import { motion } from "framer-motion";
import { Search, CalendarCheck, Sparkles } from "lucide-react";

type Step = {
  icon: React.ElementType;
  title: string;
  description: string;
  color: string;
};

const steps: Step[] = [
  {
    icon: Search,
    title: "Find Your Salon",
    description:
      "Browse through our curated list of premium salons. Filter by location, services, ratings, and availability.",
    color: "from-rose-500 to-pink-500",
  },
  {
    icon: CalendarCheck,
    title: "Book Instantly",
    description:
      "Choose your preferred date, time, and stylist. Get instant confirmation and reminders.",
    color: "from-orange-500 to-amber-500",
  },
  {
    icon: Sparkles,
    title: "Look Amazing",
    description:
      "Arrive and enjoy a premium beauty experience. Rate your visit and earn rewards.",
    color: "from-violet-500 to-purple-500",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-16 md:py-20 lg:py-28 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3 md:mb-4">
            How It <span className="text-gradient">Works</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Book your next beauty appointment in three simple steps
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connection Line - Desktop */}
          <div className="hidden lg:block absolute top-24 left-1/2 -translate-x-1/2 w-2/3 h-0.5 bg-gradient-to-r from-primary/20 via-primary to-primary/20" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="relative"
              >
                <div className="text-center">
                  {/* Icon */}
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      delay: index * 0.15 + 0.2,
                    }}
                    className="relative inline-block mb-6"
                  >
                    <div
                      className={`w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-elevated`}
                    >
                      <step.icon className="w-7 h-7 md:w-9 md:h-9 text-white" />
                    </div>

                    <div className="absolute -top-2 -right-2 w-7 h-7 md:w-8 md:h-8 rounded-full bg-card border-2 border-primary flex items-center justify-center">
                      <span className="text-xs md:text-sm font-bold text-primary">
                        {index + 1}
                      </span>
                    </div>

                    <motion.div
                      className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${step.color} opacity-20 blur-xl`}
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: index * 0.5,
                      }}
                    />
                  </motion.div>

                  {/* Text */}
                  <h3 className="font-display text-lg md:text-2xl font-semibold mb-2">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground max-w-sm mx-auto">
                    {step.description}
                  </p>
                </div>

                {/* Mobile Arrow */}
                {index < steps.length - 1 && (
                  <div className="md:hidden flex justify-center my-6">
                    <div className="w-0.5 h-10 bg-gradient-to-b from-primary to-primary/20" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
