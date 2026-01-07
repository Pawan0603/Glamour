import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface BarberCardProps {
  name: string;
  image: string;
  experience: number;
  services: string[];
}

const BarberCard = ({ name, image, experience, services }: BarberCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-card transition-all duration-300"
    >
      <div className="h-40 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
      </div>
      
      <div className="p-4">
        <h4 className="font-semibold text-foreground mb-1">{name}</h4>
        <div className="flex items-center gap-1 text-muted-foreground text-sm mb-3">
          <Briefcase className="w-3.5 h-3.5" />
          <span>{experience} years experience</span>
        </div>
        
        <div className="flex flex-wrap gap-1.5">
          {services.slice(0, 3).map((service, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {service}
            </Badge>
          ))}
          {services.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{services.length - 3} more
            </Badge>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default BarberCard;
