'use client';
import { useState } from 'react';
import * as dd from './dueDate.utils';
import { useTranslation } from '@/core/i18n/useTranslation';

export default function DueDateCalculator() {
  const { tCalculators } = useTranslation();
  const t = tCalculators.dueDate;

  const [lastPeriod, setLastPeriod] = useState<string>('');
  const [cycleLength, setCycleLength] = useState<string>('28');
  const [result, setResult] = useState<dd.DueDateResult | null>(null);

  function handleCalculate(e: React.FormEvent) {
    e.preventDefault();
    const date = new Date(lastPeriod);
    if (isNaN(date.getTime())) {
      setResult(null);
      return;
    }
    const cycle = parseInt(cycleLength) || 28;
    setResult(dd.calculateDueDate(date, cycle));
  }

  function formatDate(date: Date): string {
    return date.toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });
  }

  return (
    <div>
      <form onSubmit={handleCalculate}>
        <div className='calculator-inputs'>
          <div className='calculator-input-group'>
            <label className='calculator-label' htmlFor="dd-last-period">{t.dueDateLastPeriodLabel}</label>
            <input id="dd-last-period" type="date" value={lastPeriod} onChange={(e) => setLastPeriod(e.target.value)} className='calculator-input' />
          </div>
          <div className='calculator-input-group'>
            <label className='calculator-label' htmlFor="dd-cycle">{t.dueDateCycleLabel}</label>
            <input id="dd-cycle" type="number" step="1" min="21" max="35" value={cycleLength} onChange={(e) => setCycleLength(e.target.value)} className='calculator-input' />
          </div>
        </div>
        <div className='calculator-actions'>
          <button type="submit" className='button'>{t.dueDateCalculateButton}</button>
        </div>
      </form>
      {result && (
        <div className='calculator-result-card'>
          <h3>{t.dueDateResultTitle}</h3>
          <p>{t.dueDateBabyDue}: {formatDate(result.dueDate)}</p>
          <p>{t.dueDateConception}: {formatDate(result.conceptionDate)}</p>
          <p>{t.dueDateWeeksRemaining}: {result.weeksRemaining}</p>
        </div>
      )}
    </div>
  );
}
