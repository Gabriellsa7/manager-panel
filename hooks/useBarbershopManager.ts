import { useCallback, useEffect, useState } from "react";

type Barbershop = {
  id: string;
  name: string;
  address: string;
  description?: string;
  image_url?: string | null;
};

const BASE_URL = "http://192.168.0.17:3001";

export function useBarbershopManager(ownerId: string | undefined) {
  const [barbershops, setBarbershops] = useState<Barbershop[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchBarbershops = useCallback(async () => {
    if (!ownerId) return;

    const res = await fetch(`${BASE_URL}/api/barbershop/owner/${ownerId}`);
    const data = await res.json();
    setBarbershops(data);
  }, [ownerId]);

  useEffect(() => {
    fetchBarbershops();
  }, [fetchBarbershops]);

  const uploadImage = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("image", file);

    const res = await fetch(`${BASE_URL}/api/upload`, {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      throw new Error("Erro no upload");
    }

    const data = await res.json();
    return data.url.startsWith("http") ? data.url : `${BASE_URL}${data.url}`;
  };

  const createBarbershop = async (data: {
    name: string;
    address: string;
    description?: string;
    imageFile?: File | null;
  }) => {
    if (!ownerId) {
      throw new Error("OwnerId não encontrado");
    }

    setLoading(true);

    try {
      let image_url: string | undefined;

      if (data.imageFile) {
        image_url = await uploadImage(data.imageFile);
      }

      const res = await fetch(`${BASE_URL}/api/barbershop`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          address: data.address,
          description: data.description,
          image_url,
          ownerId, // 🔥 IGUAL AO APP
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Erro ao criar barbearia");
      }

      const newBarbershop = await res.json();

      setBarbershops((prev) => [newBarbershop, ...prev]);
    } finally {
      setLoading(false);
    }
  };

  return {
    barbershops,
    loading,
    createBarbershop,
  };
}
