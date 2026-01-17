"use client";

import { useParams } from "next/navigation";
import {
  GET_APPOINTMENT_BY_ID_KEY,
  useGetAppointmentById,
} from "@/src/api/get-appointment-by-id";
import { getDay } from "@/src/hooks/get-day";
import Background from "@/src/components/background";
import { getMonthName } from "@/src/hooks/get-month-name";
import Image from "next/image";
import { IoArrowBack } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { useUpdateAppointmentStatus } from "@/src/api/update-appointment-status";
import { useQueryClient } from "@tanstack/react-query";

export default function AppointmentDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const queryClient = useQueryClient();

  const {
    data: appointment,
    isLoading,
    error,
  } = useGetAppointmentById(
    {
      appointmentId: id as string,
    },
    {
      enabled: !!id,
    },
  );

  const { mutateAsync: updateStatus, isPending } = useUpdateAppointmentStatus({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [GET_APPOINTMENT_BY_ID_KEY, { appointmentId: id as string }],
      });
      queryClient.invalidateQueries({
        queryKey: ["GET_APPOINTMENTS_BY_BARBERSHOP_QUERY_KEY"],
      });
    },
  });

  async function handleUpdateStatus(
    status: "CONFIRMED" | "CANCELLED" | "DONE",
  ) {
    await updateStatus({
      appointmentId: id as string,
      status,
    });
  }

  if (isLoading)
    return (
      <Background>
        <p>Loading</p>
      </Background>
    );
  if (error || !appointment) return <p>Error loading appointment</p>;
  if (!appointment.barbershop) {
    return <p className="text-white">Barbershop not found</p>;
  }

  return (
    <Background>
      <div className="rounded-xl w-full">
        <div className="relative w-full h-[45vh]">
          <Image
            src={appointment.barbershop.image_url || "/boruto.jpeg"}
            alt={appointment.barbershop.name}
            fill
            priority
            className="object-cover"
          />

          <button
            onClick={() => router.back()}
            className="absolute top-4 left-4 z-10 w-10 h-10 flex items-center justify-center rounded-lg bg-black/60 text-white"
          >
            <IoArrowBack size={20} />
          </button>
        </div>
        <div>
          <h1 className="text-white text-2xl font-bold">
            {appointment.barbershop.name}
          </h1>

          <p className="text-white mb-2">Status: {appointment.status}</p>

          <p className="text-white mb-2">
            {getDay(appointment.date)} {getMonthName(appointment.date)}
          </p>

          <p className="text-white mb-4">
            {appointment.startTime} - {appointment.endTime}
          </p>

          <div className="flex flex-col gap-2">
            {appointment.appointmentservice &&
              appointment.appointmentservice.map((item) => (
                <div
                  key={item.service.id}
                  className="flex items-center gap-3 bg-[#1E1E26] p-3 rounded-lg"
                >
                  <Image
                    src={item.service.image_url}
                    alt={item.service.name}
                    width={32}
                    height={32}
                  />
                  <div>
                    <p className="text-white font-bold">{item.service.name}</p>
                    <p className="text-sm text-gray-400">
                      ${item.service.price} • {item.service.durationMinutes} min
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>
        <div className="flex gap-3 mt-6">
          <button
            onClick={() => handleUpdateStatus("CONFIRMED")}
            disabled={isPending}
            className="flex-1 bg-green-600 text-white py-3 rounded-lg cursor-pointer hover:opacity-40"
          >
            Confirm
          </button>

          <button
            onClick={() => handleUpdateStatus("CANCELLED")}
            disabled={isPending}
            className="flex-1 bg-red-600 text-white py-3 rounded-lg cursor-pointer hover:opacity-40"
          >
            Cancel
          </button>

          <button
            onClick={() => handleUpdateStatus("DONE")}
            disabled={isPending}
            className="flex-1 bg-blue-600 text-white py-3 rounded-lg cursor-pointer hover:opacity-40"
          >
            Done
          </button>
        </div>
      </div>
    </Background>
  );
}
