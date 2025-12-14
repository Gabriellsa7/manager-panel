"use client";

import { useState } from "react";
import { useBarbershopManager } from "@/hooks/useBarbershopManager";
import Image from "next/image";
import { useAuth } from "@/context/auth-context";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";

export default function Home() {
  const { user } = useAuth();
  const router = useRouter();

  const params = useParams();

  const ownerId = user?.id || (params?.id as string);

  const { barbershops, loading, createBarbershop } =
    useBarbershopManager(ownerId);

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleSubmit = async () => {
    if (!name || !address) {
      alert("Nome e endereço obrigatórios");
      return;
    }

    await createBarbershop({
      name,
      address,
      description,
      imageFile,
    });

    setName("");
    setAddress("");
    setDescription("");
    setImageFile(null);
  };

  return (
    <div className="min-h-screen p-8 bg-zinc-50 dark:bg-black">
      <h1 className="text-2xl font-bold mb-6 dark:text-white">Panel Manager</h1>

      <div className="max-w-md bg-white dark:bg-zinc-900 p-6 rounded-xl shadow mb-10">
        <h2 className="font-semibold mb-4 dark:text-white">Criar Barbearia</h2>

        <input
          className="w-full mb-3 px-4 py-2 rounded bg-zinc-100 dark:bg-zinc-800 dark:text-white"
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="w-full mb-3 px-4 py-2 rounded bg-zinc-100 dark:bg-zinc-800 dark:text-white"
          placeholder="Endereço"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

        <textarea
          className="w-full mb-3 px-4 py-2 rounded bg-zinc-100 dark:bg-zinc-800 dark:text-white"
          placeholder="Descrição"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files?.[0] || null)}
          className="mb-4 text-sm text-zinc-500"
        />

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded"
        >
          {loading ? "Salvando..." : "Criar"}
        </button>
      </div>

      <div className="max-w-2xl space-y-4">
        {barbershops.map((b) => (
          <div
            key={b.id}
            className="bg-white dark:bg-zinc-900 p-4 rounded-xl shadow"
          >
            {b.image_url && (
              <div className="relative w-full h-40 mb-3">
                <Image
                  src={b.image_url}
                  alt={b.name}
                  fill
                  className="object-cover rounded-lg"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  unoptimized
                />
              </div>
            )}

            <p className="font-semibold dark:text-white">{b.name}</p>
            <p className="text-sm text-zinc-500">{b.address}</p>

            <button
              onClick={() =>
                router.push(`/barbershop/${b.id}/barbershop-details`)
              }
              className="mt-3 w-full bg-zinc-800 hover:bg-zinc-700 text-white py-2 rounded-lg text-sm font-medium"
            >
              Ver detalhes
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
