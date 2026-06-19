export interface DateDiffResult {
  days: number;
  weeks: number;
  months: number;
  years: number;
}

export function calculateDateDiff(startDate: Date, endDate: Date): DateDiffResult {
  const diffTime = endDate.getTime() - startDate.getTime();
  const days = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  return {
    days,
    weeks,
    months,
    years,
  };
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
