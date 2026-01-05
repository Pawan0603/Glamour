"use client";

import { motion } from "framer-motion";
import { Search, MapPin, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SearchBar() {
  const popularServices: string[] = [
    "Haircut",
    "Hair Color",
    "Manicure",
    "Facial",
    "Massage",
    "Makeup",
  ];

  return (
    <section className="py-6 md:py-8 relative -mt-16 md:mt-2 z-20">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          {/* Search Card */}
          <div className="bg-card rounded-2xl shadow-elevated p-4 md:p-6 border border-border">
            <div className="flex flex-col gap-3 md:gap-4">
              {/* Inputs */}
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                {/* Service */}
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
                  <input
                    type="text"
                    placeholder="Search services or salons..."
                    className="w-full h-12 md:h-14 pl-12 pr-4 rounded-xl bg-muted border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm"
                  />
                </div>

                {/* Location */}
                <div className="flex-1 relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
                  <input
                    type="text"
                    placeholder="Enter your location..."
                    className="w-full h-12 md:h-14 pl-12 pr-4 rounded-xl bg-muted border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm"
                  />
                </div>
              </div>

              {/* Button */}
              <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                <Button
                  size="lg"
                  className="w-full sm:w-auto h-12 md:h-14 px-6 md:px-8 gradient-primary shadow-soft rounded-xl font-semibold touch-target text-white"
                >
                  <Search className="w-5 h-5 mr-2 text-white" />
                  Search
                </Button>
              </motion.div>
            </div>

            {/* Popular Services */}
            <div className="mt-5 md:mt-6 flex flex-wrap items-center gap-2 md:gap-3">
              <span className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground">
                <Sparkles className="w-4 h-4" />
                Popular:
              </span>

              {popularServices.map((service, index) => (
                <motion.button
                  key={service}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{
                    scale: 1.05,
                    backgroundColor: "hsl(var(--primary) / 0.1)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="px-3 md:px-4 py-1.5 md:py-2 rounded-full bg-muted text-xs md:text-sm font-medium border border-border hover:border-primary/30 transition-colors"
                >
                  {service}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
