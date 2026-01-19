"use client";

import Image from "next/image";
import { useState } from "react";

type Props = {
  barbershopId: string;
  onClose: () => void;
  onSuccess: () => void;
};

const BASE_URL = "http://localhost:3001";

export default function BarbershopServiceModal({
  barbershopId,
  onClose,
  onSuccess,
}: Props) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [durationMinutes, setDurationMinutes] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const [preview, setPreview] = useState<string | null>(null);

  const uploadImage = async (file: File): Promise<string | null> => {
    const formData = new FormData();
    formData.append("image", file);

    const res = await fetch(`${BASE_URL}/api/upload`, {
      method: "POST",
      body: formData,
    });

    if (!res.ok) return null;

    const data = await res.json();
    return data.url.startsWith("http") ? data.url : `${BASE_URL}${data.url}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !price || !durationMinutes) {
      alert("Name, price and duration are required");
      return;
    }

    setLoading(true);

    try {
      let image_url: string | undefined;

      if (imageFile) {
        const uploaded = await uploadImage(imageFile);
        if (uploaded) {
          image_url = uploaded;
        }
      }

      const res = await fetch(`${BASE_URL}/api/service`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          description,
          price: Number(price),
          durationMinutes: Number(durationMinutes),
          barbershopId,
          image_url,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Error creating service");
      }

      onSuccess();
      onClose();
    } catch (err) {
      console.error(err);
      alert("Error creating service");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center  bg-black/60 backdrop-blur 
  p-6 shadow-xl border border-white/10"
    >
      <form
        onSubmit={handleSubmit}
        className="bg-zinc-900 p-6 rounded-xl w-full max-w-md space-y-3"
      >
        <h2 className="text-lg font-bold text-white">Add Service</h2>

        <input
          placeholder="Name"
          className="w-full rounded border-none text-sm bg-white p-2 text-black placeholder:text-gray-600 placeholder:text-xs focus:outline-none"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <textarea
          placeholder="Description"
          className="w-full rounded border-none text-sm bg-white p-2 text-black placeholder:text-gray-600 placeholder:text-xs focus:outline-none"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          placeholder="Price"
          type="number"
          className="w-full rounded border-none text-sm bg-white p-2 text-black placeholder:text-gray-600 placeholder:text-xs focus:outline-none  appearance-none
    [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <input
          placeholder="Duration (minutes)"
          type="number"
          className="w-full rounded border-none text-sm bg-white p-2 text-black placeholder:text-gray-600 placeholder:text-xs focus:outline-none  appearance-none
    [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          value={durationMinutes}
          onChange={(e) => setDurationMinutes(e.target.value)}
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

        <div className="flex gap-3 pt-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 bg-zinc-700 py-2 rounded text-white cursor-pointer hover:opacity-80"
          >
            Cancel
          </button>

          <button
            disabled={loading}
            className="flex-1 bg-purple-600 py-2 rounded text-white cursor-pointer hover:opacity-80"
          >
            {loading ? "Saving..." : "Confirm"}
          </button>
        </div>
      </form>
    </div>
  );
}
