import { Barbershop } from "../barbershop/barbershop.types";
import { Payment } from "../payment/payment.types";
import { User } from "../user/user.types";

export interface AppointmentService {
  appointmentId: string;
  serviceId: string;
  service: {
    id: string;
    name: string;
    price: number;
    durationMinutes: number;
    image_url: string;
  };
}

export interface Appointment {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
  status: AppointmentStatus;
  createdAt: string;
  clientId: string;
  barbershopId: string;

  user?: User;
  barbershop?: Barbershop;
  appointmentservice?: AppointmentService[];
  payment?: Payment | null;
}

export type AppointmentStatus = "PENDING" | "CONFIRMED" | "CANCELLED" | "DONE";
