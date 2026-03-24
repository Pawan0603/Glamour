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
import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { IAppointment } from "@/lib/interfaces";

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

const getStatusIcon = (status: string) => {
  switch (status) {
    case "Completed":
      return <CheckCircle className="w-4 h-4 text-emerald-500" />;
    case "Scheduled":
      return <Clock className="w-4 h-4 text-amber-500" />;
    case "Reschedule":
      return <Clock className="w-4 h-4 text-amber-500" />;
    case "Cancelled":
      return <XCircle className="w-4 h-4 text-destructive" />;
    default:
      return null;
  }
};

const getStatusBadge = (status: string) => {
  const styles = {
    Completed: "text-emerald-700 dark:text-emerald-400",
    Scheduled: "text-amber-700 dark:text-amber-400",
    Reschedule: "text-yellow-700 dark:text-yellow-400",
    Cancelled: "text-red-700 dark:text-red-400",
  };
  return styles[status as keyof typeof styles] || "";
};

interface IAnalysisData {
  appointmentsCount: number;
  servicesCount: number;
  barberCount: number;
  revenue: number;
  appointments: IAppointment[];
}

export default function OwnerDashboard() {
  const [analysisData, setAnalysisData] = useState<IAnalysisData | null>(null);

  const getAnalysis = async () => {
    try {
      const res = await axios.get('/api/owner/dashboard-analysis');
      setAnalysisData(res.data.data);
    } catch (error) {
      const err = error as AxiosError<{ error: string }>;
      toast.error(err.response?.data.error || "Something went worng!");
    }
  }

  useEffect(() => {
    getAnalysis();
  }, []);

  if(analysisData === null) return

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
        <motion.div
          className="bg-card rounded-2xl p-6 border border-border shadow-sm hover:shadow-md transition-shadow"
          whileHover={{ y: -4 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Appointment</p>
              <p className="text-3xl font-bold text-foreground mt-2">
                {analysisData?.appointmentsCount}
              </p>
              <p className="text-sm text-emerald-600 mt-1">+12%</p>
            </div>
            <div
              className={`w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center`}
            >
              <Calendar className="w-6 h-6 text-white" />
            </div>
          </div>
        </motion.div>
        <motion.div
          className="bg-card rounded-2xl p-6 border border-border shadow-sm hover:shadow-md transition-shadow"
          whileHover={{ y: -4 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Services</p>
              <p className="text-3xl font-bold text-foreground mt-2">
                {analysisData?.servicesCount}
              </p>
              <p className="text-sm text-emerald-600 mt-1">+3</p>
            </div>
            <div
              className={`w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center`}
            >
              <Scissors className="w-6 h-6 text-white" />
            </div>
          </div>
        </motion.div>
        <motion.div
          className="bg-card rounded-2xl p-6 border border-border shadow-sm hover:shadow-md transition-shadow"
          whileHover={{ y: -4 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Barbers</p>
              <p className="text-3xl font-bold text-foreground mt-2">
                {analysisData?.barberCount}
              </p>
              <p className="text-sm text-emerald-600 mt-1">+1</p>
            </div>
            <div
              className={`w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center`}
            >
              <Users className="w-6 h-6 text-white" />
            </div>
          </div>
        </motion.div>
        <motion.div
          className="bg-card rounded-2xl p-6 border border-border shadow-sm hover:shadow-md transition-shadow"
          whileHover={{ y: -4 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Revenue</p>
              <p className="text-3xl font-bold text-foreground mt-2">
                {analysisData?.revenue}
              </p>
              <p className="text-sm text-emerald-600 mt-1">+18%</p>
            </div>
            <div
              className={`w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center`}
            >
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
          </div>
        </motion.div>

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
                {analysisData?.appointments.map((appointment, index) => (
                  <motion.tr
                    key={index}
                    className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.05 }}
                  >
                    <td className="px-6 py-4">
                      <span className="font-medium text-foreground">
                        {appointment.customerName}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-muted-foreground space-x-2">
                      {appointment.services.map((service, index) => <span key={index}>{service.servicesName},</span>)}
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">
                      {appointment.barberName}
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">
                      {appointment.appointmentTime}
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
  );
}
