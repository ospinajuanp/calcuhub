'use client';
import { useState } from 'react';
import * as inv from './investment.utils';
import * as utils from '@/features/calculators/utils';
import { useTranslation } from '@/core/i18n/useTranslation';

export default function InvestmentCalculator() {
  const { tCalculators } = useTranslation();
  const t = tCalculators.investment;

  const [initialAmount, setInitialAmount] = useState<string>('');
  const [monthlyContribution, setMonthlyContribution] = useState<string>('');
  const [annualRate, setAnnualRate] = useState<string>('');
  const [years, setYears] = useState<string>('');
  const [result, setResult] = useState<inv.InvestmentResult | null>(null);

  function handleCalculate(e: React.FormEvent) {
    e.preventDefault();
    const initial = utils.parseNumber(initialAmount);
    const monthly = utils.parseNumber(monthlyContribution);
    const rate = utils.parseNumber(annualRate);
    const y = parseInt(years);

    if (initial === null || monthly === null || rate === null || !y) {
      setResult(null);
      return;
    }

    setResult(inv.calculateInvestment(initial, monthly, rate, y));
  }

  return (
    <div>
      <form onSubmit={handleCalculate}>
        <div className='calculator-inputs'>
          <div className='calculator-input-group'>
            <label className='calculator-label' htmlFor="inv-initial">{t.invInitialAmountLabel}</label>
            <input id="inv-initial" type="number" step="0.01" min="0" value={initialAmount} onChange={(e) => setInitialAmount(e.target.value)} placeholder="10000" className='calculator-input' />
          </div>
          <div className='calculator-input-group'>
            <label className='calculator-label' htmlFor="inv-monthly">{t.invMonthlyContributionLabel}</label>
            <input id="inv-monthly" type="number" step="0.01" min="0" value={monthlyContribution} onChange={(e) => setMonthlyContribution(e.target.value)} placeholder="500" className='calculator-input' />
          </div>
          <div className='calculator-input-group'>
            <label className='calculator-label' htmlFor="inv-rate">{t.invAnnualRateLabel}</label>
            <input id="inv-rate" type="number" step="0.01" min="0" value={annualRate} onChange={(e) => setAnnualRate(e.target.value)} placeholder="8" className='calculator-input' />
          </div>
          <div className='calculator-input-group'>
            <label className='calculator-label' htmlFor="inv-years">{t.invYearsLabel}</label>
            <input id="inv-years" type="number" step="1" min="1" value={years} onChange={(e) => setYears(e.target.value)} placeholder="10" className='calculator-input' />
          </div>
        </div>
        <div className='calculator-actions'>
          <button type="submit" className='button'>{t.invCalculateButton}</button>
        </div>
      </form>
      {result && (
        <div className='calculator-result-card'>
          <h3>{t.invResultTitle}</h3>
          <h4>{t.invLumpSumTitle}</h4>
          <p>{t.invFinalValue}: {utils.formatNumber(result.lumpSumFinal)}</p>
          <p>{t.invTotalContributed}: {utils.formatNumber(result.lumpSumTotalContributed)}</p>
          <p>{t.invInterestEarned}: {utils.formatNumber(result.lumpSumInterest)}</p>
          <h4>{t.invSipTitle}</h4>
          <p>{t.invFinalValue}: {utils.formatNumber(result.sipFinal)}</p>
          <p>{t.invTotalContributed}: {utils.formatNumber(result.sipTotalContributed)}</p>
          <p>{t.invInterestEarned}: {utils.formatNumber(result.sipInterest)}</p>
          <h4>{t.invDifference}: {utils.formatNumber(result.difference)}</h4>
        </div>
      )}
    </div>
  );
}
