"use client";

import { useSetOpeningHours } from "../api/set-opening-hours";
import { useState } from "react";
import { TimeField } from "./time-field";

type OpeningHour = {
  dayOfWeek: number;
  isOpen: boolean;
  hasLunchBreak: boolean;
  openTime?: string;
  closeTime?: string;
  lunchStart?: string;
  lunchEnd?: string;
};

const DAYS = [
  { label: "Monday", value: 1 },
  { label: "Tuesday", value: 2 },
  { label: "Wednesday", value: 3 },
  { label: "Thursday", value: 4 },
  { label: "Friday", value: 5 },
  { label: "Saturday", value: 6 },
  { label: "Sunday", value: 7 },
];

type Props = {
  barbershopId: string;
  onClose: () => void;
  onSuccess: () => void;
};

export default function OpeningHoursModal({
  barbershopId,
  onClose,
  onSuccess,
}: Props) {
  const [hours, setHours] = useState<OpeningHour[]>(
    DAYS.map((d) => ({
      dayOfWeek: d.value,
      isOpen: false,
      hasLunchBreak: false,
      openTime: undefined,
      closeTime: undefined,
      lunchStart: undefined,
      lunchEnd: undefined,
    })),
  );

  const { mutate, isPending } = useSetOpeningHours();

  const updateHour = <K extends keyof OpeningHour>(
    index: number,
    field: K,
    value: OpeningHour[K],
  ) => {
    const copy = [...hours];
    copy[index] = {
      ...copy[index],
      [field]: value,
    };

    // 🔥 Se fechar o dia, limpa tudo
    if (field === "isOpen" && value === true) {
      copy[index] = {
        ...copy[index],
        isOpen: true,
        openTime: copy[index].openTime ?? "08:00",
        closeTime: copy[index].closeTime ?? "18:00",
      };
    }

    // 🔥 Se desativar almoço, limpa almoço
    if (field === "hasLunchBreak" && value === false) {
      copy[index] = {
        ...copy[index],
        hasLunchBreak: false,
        lunchStart: undefined,
        lunchEnd: undefined,
      };
    }

    setHours(copy);
  };

  const handleSubmit = () => {
    const openDays = hours.filter((h) => h.isOpen);

    if (openDays.length === 0) {
      alert("Select at least one open day");
      return;
    }

    const payload = openDays.map((h) => ({
      dayOfWeek: h.dayOfWeek,
      openTime: h.openTime ?? "08:00",
      closeTime: h.closeTime ?? "18:00",
      ...(h.hasLunchBreak && h.lunchStart && h.lunchEnd
        ? {
            lunchStart: h.lunchStart,
            lunchEnd: h.lunchEnd,
          }
        : {}),
    }));

    mutate(
      {
        barbershopId,
        hours: payload,
      },
      {
        onSuccess: () => {
          onSuccess();
          onClose();
        },
      },
    );
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center">
      <div className="bg-zinc-900 w-full max-w-2xl rounded-xl p-6">
        <h2 className="text-xl font-bold text-white mb-4">Opening Hours</h2>

        <div className="flex flex-col gap-4 max-h-[60vh] overflow-y-auto pr-2">
          {DAYS.map((day, index) => {
            const dayData = hours[index];

            return (
              <div
                key={day.value}
                className="border border-zinc-700 rounded-lg p-4"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-white font-semibold">{day.label}</h3>

                  <label className="flex items-center gap-2 text-sm text-zinc-300">
                    <input
                      type="checkbox"
                      checked={dayData.isOpen}
                      onChange={(e) =>
                        updateHour(index, "isOpen", e.target.checked)
                      }
                    />
                    Open
                  </label>
                </div>

                {dayData.isOpen && (
                  <>
                    <label className="flex items-center gap-2 text-sm text-zinc-300 mb-2">
                      <input
                        type="checkbox"
                        checked={dayData.hasLunchBreak}
                        onChange={(e) =>
                          updateHour(index, "hasLunchBreak", e.target.checked)
                        }
                      />
                      Has lunch break
                    </label>

                    <div className="grid grid-cols-4 gap-2">
                      <TimeField
                        value={dayData.openTime}
                        fallback="08:00"
                        onChange={(v) => updateHour(index, "openTime", v)}
                      />

                      {dayData.hasLunchBreak && (
                        <>
                          <TimeField
                            value={dayData.lunchStart}
                            fallback="12:00"
                            onChange={(v) => updateHour(index, "lunchStart", v)}
                          />

                          <TimeField
                            value={dayData.lunchEnd}
                            fallback="13:00"
                            onChange={(v) => updateHour(index, "lunchEnd", v)}
                          />
                        </>
                      )}

                      <TimeField
                        value={dayData.closeTime}
                        fallback="18:00"
                        onChange={(v) => updateHour(index, "closeTime", v)}
                      />
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-zinc-700 text-white"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            disabled={isPending}
            className="px-4 py-2 rounded-lg bg-purple-600 text-white"
          >
            {isPending ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}
