export const formatTimeWithMeridiem = (time?: string) => {
  if (!time) return "--";

  const [h, m] = time.split(":").map(Number);
  const isPM = h >= 12;
  const hour12 = h % 12 === 0 ? 12 : h % 12;

  return `${String(hour12).padStart(2, "0")}:${String(m).padStart(
    2,
    "0",
  )} ${isPM ? "PM" : "AM"}`;
};
