'use client';
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Edit2, Trash2, Clock, IndianRupee } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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

interface Service {
  id: number;
  name: string;
  category: string;
  price: number;
  duration: number;
}

const initialServices: Service[] = [
  { id: 1, name: "Haircut", category: "Hair", price: 300, duration: 30 },
  { id: 2, name: "Beard Trim", category: "Grooming", price: 150, duration: 15 },
  { id: 3, name: "Hair Spa", category: "Hair", price: 800, duration: 60 },
  { id: 4, name: "Facial", category: "Skin", price: 500, duration: 45 },
  { id: 5, name: "Hair Color", category: "Hair", price: 1200, duration: 90 },
  { id: 6, name: "Manicure", category: "Nails", price: 400, duration: 30 },
];

const categories = ["Hair", "Grooming", "Skin", "Nails", "Massage", "Other"];

export default function Page() {
  const [services, setServices] = useState<Service[]>(initialServices);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    duration: "",
  });

  const handleAddService = () => {
    if (!formData.name || !formData.category || !formData.price || !formData.duration) {
      return;
    }

    const newService: Service = {
      id: Date.now(),
      name: formData.name,
      category: formData.category,
      price: parseFloat(formData.price),
      duration: parseInt(formData.duration),
    };

    setServices([newService, ...services]);
    setFormData({ name: "", category: "", price: "", duration: "" });
    setShowForm(false);
  };

  const handleDeleteService = (id: number) => {
    setServices(services.filter((s) => s.id !== id));
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
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-display font-bold text-foreground">
              Manage Services
            </h1>
            <p className="text-muted-foreground mt-1">
              Add and manage salon services for your customers.
            </p>
          </div>
          <Button
            onClick={() => setShowForm(!showForm)}
            className="gap-2"
            size="lg"
          >
            <Plus className="w-5 h-5" />
            Add Service
          </Button>
        </motion.div>

        {/* Add Service Form */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="bg-card rounded-2xl border border-border p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-foreground mb-6">
                  Add New Service
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="serviceName">Service Name</Label>
                    <Input
                      id="serviceName"
                      placeholder="e.g., Haircut"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) =>
                        setFormData({ ...formData, category: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((cat) => (
                          <SelectItem key={cat} value={cat}>
                            {cat}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="price">Price (₹)</Label>
                    <Input
                      id="price"
                      type="number"
                      placeholder="e.g., 300"
                      value={formData.price}
                      onChange={(e) =>
                        setFormData({ ...formData, price: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="duration">Duration (mins)</Label>
                    <Input
                      id="duration"
                      type="number"
                      placeholder="e.g., 30"
                      value={formData.duration}
                      onChange={(e) =>
                        setFormData({ ...formData, duration: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="flex gap-3 mt-6">
                  <Button onClick={handleAddService}>Add Service</Button>
                  <Button variant="outline" onClick={() => setShowForm(false)}>
                    Cancel
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Services Grid */}
        <motion.div variants={itemVariants}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {services.map((service) => (
                <motion.div
                  key={service.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  whileHover={{ y: -4 }}
                  className="bg-card rounded-2xl border border-border p-6 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">
                        {service.name}
                      </h3>
                      <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium mt-2">
                        {service.category}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                      >
                        <Edit2 className="w-4 h-4" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleDeleteService(service.id)}
                        className="p-2 rounded-lg hover:bg-destructive/10 transition-colors text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </div>
                  <div className="flex items-center gap-6 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <IndianRupee className="w-4 h-4" />
                      <span className="font-semibold text-foreground">
                        {service.price}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span>{service.duration} mins</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>
      </motion.div>
    </OwnerLayout>
  );
}
