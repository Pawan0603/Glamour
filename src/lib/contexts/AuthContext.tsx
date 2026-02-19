"use client";

import axios from "axios";
import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { deleteCookie } from "../deleteCookie";

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  role: "customer" | "salon_owner";
  salonId?: string;
  salonName?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
  updateProfile: (
    data: Partial<Pick<User, "name" | "email" | "phone">>
  ) => void;
}

// const mockUser: User = {
//   id: "1",
//   name: "Priya Sharma",
//   email: "priya@example.com",
//   phone: "+91 98765 43210",
//   role: "salon_owner",
//   salonId: "salon-1",
//   salonName: "Glamour Studio",
// };

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const logout = () => {
    deleteCookie();
    setUser(null);
  }

  const updateProfile = (
    data: Partial<Pick<User, "name" | "email" | "phone">>
  ) => {
    setUser((prev) => (prev ? { ...prev, ...data } : prev));
  };

  const validateToken = async () => {
    try {
      let res = await axios.get('/api/auth/me');
      console.log(res);
      setUser(res.data.data)
    } catch (error) {
      console.log(error)
    }
  }

  const login = () => {
    validateToken();
  };

  useEffect(() => {
    validateToken();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
