import { formatTimeWithMeridiem } from "../hooks/format-time-with-meridiem";

export function TimeField({
  value,
  onChange,
  fallback,
}: {
  value?: string;
  onChange: (value: string) => void;
  fallback: string;
}) {
  return (
    <label className="relative bg-zinc-800 rounded px-3 py-2 text-white flex items-center justify-between cursor-pointer">
      <span className="text-sm">
        {value
          ? formatTimeWithMeridiem(value)
          : formatTimeWithMeridiem(fallback)}
      </span>
      <span className="text-zinc-400 text-xs ml-2">▾</span>
      <input
        type="time"
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
        className="absolute inset-0 opacity-0 cursor-pointer"
      />
    </label>
  );
}
