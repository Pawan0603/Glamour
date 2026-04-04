'use client';
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
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
import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import { IAppointment } from "@/lib/interfaces";
import Link from "next/link";

type AppointmentStatus = "Scheduled" | "Completed" | "Cancelled" | "Incomplete" | "Reschedule" | "Pending";

const statusConfig: Record<AppointmentStatus, { label: string; className: string }> = {
  Scheduled: {
    label: "Scheduled",
    className: "bg-blue-100 text-blue-700 border-blue-200",
  },
  Reschedule: {
    label: "Scheduled",
    className: "bg-blue-100 text-blue-700 border-blue-200",
  },
  Completed: {
    label: "Completed",
    className: "bg-green-100 text-green-700 border-green-200",
  },
  Cancelled: {
    label: "Cancelled",
    className: "bg-red-100 text-red-700 border-red-200",
  },
  Incomplete: {
    label: "Cancelled",
    className: "bg-yellow-100 text-red-700 border-red-200",
  },
  Pending: {
    label: "Pending",
    className: "bg-yellow-100 text-yellow-700 border-yellow-200",
  }
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
  const [appointments, setAppointments] = useState<IAppointment[]>([]);
  const [selectedAppointment, setSelectedAppointment] = useState<IAppointment | null>(null);
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);

  const [upcomingAppointments, setUpcomingAppointments] = useState<IAppointment[]>([]);
  const [pastAppointments, setPastAppointments] = useState<IAppointment[]>([]);

  const filterAppointment = (data: IAppointment[]) => {
    setUpcomingAppointments(data?.filter(a => a.status === "Scheduled" || a.status === "Reschedule" || a.status === "Pending") || []);
    setPastAppointments(data?.filter(a => a.status === "Cancelled" || a.status === "Completed") || [])
  }

  useEffect(() => {
    if (appointments.length > 0) {
      filterAppointment(appointments)
    }
  }, [appointments]);

  const getAllAppointment = async () => {
    try {
      const res = await axios.get('/api/appointment/get-appointment');
      console.log(res.data);
      setAppointments(res.data.data);
    } catch (error) {
      const err = error as AxiosError<{ error: string }>;
      toast.error(err.response?.data.error || "somethin went worng.")
    }
  }

  useEffect(() => {
    getAllAppointment();
  }, []);

  const handleCancelAppointment = async () => {
    if (selectedAppointment) {
      try {
        console.log("selectedAppointemnt id: ", selectedAppointment._id)
        const res = await axios.patch(`/api/appointment/${selectedAppointment._id}/cancel-appointment`);

        setAppointments((prev) =>
          prev.map((a) =>
            a._id === selectedAppointment._id ? { ...a, status: "Cancelled" as AppointmentStatus } : a
          )
        );
        setShowCancelDialog(false);
        setSelectedAppointment(null);

        toast.success(res.data.message || "appointment was cancelled.");
      } catch (error) {
        const err = error as AxiosError<{ error: string }>;
        toast.error(err.response?.data.error || "Something went worng")
      }
    }
  };

  const AppointmentCard = ({ appointment }: { appointment: IAppointment }) => (
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

          <h3 className="text-lg font-semibold text-foreground mb-1 space-x-2">
            {appointment.services.map((service, index) => <span key={index}>{service.servicesName}</span>)}
          </h3>

          <div className="space-y-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Scissors className="w-4 h-4" />
              <span>{appointment.salonName}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span>{appointment.city}</span>
            </div>
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>{appointment.barberName}</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{format(appointment.appointmentDate, "PPP")}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{appointment.appointmentTime}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-row sm:flex-col gap-2">
          <Button
            variant="outline"
            size="sm"
            className="hover:cursor-pointer"
            onClick={() => {
              setSelectedAppointment(appointment);
              setShowDetailsDialog(true);
            }}
          >
            View
            <ChevronRight className="w-4 h-4" />
          </Button>
          {appointment.status === "Scheduled" && (
            <Link href={`/reschedule-appointment?salonId=${appointment.salonId}&appointmentId=${appointment._id}`}>
              <Button
                variant="outline"
                size="sm"
                className="text-green-500 hover:text-green-700 hover:bg-destructive/10 hover:cursor-pointer"
                onClick={() => {
                  setSelectedAppointment(appointment);
                  setShowCancelDialog(true);
                }}
              >
                <Calendar className="w-4 h-4" />
                Reschedule
              </Button>
            </Link>
          )}
          {appointment.status === "Scheduled" && (
            <Button
              variant="outline"
              size="sm"
              className="text-destructive hover:text-destructive hover:bg-destructive/10 hover:cursor-pointer"
              onClick={() => {
                setSelectedAppointment(appointment);
                setShowCancelDialog(true);
              }}
            >
              {/* <X className="w-4 h-4 mr-1" /> */}
              Cancel
            </Button>
          )}
          {appointment.status === "Reschedule" && (
            <Button
              variant="outline"
              size="sm"
              className="text-destructive hover:text-destructive hover:bg-destructive/10 hover:cursor-pointer"
              onClick={() => {
                setSelectedAppointment(appointment);
                setShowCancelDialog(true);
              }}
            >
              {/* <X className="w-4 h-4 mr-1" /> */}
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
                    // variants={containerVariants}
                    // initial="hidden"
                    // animate="visible"
                    className="space-y-4"
                  >
                    {upcomingAppointments.map((appointment) => (
                      <AppointmentCard key={appointment._id} appointment={appointment} />
                    ))}
                  </motion.div>
                ) : (
                  <EmptyState type="upcoming" />
                )}
              </TabsContent>

              <TabsContent value="past">
                {pastAppointments.length > 0 ? (
                  <motion.div
                    // variants={containerVariants}
                    // initial="hidden"
                    // animate="visible"
                    className="space-y-4"
                  >
                    {pastAppointments.map((appointment) => (
                      <AppointmentCard key={appointment._id} appointment={appointment} />
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
                {selectedAppointment.services.map((service, index) => <span key={index} className="font-medium">{service.servicesName}</span>)}

              </p>
              <p>
                <span className="text-muted-foreground">Date:</span>{" "}
                <span className="font-medium">{format(selectedAppointment.appointmentDate, "PPP")}</span>
              </p>
              <p>
                <span className="text-muted-foreground">Time:</span>{" "}
                <span className="font-medium">{selectedAppointment.appointmentTime}</span>
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
                  {selectedAppointment.services.map((service, index) => <span key={index} className="font-medium">{service.servicesName}</span>)}
                </div>
                <div className="flex justify-between py-2 border-b border-border">
                  <span className="text-muted-foreground">Salon</span>
                  <span className="font-medium">{selectedAppointment.salonName}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-border">
                  <span className="text-muted-foreground">Location</span>
                  <span className="font-medium text-right">{selectedAppointment.city}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-border">
                  <span className="text-muted-foreground">Barber</span>
                  <span className="font-medium">{selectedAppointment.barberName}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-border">
                  <span className="text-muted-foreground">Date</span>
                  <span className="font-medium">{format(selectedAppointment.appointmentDate, "PPP")}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-border">
                  <span className="text-muted-foreground">Time</span>
                  <span className="font-medium">{selectedAppointment.appointmentTime}</span>
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
