export interface HeartRateZonesResult {
  zones: { name: string; min: number; max: number }[];
  maxHr: number;
  restingHr: number;
}

export function calculateHeartRateZones(
  age: number,
  restingHr: number
): HeartRateZonesResult {
  const maxHr = 220 - age;
  const hrr = maxHr - restingHr;

  const zones = [
    { name: 'zone1', min: Math.round(restingHr), max: Math.round(restingHr + hrr * 0.5) },
    { name: 'zone2', min: Math.round(restingHr + hrr * 0.5), max: Math.round(restingHr + hrr * 0.6) },
    { name: 'zone3', min: Math.round(restingHr + hrr * 0.6), max: Math.round(restingHr + hrr * 0.7) },
    { name: 'zone4', min: Math.round(restingHr + hrr * 0.7), max: Math.round(restingHr + hrr * 0.8) },
    { name: 'zone5', min: Math.round(restingHr + hrr * 0.8), max: maxHr },
  ];

  return { zones, maxHr, restingHr };
}
