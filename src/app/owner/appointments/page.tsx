'use client';
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import {
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Filter,
  Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import { IAppointment } from "@/lib/interfaces";
import { Spinner } from "@/components/ui/spinner";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

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

const getStatusConfig = (status: string) => {
  switch (status) {
    case "Scheduled":
      return {
        icon: CheckCircle,
        color: "text-blue-500",
        bg: "bg-blue-100 dark:bg-blue-500/30",
        text: "text-blue-700 dark:text-blue-400",
      };
    case "Completed":
      return {
        icon: CheckCircle,
        color: "text-emerald-500",
        bg: "bg-emerald-100 dark:bg-emerald-500/30",
        text: "text-emerald-700 dark:text-emerald-400",
      };
    case "Cancelled":
      return {
        icon: XCircle,
        color: "text-red-500",
        bg: "bg-red-100 dark:bg-red-500/30",
        text: "text-red-700 dark:text-red-400",
      };
    case "Reschedule":
      return {
        icon: XCircle,
        color: "text-yellow-500",
        bg: "bg-yellow-500 dark:bg-yellow-500/10",
        text: "text-yellow-700 dark:text-yellow-400",
      };
    default:
      return {
        icon: AlertCircle,
        color: "text-gray-500",
        bg: "bg-gray-100",
        text: "text-gray-700",
      };
  }
};

type AppointmentStatus = "Scheduled" | "Completed" | "Cancelled" | "Incomplete" | "Reschedule";

export default function OwnerAppointments() {
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [appointments, setAppointments] = useState<IAppointment[]>([]);
  const [selectedAppointment, setSelectedAppointment] = useState<IAppointment | null>(null);
  const [showCancelDialog, setShowCancelDialog] = useState<boolean>(false);
  const [showCompletedialog, setShowCompletedialog] = useState<boolean>(false);
  const [isAppointmentStatusChanging, setIsAppointmentStatusChanging] = useState<boolean>(false);

  const filteredAppointments = appointments.filter((apt) => {
    const matchesFilter = filter === "all" || apt.status === filter;
    const matchesSearch =
      apt.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      // apt.service.toLowerCase().includes(searchQuery.toLowerCase()) ||
      apt.barberName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const stats = {
    total: appointments.length,
    pending: appointments.filter((a) => a.status === "Scheduled").length,
    concelled: appointments.filter((a) => a.status === "Cancelled").length, // fix here
    completed: appointments.filter((a) => a.status === "Completed").length,
  };

  const getAppointments = async () => {
    try {
      const res = await axios.get("/api/owner/appointment/get-appointment");
      setAppointments(res.data.data);
    } catch (error) {
      const err = error as AxiosError<{ error: string }>;
      toast.error(err.response?.data.error || "Something went worng!");
    }
  }

  useEffect(() => {
    getAppointments();
  }, []);

  const updateStatus = (id: string, newStatus: AppointmentStatus) => {
    setAppointments((prev) =>
      prev.map((appt) =>
        appt._id === id ? { ...appt, status: newStatus } : appt
      )
    );
  };

  const cancelAppointment = async (_id: string) => {
    try {
      setIsAppointmentStatusChanging(true);
      const res = await axios.patch(`/api/owner/appointment/${_id}/cancel-appointment`);
      updateStatus(_id, "Cancelled");
      toast.success(res.data.message);
    } catch (error) {
      const err = error as AxiosError<{ error: string }>;
      toast.error(err.response?.data.error || "Something went worng!");
    } finally {
      setShowCancelDialog(false);
      setIsAppointmentStatusChanging(false);
    }
  }

  const completeAppointment = async (_id: string) => {
    try {
      setIsAppointmentStatusChanging(true);
      const res = await axios.patch(`/api/owner/appointment/${_id}/complete-appointment`);
      updateStatus(_id, "Completed");
      toast.success(res.data.message);
    } catch (error) {
      const err = error as AxiosError<{ error: string }>;
      toast.error(err.response?.data.error || "Something went worng!");
    } finally {
      setIsAppointmentStatusChanging(false);
      setShowCompletedialog(false);
    }
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      {/* Header */}
      <motion.div variants={itemVariants}>
        <h1 className="text-3xl font-display font-bold text-foreground">
          Appointments
        </h1>
        <p className="text-muted-foreground mt-1">
          View and manage all salon appointments.
        </p>
      </motion.div>

      {/* Stats */}
      <motion.div
        variants={itemVariants}
        className="grid grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {[
          { label: "Total", value: stats.total, color: "from-primary to-primary/80" },
          { label: "Pending", value: stats.pending, color: "from-amber-500 to-amber-600" },
          { label: "Cancelled", value: stats.concelled, color: "from-blue-500 to-blue-600" },
          { label: "Completed", value: stats.completed, color: "from-emerald-500 to-emerald-600" },
        ].map((stat) => (
          <motion.div
            key={stat.label}
            whileHover={{ y: -2 }}
            className="bg-card rounded-xl p-4 border border-border"
          >
            <p className="text-sm text-muted-foreground">{stat.label}</p>
            <p className="text-2xl font-bold text-foreground mt-1">{stat.value}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Filters */}
      <motion.div
        variants={itemVariants}
        className="flex flex-col sm:flex-row gap-4"
      >
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Search by customer, service, or barber..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-3">
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-40">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Filter" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="Scheduled">Scheduled</SelectItem>
              <SelectItem value="Reschedule">Reschedule</SelectItem>
              <SelectItem value="Cancelled">Cancelled</SelectItem>
              <SelectItem value="Completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </motion.div>

      {/* Appointments List */}
      <motion.div variants={itemVariants} className="space-y-4">
        {filteredAppointments.map((appointment, index) => {
          const statusConfig = getStatusConfig(appointment.status);
          const StatusIcon = statusConfig.icon;

          return (
            <motion.div
              key={appointment._id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.01 }}
              className="bg-card rounded-2xl border border-border p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* Customer Info */}
                  <div>
                    <p className="text-sm text-muted-foreground">Customer</p>
                    <p className="font-semibold text-foreground">
                      {appointment.customerName}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {/* {appointment.phone} */}999999999
                    </p>
                  </div>

                  {/* Service & Barber */}
                  <div>
                    <p className="text-sm text-muted-foreground">Service</p>
                    {appointment.services.map((service, index) => <p key={index} className="font-semibold text-foreground">
                      {service.servicesName},
                    </p>)}
                    <p className="text-sm text-muted-foreground">
                      by {appointment.barberName}
                    </p>
                  </div>

                  {/* Date & Time */}
                  <div>
                    <p className="text-sm text-muted-foreground">{appointment.status === "Reschedule" ? "Reschedule" : "Schedule"}</p>
                    <div className="flex items-center gap-2 text-foreground">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span className="font-medium">{new Date(appointment.appointmentDate).toISOString().split("T")[0]}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground text-sm">
                      <Clock className="w-4 h-4" />
                      <span>
                        {appointment.appointmentTime} ({appointment.duration} mins)
                      </span>
                    </div>
                  </div>

                  {/* Price */}
                  <div>
                    <p className="text-sm text-muted-foreground">Price</p>
                    <p className="text-xl font-bold text-foreground">
                      ₹{appointment.price}
                    </p>
                  </div>
                </div>

                {/* Status & Actions */}
                <div className="flex items-center gap-3">
                  {appointment.status !== "Scheduled" && appointment.status !== "Reschedule" && <span
                    className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium capitalize ${statusConfig.bg} ${statusConfig.text}`}
                  >
                    <StatusIcon className={`w-4 h-4 ${statusConfig.color}`} />
                    {appointment.status}
                  </span>}

                  {appointment.status === "Scheduled" && (
                    <div className="flex gap-2">
                      {/* <Button size="sm" variant="outline">
                        Confirm
                      </Button> */}
                      <Button  onClick={() => {setSelectedAppointment(appointment); setShowCancelDialog(true)}} size="sm" variant="ghost" className="text-destructive hover:cursor-pointer">
                        Cancel
                      </Button>
                    </div>
                  )}

                  {appointment.status === "Scheduled" && (
                    <Button className="hover:cursor-pointer" onClick={() => { setSelectedAppointment(appointment); setShowCompletedialog(true) }} size="sm">Mark Complete</Button>
                  )}

                  {appointment.status === "Reschedule" && (
                    <div className="flex gap-2">
                      {/* <Button size="sm" variant="outline">
                        Confirm
                      </Button> */}
                      <Button  onClick={() => {setSelectedAppointment(appointment); setShowCancelDialog(true)}} size="sm" variant="ghost" className="text-destructive hover:cursor-pointer">
                        Cancel
                      </Button>
                    </div>
                  )}

                  {appointment.status === "Reschedule" && (
                    <Button className="hover:cursor-pointer" onClick={() => { setSelectedAppointment(appointment); setShowCompletedialog(true) }} size="sm">Mark Complete</Button>
                  )}

                </div>
              </div>
            </motion.div>
          );
        })}

        {filteredAppointments.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>No appointments found.</p>
          </div>
        )}
      </motion.div>

      {/* Cancel Dialog */}
      <Dialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cancel Appointment</DialogTitle>
            <DialogDescription>
              Are you sure you want to cancel this appointment? This action cannot be undone.  if you cancel this appointment client get 100% cash back.
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
            <Button className="hover:cursor-pointer" variant="outline" onClick={() => setShowCancelDialog(false)}>
              Keep Appointment
            </Button>
            <Button className="hover:cursor-pointer" variant="destructive" disabled={isAppointmentStatusChanging} onClick={() => cancelAppointment(selectedAppointment?._id!)}>
              {isAppointmentStatusChanging ? <>
                <Spinner data-icon="inline-start" />
                Please wait
              </> : <>Cancel Appointment</>}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Complete Dialog */}
      <Dialog open={showCompletedialog} onOpenChange={setShowCompletedialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Completed appointment</DialogTitle>
            <DialogDescription>
              Are you sure you want to mark as a completed this appointment?
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
            <Button className="hover:cursor-pointer" variant="outline" onClick={() => setShowCompletedialog(false)}>
              Keep Appointment
            </Button>
            <Button className="bg-green-500 hover:bg-green-600 hover:cursor-pointer" disabled={isAppointmentStatusChanging} onClick={() => completeAppointment(selectedAppointment?._id!)}>
              {isAppointmentStatusChanging ? <>
                <Spinner data-icon="inline-start" />
                Please wait
              </> : <>Complete Appointment</>}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}
