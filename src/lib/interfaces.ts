import mongoose, { type Document } from "mongoose";

export interface IAvatar {
  url: string,
  publicId: string
}

export interface Coordinates {
  lat: number | null;
  lon: number | null;
}

export interface Service {
  _id: string
  servicesName: string;
  category: string;
  price: number;
  duration: number;
}

export interface Barber {
  _id: string;
  barberName: string;
  experience: number;
  services: string[]; // Usually an array of strings representing service names or IDs
  avatar: IAvatar;
}

export interface SalonFormData {
  // Basic Info
  salonName: string;
  salonCategory: string;
  phoneNumber: string;
  email: string;
  description: string;
  
  // Address & Location
  fullAddress: string;
  country: string;
  state: string;
  city: string;
  area_landmark: string;
  pincode: string;
  coordinate: Coordinates;
  
  // Working Hours
  openingTime: string;
  closingTime: string;
  weeklyAvailabity: string[];
  
  // Images
  salonCoverImage?: string;
  salonImages?: string[];
}

export interface Salon extends SalonFormData {
  _id: string;
  ownerId: mongoose.Schema.Types.ObjectId;
  profilePhoto: string;
  services: Service[]; 
  barber: Barber[];
  rating: number;
}


// ========================== Appointment interfeces =================

// export interface IAppointmentServices extends Document{
//   servicesName: string;
//   price: number;
//   time: string;
//   duration: number;
// }

export interface IAppointment {
  _id?: string;
  customerId: mongoose.Schema.Types.ObjectId;
  customerName: string;
  salonId: mongoose.Schema.Types.ObjectId;
  salonName: string;
  fullAddress: string;
  city: string;
  barberId: mongoose.Schema.Types.ObjectId;
  barberName: string;
  appointmentDate: Date;
  appointmentTime: string;
  duration: number;
  services: Service[];
  status: "Scheduled" | "Completed" | "Cancelled" | "Incomplete";
}
