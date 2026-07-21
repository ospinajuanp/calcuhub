export type TemperatureUnit = 'celsius' | 'fahrenheit' | 'kelvin' | 'rankine';

export interface TemperatureResult {
  celsius: number;
  fahrenheit: number;
  kelvin: number;
  rankine: number;
}

export function convertTemperature(
  value: number,
  fromUnit: TemperatureUnit
): TemperatureResult {
  let celsius: number;

  switch (fromUnit) {
    case 'celsius':
      celsius = value;
      break;
    case 'fahrenheit':
      celsius = (value - 32) * (5 / 9);
      break;
    case 'kelvin':
      celsius = value - 273.15;
      break;
    case 'rankine':
      celsius = (value - 491.67) * (5 / 9);
      break;
  }

  const fahrenheit = celsius * (9 / 5) + 32;
  const kelvin = celsius + 273.15;
  const rankine = (celsius + 273.15) * (9 / 5);

  return {
    celsius: Math.round(celsius * 100) / 100,
    fahrenheit: Math.round(fahrenheit * 100) / 100,
    kelvin: Math.round(kelvin * 100) / 100,
    rankine: Math.round(rankine * 100) / 100,
  };
}
