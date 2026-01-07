'use client';
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";
import { 
  CalendarIcon, 
  Clock, 
  IndianRupee, 
  ChevronLeft, 
  ChevronRight,
  Zap,
  Check,
  MapPin
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const mockServiceData = {
  salonName: "Elite Cuts Studio",
  salonLocation: "Koramangala, Bangalore",
  serviceName: "Haircut & Styling",
  price: 500,
  duration: 45,
};

const mockBarbers = [
  {
    id: "1",
    name: "Rahul Sharma",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
    experience: 8,
    services: ["Haircut", "Styling", "Beard Trim"],
  },
  {
    id: "2",
    name: "Priya Patel",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
    experience: 6,
    services: ["Haircut", "Styling", "Coloring"],
  },
  {
    id: "3",
    name: "Arjun Kumar",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
    experience: 5,
    services: ["Haircut", "Beard Trim"],
  },
];

const timeSlots = [
  { time: "10:00 AM", available: true },
  { time: "10:30 AM", available: true },
  { time: "11:00 AM", available: false },
  { time: "11:30 AM", available: true },
  { time: "12:00 PM", available: true },
  { time: "12:30 PM", available: false },
  { time: "02:00 PM", available: true },
  { time: "02:30 PM", available: true },
  { time: "03:00 PM", available: true },
  { time: "03:30 PM", available: false },
  { time: "04:00 PM", available: true },
  { time: "04:30 PM", available: true },
  { time: "05:00 PM", available: true },
  { time: "05:30 PM", available: false },
  { time: "06:00 PM", available: true },
  { time: "06:30 PM", available: true },
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

export default function Page() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedBarber, setSelectedBarber] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const steps = [
    { id: 1, title: "Select Barber" },
    { id: 2, title: "Pick Date & Time" },
    { id: 3, title: "Confirm" },
  ];

  const handleBookFirstAvailable = () => {
    const today = new Date();
    const firstAvailable = timeSlots.find((slot) => slot.available);
    if (firstAvailable) {
      setSelectedDate(today);
      setSelectedTime(firstAvailable.time);
      setCurrentStep(3);
    }
  };

  const canProceed = () => {
    if (currentStep === 1) return true; // Barber selection is optional
    if (currentStep === 2) return selectedDate && selectedTime;
    return true;
  };

  return (
    <div className="min-h-screen bg-background">

      <section className="pt-24 pb-12 px-4">
        <div className="container mx-auto max-w-4xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-2">
              Book Appointment
            </h1>
            <p className="text-muted-foreground">
              Complete the steps below to schedule your visit
            </p>
          </motion.div>

          {/* Progress Steps */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex justify-center mb-10"
          >
            <div className="flex items-center gap-2 md:gap-4">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    onClick={() => step.id < currentStep && setCurrentStep(step.id)}
                    className={cn(
                      "flex items-center gap-2 px-4 py-2 rounded-full cursor-pointer transition-all",
                      currentStep === step.id
                        ? "bg-primary text-primary-foreground"
                        : currentStep > step.id
                        ? "bg-primary/20 text-primary"
                        : "bg-muted text-muted-foreground"
                    )}
                  >
                    <span className="w-6 h-6 rounded-full bg-background/20 flex items-center justify-center text-sm font-semibold">
                      {currentStep > step.id ? <Check className="w-4 h-4" /> : step.id}
                    </span>
                    <span className="hidden md:block text-sm font-medium">{step.title}</span>
                  </motion.div>
                  {index < steps.length - 1 && (
                    <div className="w-8 md:w-12 h-0.5 bg-border mx-2" />
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <AnimatePresence mode="wait">
                {/* Step 1: Barber Selection */}
                {currentStep === 1 && (
                  <motion.div
                    key="step1"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <div className="bg-card border border-border rounded-2xl p-6 shadow-card">
                      <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-semibold text-foreground">
                          Select a Barber (Optional)
                        </h2>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setSelectedBarber(null);
                            setCurrentStep(2);
                          }}
                        >
                          Skip
                        </Button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {mockBarbers.map((barber) => (
                          <motion.div
                            key={barber.id}
                            variants={itemVariants}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setSelectedBarber(barber.id)}
                            className={cn(
                              "relative p-4 rounded-xl border-2 cursor-pointer transition-all",
                              selectedBarber === barber.id
                                ? "border-primary bg-primary/5"
                                : "border-border hover:border-primary/50"
                            )}
                          >
                            {selectedBarber === barber.id && (
                              <div className="absolute top-3 right-3 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                                <Check className="w-4 h-4 text-primary-foreground" />
                              </div>
                            )}
                            <div className="flex items-center gap-4">
                              <img
                                src={barber.image}
                                alt={barber.name}
                                className="w-16 h-16 rounded-full object-cover"
                              />
                              <div>
                                <h3 className="font-semibold text-foreground">{barber.name}</h3>
                                <p className="text-sm text-muted-foreground">
                                  {barber.experience} years exp.
                                </p>
                                <div className="flex flex-wrap gap-1 mt-2">
                                  {barber.services.slice(0, 2).map((service, idx) => (
                                    <Badge key={idx} variant="secondary" className="text-xs">
                                      {service}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Date & Time Selection */}
                {currentStep === 2 && (
                  <motion.div
                    key="step2"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    {/* Quick Book Option */}
                    <motion.div
                      variants={itemVariants}
                      className="bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 rounded-2xl p-6"
                    >
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                            <Zap className="w-6 h-6 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-foreground">Quick Book</h3>
                            <p className="text-sm text-muted-foreground">
                              Book the first available slot instantly
                            </p>
                          </div>
                        </div>
                        <Button onClick={handleBookFirstAvailable}>
                          Book First Available
                        </Button>
                      </div>
                    </motion.div>

                    {/* Date Selection */}
                    <motion.div
                      variants={itemVariants}
                      className="bg-card border border-border rounded-2xl p-6 shadow-card"
                    >
                      <h2 className="text-xl font-semibold text-foreground mb-4">
                        Select Date
                      </h2>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal h-12",
                              !selectedDate && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={selectedDate}
                            onSelect={setSelectedDate}
                            disabled={(date) => date < new Date()}
                            initialFocus
                            className="p-3 pointer-events-auto"
                          />
                        </PopoverContent>
                      </Popover>
                    </motion.div>

                    {/* Time Slot Selection */}
                    <motion.div
                      variants={itemVariants}
                      className="bg-card border border-border rounded-2xl p-6 shadow-card"
                    >
                      <h2 className="text-xl font-semibold text-foreground mb-4">
                        Select Time Slot
                      </h2>
                      <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                        {timeSlots.map((slot, index) => (
                          <motion.button
                            key={index}
                            whileHover={slot.available ? { scale: 1.05 } : {}}
                            whileTap={slot.available ? { scale: 0.95 } : {}}
                            onClick={() => slot.available && setSelectedTime(slot.time)}
                            disabled={!slot.available}
                            className={cn(
                              "py-3 px-4 rounded-xl text-sm font-medium transition-all",
                              !slot.available
                                ? "bg-muted text-muted-foreground cursor-not-allowed line-through"
                                : selectedTime === slot.time
                                ? "bg-primary text-primary-foreground"
                                : "bg-muted/50 text-foreground hover:bg-primary/10"
                            )}
                          >
                            {slot.time}
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  </motion.div>
                )}

                {/* Step 3: Confirmation */}
                {currentStep === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="bg-card border border-border rounded-2xl p-6 shadow-card"
                  >
                    <div className="text-center mb-6">
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Check className="w-8 h-8 text-green-600" />
                      </div>
                      <h2 className="text-xl font-semibold text-foreground">
                        Confirm Your Booking
                      </h2>
                      <p className="text-muted-foreground">
                        Review your appointment details below
                      </p>
                    </div>

                    <div className="space-y-4 mb-6">
                      <div className="flex justify-between py-3 border-b border-border">
                        <span className="text-muted-foreground">Service</span>
                        <span className="font-medium text-foreground">{mockServiceData.serviceName}</span>
                      </div>
                      <div className="flex justify-between py-3 border-b border-border">
                        <span className="text-muted-foreground">Salon</span>
                        <span className="font-medium text-foreground">{mockServiceData.salonName}</span>
                      </div>
                      {selectedBarber && (
                        <div className="flex justify-between py-3 border-b border-border">
                          <span className="text-muted-foreground">Barber</span>
                          <span className="font-medium text-foreground">
                            {mockBarbers.find((b) => b.id === selectedBarber)?.name}
                          </span>
                        </div>
                      )}
                      <div className="flex justify-between py-3 border-b border-border">
                        <span className="text-muted-foreground">Date</span>
                        <span className="font-medium text-foreground">
                          {selectedDate ? format(selectedDate, "PPP") : "-"}
                        </span>
                      </div>
                      <div className="flex justify-between py-3 border-b border-border">
                        <span className="text-muted-foreground">Time</span>
                        <span className="font-medium text-foreground">{selectedTime || "-"}</span>
                      </div>
                      <div className="flex justify-between py-3">
                        <span className="text-muted-foreground">Total</span>
                        <span className="text-xl font-bold text-primary flex items-center">
                          <IndianRupee className="w-5 h-5" />
                          {mockServiceData.price}
                        </span>
                      </div>
                    </div>

                    <Button className="w-full" size="lg">
                      Confirm Appointment
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Navigation Buttons */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="flex justify-between mt-6"
              >
                <Button
                  variant="outline"
                  onClick={() => setCurrentStep((prev) => Math.max(1, prev - 1))}
                  disabled={currentStep === 1}
                >
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
                {currentStep < 3 && (
                  <Button
                    onClick={() => setCurrentStep((prev) => Math.min(3, prev + 1))}
                    disabled={!canProceed()}
                  >
                    Next
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                )}
              </motion.div>
            </div>

            {/* Sidebar - Service Summary */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="sticky top-24 bg-card border border-border rounded-2xl p-6 shadow-card"
              >
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  Booking Summary
                </h3>

                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Salon</p>
                    <p className="font-medium text-foreground">{mockServiceData.salonName}</p>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <MapPin className="w-3.5 h-3.5" />
                      {mockServiceData.salonLocation}
                    </div>
                  </div>

                  <div className="h-px bg-border" />

                  <div>
                    <p className="text-sm text-muted-foreground">Service</p>
                    <p className="font-medium text-foreground">{mockServiceData.serviceName}</p>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      {mockServiceData.duration} mins
                    </div>
                    <div className="flex items-center gap-1 text-sm font-semibold text-primary">
                      <IndianRupee className="w-4 h-4" />
                      {mockServiceData.price}
                    </div>
                  </div>

                  <div className="h-px bg-border" />

                  <Button variant="outline" className="w-full" size="sm">
                    Change Service
                  </Button>
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
 
