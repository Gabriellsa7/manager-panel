import { AppointmentStatus } from "../config/entities/appointments/appointments.types";

export const statusTextMap: Record<AppointmentStatus, string> = {
  PENDING: "text-yellow-300",
  CONFIRMED: "text-green-300",
  DONE: "text-blue-300",
  CANCELLED: "text-red-300",
};
