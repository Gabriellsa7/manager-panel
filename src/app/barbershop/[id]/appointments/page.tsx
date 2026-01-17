"use client";

import { useGetAppointmentsByBarbershop } from "@/src/api/get-appointments";
import { useGetBarbershopByOwner } from "@/src/api/get-barbershop-by-owner";
import AppointmentsCard from "@/src/components/appointments-card";
import { useAuth } from "@/src/context/auth-context";

export default function AppointmentPage() {
  const { user } = useAuth();

  const {
    data: barbershopData,
    isLoading: isLoadingBarbershop,
    error: barbershopError,
  } = useGetBarbershopByOwner({ ownerId: user?.id as string });

  const barbershop = barbershopData?.[0];

  const {
    data: appointmentsData,
    isLoading: isLoadingAppointments,
    error: appointmentsError,
  } = useGetAppointmentsByBarbershop({
    barbershopId: barbershop?.id as string,
  });

  console.log("appointmentsData DATA:", appointmentsData);

  if (isLoadingBarbershop || isLoadingAppointments) {
    return <p>Loading...</p>;
  }

  if (barbershopError || appointmentsError) {
    return <p>Error loading appointments</p>;
  }

  if (!appointmentsData || appointmentsData.length === 0) {
    return <p>No appointments found</p>;
  }

  return (
    <div className="flex flex-col gap-6 p-4">
      <span className="text-white text-center font-bold text-lg">
        Appointments
      </span>
      <div className="grid grid-cols-3">
        {appointmentsData.map((appointment) => {
          const services = appointment.appointmentservice;

          return (
            <AppointmentsCard
              key={appointment.id}
              id={appointment.id}
              name={appointment.barbershop?.name || ""}
              service={
                services?.length && services.length > 0
                  ? services.map((s) => s.service.name).join(", ")
                  : "Service not reported"
              }
              status={appointment.status}
              avatarUrl={appointment.barbershop?.image_url}
              date={appointment.date}
              startTime={appointment.startTime}
            />
          );
        })}
      </div>
    </div>
  );
}
