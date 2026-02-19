"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  Phone,
  Edit,
  CalendarDays,
  Store,
  ArrowRight,
  Shield,
  Clock,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/lib/contexts/AuthContext";
import { toast } from "sonner";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Profile() {
  const { user, updateProfile } = useAuth();
  const [editOpen, setEditOpen] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "" });

  const openEdit = () => {
    if (user)
      setForm({ name: user.name, email: user.email, phone: user.phone });
    setEditOpen(true);
  };

  const handleSave = () => {
    if (!form.name.trim() || !form.email.trim()) {
      toast.error("Name and email are required");
      return;
    }
    updateProfile(form);
    setEditOpen(false);
    toast.success("Profile updated successfully");
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-28 pb-20 flex flex-col items-center justify-center text-center px-4">
          <User className="w-16 h-16 text-muted-foreground mb-4" />
          <h2 className="font-display text-2xl font-bold text-foreground mb-2">
            Not Logged In
          </h2>
          <p className="text-muted-foreground mb-6">
            Please log in to view your profile.
          </p>
          <Link href="/auth">
            <Button className="gradient-primary shadow-soft">
              Login / Register
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="space-y-6"
          >
            {/* Profile Header */}
            <motion.div variants={item}>
              <Card className="overflow-hidden border-border">
                <div className="h-28 gradient-primary" />
                <CardContent className="relative pt-0 pb-6 px-6">
                  <div className="flex flex-col sm:flex-row items-center sm:items-end gap-4 -mt-12">
                    <Avatar className="h-24 w-24 border-4 border-background shadow-lg">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback className="bg-primary text-primary-foreground text-2xl font-bold">
                        {initials}
                      </AvatarFallback>
                    </Avatar>

                    <div className="text-center sm:text-left flex-1 pb-1">
                      <h1 className="font-display text-2xl font-bold text-foreground">
                        {user.name}
                      </h1>
                      <p className="text-muted-foreground text-sm">
                        {user.email}
                      </p>
                    </div>

                    <Badge
                      variant="secondary"
                      className="capitalize flex items-center gap-1.5"
                    >
                      <Shield className="w-3 h-3" />
                      {user.role === "salon_owner"
                        ? "Salon Owner"
                        : "Customer"}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Personal Info */}
            <motion.div variants={item}>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-lg">
                    Personal Information
                  </CardTitle>
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-1.5"
                    onClick={openEdit}
                  >
                    <Edit className="w-3.5 h-3.5" />
                    Edit
                  </Button>
                </CardHeader>

                <CardContent className="space-y-4">
                  {[
                    { icon: User, label: "Full Name", value: user.name },
                    { icon: Mail, label: "Email", value: user.email },
                    { icon: Phone, label: "Phone", value: user.phone },
                  ].map((field) => (
                    <div
                      key={field.label}
                      className="flex items-center gap-4 p-3 rounded-xl bg-muted/50"
                    >
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <field.icon className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">
                          {field.label}
                        </p>
                        <p className="text-sm font-medium text-foreground">
                          {field.value}
                        </p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            {/* Activity */}
            <motion.div variants={item}>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">My Activity</CardTitle>
                </CardHeader>

                <CardContent className="space-y-3">
                  <Link href="/my-appointments">
                    <motion.div
                      whileHover={{ scale: 1.01 }}
                      className="flex items-center justify-between p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors cursor-pointer group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          <CalendarDays className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">
                            My Appointments
                          </p>
                          <p className="text-xs text-muted-foreground">
                            View and manage your bookings
                          </p>
                        </div>
                      </div>

                      <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                    </motion.div>
                  </Link>

                  <div className="flex items-center justify-between p-4 rounded-xl bg-muted/50">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                        <Clock className="w-4 h-4 text-accent-foreground" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">
                          Booking History
                        </p>
                        <p className="text-xs text-muted-foreground">
                          12 total appointments · 2 upcoming
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Salon */}
            <motion.div variants={item}>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    Salon Management
                  </CardTitle>
                </CardHeader>

                <CardContent>
                  {user.salonId ? (
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-xl bg-primary/5 border border-primary/10 gap-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center">
                          <Store className="w-5 h-5 text-primary-foreground" />
                        </div>
                        <div>
                          <p className="font-semibold text-foreground">
                            {user.salonName}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Active · Manage your salon
                          </p>
                        </div>
                      </div>

                      <Link href="/owner/dashboard">
                        <Button
                          size="sm"
                          className="gradient-primary shadow-soft gap-1.5"
                        >
                          Go to Dashboard
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Button>
                      </Link>
                    </div>
                  ) : (
                    <div className="text-center py-8 px-4">
                      <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-muted flex items-center justify-center">
                        <Store className="w-7 h-7 text-muted-foreground" />
                      </div>
                      <h3 className="font-semibold text-foreground mb-1">
                        No Salon Registered
                      </h3>
                      <p className="text-sm text-muted-foreground mb-5 max-w-sm mx-auto">
                        You haven't registered a salon yet. Start managing your
                        beauty business today.
                      </p>

                      <Link href="/register-salon">
                        <Button className="gradient-primary shadow-soft gap-1.5">
                          Register Your Salon
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Button>
                      </Link>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </main>

      <Footer />

      {/* Edit Dialog */}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="edit-name">Full Name</Label>
              <Input
                id="edit-name"
                value={form.name}
                onChange={(e) =>
                  setForm((f) => ({ ...f, name: e.target.value }))
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-email">Email</Label>
              <Input
                id="edit-email"
                type="email"
                value={form.email}
                onChange={(e) =>
                  setForm((f) => ({ ...f, email: e.target.value }))
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-phone">Phone</Label>
              <Input
                id="edit-phone"
                value={form.phone}
                onChange={(e) =>
                  setForm((f) => ({ ...f, phone: e.target.value }))
                }
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setEditOpen(false)}>
              Cancel
            </Button>
            <Button
              className="gradient-primary shadow-soft"
              onClick={handleSave}
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
