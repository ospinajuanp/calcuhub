export interface SpeedResult {
  speed: number;
  distance: number;
  time: number;
}

export function calculateSpeed(distance: number, timeHours: number): number {
  if (timeHours === 0) return 0;
  return Math.round((distance / timeHours) * 100) / 100;
}

export function calculateDistance(speed: number, timeHours: number): number {
  return Math.round(speed * timeHours * 100) / 100;
}

export function calculateTime(distance: number, speed: number): number {
  if (speed === 0) return 0;
  return Math.round((distance / speed) * 100) / 100;
}

export function formatTime(hours: number): string {
  const h = Math.floor(hours);
  const m = Math.round((hours - h) * 60);
  return `${h}h ${m}m`;
}
