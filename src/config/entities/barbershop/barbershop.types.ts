import { Appointment } from "../appointments/appointments.types";
import { Review } from "../review/review.types";
import { Service } from "../service/service.types";

export interface Barbershop {
  id: string;
  name: string;
  description?: string | null;
  address: string;
  latitude?: number | null;
  longitude?: number | null;
  ownerId: string;
  image_url?: string | null;
  createdAt: string;
  updatedAt: string;

  appointment?: Appointment[];
  service?: Service[];
  openinghours?: OpeningHours[];
  closedday?: ClosedDay[];
  review?: Review[];
}

export interface OpeningHours {
  id: string;
  dayOfWeek: number;
  openTime: string;
  closeTime: string;
  lunchStart?: string | null;
  lunchEnd?: string | null;
  barbershopId: string;
}

export interface ClosedDay {
  id: string;
  date: string;
  reason?: string | null;
  barbershopId: string;
}
