export interface Notification {
  id: string;
  message: string;
  type: string;
  createdAt: string;
  readAt?: string | null;
  userId: string;
}
