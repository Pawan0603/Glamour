'use client';

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";
import { useRouter, useSearchParams } from "next/navigation";
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
import Footer from "@/components/Footer";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import { IAppointment, Salon, Service } from "@/lib/interfaces";
import { generateAvailableSlots } from "@/lib/booking/generateSlots";
import Link from "next/link";
import { useAuth } from "@/lib/contexts/AuthContext";

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

interface BusySlots {
  [barberName: string]: string[];
}

export default function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const serviceIds = searchParams.get("serviceIds")?.split(',');
  const salonId = searchParams.get("salonId");
  const { user } = useAuth();

  const [currentStep, setCurrentStep] = useState(serviceIds ? 2 : 1);
  const [selectedBarber, setSelectedBarber] = useState<string | null>(null);
  const [selectedBarberId, setSelectedBarberId] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [salon, setSalon] = useState<Salon>();
  const [selectedServices, setSelectedServices] = useState<Service[]>([]);
  const [busySlotTimeLine, setBusySlotTimeLine] = useState<BusySlots>({});
  const [serviceDuration, setServiceDuration] = useState<number>(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [availableSlot, setAvailableSlot] = useState<string[]>([]);

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const steps = [
    { id: 1, title: "Select Barber" },
    { id: 2, title: "Barber & Date, Time" },
    { id: 3, title: "Confirm" },
  ];

  useEffect(() => {
    let duration = 0;
    let total = 0;
    if (selectedServices.length === 0) setServiceDuration(0)
    for (let service of selectedServices) {
      duration += service.duration;
      total += service.price;
    }
    setServiceDuration(duration);
    setTotalPrice(total);
  }, [selectedServices]);

  const setSelectedServicesHandler = (data: Service[]) => {
    if (!data || !serviceIds) return;
    const selected = data.filter((service) =>
      serviceIds.includes(service._id)
    );
    setSelectedServices(selected);
  };

  const fetchSalonData = async () => {
    try {
      const res = await axios.get(`/api/salon/${salonId}/appointmentValidationData`, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
      setSalon(res.data.data);
      setSelectedServicesHandler(res.data.data.services);
    } catch (error) {
      const err = error as AxiosError<{ error: string }>;
      toast.error(err.response?.data.error || "somethin went worng.")
    }
  }

  const getSlotTimeLine = async (date: Date) => {
    try {
      const res = await axios.get(`/api/salon/${salonId}/get-slotTimeLine`, {
        params: {
          date: date?.toLocaleDateString("en-CA")
        }
      });
      setBusySlotTimeLine(res.data.data);
      // console.log(res.data.data)
    } catch (error) {
      const err = error as AxiosError<{ error: string }>;
      toast.error(err.response?.data.error || "something went worng.")
    }
  }

  useEffect(() => {
    if (salonId) {
      fetchSalonData();
      getSlotTimeLine(new Date());
    }
  }, []);

  const generateSlots = (barberName: string) => {
    if (!busySlotTimeLine[barberName]) {
      const slot = generateAvailableSlots([], salon?.openingTime!, salon?.closingTime!, 15, serviceDuration)
      setAvailableSlot(slot);
    } else {
      const slot = generateAvailableSlots(busySlotTimeLine[barberName], salon?.openingTime!, salon?.closingTime!, 15, serviceDuration)
      setAvailableSlot(slot);
    }
  }

  const handleDateChange = async (date: Date | undefined) => {
    if (!date) return;

    setSelectedDate(date);
    setSelectedBarber(null);
    setSelectedTime(null);
    setAvailableSlot([]);

    getSlotTimeLine(date);
  };

  const handleBookAppointment = async () => {
    const data = {
      customerId: user?.userId!,
      customerName: user?.name!,
      salonId: salon?._id!,
      salonName: salon?.salonName!,
      fullAddress: salon?.fullAddress!,
      city: salon?.city!,
      barberId: selectedBarberId!,
      barberName: selectedBarber!,
      appointmentDate: selectedDate!.toLocaleDateString("en-CA"),
      appointmentTime: selectedTime!,
      duration: serviceDuration,
      price: totalPrice,
      services: selectedServices,
      status: "Scheduled",
    }

    try {
      setIsSubmitting(true);
      const res = await axios.post(`/api/salon/book-appointment`, data);
      toast.success(res.data.message || "Appointment book successfully.")
      router.push('/my-appointments')
    } catch (error) {
      const err = error as AxiosError<{ error: string }>;
      toast.error(err.response?.data.error || "somethin went worng.")
    } finally {
      setIsSubmitting(false);
    }
  }

  const handleBookFirstAvailable = () => {
    const today = new Date();
    // const firstAvailable = timeSlots.find((slot) => slot.available);
    // if (firstAvailable) {
    //   setSelectedDate(today);
    //   setSelectedTime(firstAvailable.time);
    //   setCurrentStep(3);
    // }
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
                        {salon?.barber.map((barber) => (
                          <motion.div
                            key={barber._id}
                            variants={itemVariants}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => { setSelectedBarber(barber.barberName); setSelectedBarberId(barber._id); generateSlots(barber.barberName) }}
                            className={cn(
                              "relative p-4 rounded-xl border-2 cursor-pointer transition-all",
                              selectedBarber === barber.barberName
                                ? "border-primary bg-primary/5"
                                : "border-border hover:border-primary/50"
                            )}
                          >
                            {selectedBarber === barber._id && (
                              <div className="absolute top-3 right-3 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                                <Check className="w-4 h-4 text-primary-foreground" />
                              </div>
                            )}
                            <div className="flex items-center gap-4">
                              <img
                                src={barber.avatar.url}
                                alt={barber.barberName}
                                className="w-16 h-16 rounded-full object-cover"
                              />
                              <div>
                                <h3 className="font-semibold text-foreground">{barber.barberName}</h3>
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
                            onDayClick={handleDateChange}
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
                        Select Barber & Time Slot
                      </h2>

                      <p>Service : HairCut</p>

                      <div className="flex flex-row gap-4 mb-6 p-1 overflow-x-auto scrollbar-thin">
                        {salon && salon?.barber.map((barber) => (
                          <motion.div
                            key={barber._id}
                            // variants={itemVariants}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => { setSelectedBarber(barber.barberName); setSelectedBarberId(barber._id); generateSlots(barber.barberName) }}
                            className={cn(
                              "relative p-4 rounded-xl border-2 cursor-pointer transition-all",
                              selectedBarber === barber.barberName
                                ? "border-primary bg-primary/5"
                                : "border-border hover:border-primary/50"
                            )}
                          >
                            {selectedBarber === barber._id && (
                              <div className="absolute top-3 right-3 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                                <Check className="w-4 h-4 text-primary-foreground" />
                              </div>
                            )}
                            <div className="flex flex-col items-center gap-4 w-32">
                              <img
                                src={barber.avatar.url}
                                alt={barber.barberName}
                                className="w-16 h-16 rounded-full object-cover"
                              />
                              <div className="w-full">
                                <h3 className="flex flex-colfont-semibold text-foreground">{barber.barberName}</h3>
                                <p className="text-sm text-muted-foreground">
                                  {barber.experience} years exp.
                                </p>
                                <div className="flex flex-row gap-1 mt-2 overflow-x-auto no-scrollbar">
                                  {barber.services.map((service, idx) => (
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

                      <p className="text-muted-foreground">Available slots</p>

                      <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mt-3">
                        {availableSlot.map((slot, index) => (
                          <motion.button
                            key={index}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setSelectedTime(slot)}
                            className={cn(
                              "py-3 px-4 rounded-xl text-sm font-medium transition-all",
                              selectedTime === slot
                                ? "bg-primary text-primary-foreground"
                                : "bg-muted/50 text-foreground hover:bg-primary/10"
                            )}
                          >
                            {slot}
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
                        <span className="font-medium text-foreground space-x-2" >
                          {selectedServices.map((service, index) => <span key={index}>{service.servicesName},</span>)}
                        </span>
                      </div>
                      <div className="flex justify-between py-3 border-b border-border">
                        <span className="text-muted-foreground">Salon</span>
                        <span className="font-medium text-foreground">{salon?.salonName}</span>
                      </div>
                      {selectedBarber && (
                        <div className="flex justify-between py-3 border-b border-border">
                          <span className="text-muted-foreground">Barber</span>
                          <span className="font-medium text-foreground">
                            {selectedBarber}
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
                          {totalPrice}
                        </span>
                      </div>
                    </div>

                    <Button type="button" onClick={handleBookAppointment} className="w-full" size="lg" disabled={isSubmitting}>
                      {isSubmitting ? <span>Booking Appointment...</span> : <span>Confirm Appointment</span>}
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
                    <p className="font-medium text-foreground">{salon?.salonName}</p>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <MapPin className="w-3.5 h-3.5" />
                      {salon?.city}
                    </div>
                  </div>

                  <div className="h-px bg-border" />

                  {salon && serviceIds && selectedServices.map((service) => {
                    if (serviceIds?.includes(service._id)) return <div key={service._id}>
                      <div>
                        <p className="text-sm text-muted-foreground">Service</p>
                        <p className="font-medium text-foreground">{service.servicesName}</p>
                      </div>

                      <div className="flex gap-4">
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Clock className="w-4 h-4" />
                          {service.duration} mins
                        </div>
                        <div className="flex items-center gap-1 text-sm font-semibold text-primary">
                          <IndianRupee className="w-4 h-4" />
                          {service.price}
                        </div>
                      </div>
                    </div>
                  })}

                  <div className="h-px bg-border" />

                  <Link href={`/salons/${salonId}`}>
                    <Button type="button" variant="outline" className="w-full" size="sm">
                      Change Service
                    </Button>
                  </Link>
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

