'use client';
import { useState } from 'react';
import * as roi from './roi.utils';
import * as utils from '@/features/calculators/utils';
import { useTranslation } from '@/core/i18n/useTranslation';

export default function RoiCalculator() {
  const { tCalculators } = useTranslation();
  const t = tCalculators.roi;

  const [initialInvestment, setInitialInvestment] = useState<string>('');
  const [finalValue, setFinalValue] = useState<string>('');
  const [result, setResult] = useState<roi.RoiResult | null>(null);

  function handleCalculate(e: React.FormEvent) {
    e.preventDefault();
    const initial = utils.parseNumber(initialInvestment);
    const final = utils.parseNumber(finalValue);
    if (!initial || !final) {
      setResult(null);
      return;
    }
    setResult(roi.calculateRoi(initial, final));
  }

  return (
    <div>
      <form onSubmit={handleCalculate}>
        <div className='calculator-inputs'>
          <div className='calculator-input-group'>
            <label className='calculator-label' htmlFor="roi-initial">
              {t.roiInvestmentLabel}
            </label>
            <input
              id="roi-initial"
              type="number"
              step="0.01"
              min="0"
              value={initialInvestment}
              onChange={(e) => setInitialInvestment(e.target.value)}
              placeholder="10000"
              className='calculator-input'
            />
          </div>
          <div className='calculator-input-group'>
            <label className='calculator-label' htmlFor="roi-final">
              {t.roiFinalValueLabel}
            </label>
            <input
              id="roi-final"
              type="number"
              step="0.01"
              min="0"
              value={finalValue}
              onChange={(e) => setFinalValue(e.target.value)}
              placeholder="15000"
              className='calculator-input'
            />
          </div>
        </div>
        <div className='calculator-actions'>
          <button type="submit" className='button'>
            {t.roiCalculateButton}
          </button>
        </div>
      </form>
      {result && (
        <div className='calculator-result-card'>
          <h3>{t.roiResultTitle}</h3>
          <p>{t.roiValue}: {result.roi}%</p>
          <p>{t.roiNetProfit}: {utils.formatNumber(result.netProfit)}</p>
          <p>{t.roiTotalReturn}: {utils.formatNumber(result.totalReturn)}</p>
        </div>
      )}
    </div>
  );
}
