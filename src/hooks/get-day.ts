export function getDay(date: string | Date) {
  const d = new Date(date);
  return d.getDate().toString().padStart(2, "0");
}
