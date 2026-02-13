import mongoose from "mongoose";

export interface Coordinates {
  lat: number | null;
  lon: number | null;
}

export interface Service {
  servicesName: string;
  category: string;
  price: number | null;
  duration: string;
}

export interface Barber {
  barberName: string;
  experience: number | null;
  services: string[]; // Usually an array of strings representing service names or IDs
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
  salonCoverImage: string;
  salonImages: string[];
}

export interface Salon extends SalonFormData {
  ownerId: mongoose.Schema.Types.ObjectId;
  profilePhoto: string;
  services: Service; 
  barber: Barber;
}