"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type User = {
  id: string;
  name: string;
  email: string;
  barbershopId?: string[];
  imageUrl?: string | null;
};

type AuthContextProps = {
  user: User | null;
  login: (email: string, password: string) => Promise<User>;
  logout: () => void;
  updateUser: (updated: Partial<User>) => void;
  loading: boolean;
};

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

function getInitialUser(): User | null {
  if (typeof window === "undefined") return null;

  const stored = localStorage.getItem("user");
  if (!stored) return null;

  try {
    return JSON.parse(stored);
  } catch {
    localStorage.removeItem("user");
    return null;
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initialUser = getInitialUser();

    Promise.resolve().then(() => {
      if (initialUser) {
        setUser(initialUser);
      }
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (loading) return;
    if (!user) {
      router.replace("/");
    }
  }, [user, loading, router]);

  const login = async (email: string, password: string) => {
    const response = await fetch("http://localhost:3001/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || "Login failed");
    }

    const loggedUser: User = data.user;

    localStorage.setItem("user", JSON.stringify(loggedUser));
    setUser(loggedUser);
    if (loggedUser.barbershopId?.[0]) {
      router.replace(`/barbershop/${loggedUser.barbershopId[0]}/home`);
    } else {
      router.replace("/signup");
    }

    return loggedUser;
  };

  const updateUser = (updated: Partial<User>) => {
    setUser((prev) => {
      if (!prev) return prev;
      const next = { ...prev, ...updated };
      localStorage.setItem("user", JSON.stringify(next));
      return next;
    });
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    router.replace("/");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used dentro do AuthProvider");
  }
  return context;
}
