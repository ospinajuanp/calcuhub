'use client';
import { useState } from 'react';
import * as operator from './savings.utils';
import * as operatorUtils from '@/features/calculators/utils';
import { useTranslation } from '@/core/i18n/useTranslation';

export default function SavingsCalculator() {
  const { tCalculators } = useTranslation();
  const sv = tCalculators.savings;

  const [initialAmount, setInitialAmount] = useState<string>('1000');
  const [monthlyContribution, setMonthlyContribution] = useState<string>('100');
  const [annualRate, setAnnualRate] = useState<string>('5');
  const [years, setYears] = useState<string>('10');
  const [result, setResult] = useState<operator.SavingsResult | null>(null);

  function handleCalculate(event: React.FormEvent) {
    event.preventDefault();

    const initialValue = operatorUtils.parseNumber(initialAmount);
    const monthlyValue = operatorUtils.parseNumber(monthlyContribution);
    const rateValue = operatorUtils.parseNumber(annualRate);
    const yearsValue = operatorUtils.parseNumber(years);

    if (!initialValue || !monthlyValue || !rateValue || !yearsValue || yearsValue <= 0) {
      setResult(null);
      return;
    }

    const savingsResult = operator.calculateSavings(initialValue, monthlyValue, rateValue, yearsValue);
    setResult(savingsResult);
  }

  return (
    <div>
      <h2>{sv.savingsTitle}</h2>

      <form onSubmit={handleCalculate}>
        <div className='calculator-inputs'>
          <div className='calculator-input-group'>
            <label className='calculator-label' htmlFor="sv-initial">
              {sv.savingsInitial}
            </label>
            <input
              id="sv-initial"
              type="number"
              step="100"
              min="0"
              value={initialAmount}
              onChange={(e) => setInitialAmount(e.target.value)}
              className='calculator-input'
            />
          </div>

          <div className='calculator-input-group'>
            <label className='calculator-label' htmlFor="sv-monthly">
              {sv.savingsMonthly}
            </label>
            <input
              id="sv-monthly"
              type="number"
              step="10"
              min="0"
              value={monthlyContribution}
              onChange={(e) => setMonthlyContribution(e.target.value)}
              className='calculator-input'
            />
          </div>

          <div className='calculator-input-group'>
            <label className='calculator-label' htmlFor="sv-rate">
              {sv.savingsRate}
            </label>
            <input
              id="sv-rate"
              type="number"
              step="0.1"
              min="0"
              value={annualRate}
              onChange={(e) => setAnnualRate(e.target.value)}
              className='calculator-input'
            />
          </div>

          <div className='calculator-input-group'>
            <label className='calculator-label' htmlFor="sv-years">
              {sv.savingsYears}
            </label>
            <input
              id="sv-years"
              type="number"
              step="1"
              min="0"
              value={years}
              onChange={(e) => setYears(e.target.value)}
              className='calculator-input'
            />
          </div>
        </div>

        <div className='calculator-actions'>
          <button type="submit" className='button'>
            {sv.savingsCalculateButton}
          </button>
        </div>
      </form>

      {result && (
        <div className='calculator-result-card'>
          <h3>{sv.savingsResultTitle}</h3>
          <p>{sv.savingsFutureValue}: {result.futureValue.toLocaleString()}</p>
          <p>{sv.savingsContributions}: {result.totalContributions.toLocaleString()}</p>
          <p>{sv.savingsInterest}: {result.totalInterest.toLocaleString()}</p>
        </div>
      )}
    </div>
  );
}
