import { httpRequest } from "../config/axios/httpRequest";
import { Appointment } from "../config/entities/appointments/appointments.types";

import { generateReactQuery } from "../helpers/react-query";

export const GET_APPOINTMENT_BY_ID_KEY = "GET_APPOINTMENT_BY_ID_KEY";

export interface GetAppointmentByIdParams {
  appointmentId: string;
}

export const getAppointmentById = async ({
  appointmentId,
}: GetAppointmentByIdParams): Promise<Appointment> => {
  const path = `/api/appointment/${appointmentId}`;
  try {
    const response = await httpRequest.get(path);

    return response.data;
  } catch (error) {
    throw new Error("Error fetching appointment details: " + error);
  }
};

export const useGetAppointmentById = generateReactQuery<
  Appointment,
  GetAppointmentByIdParams
>(GET_APPOINTMENT_BY_ID_KEY, getAppointmentById);
