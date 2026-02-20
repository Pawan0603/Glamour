'use client';
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Sparkles, X } from "lucide-react";

const popularServices = ["Haircut", "Hair Color", "Manicure", "Facial", "Massage", "Makeup"];

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);

  return (
    <section className="py-6 md:py-8 relative -mt-16 md:mt-2 z-20">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          <div className="bg-card rounded-2xl shadow-elevated p-5 md:p-7 border border-border">

            {/* Unified Search Bar */}
            <motion.div
              animate={{ boxShadow: focused ? "0 0 0 3px hsl(var(--primary) / 0.18)" : "0 0 0 0px transparent" }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-3 h-14 md:h-16 bg-muted rounded-xl px-4 border border-border transition-colors duration-200"
              style={{ borderColor: focused ? "hsl(var(--primary) / 0.5)" : undefined }}
            >
              <Search className="w-5 h-5 text-muted-foreground shrink-0" />

              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                placeholder="Search salons, services, or treatments..."
                className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground text-sm md:text-base"
              />

              <AnimatePresence>
                {query && (
                  <motion.button
                    key="clear"
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.7 }}
                    transition={{ duration: 0.15 }}
                    onClick={() => setQuery("")}
                    className="p-1 rounded-full hover:bg-border transition-colors text-muted-foreground"
                  >
                    <X className="w-4 h-4" />
                  </motion.button>
                )}
              </AnimatePresence>

              {/* Inline Search Button */}
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="gradient-primary text-primary-foreground h-9 px-5 rounded-lg font-semibold text-sm shadow-soft shrink-0 hidden md:flex items-center gap-2"
              >
                Search
              </motion.button>
            </motion.div>

            {/* Popular Tags */}
            <div className="mt-5 flex flex-wrap items-center gap-2">
              <span className="flex items-center gap-1.5 text-xs text-muted-foreground mr-1">
                <Sparkles className="w-3.5 h-3.5" />
                Popular:
              </span>
              {popularServices.map((service, index) => (
                <motion.button
                  key={service}
                  initial={{ opacity: 0, scale: 0.85 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setQuery(service)}
                  className="px-3.5 py-1.5 rounded-full bg-muted text-xs font-medium text-foreground border border-border hover:border-primary/40 hover:bg-primary/5 transition-colors"
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
};

export default SearchBar;
