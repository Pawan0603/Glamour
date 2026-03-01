import { motion } from "framer-motion";
import { Clock, IndianRupee } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ServiceCardProps {
  _id: string;
  servicesName: string;
  category: string
  price: number;
  duration: number;
  onBook?: () => void;
}

// _id: "69a2deb6ab89958a4cacf59d",
//       servicesName: "Haircut",
//       category: "Hair",
//       price: 100,
//       duration: 30,

const ServiceCard = ({ _id ,servicesName, category, price, duration, onBook }: ServiceCardProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className="bg-card border border-border rounded-xl p-5 hover:shadow-card transition-all duration-300"
    >
      <div className="flex justify-between items-start mb-3">
        <h4 className="font-semibold text-foreground">{servicesName}</h4>
        <div className="flex items-center text-primary font-bold">
          <IndianRupee className="w-4 h-4" />
          <span>{price}</span>
        </div>
      </div>
      
      <div className="flex items-center gap-1 text-muted-foreground text-sm mb-4">
        <Clock className="w-4 h-4" />
        <span>{duration} mins</span>
      </div>
      
      <Button 
        onClick={onBook} 
        size="sm" 
        className="w-full"
      >
        Book Appointment
      </Button>
    </motion.div>
  );
};

export default ServiceCard;
