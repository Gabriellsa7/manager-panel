import { httpRequest } from "../config/axios/httpRequest";
import { Appointment } from "../config/entities/appointments/appointments.types";
import { generateReactQuery } from "../helpers/react-query";

export const GET_APPOINTMENTS_BY_BARBERSHOP_QUERY_KEY =
  "GET_APPOINTMENTS_BY_BARBERSHOP_QUERY_KEY";

interface GetAppointmentsByBarbershopParams {
  barbershopId: string;
}

export const getAppointmentsByBarbershop = async ({
  barbershopId,
}: GetAppointmentsByBarbershopParams): Promise<Appointment[]> => {
  const path = `/api/appointment/barbershop/${barbershopId}`;

  try {
    const response = await httpRequest.get<Appointment[]>(path);
    return response.data;
  } catch (error) {
    console.error("Error fetching appointments:", error);
    throw error;
  }
};

export const useGetAppointmentsByBarbershop = generateReactQuery<
  Appointment[],
  GetAppointmentsByBarbershopParams
>(GET_APPOINTMENTS_BY_BARBERSHOP_QUERY_KEY, getAppointmentsByBarbershop);
