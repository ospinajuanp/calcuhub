export interface TimeResult {
  totalSeconds: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export interface DateDiffResult {
  days: number;
  workingDays: number;
  totalHours: number;
  totalMinutes: number;
}

export function addTime(hours: number, minutes: number, seconds: number): TimeResult {
  const totalSeconds = hours * 3600 + minutes * 60 + seconds;
  return {
    totalSeconds,
    hours: Math.floor(totalSeconds / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  };
}

export function subtractTime(h1: number, m1: number, s1: number, h2: number, m2: number, s2: number): TimeResult {
  const total1 = h1 * 3600 + m1 * 60 + s1;
  const total2 = h2 * 3600 + m2 * 60 + s2;
  const diff = Math.abs(total1 - total2);
  return {
    totalSeconds: diff,
    hours: Math.floor(diff / 3600),
    minutes: Math.floor((diff % 3600) / 60),
    seconds: diff % 60,
  };
}

export function convertTime(value: number, fromUnit: string, toUnit: string): number {
  const toSeconds: Record<string, number> = {
    seconds: 1,
    minutes: 60,
    hours: 3600,
    days: 86400,
  };
  const inSeconds = value * toSeconds[fromUnit];
  return inSeconds / toSeconds[toUnit];
}

export function dateDiffDays(start: Date, end: Date, excludeWeekends: boolean = false): DateDiffResult {
  const diffTime = Math.abs(end.getTime() - start.getTime());
  const days = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  const totalHours = days * 24;
  const totalMinutes = totalHours * 60;

  let workingDays = days;
  if (excludeWeekends) {
    let count = 0;
    const current = new Date(start);
    while (current <= end) {
      const day = current.getDay();
      if (day !== 0 && day !== 6) count++;
      current.setDate(current.getDate() + 1);
    }
    workingDays = count;
  }

  return { days, workingDays, totalHours, totalMinutes };
}
