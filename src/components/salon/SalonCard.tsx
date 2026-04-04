import React from 'react'
import { motion } from 'framer-motion';
import { Star, MapPin, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface SalonCardProps {
  _id: string;
  salonName: string;
  salonCoverImage: string;
  city: string;
  description: string;
  rating: number;
  salonCategory: string;
  services: string[];
  openingTime: string;
  closingTime: string;
  weeklyAvailabity: string[];
}

export default function SalonCard({ _id, salonName, salonCoverImage, city, description, rating, salonCategory, services, openingTime, closingTime, weeklyAvailabity }: SalonCardProps) {

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

  const isOpen = isSalonOpen(
    openingTime,
    closingTime,
    weeklyAvailabity
  );

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25 }}
      className="bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-elevated transition-all duration-300 h-full flex flex-col"
    >
      <div className="relative h-40 sm:h-44 md:h-48 overflow-hidden">
        <img
          src={salonCoverImage}
          alt={salonName}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          loading="lazy"
        />
        <div className="absolute top-3 left-3">
          <span className="px-2.5 md:px-3 py-1 bg-primary/90 text-primary-foreground text-xs font-medium rounded-full">
            {salonCategory}
          </span>
        </div>
        <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 bg-background/90 backdrop-blur-sm rounded-full">
          <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
          <span className="text-xs font-semibold">{rating}</span>
        </div>
      </div>

      <div className="p-4 md:p-5 flex-1 flex flex-col">
        <span className='flex justify-between items-center'>
          <h3 className="text-base md:text-lg font-display font-semibold text-foreground mb-1 line-clamp-1">{salonName}</h3>
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${isOpen
              ? "bg-green-500 text-white"
              : "bg-muted text-muted-foreground"
              }`}
          >
            {isOpen ? "Open Now" : "Closed"}
          </span>
        </span>

        <div className="flex items-center justify-between gap-1 text-muted-foreground text-xs md:text-sm mb-2 md:mb-3">
          <span className='flex items-center gap-1'>
            <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
            <span className="line-clamp-1">{city}</span>
          </span>
          <span className='flex items-center gap-1'><Clock className="w-4 h-4" />{`${openingTime} : ${closingTime}`}</span>
        </div>
        {/* <p className="text-xs md:text-sm text-muted-foreground line-clamp-2 mb-3 md:mb-4 flex-1">{description}</p> */}

        <div className="flex flex-wrap gap-2 mb-4">
          {services.map((service) => (
            <span
              key={service}
              className="px-3 py-1 rounded-full bg-muted text-xs"
            >
              {service}
            </span>
          ))}
        </div>
        <Link href={`/salons/${_id}`}>
          <Button className="w-full gradient-primary rounded-xl font-semibold hover:cursor-pointer">
            Book now
          </Button>
        </Link>
      </div>
    </motion.div>
  )
}

