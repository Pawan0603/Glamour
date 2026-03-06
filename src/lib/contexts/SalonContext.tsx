"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { Salon } from "@/lib/interfaces";
import { useAuth } from "./AuthContext";
import axios from "axios";

interface SalonContextType {
  salon: Salon | null;
  setSalon: React.Dispatch<React.SetStateAction<Salon | null>>;
  refreshSalon: () => Promise<void>; // Useful for updating UI after adding a service
}

const SalonContext = createContext<SalonContextType | undefined>(undefined);

export const SalonProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [salon, setSalon] = useState<Salon | null>(null);
  const { user } = useAuth();

  const refreshSalon = async () => {
    if (!user?.salonId) return;

    try {
      const res = await axios.get(`/api/owner/salon/${user.salonId}`);
      setSalon(res.data.salon);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Axios failed to refresh salon data:", error.response?.data || error.message);
      } else {
        console.error("An unexpected error occurred:", error);
      }
    }
  };

  useEffect(() => {
    refreshSalon();
  }, [user]);

  return (
    <SalonContext.Provider value={{ salon, setSalon, refreshSalon }}>
      {children}
    </SalonContext.Provider>
  );
};

// 3. Custom Hook for easy access
export const useSalon = () => {
  const context = useContext(SalonContext);
  if (context === undefined) {
    throw new Error("useSalon must be used within a SalonProvider");
  }
  return context;
};