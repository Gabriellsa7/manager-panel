export function getMonthName(date: string | Date) {
  const d = new Date(date);

  return d.toLocaleDateString("pt-BR", {
    month: "long",
  });
}
