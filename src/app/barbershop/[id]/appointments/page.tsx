"use client";

import { useGetAppointmentsByBarbershop } from "@/src/api/get-appointments";
import { useGetBarbershopByOwner } from "@/src/api/get-barbershop";
import { useAuth } from "@/src/context/auth-context";

export default function AppointmentPage() {
  const { user } = useAuth();

  const {
    data: barbershopData,
    isLoading: isLoadingBarbershop,
    error: barbershopError,
  } = useGetBarbershopByOwner(
    { ownerId: user?.id as string },
    { enabled: !!user?.id }
  );

  const {
    data: appointmentsData,
    isLoading: isLoadingAppointments,
    error: appointmentsError,
  } = useGetAppointmentsByBarbershop(
    { barbershopId: barbershopData?.id as string },
    { enabled: !!barbershopData?.id }
  );

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
    <div>
      {appointmentsData.map((appointment) => (
        <div key={appointment.id} className="p-4 border-b">
          <h3 className="text-lg font-semibold">
            Appointment ID: {appointment.id}
          </h3>
          <p>Barbershop: {appointment.barbershop?.name}</p>
          <p>Status: {appointment.status}</p>
        </div>
      ))}
    </div>
  );
}
