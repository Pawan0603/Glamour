"use client";

import { motion } from "framer-motion";
import { Star, MapPin, Clock, Heart } from "lucide-react";
import Image from "next/image";
import { Salon } from '@/lib/interfaces';
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import Link from "next/link";


export default function FeaturedSalons() {
  const [salons, setSalons] = useState<Salon[]>([]);

  const fetchFeaturedSalons = async (page: number) => {
    try {
      const res = await axios.get(`/api/salon/featuredSalon?page=${page}`);

      setSalons(res.data.data)
      console.log("featured salons: ", res.data.data)
    } catch (err) {
      const error = err as AxiosError<{ error: string }>
      toast.error(error.response?.data.error || "Somethin went worng.")
    }
  }

  useEffect(() => {
    fetchFeaturedSalons(1);
  }, []);

  function isSalonOpen(
    openingTime: string,
    closingTime: string,
    weeklyAvailability: string[]
  ) {
    const now = new Date();

    // Today short name (Mon, Tue...)
    const today = now.toLocaleDateString("en-US", { weekday: "short" });

    // Check day
    if (!weeklyAvailability.includes(today)) return false;

    // Current minutes
    const currentMinutes = now.getHours() * 60 + now.getMinutes();

    // Opening minutes
    const [oh, om] = openingTime.split(":").map(Number);
    const openMinutes = oh * 60 + om;

    // Closing minutes
    const [ch, cm] = closingTime.split(":").map(Number);
    const closeMinutes = ch * 60 + cm;

    return currentMinutes >= openMinutes && currentMinutes <= closeMinutes;
  }
  return (
    <section className="py-16 md:py-20 lg:py-24 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10 md:mb-12"
        >
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3 md:mb-4">
            Featured <span className="text-gradient">Salons</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover top-rated beauty destinations hand-picked for their
            exceptional service and style
          </p>
        </motion.div>

        {/* Salons Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {salons.map((salon, index) => (
            <motion.div
              key={salon._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              whileHover={{ y: -6 }}
            >
              <div className="bg-card rounded-2xl overflow-hidden shadow-card border border-border transition-all duration-300 hover:shadow-elevated">
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={salon.salonCoverImage!}
                    alt={salon.salonName}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

                  <button className="absolute top-3 right-3 w-10 h-10 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
                    <Heart className="w-5 h-5 text-muted-foreground hover:text-primary" />
                  </button>

                  <span
                    className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold ${isSalonOpen(salon.openingTime, salon.closingTime, salon.weeklyAvailabity)
                      ? "bg-green-500 text-white"
                      : "bg-muted text-muted-foreground"
                      }`}
                  >
                    {isSalonOpen(salon.openingTime, salon.closingTime, salon.weeklyAvailabity)? "Open Now" : "Closed"}
                  </span>

                  {/* <span className="absolute bottom-3 right-3 px-3 py-1 rounded-full bg-white/90 text-xs font-semibold">
                    {salon.price}
                  </span> */}
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="flex justify-between mb-2">
                    <h3 className="font-display text-lg font-semibold">
                      {salon.salonName}
                    </h3>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      <span className="text-sm font-semibold">
                        {salon.rating}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-4 text-sm text-muted-foreground mb-3">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {salon.city}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {salon.openingTime} : {salon.closingTime}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {salon.services.map((service) => (
                      <span
                        key={service._id}
                        className="px-3 py-1 rounded-full bg-muted text-xs"
                      >
                        {service.servicesName}
                      </span>
                    ))}
                  </div>

                  <Link href={`/salons/${salon._id}`}>
                    <Button className="w-full gradient-primary rounded-xl font-semibold hover:cursor-pointer">
                      Book Now
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg" className="rounded-xl border-2">
            View All Salons
          </Button>
        </div>
      </div>
    </section>
  );
}
