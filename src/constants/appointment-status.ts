import {
  IoCheckmarkCircle,
  IoCloseCircle,
  IoTime,
  IoHourglass,
} from "react-icons/io5";
import { IconType } from "react-icons";
import { AppointmentStatus } from "@/src/config/entities/appointments/appointments.types";

export const APPOINTMENT_STATUS: Record<
  AppointmentStatus,
  {
    label: string;
    icon: IconType;
    color: string;
  }
> = {
  PENDING: {
    label: "Pending",
    icon: IoHourglass,
    color: "text-yellow-500",
  },
  CONFIRMED: {
    label: "Confirmed",
    icon: IoCheckmarkCircle,
    color: "text-green-500",
  },
  DONE: {
    label: "Done",
    icon: IoTime,
    color: "text-blue-500",
  },
  CANCELLED: {
    label: "Cancelled",
    icon: IoCloseCircle,
    color: "text-red-500",
  },
};
