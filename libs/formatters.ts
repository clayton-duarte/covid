export function formatDate(date: Date = new Date()): string {
  return date.toJSON().slice(0, 10).split("-").join("/");
}

export function formatNumber(number: number): string {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function roundNumber(number: number): string {
  return formatNumber(Math.round(number));
}

export function formatPercent(value: number, total: number = 100): string {
  return `${((value / total) * 100).toFixed(0)}%`;
}

export function arrayToPath(arr: string[]): string {
  return arr.map((a) => a.toLowerCase()).join("/");
}
