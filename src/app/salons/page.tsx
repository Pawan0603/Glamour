'use client';
import React, { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion';
import { Search, MapPin, Filter, X, SlidersHorizontal } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import Footer from '@/components/Footer';
import SalonCard from '@/components/salon/SalonCard';

const mockSalons = [
  {
    id: "1",
    name: "Elite Cuts Studio",
    image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800",
    location: "Koramangala, Bangalore",
    description: "Premium unisex salon offering cutting-edge styles and luxurious treatments.",
    rating: 4.8,
    category: "Unisex",
  },
  {
    id: "2",
    name: "Glamour & Grace",
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800",
    location: "Indiranagar, Bangalore",
    description: "Exclusive women's beauty parlour specializing in bridal and party makeup.",
    rating: 4.9,
    category: "Women",
  },
  {
    id: "3",
    name: "The Gentlemen's Lounge",
    image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800",
    location: "HSR Layout, Bangalore",
    description: "Classic barbershop experience with modern grooming services for men.",
    rating: 4.7,
    category: "Men",
  },
  {
    id: "4",
    name: "Style Avenue",
    image: "https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6?w=800",
    location: "Whitefield, Bangalore",
    description: "Contemporary salon with expert stylists and organic beauty products.",
    rating: 4.6,
    category: "Unisex",
  },
  {
    id: "5",
    name: "Beauty Bliss",
    image: "https://images.unsplash.com/photo-1600948836101-f9ffda59d250?w=800",
    location: "JP Nagar, Bangalore",
    description: "Full-service beauty destination for all your pampering needs.",
    rating: 4.5,
    category: "Women",
  },
  {
    id: "6",
    name: "Urban Barbers",
    image: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=800",
    location: "MG Road, Bangalore",
    description: "Trendy barbershop with skilled barbers and relaxed atmosphere.",
    rating: 4.8,
    category: "Men",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function page() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const [focused, setFocused] = useState(false);

  const filteredSalons = mockSalons.filter((salon) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      salon.name.toLowerCase().includes(q) ||
      salon.description.toLowerCase().includes(q) ||
      salon.location.toLowerCase().includes(q);
    const matchesCategory =
      selectedCategory === "all" || salon.category.toLowerCase() === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const hasActiveFilters = selectedCategory !== "all" || searchQuery;

  return (
    <div className="min-h-screen bg-background">

      {/* Hero Section */}
      <section className="pt-16 md:pt-24 pb-6 md:pb-8 sm:px-6 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto max-w-6xl">
          {/* <motion.s */}

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="sticky top-16 md:top-20 z-40 glass rounded-2xl shadow-card p-5 md:p-6"
          >
            {/* Unified search row */}
            <div className="flex items-center gap-3">
              <motion.div
                animate={{ boxShadow: focused ? "0 0 0 3px hsl(var(--primary) / 0.18)" : "0 0 0 0px transparent" }}
                transition={{ duration: 0.2 }}
                className="flex flex-1 items-center gap-3 h-13 md:h-14 bg-muted rounded-xl px-4 border border-border"
                style={{ borderColor: focused ? "hsl(var(--primary) / 0.5)" : undefined }}
              >
                <Search className="w-5 h-5 text-muted-foreground shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setFocused(true)}
                  onBlur={() => setFocused(false)}
                  placeholder="Search salons, services, or locations..."
                  className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground text-sm md:text-base py-3.5"
                />
                <AnimatePresence>
                  {searchQuery && (
                    <motion.button
                      key="clear"
                      initial={{ opacity: 0, scale: 0.7 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.7 }}
                      transition={{ duration: 0.15 }}
                      onClick={() => setSearchQuery("")}
                      className="hidden md:block p-1 rounded-full hover:bg-border transition-colors text-muted-foreground"
                    >
                      <X className="w-4 h-4" />
                    </motion.button>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Filter toggle */}
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setShowFilters((v) => !v)}
                className={`h-12 w-12 rounded-xl border flex items-center justify-center shrink-0 transition-colors ${showFilters
                    ? "bg-primary text-primary-foreground border-primary shadow-soft"
                    : "bg-muted border-border text-foreground hover:border-primary/40"
                  }`}
              >
                <SlidersHorizontal className="w-4.5 h-4.5" />
              </motion.button>

              {/* Search button */}
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="gradient-primary text-primary-foreground h-12 px-5 md:px-7 rounded-xl font-semibold text-sm shadow-soft shrink-0 hidden sm:flex items-center gap-2"
              >
                <Search className="w-4 h-4" />
                Search
              </motion.button>
            </div>

            {/* Filter Panel */}
            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden"
                >
                  <div className="mt-4 pt-4 border-t border-border flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">Category</p>
                      <div className="flex flex-wrap gap-2">
                        {["all", "men", "women", "unisex"].map((cat) => (
                          <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all ${selectedCategory === cat
                                ? "gradient-primary text-primary-foreground border-transparent shadow-soft"
                                : "bg-muted border-border text-foreground hover:border-primary/40 hover:bg-primary/5"
                              }`}
                          >
                            {cat === "all" ? "All" : cat.charAt(0).toUpperCase() + cat.slice(1)}
                          </button>
                        ))}
                      </div>
                    </div>

                    {hasActiveFilters && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => { setSelectedCategory("all"); setSearchQuery(""); }}
                        className="text-muted-foreground text-xs gap-1"
                      >
                        <X className="w-3.5 h-3.5" />
                        Clear all
                      </Button>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Salon Grid */}
      <section className="py-8 md:py-12 px-4 sm:px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="flex justify-between items-center mb-6 md:mb-8">
            <p className="text-sm md:text-base text-muted-foreground">
              <span className="font-semibold text-foreground">{filteredSalons.length}</span> salons found
            </p>
          </div>

          {filteredSalons.length > 0 ? (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
            >
              {filteredSalons.map((salon) => (
                <motion.div key={salon.id} variants={itemVariants}>
                  <SalonCard {...salon} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12 md:py-16"
            >
              <div className="w-20 h-20 md:w-24 md:h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 md:w-10 md:h-10 text-muted-foreground" />
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-foreground mb-2">No salons found</h3>
              <p className="text-sm md:text-base text-muted-foreground">Try adjusting your search or filters</p>
            </motion.div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}