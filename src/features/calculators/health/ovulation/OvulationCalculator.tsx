'use client';
import { useState } from 'react';
import * as operator from './ovulation.utils';
import { useTranslation } from '@/core/i18n/useTranslation';

export default function OvulationCalculator() {
  const { tCalculators } = useTranslation();
  const ov = tCalculators.ovulation;

  const [lastPeriodStart, setLastPeriodStart] = useState<string>('');
  const [cycleLength, setCycleLength] = useState<string>('28');
  const [result, setResult] = useState<operator.OvulationResult | null>(null);

  function handleCalculate(event: React.FormEvent) {
    event.preventDefault();

    if (!lastPeriodStart) {
      return;
    }

    const date = new Date(lastPeriodStart);
    const cycle = parseInt(cycleLength, 10) || 28;

    if (isNaN(date.getTime())) {
      return;
    }

    const ovulationResult = operator.calculateOvulation(date, cycle);
    setResult(ovulationResult);
  }

  return (
    <div>
      <h2>{ov.ovulationTitle}</h2>

      <form onSubmit={handleCalculate}>
        <div className='calculator-inputs'>
          <div className='calculator-input-group'>
            <label className='calculator-label' htmlFor="ov-last-period">
              {ov.ovulationLastPeriod}
            </label>
            <input
              id="ov-last-period"
              type="date"
              value={lastPeriodStart}
              onChange={(e) => setLastPeriodStart(e.target.value)}
              className='calculator-input'
              max={new Date().toISOString().split('T')[0]}
            />
          </div>

          <div className='calculator-input-group'>
            <label className='calculator-label' htmlFor="ov-cycle">
              {ov.ovulationCycleLength}
            </label>
            <input
              id="ov-cycle"
              type="number"
              step="1"
              min="20"
              max="45"
              value={cycleLength}
              onChange={(e) => setCycleLength(e.target.value)}
              placeholder="28"
              className='calculator-input'
            />
          </div>
        </div>

        <div className='calculator-actions'>
          <button type="submit" className='button'>
            {ov.ovulationCalculateButton}
          </button>
        </div>
      </form>

      {result && (
        <div className='calculator-result-card'>
          <h3>{ov.ovulationResultTitle}</h3>
          <p>{ov.ovulationNextPeriod}: {operator.formatDate(result.nextPeriod)}</p>
          <p>{ov.ovulationFertileWindow}: {operator.formatDate(result.fertileStart)} - {operator.formatDate(result.fertileEnd)}</p>
          <p>{ov.ovulationDate}: {operator.formatDate(result.ovulationDate)}</p>
        </div>
      )}
    </div>
  );
}
