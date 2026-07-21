'use client';
import { useState } from 'react';
import * as bp from './bloodPressure.utils';
import * as utils from '@/features/calculators/utils';
import { useTranslation } from '@/core/i18n/useTranslation';

export default function BloodPressureCalculator() {
  const { tCalculators } = useTranslation();
  const t = tCalculators.bloodPressure;

  const [systolic, setSystolic] = useState<string>('');
  const [diastolic, setDiastolic] = useState<string>('');
  const [result, setResult] = useState<bp.BloodPressureResult | null>(null);

  function handleCalculate(e: React.FormEvent) {
    e.preventDefault();
    const sys = utils.parseNumber(systolic);
    const dia = utils.parseNumber(diastolic);
    if (!sys || !dia) {
      setResult(null);
      return;
    }
    setResult(bp.classifyBloodPressure(sys, dia));
  }

  return (
    <div>
      <form onSubmit={handleCalculate}>
        <div className='calculator-inputs'>
          <div className='calculator-input-group'>
            <label className='calculator-label' htmlFor="bp-systolic">
              {t.bpSystolicLabel}
            </label>
            <input
              id="bp-systolic"
              type="number"
              step="1"
              min="0"
              value={systolic}
              onChange={(e) => setSystolic(e.target.value)}
              placeholder="120"
              className='calculator-input'
            />
          </div>
          <div className='calculator-input-group'>
            <label className='calculator-label' htmlFor="bp-diastolic">
              {t.bpDiastolicLabel}
            </label>
            <input
              id="bp-diastolic"
              type="number"
              step="1"
              min="0"
              value={diastolic}
              onChange={(e) => setDiastolic(e.target.value)}
              placeholder="80"
              className='calculator-input'
            />
          </div>
        </div>
        <div className='calculator-actions'>
          <button type="submit" className='button'>
            {t.bpCalculateButton}
          </button>
        </div>
      </form>
      {result && (
        <div className='calculator-result-card'>
          <h3>{t.bpResultTitle}</h3>
          <p>{result.systolic} / {result.diastolic} mmHg</p>
          <p className='calculator-result-highlight'>{t[result.description as keyof typeof t]}</p>
        </div>
      )}
    </div>
  );
}
