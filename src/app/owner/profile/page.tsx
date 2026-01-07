'use client';
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Camera,
  MapPin,
  Phone,
  Mail,
  Clock,
  Save,
  Upload,
  X,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
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

const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function OwnerProfile() {
  const [salonData, setSalonData] = useState({
    name: "Glamour Beauty Lounge",
    category: "Unisex",
    phone: "+91 98765 43210",
    email: "info@glamourbeauty.com",
    description:
      "Premium salon offering a wide range of beauty and grooming services in a luxurious ambiance.",
    address: "123, MG Road",
    city: "Mumbai",
    area: "Andheri West",
    pincode: "400058",
    openingTime: "09:00",
    closingTime: "21:00",
  });

  const [workingDays, setWorkingDays] = useState([
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
  ]);

  const [salonImages, setSalonImages] = useState([
    "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400",
    "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400",
    "https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6?w=400",
  ]);

  const toggleDay = (day: string) => {
    if (workingDays.includes(day)) {
      setWorkingDays(workingDays.filter((d) => d !== day));
    } else {
      setWorkingDays([...workingDays, day]);
    }
  };

  const removeImage = (index: number) => {
    setSalonImages(salonImages.filter((_, i) => i !== index));
  };

  return (
    <OwnerLayout>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-8 max-w-4xl"
      >
        {/* Header */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
        >
          <div>
            <h1 className="text-3xl font-display font-bold text-foreground">
              Salon Profile
            </h1>
            <p className="text-muted-foreground mt-1">
              Manage your salon information and settings.
            </p>
          </div>
          <Button className="gap-2" size="lg">
            <Save className="w-5 h-5" />
            Save Changes
          </Button>
        </motion.div>

        {/* Profile Picture Section */}
        <motion.div
          variants={itemVariants}
          className="bg-card rounded-2xl border border-border p-6 shadow-sm"
        >
          <h2 className="text-lg font-semibold text-foreground mb-6">
            Salon Logo
          </h2>
          <div className="flex items-center gap-6">
            <div className="relative">
              <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center text-primary-foreground text-3xl font-bold">
                GL
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="absolute -bottom-2 -right-2 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center shadow-lg"
              >
                <Camera className="w-4 h-4" />
              </motion.button>
            </div>
            <div>
              <p className="font-medium text-foreground">Upload salon logo</p>
              <p className="text-sm text-muted-foreground">
                JPG, PNG or SVG. Max 2MB.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Basic Information */}
        <motion.div
          variants={itemVariants}
          className="bg-card rounded-2xl border border-border p-6 shadow-sm"
        >
          <h2 className="text-lg font-semibold text-foreground mb-6">
            Basic Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="salonName">Salon Name</Label>
              <Input
                id="salonName"
                value={salonData.name}
                onChange={(e) =>
                  setSalonData({ ...salonData, name: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                value={salonData.category}
                onChange={(e) =>
                  setSalonData({ ...salonData, category: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">
                <Phone className="w-4 h-4 inline mr-2" />
                Phone Number
              </Label>
              <Input
                id="phone"
                value={salonData.phone}
                onChange={(e) =>
                  setSalonData({ ...salonData, phone: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">
                <Mail className="w-4 h-4 inline mr-2" />
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={salonData.email}
                onChange={(e) =>
                  setSalonData({ ...salonData, email: e.target.value })
                }
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                rows={3}
                value={salonData.description}
                onChange={(e) =>
                  setSalonData({ ...salonData, description: e.target.value })
                }
              />
            </div>
          </div>
        </motion.div>

        {/* Location Details */}
        <motion.div
          variants={itemVariants}
          className="bg-card rounded-2xl border border-border p-6 shadow-sm"
        >
          <h2 className="text-lg font-semibold text-foreground mb-6">
            <MapPin className="w-5 h-5 inline mr-2" />
            Location Details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                value={salonData.address}
                onChange={(e) =>
                  setSalonData({ ...salonData, address: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                value={salonData.city}
                onChange={(e) =>
                  setSalonData({ ...salonData, city: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="area">Area / Landmark</Label>
              <Input
                id="area"
                value={salonData.area}
                onChange={(e) =>
                  setSalonData({ ...salonData, area: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pincode">Pincode</Label>
              <Input
                id="pincode"
                value={salonData.pincode}
                onChange={(e) =>
                  setSalonData({ ...salonData, pincode: e.target.value })
                }
              />
            </div>
          </div>
        </motion.div>

        {/* Working Hours */}
        <motion.div
          variants={itemVariants}
          className="bg-card rounded-2xl border border-border p-6 shadow-sm"
        >
          <h2 className="text-lg font-semibold text-foreground mb-6">
            <Clock className="w-5 h-5 inline mr-2" />
            Working Hours
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-2">
              <Label htmlFor="openingTime">Opening Time</Label>
              <Input
                id="openingTime"
                type="time"
                value={salonData.openingTime}
                onChange={(e) =>
                  setSalonData({ ...salonData, openingTime: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="closingTime">Closing Time</Label>
              <Input
                id="closingTime"
                type="time"
                value={salonData.closingTime}
                onChange={(e) =>
                  setSalonData({ ...salonData, closingTime: e.target.value })
                }
              />
            </div>
          </div>

          <div className="space-y-3">
            <Label>Working Days</Label>
            <div className="flex flex-wrap gap-2">
              {daysOfWeek.map((day) => (
                <motion.button
                  key={day}
                  onClick={() => toggleDay(day)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                    workingDays.includes(day)
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  {day}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Salon Images */}
        <motion.div
          variants={itemVariants}
          className="bg-card rounded-2xl border border-border p-6 shadow-sm"
        >
          <h2 className="text-lg font-semibold text-foreground mb-6">
            Salon Images
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            {salonImages.map((image, index) => (
              <motion.div
                key={index}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative aspect-square rounded-xl overflow-hidden group"
              >
                <img
                  src={image}
                  alt={`Salon ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => removeImage(index)}
                  className="absolute top-2 right-2 w-8 h-8 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="w-4 h-4" />
                </motion.button>
              </motion.div>
            ))}

            {/* Upload Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="aspect-square rounded-xl border-2 border-dashed border-border hover:border-primary/50 flex flex-col items-center justify-center gap-2 text-muted-foreground hover:text-primary transition-colors"
            >
              <Upload className="w-8 h-8" />
              <span className="text-sm font-medium">Add Image</span>
            </motion.button>
          </div>
          <p className="text-sm text-muted-foreground">
            Upload up to 10 images. JPG or PNG. Max 5MB each.
          </p>
        </motion.div>

        {/* Danger Zone */}
        <motion.div
          variants={itemVariants}
          className="bg-card rounded-2xl border border-destructive/20 p-6 shadow-sm"
        >
          <h2 className="text-lg font-semibold text-destructive mb-2">
            Danger Zone
          </h2>
          <p className="text-sm text-muted-foreground mb-4">
            Permanently delete your salon and all associated data.
          </p>
          <Button variant="outline" className="border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground">
            Delete Salon
          </Button>
        </motion.div>
      </motion.div>
    </OwnerLayout>
  );
}
