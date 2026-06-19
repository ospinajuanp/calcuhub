'use client';
import { useState } from 'react';
import * as operator from './mortgage.utils';
import * as operatorUtils from '@/features/calculators/utils';
import { useTranslation } from '@/core/i18n/useTranslation';

export default function MortgageCalculator() {
  const { tCalculators } = useTranslation();
  const mt = tCalculators.mortgage;

  const [principal, setPrincipal] = useState<string>('200000');
  const [annualRate, setAnnualRate] = useState<string>('5');
  const [years, setYears] = useState<string>('30');
  const [result, setResult] = useState<operator.MortgageResult | null>(null);

  function handleCalculate(event: React.FormEvent) {
    event.preventDefault();

    const principalValue = operatorUtils.parseNumber(principal);
    const annualRateValue = operatorUtils.parseNumber(annualRate);
    const yearsValue = operatorUtils.parseNumber(years);

    if (!principalValue || !annualRateValue || !yearsValue || yearsValue <= 0) {
      setResult(null);
      return;
    }

    const mortgageResult = operator.calculateMortgage(principalValue, annualRateValue, yearsValue);
    setResult(mortgageResult);
  }

  return (
    <div>
      <h2>{mt.mortgageTitle}</h2>

      <form onSubmit={handleCalculate}>
        <div className='calculator-inputs'>
          <div className='calculator-input-group'>
            <label className='calculator-label' htmlFor="mt-principal">
              {mt.mortgagePrincipal}
            </label>
            <input
              id="mt-principal"
              type="number"
              step="1000"
              min="0"
              value={principal}
              onChange={(e) => setPrincipal(e.target.value)}
              placeholder="200000"
              className='calculator-input'
            />
          </div>

          <div className='calculator-input-group'>
            <label className='calculator-label' htmlFor="mt-rate">
              {mt.mortgageRate}
            </label>
            <input
              id="mt-rate"
              type="number"
              step="0.1"
              min="0"
              value={annualRate}
              onChange={(e) => setAnnualRate(e.target.value)}
              placeholder="5"
              className='calculator-input'
            />
          </div>

          <div className='calculator-input-group'>
            <label className='calculator-label' htmlFor="mt-years">
              {mt.mortgageYears}
            </label>
            <input
              id="mt-years"
              type="number"
              step="1"
              min="0"
              value={years}
              onChange={(e) => setYears(e.target.value)}
              placeholder="30"
              className='calculator-input'
            />
          </div>
        </div>

        <div className='calculator-actions'>
          <button type="submit" className='button'>
            {mt.mortgageCalculateButton}
          </button>
        </div>
      </form>

      {result && (
        <div className='calculator-result-card'>
          <h3>{mt.mortgageResultTitle}</h3>
          <p>{mt.mortgageMonthlyPayment}: {result.monthlyPayment.toLocaleString()}</p>
          <p>{mt.mortgageTotalPayment}: {result.totalPayment.toLocaleString()}</p>
          <p>{mt.mortgageTotalInterest}: {result.totalInterest.toLocaleString()}</p>
        </div>
      )}
    </div>
  );
}
