'use client';
import React, { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion';
import { Search, X, SlidersHorizontal } from 'lucide-react';
import Footer from '@/components/Footer';
import SalonCard from '@/components/salon/SalonCard';
import axios from 'axios';
import { Salon } from '@/lib/interfaces';
import { useSearchParams } from 'next/navigation';
import SalonCardSkeleton from '@/components/skeleton/SalonCardSkeleton';


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

interface ApiResponse {
  success: boolean;
  data: Salon[];
  pagination: {
    total: number;
    pages: number;
    currentPage: number;
  };
}

export default function page() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const [focused, setFocused] = useState(false);
  const searchParams = useSearchParams();
  const Query = searchParams.get("query");

  // const filteredSalons = mockSalons.filter((salon) => {
  //   const q = searchQuery.toLowerCase();
  //   const matchesSearch =
  //     salon.name.toLowerCase().includes(q) ||
  //     salon.description.toLowerCase().includes(q) ||
  //     salon.location.toLowerCase().includes(q);
  //   const matchesCategory =
  //     selectedCategory === "all" || salon.category.toLowerCase() === selectedCategory;
  //   return matchesSearch && matchesCategory;
  // });

  // const hasActiveFilters = selectedCategory !== "all" || searchQuery;

  const [salons, setSalons] = useState<Salon[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [query, setQuery] = useState<string>("");
  const [category, setCategory] = useState<string>("All");

  const fetchSalons = async (isNewSearch: boolean = false, query: string = "", page: number = 1) => {
    setLoading(true);
    try {
      const response = await axios.get(`/api/salon`, {
        params: {
          query: query, // Search string (Name, Service, or Location)
          page: page,
          limit: 12
        }
      });
      if (isNewSearch) {
        setSalons(response.data.data);
      } else {
        setSalons([...salons, ...response.data.data]);
      }
    } catch (error) {
      console.error("Error fetching salons:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (Query) {
      setQuery(Query)
      fetchSalons(true, Query, 1);
    } else {
      fetchSalons();
    }
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetchSalons(true, query);
  }

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
            <form onSubmit={handleSubmit} className="flex items-center gap-3">
              <motion.div
                animate={{ boxShadow: focused ? "0 0 0 3px hsl(var(--primary) / 0.18)" : "0 0 0 0px transparent" }}
                transition={{ duration: 0.2 }}
                className="flex flex-1 items-center gap-3 h-13 md:h-14 bg-muted rounded-xl px-4 border border-border"
                style={{ borderColor: focused ? "hsl(var(--primary) / 0.5)" : undefined }}
              >
                <Search className="w-5 h-5 text-muted-foreground shrink-0" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
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
                type="button"
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
                type='submit'
                className="gradient-primary text-primary-foreground h-12 px-5 md:px-7 rounded-xl font-semibold text-sm shadow-soft shrink-0 hidden sm:flex items-center gap-2"
              >
                <Search className="w-4 h-4" />
                Search
              </motion.button>
            </form>

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

                    {/* {hasActiveFilters && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => { setSelectedCategory("all"); setSearchQuery(""); }}
                        className="text-muted-foreground text-xs gap-1"
                      >
                        <X className="w-3.5 h-3.5" />
                        Clear all
                      </Button>
                    )} */}
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
              <span className="font-semibold text-foreground">{salons.length}</span> salons found
            </p>
          </div>

          {salons.length > 0 ? (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
            >
              {salons.map((salon) => (
                <motion.div key={salon._id} variants={itemVariants}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                >
                  <SalonCard
                    _id={salon._id}
                    salonName={salon.salonName}
                    salonCoverImage={salon.salonCoverImage!}
                    city={salon.city}
                    description={salon.description}
                    rating={salon.rating}
                    salonCategory={salon.salonCategory}
                    services={salon.services.map(s => s.servicesName)}
                    openingTime={salon.openingTime}
                    closingTime={salon.closingTime}
                    weeklyAvailabity={salon.weeklyAvailabity}
                  />
                </motion.div>
              ))}
            </motion.div>
          ) : loading === true ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
              {Array.from({ length: 6 }).map((_, i) => (
                <SalonCardSkeleton key={i} />
              ))}
            </div>
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