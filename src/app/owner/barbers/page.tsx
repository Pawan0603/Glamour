'use client';
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Edit2, Trash2, X, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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

interface Barber {
  id: number;
  name: string;
  experience: number;
  services: string[];
  avatar: string;
}

const availableServices = [
  "Haircut",
  "Beard Trim",
  "Hair Spa",
  "Facial",
  "Hair Color",
  "Manicure",
  "Pedicure",
  "Shaving",
  "Head Massage",
  "Waxing",
];

const initialBarbers: Barber[] = [
  {
    id: 1,
    name: "Amit Kumar",
    experience: 5,
    services: ["Haircut", "Beard Trim", "Shaving"],
    avatar: "AK",
  },
  {
    id: 2,
    name: "Neha Verma",
    experience: 7,
    services: ["Hair Spa", "Hair Color", "Facial"],
    avatar: "NV",
  },
  {
    id: 3,
    name: "Raj Singh",
    experience: 3,
    services: ["Haircut", "Shaving", "Head Massage"],
    avatar: "RS",
  },
  {
    id: 4,
    name: "Priya Sharma",
    experience: 4,
    services: ["Manicure", "Pedicure", "Waxing"],
    avatar: "PS",
  },
];

export default function Page() {
  const [barbers, setBarbers] = useState<Barber[]>(initialBarbers);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    experience: "",
    services: [] as string[],
  });

  const handleAddBarber = () => {
    if (!formData.name || !formData.experience || formData.services.length === 0) {
      return;
    }

    const newBarber: Barber = {
      id: Date.now(),
      name: formData.name,
      experience: parseInt(formData.experience),
      services: formData.services,
      avatar: formData.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase(),
    };

    setBarbers([newBarber, ...barbers]);
    setFormData({ name: "", experience: "", services: [] });
    setShowForm(false);
  };

  const handleDeleteBarber = (id: number) => {
    setBarbers(barbers.filter((b) => b.id !== id));
  };

  const toggleService = (service: string) => {
    if (formData.services.includes(service)) {
      setFormData({
        ...formData,
        services: formData.services.filter((s) => s !== service),
      });
    } else {
      setFormData({
        ...formData,
        services: [...formData.services, service],
      });
    }
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
              Manage Barbers
            </h1>
            <p className="text-muted-foreground mt-1">
              Add barbers and assign services to them.
            </p>
          </div>
          <Button
            onClick={() => setShowForm(!showForm)}
            className="gap-2"
            size="lg"
          >
            <Plus className="w-5 h-5" />
            Add Barber
          </Button>
        </motion.div>

        {/* Add Barber Form */}
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
                  Add New Barber
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="space-y-2">
                    <Label htmlFor="barberName">Barber Name</Label>
                    <Input
                      id="barberName"
                      placeholder="e.g., Amit Kumar"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="experience">Experience (years)</Label>
                    <Input
                      id="experience"
                      type="number"
                      placeholder="e.g., 5"
                      value={formData.experience}
                      onChange={(e) =>
                        setFormData({ ...formData, experience: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <Label>Assign Services</Label>
                  <div className="flex flex-wrap gap-2">
                    {availableServices.map((service) => (
                      <motion.button
                        key={service}
                        onClick={() => toggleService(service)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                          formData.services.includes(service)
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground hover:bg-muted/80"
                        }`}
                      >
                        {service}
                        {formData.services.includes(service) && (
                          <X className="w-3 h-3 ml-2 inline" />
                        )}
                      </motion.button>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <Button onClick={handleAddBarber}>Add Barber</Button>
                  <Button variant="outline" onClick={() => setShowForm(false)}>
                    Cancel
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Barbers Grid */}
        <motion.div variants={itemVariants}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {barbers.map((barber) => (
                <motion.div
                  key={barber.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  whileHover={{ y: -4 }}
                  className="bg-card rounded-2xl border border-border p-6 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center text-primary-foreground font-bold text-lg">
                        {barber.avatar}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-foreground">
                          {barber.name}
                        </h3>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                          <Briefcase className="w-4 h-4" />
                          <span>{barber.experience} years exp.</span>
                        </div>
                      </div>
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
                        onClick={() => handleDeleteBarber(barber.id)}
                        className="p-2 rounded-lg hover:bg-destructive/10 transition-colors text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Services:</p>
                    <div className="flex flex-wrap gap-2">
                      {barber.services.map((service) => (
                        <span
                          key={service}
                          className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium"
                        >
                          {service}
                        </span>
                      ))}
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
