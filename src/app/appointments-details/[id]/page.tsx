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
import { APPOINTMENT_STATUS } from "@/src/constants/appointment-status";
import { BiCalendar } from "react-icons/bi";
import { TbClockHour2 } from "react-icons/tb";

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
        <div className="p-5">
          <div className="flex flex-col gap-2">
            <h1 className="text-white text-2xl font-bold">
              {appointment.barbershop.name}
            </h1>
            <div className="flex items-center gap-2">
              {(() => {
                const {
                  label,
                  icon: Icon,
                  color,
                } = APPOINTMENT_STATUS[appointment.status];

                return (
                  <>
                    <Icon size={18} className={color} />
                    <span className="text-white font-medium">{label}</span>
                  </>
                );
              })()}
            </div>
            <div className="flex items-center gap-2">
              <BiCalendar size={18} color="white" />
              <p className="text-white">
                {getDay(appointment.date)} {getMonthName(appointment.date)}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <TbClockHour2 size={18} color="white" />
              <p className="text-white">
                {appointment.startTime} - {appointment.endTime}
              </p>
            </div>
          </div>

          <div className="flex gap-4 p-4 rounded-xl min-w-[320px]">
            {appointment.appointmentservice &&
              appointment.appointmentservice.map((item) => (
                <div
                  key={item.appointmentId}
                  className="flex gap-4 bg-zinc-900 p-4 rounded-xl min-w-[320px]"
                >
                  <Image
                    src={item.service.image_url}
                    alt={item.service.name}
                    width={100}
                    height={100}
                    className="rounded-lg object-cover"
                    unoptimized
                  />
                  <div className="flex-1">
                    <h3 className="font-bold text-white">
                      {item.service.name}
                    </h3>
                    {/* <p className="text-zinc-400 text-sm">{item.service.description}</p> */}
                    <div className="flex flex-col gap-3 items-center mt-2">
                      <span className="text-purple-400 font-bold">
                        ${item.service.price}
                      </span>
                      <span className="text-purple-400 font-bold">
                        {item.service.durationMinutes} min
                      </span>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
        <div className="flex gap-3 px-5">
          <button
            onClick={() => handleUpdateStatus("CONFIRMED")}
            disabled={isPending}
            className="flex-1 bg-purple-600 hover:bg-purple-700 transition text-white py-3 rounded-xl font-medium disabled:opacity-50"
          >
            Confirm
          </button>

          <button
            onClick={() => handleUpdateStatus("CANCELLED")}
            disabled={isPending}
            className="flex-1 border border-red-500/40 text-red-400 py-3 rounded-xl hover:bg-red-500/10 transition disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            onClick={() => handleUpdateStatus("DONE")}
            disabled={isPending}
            className="flex-1 bg-zinc-800 text-zinc-300 py-3 rounded-xl hover:bg-zinc-700 transition disabled:opacity-50"
          >
            Done
          </button>
        </div>
      </div>
    </Background>
  );
}
