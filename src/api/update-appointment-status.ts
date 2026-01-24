import { httpRequest } from "../config/axios/httpRequest";
import { Appointment } from "../config/entities/appointments/appointments.types";
import { generateReactQueryMutation } from "../helpers/react-query";

interface UpdateAppointmentStatusParams {
  appointmentId: string;
  status: "CONFIRMED" | "CANCELLED" | "DONE";
}

export const UPDATE_APPOINTMENT_STATUS_QUERY_KEY =
  "UPDATE_APPOINTMENT_STATUS_QUERY_KEY";

export const updateAppointmentStatus = async ({
  appointmentId,
  status,
}: UpdateAppointmentStatusParams): Promise<Appointment> => {
  const response = await httpRequest.patch<Appointment>(
    `/appointment/${appointmentId}/status`,
    {
      status,
    },
  );

  return response.data;
};

export const useUpdateAppointmentStatus = generateReactQueryMutation<
  Appointment,
  UpdateAppointmentStatusParams
>(UPDATE_APPOINTMENT_STATUS_QUERY_KEY, updateAppointmentStatus);
