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

  // Inicializa usuário do localStorage de forma segura
  useEffect(() => {
    const initialUser = getInitialUser();

    // Deixar a atualização do estado assíncrona para evitar warnings
    Promise.resolve().then(() => {
      if (initialUser) {
        setUser(initialUser);
      }
      setLoading(false);
    });
  }, []);

  // Redirecionamento seguro
  useEffect(() => {
    if (loading) return; // espera terminar o carregamento inicial
    if (!user) {
      router.replace("/"); // redireciona para login se não houver usuário
    }
  }, [user, loading, router]);

  // Função de login
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

    // Redirecionamento após login
    if (loggedUser.barbershopId?.[0]) {
      router.replace(`/barbershop/${loggedUser.barbershopId[0]}/home`);
    } else {
      router.replace("/signup");
    }

    return loggedUser;
  };

  // Atualiza usuário no estado e localStorage
  const updateUser = (updated: Partial<User>) => {
    setUser((prev) => {
      if (!prev) return prev;
      const next = { ...prev, ...updated };
      localStorage.setItem("user", JSON.stringify(next));
      return next;
    });
  };

  // Logout
  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    router.replace("/"); // redireciona para login
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook para usar o AuthContext
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used dentro do AuthProvider");
  }
  return context;
}
