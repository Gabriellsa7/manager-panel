"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useAuth } from "@/src/context/auth-context";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useGetBarbershopByOwner } from "@/src/api/get-barbershop-by-owner";
import { useCreateBarbershop } from "@/src/api/create-barbershop";
import { normalizeImageUrl } from "@/src/hooks/normalize-image-url";

export default function Home() {
  const { user } = useAuth();
  const router = useRouter();

  const params = useParams();

  const ownerId = user?.id || (params?.id as string);

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const { data: barbershops = [], isLoading: isLoadingBarbershops } =
    useGetBarbershopByOwner({ ownerId }, { enabled: !!ownerId });

  const { mutateAsync: createBarbershop } = useCreateBarbershop();

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const handleSubmit = async () => {
    if (!name || !address || !ownerId) {
      alert("Name, address, and ownerId are required.");
      return;
    }

    await createBarbershop({
      name,
      address,
      description,
      imageFile,
      ownerId,
    });

    setName("");
    setAddress("");
    setDescription("");
    setImageFile(null);
    setPreview(null);
  };

  if (isLoadingBarbershops) {
    return <p>Loading...</p>;
  }

  return (
    <div className="h-screen overflow-hidden p-8 ">
      <h1 className="text-2xl font-bold mb-6 dark:text-white">Panel Manager</h1>

      <div className="max-w-md bg-white dark:bg-zinc-900 p-6 rounded-xl shadow mb-10">
        <h2 className="font-semibold mb-4 dark:text-white">
          Create a Barber Shop
        </h2>

        <input
          className="w-full mb-3 px-4 py-2 rounded bg-zinc-100 dark:bg-zinc-800 dark:text-white"
          placeholder="Name"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="w-full mb-3 px-4 py-2 rounded bg-zinc-100 dark:bg-zinc-800 dark:text-white"
          placeholder="Address"
          id="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

        <textarea
          className="w-full mb-3 px-4 py-2 rounded bg-zinc-100 dark:bg-zinc-800 dark:text-white"
          placeholder="Description"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div className="mb-4">
          <label className="cursor-pointer text-white font-medium">
            Select image
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];

                if (file) {
                  setImageFile(file);
                  setPreview(URL.createObjectURL(file));
                }
              }}
              className="hidden"
            />
          </label>
        </div>

        {preview && (
          <div className="relative w-full h-40 mb-4">
            <Image
              src={preview}
              alt="Preview"
              fill
              className="object-cover rounded-lg"
              unoptimized
            />
          </div>
        )}

        <button
          onClick={handleSubmit}
          disabled={isLoadingBarbershops}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded"
        >
          {isLoadingBarbershops ? "Saving..." : "Create"}
        </button>
      </div>

      <div className="max-w-2xl space-y-4 h-[calc(100vh-420px)] overflow-y-auto custom-scroll pr-2 pb-20">
        {barbershops.map((b) => (
          <div
            key={b.id}
            className="bg-white dark:bg-zinc-900 p-4 rounded-xl shadow"
          >
            {b.image_url && (
              <div className="relative w-full h-40 mb-3">
                <Image
                  src={normalizeImageUrl(b.image_url)!}
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
              See Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
