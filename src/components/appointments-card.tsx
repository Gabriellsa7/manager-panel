import Image from "next/image";
import { getDay } from "../hooks/get-day";
import { getMonthName } from "../hooks/get-month-name";
import Link from "next/link";
import { AppointmentStatus } from "@/src/config/entities/appointments/appointments.types";
import { statusBgMap } from "../constants/status-bg-map";
import { statusTextMap } from "../constants/status-text-map";

interface AppointmentsCardProps {
  id: string;
  status: AppointmentStatus;
  service: string;
  name: string;
  avatarUrl?: string | null;
  date: Date | string;
  startTime?: string;
}

export default function AppointmentsCard({
  status,
  service,
  name,
  avatarUrl,
  date,
  startTime,
  id,
}: AppointmentsCardProps) {
  return (
    <Link href={`/appointments-details/${id}`}>
      <div className="bg-[#1E1E26] rounded-xl p-4 mb-4 flex items-center justify-between max-w-[420px]">
        {/* Left side */}
        <div className="flex flex-col gap-3">
          <div
            className={`rounded-full px-3 py-1 w-fit ${statusBgMap[status]}`}
          >
            <span className={`font-bold text-sm ${statusTextMap[status]}`}>
              {status}
            </span>
          </div>

          <h3 className="text-white font-bold text-xl">{service}</h3>

          <div className="flex items-center gap-2">
            <Image
              src={avatarUrl ?? "/boruto.jpeg"}
              alt={name}
              width={32}
              height={32}
              className="rounded-full"
            />
            <span className="text-white text-lg">{name}</span>
          </div>
        </div>

        <div className="w-px h-20 bg-[#2F2F3A] mx-4" />

        <div className="flex flex-col items-center gap-1 w-20">
          <span className="text-[#838896] text-sm">{getMonthName(date)}</span>

          <span className="text-white text-3xl font-bold">{getDay(date)}</span>

          {startTime && (
            <span className="text-[#838896] text-sm">{startTime}</span>
          )}
        </div>
      </div>
    </Link>
  );
}
