import mongoose from "mongoose";

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
  price: number | null;
  duration: number;
}

export interface Barber {
  _id: string;
  barberName: string;
  experience: number | null;
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