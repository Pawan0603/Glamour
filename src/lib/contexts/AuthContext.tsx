"use client";

import { createContext, useContext, useState, ReactNode } from "react";

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
  login: (user: User) => void;
  logout: () => void;
  toggleMockAuth: () => void;
  updateProfile: (
    data: Partial<Pick<User, "name" | "email" | "phone">>
  ) => void;
}

const mockUser: User = {
  id: "1",
  name: "Priya Sharma",
  email: "priya@example.com",
  phone: "+91 98765 43210",
  role: "salon_owner",
  salonId: "salon-1",
  salonName: "Glamour Studio",
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (userData: User) => setUser(userData);
  const logout = () => setUser(null);
  const toggleMockAuth = () => setUser((prev) => (prev ? null : mockUser));

  const updateProfile = (
    data: Partial<Pick<User, "name" | "email" | "phone">>
  ) => {
    setUser((prev) => (prev ? { ...prev, ...data } : prev));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
        toggleMockAuth,
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
