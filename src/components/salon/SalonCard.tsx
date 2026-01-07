import React from 'react'
import { motion } from 'framer-motion';
import { Star, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface SalonCardProps {
  id: string;
  name: string;
  image: string;
  location: string;
  description: string;
  rating: number;
  category: string;
}

export default function SalonCard({ id, name, image, location, description, rating, category }: SalonCardProps) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25 }}
      className="bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-elevated transition-all duration-300 h-full flex flex-col"
    >
      <div className="relative h-40 sm:h-44 md:h-48 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          loading="lazy"
        />
        <div className="absolute top-3 left-3">
          <span className="px-2.5 md:px-3 py-1 bg-primary/90 text-primary-foreground text-xs font-medium rounded-full">
            {category}
          </span>
        </div>
        <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 bg-background/90 backdrop-blur-sm rounded-full">
          <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
          <span className="text-xs font-semibold">{rating}</span>
        </div>
      </div>

      <div className="p-4 md:p-5 flex-1 flex flex-col">
        <h3 className="text-base md:text-lg font-display font-semibold text-foreground mb-1 line-clamp-1">{name}</h3>
        <div className="flex items-center gap-1 text-muted-foreground text-xs md:text-sm mb-2 md:mb-3">
          <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
          <span className="line-clamp-1">{location}</span>
        </div>
        <p className="text-xs md:text-sm text-muted-foreground line-clamp-2 mb-3 md:mb-4 flex-1">{description}</p>
        <Link href={`/salons/${id}`}>
          <Button className="w-full h-10 md:h-11 touch-target" variant="outline">
            View Details
          </Button>
        </Link>
      </div>
    </motion.div>
  )
}

