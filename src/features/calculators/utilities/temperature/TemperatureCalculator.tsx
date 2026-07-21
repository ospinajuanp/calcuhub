'use client';
import { useState } from 'react';
import * as temp from './temperature.utils';
import { useTranslation } from '@/core/i18n/useTranslation';

const UNITS = [
  { value: 'celsius', label: 'Celsius' },
  { value: 'fahrenheit', label: 'Fahrenheit' },
  { value: 'kelvin', label: 'Kelvin' },
  { value: 'rankine', label: 'Rankine' },
];

export default function TemperatureCalculator() {
  const { tCalculators } = useTranslation();
  const t = tCalculators.temperature;

  const [value, setValue] = useState<string>('0');
  const [fromUnit, setFromUnit] = useState<string>('celsius');
  const [result, setResult] = useState<temp.TemperatureResult | null>(null);

  function handleCalculate(e: React.FormEvent) {
    e.preventDefault();
    const val = parseFloat(value);
    if (isNaN(val)) {
      setResult(null);
      return;
    }
    setResult(temp.convertTemperature(val, fromUnit as temp.TemperatureUnit));
  }

  return (
    <div>
      <form onSubmit={handleCalculate}>
        <div className='calculator-inputs'>
          <div className='calculator-input-group'>
            <label className='calculator-label' htmlFor="temp-value">
              {t.tempValueLabel}
            </label>
            <input
              id="temp-value"
              type="number"
              step="0.01"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="0"
              className='calculator-input'
            />
          </div>
          <div className='calculator-input-group'>
            <label className='calculator-label' htmlFor="temp-from">
              {t.tempFromLabel}
            </label>
            <select
              id="temp-from"
              className='calculator-input'
              value={fromUnit}
              onChange={(e) => setFromUnit(e.target.value)}
            >
              {UNITS.map((unit) => (
                <option key={unit.value} value={unit.value}>
                  {unit.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className='calculator-actions'>
          <button type="submit" className='button'>
            {t.tempCalculateButton}
          </button>
        </div>
      </form>
      {result && (
        <div className='calculator-result-card'>
          <h3>{t.tempResultTitle}</h3>
          <p>Celsius: {result.celsius}°C</p>
          <p>Fahrenheit: {result.fahrenheit}°F</p>
          <p>Kelvin: {result.kelvin}K</p>
          <p>Rankine: {result.rankine}°R</p>
        </div>
      )}
    </div>
  );
}
