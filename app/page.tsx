"use client";

import { useAuth } from "@/context/auth-context";
import { redirect } from "next/navigation";

export default function RootPage() {
  const { user } = useAuth();

  if (!user) {
    redirect("/login");
  }

  const barbershopId = user.barbershopId?.[0];

  redirect(`/barbershop/${barbershopId}/home`);
}
