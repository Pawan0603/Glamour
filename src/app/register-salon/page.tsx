'use client';
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Building2,
  MapPin,
  Clock,
  ImagePlus,
  Upload,
  X,
  Check,
  Phone,
  Mail,
  FileText
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import axios from "axios";

const steps = [
  { id: 1, title: "Basic Info", icon: Building2 },
  { id: 2, title: "Location", icon: MapPin },
  { id: 3, title: "Hours", icon: Clock },
  { id: 4, title: "Images", icon: ImagePlus },
];

const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const SalonRegistration = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedDays, setSelectedDays] = useState<string[]>(["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [category, setCategory] = useState("unisex");
  const [isDragging, setIsDragging] = useState(false);

  const toggleDay = (day: string) => {
    setSelectedDays(prev =>
      prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
    );
  };

  const handleImageUpload = () => {
    // Simulate image upload
    const newImage = `https://images.unsplash.com/photo-${Math.random().toString().slice(2, 12)}?w=200&h=200&fit=crop`;
    setUploadedImages(prev => [...prev, newImage]);
  };

  const removeImage = (index: number) => {
    setUploadedImages(prev => prev.filter((_, i) => i !== index));
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const handleSubmit = async () => {
    const data = { name: "pawan salon", add: "nothing" };

    try {
      const response = await axios.post('/api/register-salon', data, {
        headers: {
          "Content-Type": "application/json",
          "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OTgxMDBkMWE4MWNlZDFhZjg5NDNiYWQiLCJlbWFpbCI6Ind3dy5wYXdhbm10aGFrcmVAZ21haWwuY29tIiwicm9sZSI6ImN1c3RvbWVyIiwiaWF0IjoxNzcwNzQzODQzLCJleHAiOjE3NzEzNDg2NDN9.QTzlhzyhynVLsjPRXDnU2gq4U5eEhpO6-VZo5W0OvP0"
        }
      });

      console.log("Response from server:", response.data);
      alert("Salon registered!");

    } catch (error: any) {
      // It's better to log error.response.data to see your custom error messages
      console.error("Server Error:", error.response?.data || error.message);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
              Register Your Salon
            </h1>
            <p className="text-muted-foreground text-lg">
              Add your salon details to start accepting appointments
            </p>
          </motion.div>

          {/* Progress Steps */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-12"
          >
            <div className="flex items-center justify-between relative">
              {/* Progress Line */}
              <div className="absolute top-6 left-0 right-0 h-0.5 bg-muted mx-12">
                <motion.div
                  className="h-full bg-primary"
                  initial={{ width: "0%" }}
                  animate={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>

              {steps.map((step) => {
                const Icon = step.icon;
                const isCompleted = currentStep > step.id;
                const isCurrent = currentStep === step.id;

                return (
                  <motion.button
                    key={step.id}
                    onClick={() => setCurrentStep(step.id)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex flex-col items-center relative z-10"
                  >
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${isCompleted
                        ? "bg-primary text-primary-foreground"
                        : isCurrent
                          ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30"
                          : "bg-muted text-muted-foreground"
                        }`}
                    >
                      {isCompleted ? <Check className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
                    </div>
                    <span
                      className={`mt-2 text-sm font-medium ${isCurrent ? "text-primary" : "text-muted-foreground"
                        }`}
                    >
                      {step.title}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>

          {/* Form Sections */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            {/* Section 1: Basic Information */}
            <motion.div
              variants={itemVariants}
              className={`bg-card rounded-2xl p-6 md:p-8 shadow-elegant border border-border ${currentStep === 1 ? "ring-2 ring-primary/20" : ""
                }`}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-primary" />
                </div>
                <h2 className="font-display text-xl font-semibold text-foreground">
                  Salon Basic Information
                </h2>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="salonName">Salon Name</Label>
                  <Input
                    id="salonName"
                    placeholder="Enter your salon name"
                    className="h-12"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Salon Category</Label>
                  <RadioGroup
                    value={category}
                    onValueChange={setCategory}
                    className="flex gap-4 pt-2"
                  >
                    {["men", "women", "unisex"].map((cat) => (
                      <div key={cat} className="flex items-center">
                        <RadioGroupItem value={cat} id={cat} />
                        <Label htmlFor={cat} className="ml-2 capitalize cursor-pointer">
                          {cat}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="phone"
                      placeholder="+91 98765 43210"
                      className="h-12 pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="salon@example.com"
                      className="h-12 pl-10"
                    />
                  </div>
                </div>

                <div className="md:col-span-2 space-y-2">
                  <Label htmlFor="description">Short Description</Label>
                  <div className="relative">
                    <FileText className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                    <Textarea
                      id="description"
                      placeholder="Describe your salon in a few words..."
                      className="min-h-[100px] pl-10 resize-none"
                    />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Section 2: Location Details */}
            <motion.div
              variants={itemVariants}
              className={`bg-card rounded-2xl p-6 md:p-8 shadow-elegant border border-border ${currentStep === 2 ? "ring-2 ring-primary/20" : ""
                }`}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <h2 className="font-display text-xl font-semibold text-foreground">
                  Location Details
                </h2>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="md:col-span-2 space-y-2">
                  <Label htmlFor="address">Full Address</Label>
                  <Input
                    id="address"
                    placeholder="Street address, building name, floor..."
                    className="h-12"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    placeholder="e.g., Mumbai"
                    className="h-12"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="area">Area / Landmark</Label>
                  <Input
                    id="area"
                    placeholder="e.g., Near Central Mall"
                    className="h-12"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pincode">Pincode</Label>
                  <Input
                    id="pincode"
                    placeholder="e.g., 400001"
                    className="h-12"
                  />
                </div>
              </div>
            </motion.div>

            {/* Section 3: Working Hours */}
            <motion.div
              variants={itemVariants}
              className={`bg-card rounded-2xl p-6 md:p-8 shadow-elegant border border-border ${currentStep === 3 ? "ring-2 ring-primary/20" : ""
                }`}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <h2 className="font-display text-xl font-semibold text-foreground">
                  Working Hours
                </h2>
              </div>

              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="openTime">Opening Time</Label>
                    <Input
                      id="openTime"
                      type="time"
                      defaultValue="09:00"
                      className="h-12"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="closeTime">Closing Time</Label>
                    <Input
                      id="closeTime"
                      type="time"
                      defaultValue="21:00"
                      className="h-12"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <Label>Weekly Availability</Label>
                  <div className="flex flex-wrap gap-2">
                    {daysOfWeek.map((day) => (
                      <motion.button
                        key={day}
                        type="button"
                        onClick={() => toggleDay(day)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${selectedDays.includes(day)
                          ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                          : "bg-muted text-muted-foreground hover:bg-muted/80"
                          }`}
                      >
                        {day}
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Section 4: Salon Images */}
            <motion.div
              variants={itemVariants}
              className={`bg-card rounded-2xl p-6 md:p-8 shadow-elegant border border-border ${currentStep === 4 ? "ring-2 ring-primary/20" : ""
                }`}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <ImagePlus className="w-5 h-5 text-primary" />
                </div>
                <h2 className="font-display text-xl font-semibold text-foreground">
                  Salon Images
                </h2>
              </div>

              {/* Upload Area */}
              <motion.div
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={(e) => { e.preventDefault(); setIsDragging(false); handleImageUpload(); }}
                onClick={handleImageUpload}
                whileHover={{ scale: 1.01 }}
                className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-300 ${isDragging
                  ? "border-primary bg-primary/5"
                  : "border-muted-foreground/30 hover:border-primary/50 hover:bg-muted/50"
                  }`}
              >
                <div className="flex flex-col items-center gap-3">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                    <Upload className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">
                      Drag & drop images here
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      or click to browse (JPG, PNG up to 5MB)
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Uploaded Images Preview */}
              {uploadedImages.length > 0 && (
                <div className="mt-6">
                  <p className="text-sm text-muted-foreground mb-3">
                    Uploaded Images ({uploadedImages.length})
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {uploadedImages.map((_, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="relative group aspect-square rounded-xl overflow-hidden bg-muted"
                      >
                        <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                          <ImagePlus className="w-8 h-8 text-muted-foreground" />
                        </div>
                        <motion.button
                          onClick={(e) => { e.stopPropagation(); removeImage(index); }}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="absolute top-2 right-2 w-6 h-6 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="w-3 h-3" />
                        </motion.button>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center pt-4"
            >
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto px-8 h-12 rounded-xl"
                >
                  Save as Draft
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  onClick={handleSubmit}
                  size="lg"
                  className="w-full sm:w-auto px-8 h-12 rounded-xl bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20"
                >
                  Register Salon
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SalonRegistration;
