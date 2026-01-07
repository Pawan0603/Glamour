'use client';
import { useState } from "react";
import { motion } from "framer-motion";
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
import { OwnerLayout } from "@/components/owner/OwnerLayout";

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

interface Appointment {
  id: number;
  customer: string;
  phone: string;
  service: string;
  barber: string;
  date: string;
  time: string;
  duration: number;
  price: number;
  status: "pending" | "confirmed" | "completed" | "cancelled";
}

const appointmentsData: Appointment[] = [
  {
    id: 1,
    customer: "Rahul Sharma",
    phone: "+91 98765 43210",
    service: "Haircut + Beard",
    barber: "Amit Kumar",
    date: "2025-01-02",
    time: "10:00 AM",
    duration: 45,
    price: 450,
    status: "confirmed",
  },
  {
    id: 2,
    customer: "Priya Singh",
    phone: "+91 87654 32109",
    service: "Hair Spa",
    barber: "Neha Verma",
    date: "2025-01-02",
    time: "11:30 AM",
    duration: 60,
    price: 800,
    status: "pending",
  },
  {
    id: 3,
    customer: "Vikram Patel",
    phone: "+91 76543 21098",
    service: "Shaving",
    barber: "Raj Singh",
    date: "2025-01-02",
    time: "2:00 PM",
    duration: 20,
    price: 150,
    status: "completed",
  },
  {
    id: 4,
    customer: "Anita Desai",
    phone: "+91 65432 10987",
    service: "Hair Color",
    barber: "Neha Verma",
    date: "2025-01-02",
    time: "3:30 PM",
    duration: 90,
    price: 1200,
    status: "confirmed",
  },
  {
    id: 5,
    customer: "Suresh Kumar",
    phone: "+91 54321 09876",
    service: "Facial",
    barber: "Amit Kumar",
    date: "2025-01-02",
    time: "4:00 PM",
    duration: 45,
    price: 500,
    status: "cancelled",
  },
  {
    id: 6,
    customer: "Meera Joshi",
    phone: "+91 43210 98765",
    service: "Manicure + Pedicure",
    barber: "Priya Sharma",
    date: "2025-01-03",
    time: "10:00 AM",
    duration: 60,
    price: 700,
    status: "pending",
  },
];

const getStatusConfig = (status: string) => {
  switch (status) {
    case "confirmed":
      return {
        icon: CheckCircle,
        color: "text-blue-500",
        bg: "bg-blue-100 dark:bg-blue-900/30",
        text: "text-blue-700 dark:text-blue-400",
      };
    case "completed":
      return {
        icon: CheckCircle,
        color: "text-emerald-500",
        bg: "bg-emerald-100 dark:bg-emerald-900/30",
        text: "text-emerald-700 dark:text-emerald-400",
      };
    case "pending":
      return {
        icon: AlertCircle,
        color: "text-amber-500",
        bg: "bg-amber-100 dark:bg-amber-900/30",
        text: "text-amber-700 dark:text-amber-400",
      };
    case "cancelled":
      return {
        icon: XCircle,
        color: "text-red-500",
        bg: "bg-red-100 dark:bg-red-900/30",
        text: "text-red-700 dark:text-red-400",
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

export default function OwnerAppointments() {
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredAppointments = appointmentsData.filter((apt) => {
    const matchesFilter = filter === "all" || apt.status === filter;
    const matchesSearch =
      apt.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      apt.service.toLowerCase().includes(searchQuery.toLowerCase()) ||
      apt.barber.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const stats = {
    total: appointmentsData.length,
    pending: appointmentsData.filter((a) => a.status === "pending").length,
    confirmed: appointmentsData.filter((a) => a.status === "confirmed").length,
    completed: appointmentsData.filter((a) => a.status === "completed").length,
  };

  return (
    <OwnerLayout>
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
            { label: "Confirmed", value: stats.confirmed, color: "from-blue-500 to-blue-600" },
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
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
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
                key={appointment.id}
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
                        {appointment.customer}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {appointment.phone}
                      </p>
                    </div>

                    {/* Service & Barber */}
                    <div>
                      <p className="text-sm text-muted-foreground">Service</p>
                      <p className="font-semibold text-foreground">
                        {appointment.service}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        by {appointment.barber}
                      </p>
                    </div>

                    {/* Date & Time */}
                    <div>
                      <p className="text-sm text-muted-foreground">Schedule</p>
                      <div className="flex items-center gap-2 text-foreground">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <span className="font-medium">{appointment.date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground text-sm">
                        <Clock className="w-4 h-4" />
                        <span>
                          {appointment.time} ({appointment.duration} mins)
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
                    <span
                      className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium capitalize ${statusConfig.bg} ${statusConfig.text}`}
                    >
                      <StatusIcon className={`w-4 h-4 ${statusConfig.color}`} />
                      {appointment.status}
                    </span>

                    {appointment.status === "pending" && (
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          Confirm
                        </Button>
                        <Button size="sm" variant="ghost" className="text-destructive">
                          Cancel
                        </Button>
                      </div>
                    )}

                    {appointment.status === "confirmed" && (
                      <Button size="sm">Mark Complete</Button>
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
      </motion.div>
    </OwnerLayout>
  );
}
