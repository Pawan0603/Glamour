'use client';
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Edit2, Trash2, X, Briefcase, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ImageUploadCard from "@/components/ImageUploadCard";
import { IAvatar } from "@/lib/interfaces";
import { useAuth } from "@/lib/contexts/AuthContext";
import { useSalon } from "@/lib/contexts/SalonContext";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import Image from "next/image";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

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
  const { user } = useAuth();
  const { salon, setSalon } = useSalon();
  // const [barbers, setBarbers] = useState<Barber[]>(initialBarbers);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    experience: "",
    services: [] as string[],
  });
  const [avatar, setAvatar] = useState<IAvatar>({
    url: "",
    publicId: "",
  });

  const handleAddBarber = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.experience) return;

    if(formData.services.length === 0) {
      toast.warning("Please assign at list 1 services.");
      return;
    }

    if(avatar.publicId === "" || avatar.url === ""){
      toast.warning("Please upload barber image.");
      return;
    }

    const barberData = {
      barberName: formData.name,
      experience: Number(formData.experience),
      services: formData.services,
      avatar: avatar
    }

    console.log(barberData)

    try {
      const res = await axios.patch(`/api/salon/${user?.salonId}/add-barber`, barberData, {
        headers: {
          'Content-Type': 'application/json',
        }
      })
      toast.success(res.data.message);
      // setSalon({ ...salon, barber: res.data.barber })
      if (!salon?.ownerId) return;
      setSalon({
        ...salon,
        barber: res.data.barber,
        ownerId: salon.ownerId
      });
      setFormData({ name: "", experience: "", services: [] });
      setAvatar({ url: "", publicId: "" });
      setShowForm(false);
    } catch (err) {
      const error = err as AxiosError<{ error: string }>
      toast.error(error.response?.data.error || "⚠️ Somethin went worng.")
    }
  };

  const handleDeleteBarber = async (barberId: string) => {
    try {
      const res = await axios.delete(`/api/owner/salon/${user?.salonId}/delete-barber`, {
        params: {
          barberId: barberId
        },
      })
      toast.success(res.data.message);
      if (!salon?.ownerId) return;
      setSalon({
        ...salon,
        barber: res.data.barber,
        ownerId: salon.ownerId
      });
    } catch (err) {
      const error = err as AxiosError<{ error: string }>;
      toast.error(error.response?.data.error || "⚠️ Somethin went worng.")
    }
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
            <form onSubmit={handleAddBarber} className="bg-card rounded-2xl border border-border p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-foreground mb-6">
                Add New Barber
              </h2>

              <ImageUploadCard setAvatar={setAvatar} />

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
                    required
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
                    required
                  />
                </div>
              </div>

              <div className="space-y-3">
                <Label>Assign Services</Label>
                <div className="flex flex-wrap gap-2">
                  {salon?.services.map((service) => (
                    <motion.button
                      key={service.servicesName}
                      type="button"
                      onClick={() => toggleService(service.servicesName)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${formData.services.includes(service.servicesName)
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground hover:bg-muted/80"
                        }`}
                    >
                      {service.servicesName}
                      {formData.services.includes(service.servicesName) && (
                        <X className="w-3 h-3 ml-2 inline" />
                      )}
                    </motion.button>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <Button type="submit">Add Barber</Button>
                <Button variant="outline" onClick={() => setShowForm(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Barbers Grid */}
      <motion.div variants={itemVariants}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {salon?.barber.map((barber) => (
              <motion.div
                key={barber._id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                whileHover={{ y: -4 }}
                className="bg-card rounded-2xl border border-border p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center text-primary-foreground font-bold text-lg overflow-hidden">
                      <Image src={barber.avatar.url} width={150} height={150} alt="avatar" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">
                        {barber.barberName}
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
                    
                    <Dialog>
                      <DialogTrigger asChild>
                        <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-2 rounded-lg hover:bg-destructive/10 transition-colors text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 className="w-4 h-4" />
                    </motion.button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Are you absolutely sure?</DialogTitle>
                          <DialogDescription>
                            This action cannot be undone. This will permanently delete your barber
                            and remove your data from our servers.
                          </DialogDescription>
                          <div className="sm:justify-start space-x-2">
                            <DialogClose asChild>
                              <Button type="button" className="cursor-pointer" onClick={() =>  handleDeleteBarber(barber._id)}>Delete</Button>
                            </DialogClose>
                            <DialogClose asChild>
                              <Button variant={'outline'} type="button" className="cursor-pointer">Close</Button>
                            </DialogClose>
                          </div>
                        </DialogHeader>
                      </DialogContent>
                    </Dialog>
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
  );
}
