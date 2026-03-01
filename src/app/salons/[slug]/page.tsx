'use client';
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { MapPin, Star, Clock, Phone, Mail, ChevronRight, ClipboardClock, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServiceCard from '@/components/salon/ServiceCard';
import BarberCard from '@/components/salon/BarberCard';
import Link from "next/link";
import { use, useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import { Salon, Service } from "@/lib/interfaces";

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

type Props = {
  params: Promise<{ slug: string }>;
};

export default function Page({ params }: Props) {
  const { slug } = use(params);
  const router = useRouter();
  const [salon, setSalon] = useState<Salon>();
  const [selectedServices, setSelectedServices] = useState<Service[]>([]);

  if (!slug) router.push('/');

  const fetchSalon = async () => {
    try {
      const res = await axios.get(`/api/salon/${slug}/get-salon`);
      setSalon(res.data.data);
    } catch (error) {
      const err = error as AxiosError<{ error: string }>;
      toast.error(err.response?.data.error || "⚠️ Somthing went worng!")
    }
  }

  useEffect(() => {
    fetchSalon();
  }, []);

  // function handleSelectService(id: string) {
  //   const service = salon?.services.find(s => s._id === id);
  //   if (!service) return;

  //   setSelectedServices(prev => [...prev, service]);
  // }

  // const removeService = (_id: string) => {

  // }

  function toggleService(id: string) {
    setSelectedServices(prev => {
      const exists = prev.some(s => s._id === id);
      if (exists) return prev.filter(s => s._id !== id);

      const service = salon?.services.find(s => s._id === id);
      return service ? [...prev, service] : prev;
    });
  }

  if (!salon) return;

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Banner */}
      <section className="relative h-[40vh] md:h-[50vh] overflow-hidden">
        <motion.img
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8 }}
          src={salon.salonCoverImage}
          alt={salon.salonName}
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
              <Badge className="mb-3">{salon.salonCategory}</Badge>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-3">
                {salon.salonName}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">{salon.fullAddress}</span>
                </div>
                <div className="flex items-center gap-1 text-yellow-500">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="font-semibold">{salon.rating}</span>
                  <span className="text-muted-foreground text-sm">(256 reviews)</span>
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
                {salon.salonImages && <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {salon.salonImages.map((img, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.05 }}
                      className="aspect-square rounded-xl overflow-hidden cursor-pointer"
                    >
                      <img src={img} alt={`Gallery ${index + 1}`} className="w-full h-full object-cover" />
                    </motion.div>
                  ))}
                </div>}
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
                      <ServiceCard {...service} onBook={toggleService} isSelected={selectedServices.some(s => s._id === service._id)} />
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
                  {salon.barber.map((barber, index) => (
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
                  {selectedServices.length > 0 && <div className="space-y-4 mb-4">
                    {selectedServices.map((service, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                            <ClipboardClock className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-foreground">{service.servicesName}</p>
                            <p className="text-sm text-muted-foreground">{`₹ ${service.price}`}</p>
                          </div>
                        </div>
                        <button onClick={() => toggleService(service._id)} className="cursor-pointer">
                          <X className="w-5 h-5 text-primary" />
                        </button>
                      </div>
                    ))}
                  </div>}
                  <Link href={`/book-appointment?salonId=${salon._id}&serviceIds=${selectedServices.map(s => s._id).join(",")}`}>
                    <Button className="w-full mb-3" size="lg">
                      Book Appointment
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
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
                        <p className="text-sm text-muted-foreground">{salon.openingTime}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Phone className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">Phone</p>
                        <p className="text-sm text-muted-foreground">{salon.phoneNumber}</p>
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
                        <p className="text-sm text-muted-foreground">{salon.fullAddress}</p>
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
                        <p className="text-sm text-muted-foreground">{salon.fullAddress}</p>
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
        </div >
      </section >

      <Footer />
    </div >
  );
};

