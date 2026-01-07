'use client';
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";
import { 
  Calendar, 
  Clock, 
  MapPin, 
  User, 
  Scissors,
  ChevronRight,
  X,
  CalendarX
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Footer from "@/components/Footer";

type AppointmentStatus = "booked" | "completed" | "cancelled";

interface Appointment {
  id: string;
  salonName: string;
  salonLocation: string;
  serviceName: string;
  barberName: string;
  date: Date;
  time: string;
  price: number;
  status: AppointmentStatus;
}

const mockAppointments: Appointment[] = [
  {
    id: "1",
    salonName: "Elite Cuts Studio",
    salonLocation: "Koramangala, Bangalore",
    serviceName: "Haircut & Styling",
    barberName: "Rahul Sharma",
    date: new Date(2026, 0, 10),
    time: "10:30 AM",
    price: 500,
    status: "booked",
  },
  {
    id: "2",
    salonName: "Glamour & Grace",
    salonLocation: "Indiranagar, Bangalore",
    serviceName: "Hair Coloring",
    barberName: "Priya Patel",
    date: new Date(2026, 0, 15),
    time: "02:00 PM",
    price: 1500,
    status: "booked",
  },
  {
    id: "3",
    salonName: "Elite Cuts Studio",
    salonLocation: "Koramangala, Bangalore",
    serviceName: "Beard Trim",
    barberName: "Arjun Kumar",
    date: new Date(2025, 11, 20),
    time: "11:00 AM",
    price: 200,
    status: "completed",
  },
  {
    id: "4",
    salonName: "The Gentlemen's Lounge",
    salonLocation: "HSR Layout, Bangalore",
    serviceName: "Keratin Treatment",
    barberName: "Rahul Sharma",
    date: new Date(2025, 11, 15),
    time: "03:30 PM",
    price: 3500,
    status: "completed",
  },
  {
    id: "5",
    salonName: "Style Avenue",
    salonLocation: "Whitefield, Bangalore",
    serviceName: "Facial",
    barberName: "Priya Patel",
    date: new Date(2025, 11, 10),
    time: "04:00 PM",
    price: 800,
    status: "cancelled",
  },
];

const statusConfig: Record<AppointmentStatus, { label: string; className: string }> = {
  booked: {
    label: "Booked",
    className: "bg-blue-100 text-blue-700 border-blue-200",
  },
  completed: {
    label: "Completed",
    className: "bg-green-100 text-green-700 border-green-200",
  },
  cancelled: {
    label: "Cancelled",
    className: "bg-red-100 text-red-700 border-red-200",
  },
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

const Page = () => {
  const [appointments, setAppointments] = useState(mockAppointments);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);

  const upcomingAppointments = appointments.filter((a) => a.status === "booked");
  const pastAppointments = appointments.filter((a) => a.status !== "booked");

  const handleCancelAppointment = () => {
    if (selectedAppointment) {
      setAppointments((prev) =>
        prev.map((a) =>
          a.id === selectedAppointment.id ? { ...a, status: "cancelled" as AppointmentStatus } : a
        )
      );
      setShowCancelDialog(false);
      setSelectedAppointment(null);
    }
  };

  const AppointmentCard = ({ appointment }: { appointment: Appointment }) => (
    <motion.div
      variants={itemVariants}
      whileHover={{ scale: 1.01 }}
      className="bg-card border border-border rounded-2xl p-5 shadow-card hover:shadow-elevated transition-shadow"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-3">
            <Badge
              variant="outline"
              className={cn("font-medium", statusConfig[appointment.status].className)}
            >
              {statusConfig[appointment.status].label}
            </Badge>
          </div>

          <h3 className="text-lg font-semibold text-foreground mb-1">
            {appointment.serviceName}
          </h3>

          <div className="space-y-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Scissors className="w-4 h-4" />
              <span>{appointment.salonName}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span>{appointment.salonLocation}</span>
            </div>
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>{appointment.barberName}</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{format(appointment.date, "PPP")}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{appointment.time}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-row sm:flex-col gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setSelectedAppointment(appointment);
              setShowDetailsDialog(true);
            }}
          >
            View Details
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
          {appointment.status === "booked" && (
            <Button
              variant="ghost"
              size="sm"
              className="text-destructive hover:text-destructive hover:bg-destructive/10"
              onClick={() => {
                setSelectedAppointment(appointment);
                setShowCancelDialog(true);
              }}
            >
              <X className="w-4 h-4 mr-1" />
              Cancel
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );

  const EmptyState = ({ type }: { type: "upcoming" | "past" }) => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="text-center py-16"
    >
      <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
        <CalendarX className="w-10 h-10 text-muted-foreground" />
      </div>
      <h3 className="text-xl font-semibold text-foreground mb-2">
        {type === "upcoming" ? "No Upcoming Appointments" : "No Past Appointments"}
      </h3>
      <p className="text-muted-foreground mb-6">
        {type === "upcoming"
          ? "You don't have any scheduled appointments yet"
          : "Your appointment history will appear here"}
      </p>
      {type === "upcoming" && (
        <Button>
          Book an Appointment
          <ChevronRight className="w-4 h-4 ml-2" />
        </Button>
      )}
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-background">

      <section className="pt-24 pb-12 px-4">
        <div className="container mx-auto max-w-4xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-2">
              My Appointments
            </h1>
            <p className="text-muted-foreground">
              View and manage your salon appointments
            </p>
          </motion.div>

          {/* Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Tabs defaultValue="upcoming" className="w-full">
              <TabsList className="w-full sm:w-fit mb-6">
                <TabsTrigger value="upcoming" className="flex-1 sm:flex-none">
                  Upcoming ({upcomingAppointments.length})
                </TabsTrigger>
                <TabsTrigger value="past" className="flex-1 sm:flex-none">
                  Past ({pastAppointments.length})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="upcoming">
                {upcomingAppointments.length > 0 ? (
                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="space-y-4"
                  >
                    {upcomingAppointments.map((appointment) => (
                      <AppointmentCard key={appointment.id} appointment={appointment} />
                    ))}
                  </motion.div>
                ) : (
                  <EmptyState type="upcoming" />
                )}
              </TabsContent>

              <TabsContent value="past">
                {pastAppointments.length > 0 ? (
                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="space-y-4"
                  >
                    {pastAppointments.map((appointment) => (
                      <AppointmentCard key={appointment.id} appointment={appointment} />
                    ))}
                  </motion.div>
                ) : (
                  <EmptyState type="past" />
                )}
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </section>

      {/* Cancel Dialog */}
      <Dialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cancel Appointment</DialogTitle>
            <DialogDescription>
              Are you sure you want to cancel this appointment? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          {selectedAppointment && (
            <div className="py-4 space-y-2 text-sm">
              <p>
                <span className="text-muted-foreground">Service:</span>{" "}
                <span className="font-medium">{selectedAppointment.serviceName}</span>
              </p>
              <p>
                <span className="text-muted-foreground">Date:</span>{" "}
                <span className="font-medium">{format(selectedAppointment.date, "PPP")}</span>
              </p>
              <p>
                <span className="text-muted-foreground">Time:</span>{" "}
                <span className="font-medium">{selectedAppointment.time}</span>
              </p>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCancelDialog(false)}>
              Keep Appointment
            </Button>
            <Button variant="destructive" onClick={handleCancelAppointment}>
              Cancel Appointment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Details Dialog */}
      <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Appointment Details</DialogTitle>
          </DialogHeader>
          {selectedAppointment && (
            <div className="py-4 space-y-4">
              <div className="flex items-center gap-3">
                <Badge
                  variant="outline"
                  className={cn("font-medium", statusConfig[selectedAppointment.status].className)}
                >
                  {statusConfig[selectedAppointment.status].label}
                </Badge>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between py-2 border-b border-border">
                  <span className="text-muted-foreground">Service</span>
                  <span className="font-medium">{selectedAppointment.serviceName}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-border">
                  <span className="text-muted-foreground">Salon</span>
                  <span className="font-medium">{selectedAppointment.salonName}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-border">
                  <span className="text-muted-foreground">Location</span>
                  <span className="font-medium text-right">{selectedAppointment.salonLocation}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-border">
                  <span className="text-muted-foreground">Barber</span>
                  <span className="font-medium">{selectedAppointment.barberName}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-border">
                  <span className="text-muted-foreground">Date</span>
                  <span className="font-medium">{format(selectedAppointment.date, "PPP")}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-border">
                  <span className="text-muted-foreground">Time</span>
                  <span className="font-medium">{selectedAppointment.time}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-muted-foreground">Price</span>
                  <span className="font-bold text-primary">₹{selectedAppointment.price}</span>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDetailsDialog(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default Page;
