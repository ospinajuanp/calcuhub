export type UnitCategory = 'length' | 'weight' | 'temperature';

export interface UnitConversionResult {
  value: number;
  unit: string;
}

const CONVERSIONS: Record<string, Record<string, number>> = {
  length: {
    m: 1,
    cm: 100,
    mm: 1000,
    km: 0.001,
    in: 39.3701,
    ft: 3.28084,
    yd: 1.09361,
    mi: 0.000621371,
  },
  weight: {
    kg: 1,
    g: 1000,
    mg: 1000000,
    lb: 2.20462,
    oz: 35.274,
  },
  temperature: {
    celsius: 1,
    fahrenheit: 1,
    kelvin: 1,
  },
};

export function convertUnits(
  value: number,
  fromUnit: string,
  toUnit: string,
  category: UnitCategory
): number {
  if (category === 'temperature') {
    return convertTemperature(value, fromUnit, toUnit);
  }

  const conversions = CONVERSIONS[category];
  const fromFactor = conversions[fromUnit] || 1;
  const toFactor = conversions[toUnit] || 1;

  const baseValue = value / fromFactor;
  return Math.round(baseValue * toFactor * 10000) / 10000;
}

function convertTemperature(value: number, from: string, to: string): number {
  let celsius: number;

  if (from === 'celsius') {
    celsius = value;
  } else if (from === 'fahrenheit') {
    celsius = (value - 32) * 5 / 9;
  } else {
    celsius = value - 273.15;
  }

  if (to === 'celsius') {
    return Math.round(celsius * 100) / 100;
  } else if (to === 'fahrenheit') {
    return Math.round((celsius * 9 / 5 + 32) * 100) / 100;
  } else {
    return Math.round((celsius + 273.15) * 100) / 100;
  }
}

export function getUnitsByCategory(category: UnitCategory): string[] {
  return Object.keys(CONVERSIONS[category]);
}
