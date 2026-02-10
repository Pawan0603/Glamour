'use client';
// import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { MapPin, Star, Clock, Phone, Mail, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServiceCard from '@/components/salon/ServiceCard';
import BarberCard from '@/components/salon/BarberCard';
import Link from "next/link";

const mockSalonData = {
  id: "1",
  name: "Elite Cuts Studio",
  image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1200",
  gallery: [
    "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400",
    "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400",
    "https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6?w=400",
    "https://images.unsplash.com/photo-1600948836101-f9ffda59d250?w=400",
  ],
  location: "123, 5th Cross, Koramangala, Bangalore - 560034",
  description: "Elite Cuts Studio is a premium unisex salon offering cutting-edge styles and luxurious treatments. Our team of expert stylists brings years of experience and passion for creating the perfect look for every client. We use only the finest products and stay updated with the latest trends in hair and beauty.",
  rating: 4.8,
  reviewCount: 256,
  category: "Unisex",
  phone: "+91 98765 43210",
  email: "hello@elitecuts.com",
  openingHours: "10:00 AM - 9:00 PM",
  services: [
    { name: "Haircut & Styling", price: 500, duration: 45 },
    { name: "Hair Coloring", price: 1500, duration: 90 },
    { name: "Keratin Treatment", price: 3500, duration: 120 },
    { name: "Beard Trim", price: 200, duration: 20 },
    { name: "Facial", price: 800, duration: 60 },
    { name: "Head Massage", price: 300, duration: 30 },
  ],
  barbers: [
    {
      name: "Rahul Sharma",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
      experience: 8,
      services: ["Haircut", "Styling", "Beard Trim", "Coloring"],
    },
    {
      name: "Priya Patel",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
      experience: 6,
      services: ["Hair Coloring", "Keratin", "Facial", "Makeup"],
    },
    {
      name: "Arjun Kumar",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
      experience: 5,
      services: ["Haircut", "Beard Trim", "Head Massage"],
    },
  ],
};

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

export default function Page() {
  // const { id } = useParams();
  const salon = mockSalonData; // In real app, fetch based on id

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Banner */}
      <section className="relative h-[40vh] md:h-[50vh] overflow-hidden">
        <motion.img
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8 }}
          src={salon.image}
          alt={salon.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
          <div className="container mx-auto max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Badge className="mb-3">{salon.category}</Badge>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-3">
                {salon.name}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">{salon.location}</span>
                </div>
                <div className="flex items-center gap-1 text-yellow-500">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="font-semibold">{salon.rating}</span>
                  <span className="text-muted-foreground text-sm">({salon.reviewCount} reviews)</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Main Info */}
            <div className="lg:col-span-2 space-y-10">
              {/* About Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-2xl font-display font-semibold text-foreground mb-4">About Us</h2>
                <p className="text-muted-foreground leading-relaxed">{salon.description}</p>
              </motion.div>

              {/* Gallery */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-2xl font-display font-semibold text-foreground mb-4">Gallery</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {salon.gallery.map((img, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.05 }}
                      className="aspect-square rounded-xl overflow-hidden cursor-pointer"
                    >
                      <img src={img} alt={`Gallery ${index + 1}`} className="w-full h-full object-cover" />
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Services Section */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <h2 className="text-2xl font-display font-semibold text-foreground mb-6">Our Services</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {salon.services.map((service, index) => (
                    <motion.div key={index} variants={itemVariants}>
                      <ServiceCard {...service} onBook={() => console.log(`Booking ${service.name}`)} />
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Barbers Section */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <h2 className="text-2xl font-display font-semibold text-foreground mb-6">Our Team</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {salon.barbers.map((barber, index) => (
                    <motion.div key={index} variants={itemVariants}>
                      <BarberCard {...barber} />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Right Column - Sticky Sidebar */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="sticky top-24 space-y-6"
              >
                {/* Booking Card */}
                <div className="bg-card border border-border rounded-2xl p-6 shadow-card">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Book an Appointment</h3>
                  <Button className="w-full mb-3" size="lg">
                    Book Appointment
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                  <p className="text-center text-sm text-muted-foreground">
                    Choose your service and preferred time
                  </p>
                </div>

                {/* Contact Info Card */}
                <div className="bg-card border border-border rounded-2xl p-6 shadow-card">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Contact Info</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Clock className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">Opening Hours</p>
                        <p className="text-sm text-muted-foreground">{salon.openingHours}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Phone className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">Phone</p>
                        <p className="text-sm text-muted-foreground">{salon.phone}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Mail className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">Email</p>
                        <p className="text-sm text-muted-foreground">{salon.email}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">Address</p>
                        <p className="text-sm text-muted-foreground">{salon.location}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Location Info Card */}
                <div className="bg-card border border-border rounded-2xl p-6 shadow-card">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Location Info</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">Address</p>
                        <p className="text-sm text-muted-foreground">{salon.location}</p>
                      </div>
                    </div>

                    <Link href={`https://www.google.com/maps/dir/?api=1&destination=19.9434348,79.2957364`} target="_blank" rel="noopener noreferrer">
                      <Button className="w-full mb-3" size="lg">
                        Get Directions
                        <ChevronRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                    <p className="text-center text-sm text-muted-foreground">
                      Open in Maps application
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

