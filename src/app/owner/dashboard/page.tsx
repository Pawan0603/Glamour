'use client';
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Calendar,
  Scissors,
  Users,
  TrendingUp,
  Plus,
  Eye,
  Clock,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
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

const statsData = [
  {
    title: "Total Appointments",
    value: "156",
    change: "+12%",
    icon: Calendar,
    color: "from-blue-500 to-blue-600",
  },
  {
    title: "Total Services",
    value: "24",
    change: "+3",
    icon: Scissors,
    color: "from-primary to-primary/80",
  },
  {
    title: "Total Barbers",
    value: "8",
    change: "+1",
    icon: Users,
    color: "from-emerald-500 to-emerald-600",
  },
  {
    title: "Revenue",
    value: "₹45,200",
    change: "+18%",
    icon: TrendingUp,
    color: "from-amber-500 to-amber-600",
  },
];

const recentAppointments = [
  {
    id: 1,
    customer: "Rahul Sharma",
    service: "Haircut + Beard",
    barber: "Amit Kumar",
    time: "10:00 AM",
    status: "completed",
  },
  {
    id: 2,
    customer: "Priya Singh",
    service: "Hair Spa",
    barber: "Neha Verma",
    time: "11:30 AM",
    status: "completed",
  },
  {
    id: 3,
    customer: "Vikram Patel",
    service: "Shaving",
    barber: "Raj Singh",
    time: "2:00 PM",
    status: "pending",
  },
  {
    id: 4,
    customer: "Anita Desai",
    service: "Hair Color",
    barber: "Neha Verma",
    time: "3:30 PM",
    status: "pending",
  },
  {
    id: 5,
    customer: "Suresh Kumar",
    service: "Facial",
    barber: "Amit Kumar",
    time: "4:00 PM",
    status: "cancelled",
  },
];

const getStatusIcon = (status: string) => {
  switch (status) {
    case "completed":
      return <CheckCircle className="w-4 h-4 text-emerald-500" />;
    case "pending":
      return <Clock className="w-4 h-4 text-amber-500" />;
    case "cancelled":
      return <XCircle className="w-4 h-4 text-destructive" />;
    default:
      return null;
  }
};

const getStatusBadge = (status: string) => {
  const styles = {
    completed: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
    pending: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
    cancelled: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  };
  return styles[status as keyof typeof styles] || "";
};

export default function OwnerDashboard() {
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
            Salon Dashboard
          </h1>
          <p className="text-muted-foreground mt-1">
            Welcome back! Here's what's happening with your salon today.
          </p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {statsData.map((stat, index) => (
            <motion.div
              key={stat.title}
              className="bg-card rounded-2xl p-6 border border-border shadow-sm hover:shadow-md transition-shadow"
              whileHover={{ y: -4 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <p className="text-3xl font-bold text-foreground mt-2">
                    {stat.value}
                  </p>
                  <p className="text-sm text-emerald-600 mt-1">{stat.change}</p>
                </div>
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}
                >
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Quick Actions */}
        <motion.div variants={itemVariants}>
          <h2 className="text-xl font-semibold text-foreground mb-4">
            Quick Actions
          </h2>
          <div className="flex flex-wrap gap-4">
            <Link href="/owner/services">
              <Button
                className="gap-2"
                size="lg"
              >
                <Plus className="w-5 h-5" />
                Add Service
              </Button>
            </Link>
            <Link href="/owner/barbers">
              <Button
                variant="outline"
                className="gap-2"
                size="lg"
              >
                <Plus className="w-5 h-5" />
                Add Barber
              </Button>
            </Link>
            <Button
              variant="outline"
              className="gap-2"
              size="lg"
            >
              <Eye className="w-5 h-5" />
              View Appointments
            </Button>
          </div>
        </motion.div>

        {/* Recent Appointments */}
        <motion.div variants={itemVariants}>
          <h2 className="text-xl font-semibold text-foreground mb-4">
            Recent Appointments
          </h2>
          <div className="bg-card rounded-2xl border border-border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-muted/50">
                    <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">
                      Customer
                    </th>
                    <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">
                      Service
                    </th>
                    <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">
                      Barber
                    </th>
                    <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">
                      Time
                    </th>
                    <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {recentAppointments.map((appointment, index) => (
                    <motion.tr
                      key={appointment.id}
                      className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + index * 0.05 }}
                    >
                      <td className="px-6 py-4">
                        <span className="font-medium text-foreground">
                          {appointment.customer}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-muted-foreground">
                        {appointment.service}
                      </td>
                      <td className="px-6 py-4 text-muted-foreground">
                        {appointment.barber}
                      </td>
                      <td className="px-6 py-4 text-muted-foreground">
                        {appointment.time}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusBadge(
                            appointment.status
                          )}`}
                        >
                          {getStatusIcon(appointment.status)}
                          {appointment.status}
                        </span>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </OwnerLayout>
  );
}
