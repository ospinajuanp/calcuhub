'use client';
import { useState } from 'react';
import * as operator from './dateDiff.utils';
import { useTranslation } from '@/core/i18n/useTranslation';

export default function DateDiffCalculator() {
  const { tCalculators } = useTranslation();
  const dd = tCalculators.dateDiff;

  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [result, setResult] = useState<operator.DateDiffResult | null>(null);

  function handleCalculate(event: React.FormEvent) {
    event.preventDefault();

    if (!startDate || !endDate) {
      return;
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return;
    }

    if (end < start) {
      return;
    }

    const dateDiffResult = operator.calculateDateDiff(start, end);
    setResult(dateDiffResult);
  }

  return (
    <div>
      <h2>{dd.dateDiffTitle}</h2>

      <form onSubmit={handleCalculate}>
        <div className='calculator-inputs'>
          <div className='calculator-input-group'>
            <label className='calculator-label' htmlFor="dd-start">
              {dd.dateDiffStartLabel}
            </label>
            <input
              id="dd-start"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className='calculator-input'
            />
          </div>

          <div className='calculator-input-group'>
            <label className='calculator-label' htmlFor="dd-end">
              {dd.dateDiffEndLabel}
            </label>
            <input
              id="dd-end"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className='calculator-input'
            />
          </div>
        </div>

        <div className='calculator-actions'>
          <button type="submit" className='button'>
            {dd.dateDiffCalculateButton}
          </button>
        </div>
      </form>

      {result && (
        <div className='calculator-result-card'>
          <h3>{dd.dateDiffResultTitle}</h3>
          <p>{dd.dateDiffDays}: {result.days}</p>
          <p>{dd.dateDiffWeeks}: {result.weeks}</p>
          <p>{dd.dateDiffMonths}: {result.months}</p>
          <p>{dd.dateDiffYears}: {result.years}</p>
        </div>
      )}
    </div>
  );
}
