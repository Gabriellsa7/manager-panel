"use client";

import BarbershopServiceModal from "@/src/components/BarbershopServiceModal";
import { useAuth } from "@/src/context/auth-context";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

type Barbershop = {
  id: string;
  name: string;
  address: string;
  description?: string;
  image_url?: string | null;
  rating?: number;
};

type Service = {
  id: string;
  name: string;
  description?: string;
  price: number;
  durationMinutes: number;
  image_url?: string | null;
};

const BASE_URL = "http://192.168.0.17:3001";

export default function BarbershopDetails() {
  const { id } = useParams();
  const { user } = useAuth();

  const [barbershop, setBarbershop] = useState<Barbershop | null>(null);
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [isOwner, setIsOwner] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchBarbershop = useCallback(async () => {
    const res = await fetch(`${BASE_URL}/api/barbershop/${id}`);
    const data = await res.json();
    setBarbershop(data);
  }, [id]);

  const fetchServices = useCallback(async () => {
    const res = await fetch(`${BASE_URL}/api/service/${id}`);
    const data = await res.json();
    setServices(data);
  }, [id]);

  const checkOwner = useCallback(async () => {
    if (!user) return;

    const res = await fetch(`${BASE_URL}/api/barbershop/owner/${user.id}`);
    const ownerList: Barbershop[] = await res.json();

    const owns = ownerList.some((b) => b.id === id);
    setIsOwner(owns);
  }, [user, id]);

  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      try {
        await Promise.all([fetchBarbershop(), fetchServices(), checkOwner()]);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    setLoading(true);
    loadData();

    return () => {
      isMounted = false;
    };
  }, [fetchBarbershop, fetchServices, checkOwner, refreshTrigger]);

  if (loading) {
    return <div className="p-10">Loading...</div>;
  }

  if (!barbershop) {
    return <div className="p-10">Barbershop not found</div>;
  }

  return (
    <>
      <div className="h-screen flex flex-col bg-zinc-50 dark:bg-black">
        <div className="p-8 flex flex-col flex-1 ">
          {barbershop.image_url && (
            <div className="w-full">
              <Image
                src={barbershop.image_url}
                alt={barbershop.name}
                width={200}
                height={200}
                className="w-full h-60 object-cover rounded-xl"
                unoptimized
              />
            </div>
          )}
          <h1 className="text-2xl font-bold">{barbershop.name}</h1>

          <p className="text-zinc-500">{barbershop.address}</p>

          <p className="text-sm">⭐ {barbershop.rating || "no rating yet"}</p>

          <div className="border-t border-zinc-700 my-6" />

          <h2 className="text-lg font-semibold">About us</h2>
          <p className="text-zinc-400">{barbershop.description}</p>

          <div className="border-t border-zinc-700 my-6" />

          <h2 className="text-lg font-semibold">Services</h2>

          <div className="flex flex-col gap-2">
            {services.length === 0 && (
              <p className="text-red-500">Service not found</p>
            )}

            <div className="flex gap-2 overflow-y-auto custom-scroll pr-2 pb-6">
              {services.map((service) => (
                <div
                  key={service.id}
                  className="flex gap-4 bg-zinc-900 p-4 rounded-xl min-w-[320px]"
                >
                  {service.image_url && (
                    <Image
                      src={service.image_url}
                      alt={service.name}
                      width={90}
                      height={80}
                      className="rounded-lg object-cover"
                      unoptimized
                    />
                  )}

                  <div className="flex-1">
                    <h3 className="font-bold">{service.name}</h3>
                    <p className="text-zinc-400 text-sm">
                      {service.description}
                    </p>

                    <div className="flex justify-between items-center mt-2">
                      <span className="text-purple-400 font-bold">
                        R$ {service.price}
                      </span>

                      <button className="bg-zinc-800 px-4 py-2 rounded-lg">
                        Reservar
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {isOwner && (
              <div className="pt-4 border-t border-zinc-800">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="w-full bg-purple-600 px-6 py-3 rounded-lg"
                >
                  Add Barbershop Service
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      {isModalOpen && (
        <BarbershopServiceModal
          barbershopId={barbershop.id}
          onClose={() => setIsModalOpen(false)}
          onSuccess={() => setRefreshTrigger((prev) => prev + 1)}
        />
      )}
    </>
  );
}
