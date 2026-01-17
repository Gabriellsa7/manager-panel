import { AppointmentStatus } from "../config/entities/appointments/appointments.types";

export const statusBgMap: Record<AppointmentStatus, string> = {
  PENDING: "bg-yellow-500/50",
  CONFIRMED: "bg-green-500/50",
  DONE: "bg-blue-500/50",
  CANCELLED: "bg-red-500/50",
};
