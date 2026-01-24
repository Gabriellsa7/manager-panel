"use client";

import Image from "next/image";
import { useAuth } from "@/src/context/auth-context";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useGetBarbershopByOwner } from "@/src/api/get-barbershop-by-owner";
import { normalizeImageUrl } from "@/src/hooks/normalize-image-url";

export default function Home() {
  const { user } = useAuth();
  const router = useRouter();

  const params = useParams();

  const ownerId = user?.id || (params?.id as string);

  const { data: barbershops = [], isLoading: isLoadingBarbershops } =
    useGetBarbershopByOwner({ ownerId }, { enabled: !!ownerId });

  if (isLoadingBarbershops) {
    return <p>Loading...</p>;
  }

  return (
    <div className="h-screen overflow-hidden p-8 ">
      <h1 className="text-2xl font-bold mb-6 dark:text-white">Panel Manager</h1>
      <div className="max-w-2xl space-y-4 h-[calc(100vh-100px)] overflow-y-auto custom-scroll pr-2 pb-20">
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
