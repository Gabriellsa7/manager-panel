export interface Payment {
  id: string;
  amount: number;
  status: PaymentStatus;
  method: string;
  transactionId?: string | null;
  createdAt: string;
  appointmentId: string;
}

export type PaymentStatus = "PENDING" | "PAID" | "FAILED";
