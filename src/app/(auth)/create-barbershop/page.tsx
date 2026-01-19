"use client";

import { useCreateBarbershop } from "@/src/api/create-barbershop";
import { useAuth } from "@/src/context/auth-context";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function CreateBarbershop() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const router = useRouter();

  const { user, loading: isLoading, updateUser } = useAuth();
  console.log(user, user?.id);

  const { mutateAsync: createBarbershop, isPending } = useCreateBarbershop();

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!name || !address) {
      alert("Name, address, and ownerId are required.");
      return;
    }

    const barbershop = await createBarbershop({
      name,
      address,
      description,
      imageFile,
      ownerId: user.id,
    });

    updateUser({
      barbershopId: [barbershop.id],
    });

    router.replace(`/barbershop/${barbershop.id}/home`);
  };

  return (
    <div
      className="flex min-h-screen items-center justify-center 
  bg-linear-to-b from-zinc-950 via-black to-purple-900"
    >
      <div className="max-w-md bg-white dark:bg-zinc-900 p-6 rounded-xl shadow mb-10">
        <h2 className="font-semibold mb-4 dark:text-white">
          Create a Barber Shop
        </h2>

        <form onSubmit={handleSubmit}>
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
            type="submit"
            disabled={isPending || !user}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded"
          >
            {isPending ? "Creating..." : "Create"}
          </button>
        </form>
      </div>
    </div>
  );
}
