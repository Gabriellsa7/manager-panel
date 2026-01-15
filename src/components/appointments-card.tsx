import Image from "next/image";
import { getDay } from "../hooks/get-day";
import { getMonthName } from "../hooks/get-month-name";
import { normalizeImageUrl } from "../hooks/normalize-image-url";

interface AppointmentsCardProps {
  status: string;
  service: string;
  name: string;
  avatarUrl?: string | null;
  date: Date | string;
  startTime?: string;
  className?: string;
}

export default function AppointmentsCard({
  status,
  service,
  name,
  avatarUrl,
  date,
  startTime,
  className,
}: AppointmentsCardProps) {
  const imageUri = normalizeImageUrl(avatarUrl);

  return (
    <div
      className={`bg-[#1E1E26] rounded-xl p-4 mb-4 flex justify-between items-center ${
        className ?? ""
      }`}
    >
      {/* Left side */}
      <div className="flex flex-col gap-3">
        <div className="bg-[#251f42] rounded-full px-3 py-1 w-fit">
          <span className="text-[#8162FF] font-bold text-sm">{status}</span>
        </div>

        <h3 className="text-white font-bold text-xl">{service}</h3>

        <div className="flex items-center gap-2">
          <Image
            src={imageUri ?? "/boruto.jpeg"}
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
  );
}
