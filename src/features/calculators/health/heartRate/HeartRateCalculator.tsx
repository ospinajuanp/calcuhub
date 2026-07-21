'use client';
import { useState } from 'react';
import * as hr from './heartRate.utils';
import { useTranslation } from '@/core/i18n/useTranslation';

export default function HeartRateCalculator() {
  const { tCalculators } = useTranslation();
  const t = tCalculators.heartRate;

  const [age, setAge] = useState<string>('30');
  const [restingHr, setRestingHr] = useState<string>('70');
  const [result, setResult] = useState<hr.HeartRateZonesResult | null>(null);

  function handleCalculate(e: React.FormEvent) {
    e.preventDefault();
    const ageVal = parseInt(age);
    const restingHrVal = parseInt(restingHr);
    if (!ageVal || !restingHrVal || ageVal < 1 || restingHrVal < 1) {
      setResult(null);
      return;
    }
    setResult(hr.calculateHeartRateZones(ageVal, restingHrVal));
  }

  return (
    <div>
      <form onSubmit={handleCalculate}>
        <div className='calculator-inputs'>
          <div className='calculator-input-group'>
            <label className='calculator-label' htmlFor="hr-age">
              {t.hrAgeLabel}
            </label>
            <input
              id="hr-age"
              type="number"
              step="1"
              min="1"
              max="120"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="30"
              className='calculator-input'
            />
          </div>
          <div className='calculator-input-group'>
            <label className='calculator-label' htmlFor="hr-resting">
              {t.hrRestingLabel}
            </label>
            <input
              id="hr-resting"
              type="number"
              step="1"
              min="30"
              max="120"
              value={restingHr}
              onChange={(e) => setRestingHr(e.target.value)}
              placeholder="70"
              className='calculator-input'
            />
          </div>
        </div>
        <div className='calculator-actions'>
          <button type="submit" className='button'>
            {t.hrCalculateButton}
          </button>
        </div>
      </form>
      {result && (
        <div className='calculator-result-card'>
          <h3>{t.hrResultTitle}</h3>
          <p>{t.hrMaxHr}: {result.maxHr} bpm</p>
          {result.zones.map((zone, index) => (
            <p key={index}>
              {t[`${zone.name}Name` as keyof typeof t]}: {zone.min} - {zone.max} bpm
            </p>
          ))}
        </div>
      )}
    </div>
  );
}
