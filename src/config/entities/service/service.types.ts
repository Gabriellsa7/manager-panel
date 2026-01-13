export interface Service {
  id: string;
  name: string;
  description?: string | null;
  price: number;
  image_url?: string | null;
  durationMinutes: number;
  barbershopId: string;
}
