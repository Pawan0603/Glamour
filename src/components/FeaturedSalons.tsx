"use client";

import { motion } from "framer-motion";
import { Star, MapPin, Clock, Heart } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";

type Salon = {
  id: number;
  name: string;
  image: string;
  rating: number;
  reviews: number;
  location: string;
  distance: string;
  services: string[];
  price: string;
  isOpen: boolean;
};

const salons: Salon[] = [
  {
    id: 1,
    name: "Luxe Hair Studio",
    image:
      "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&h=300&fit=crop",
    rating: 4.9,
    reviews: 234,
    location: "Downtown, NYC",
    distance: "0.8 mi",
    services: ["Haircut", "Color", "Styling"],
    price: "$$",
    isOpen: true,
  },
  {
    id: 2,
    name: "Serenity Spa & Beauty",
    image:
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&h=300&fit=crop",
    rating: 4.8,
    reviews: 189,
    location: "Midtown, NYC",
    distance: "1.2 mi",
    services: ["Facial", "Massage", "Nails"],
    price: "$$$",
    isOpen: true,
  },
  {
    id: 3,
    name: "The Glow Bar",
    image:
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&h=300&fit=crop",
    rating: 4.7,
    reviews: 156,
    location: "Brooklyn, NYC",
    distance: "2.1 mi",
    services: ["Makeup", "Skincare", "Brows"],
    price: "$$",
    isOpen: false,
  },
  {
    id: 4,
    name: "Elite Men's Grooming",
    image:
      "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=400&h=300&fit=crop",
    rating: 4.9,
    reviews: 312,
    location: "SoHo, NYC",
    distance: "1.5 mi",
    services: ["Barber", "Shave", "Beard"],
    price: "$$",
    isOpen: true,
  },
  {
    id: 5,
    name: "Nail Art Paradise",
    image:
      "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400&h=300&fit=crop",
    rating: 4.6,
    reviews: 98,
    location: "Upper East, NYC",
    distance: "3.0 mi",
    services: ["Manicure", "Pedicure", "Art"],
    price: "$",
    isOpen: true,
  },
  {
    id: 6,
    name: "Zen Wellness Center",
    image:
      "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400&h=300&fit=crop",
    rating: 4.8,
    reviews: 267,
    location: "Chelsea, NYC",
    distance: "1.8 mi",
    services: ["Spa", "Wellness", "Therapy"],
    price: "$$$",
    isOpen: true,
  },
];

export default function FeaturedSalons() {
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
              key={salon.id}
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
                    src={salon.image}
                    alt={salon.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

                  <button className="absolute top-3 right-3 w-10 h-10 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
                    <Heart className="w-5 h-5 text-muted-foreground hover:text-primary" />
                  </button>

                  <span
                    className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold ${
                      salon.isOpen
                        ? "bg-green-500 text-white"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {salon.isOpen ? "Open Now" : "Closed"}
                  </span>

                  <span className="absolute bottom-3 right-3 px-3 py-1 rounded-full bg-white/90 text-xs font-semibold">
                    {salon.price}
                  </span>
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="flex justify-between mb-2">
                    <h3 className="font-display text-lg font-semibold">
                      {salon.name}
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
                      {salon.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {salon.distance}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {salon.services.map((service) => (
                      <span
                        key={service}
                        className="px-3 py-1 rounded-full bg-muted text-xs"
                      >
                        {service}
                      </span>
                    ))}
                  </div>

                  <Button className="w-full gradient-primary rounded-xl font-semibold">
                    Book Now
                  </Button>
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
