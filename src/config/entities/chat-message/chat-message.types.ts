import { User } from "../user/user.types";

export interface ChatMessage {
  id: string;
  message: string;
  timestamp: string;
  readAt?: string | null;
  senderId: string;
  receiverId: string;

  sender?: User;
  receiver?: User;
}
