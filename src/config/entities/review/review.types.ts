import { User } from "../user/user.types";

export interface Review {
  id: string;
  rating: number;
  comment?: string | null;
  createdAt: string;
  clientId: string;
  barbershopId: string;

  user?: User;
}
