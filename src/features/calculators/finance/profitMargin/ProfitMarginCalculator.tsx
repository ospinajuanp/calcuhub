'use client';
import { useState } from 'react';
import * as pm from './profitMargin.utils';
import * as utils from '@/features/calculators/utils';
import { useTranslation } from '@/core/i18n/useTranslation';

export default function ProfitMarginCalculator() {
  const { tCalculators } = useTranslation();
  const t = tCalculators.profitMargin;

  const [revenue, setRevenue] = useState<string>('');
  const [cogs, setCogs] = useState<string>('');
  const [expenses, setExpenses] = useState<string>('');
  const [result, setResult] = useState<pm.ProfitMarginResult | null>(null);

  function handleCalculate(e: React.FormEvent) {
    e.preventDefault();
    const revenueVal = utils.parseNumber(revenue);
    const cogsVal = utils.parseNumber(cogs);
    const expensesVal = utils.parseNumber(expenses);
    if (!revenueVal || !cogsVal || expensesVal === null) {
      setResult(null);
      return;
    }
    setResult(pm.calculateProfitMargin(revenueVal, cogsVal, expensesVal));
  }

  return (
    <div>
      <form onSubmit={handleCalculate}>
        <div className='calculator-inputs'>
          <div className='calculator-input-group'>
            <label className='calculator-label' htmlFor="pm-revenue">
              {t.pmRevenueLabel}
            </label>
            <input
              id="pm-revenue"
              type="number"
              step="0.01"
              min="0"
              value={revenue}
              onChange={(e) => setRevenue(e.target.value)}
              placeholder="100000"
              className='calculator-input'
            />
          </div>
          <div className='calculator-input-group'>
            <label className='calculator-label' htmlFor="pm-cogs">
              {t.pmCogsLabel}
            </label>
            <input
              id="pm-cogs"
              type="number"
              step="0.01"
              min="0"
              value={cogs}
              onChange={(e) => setCogs(e.target.value)}
              placeholder="60000"
              className='calculator-input'
            />
          </div>
          <div className='calculator-input-group'>
            <label className='calculator-label' htmlFor="pm-expenses">
              {t.pmExpensesLabel}
            </label>
            <input
              id="pm-expenses"
              type="number"
              step="0.01"
              min="0"
              value={expenses}
              onChange={(e) => setExpenses(e.target.value)}
              placeholder="20000"
              className='calculator-input'
            />
          </div>
        </div>
        <div className='calculator-actions'>
          <button type="submit" className='button'>
            {t.pmCalculateButton}
          </button>
        </div>
      </form>
      {result && (
        <div className='calculator-result-card'>
          <h3>{t.pmResultTitle}</h3>
          <p>{t.pmGrossMargin}: {result.grossMargin}%</p>
          <p>{t.pmGrossProfit}: {utils.formatNumber(result.grossProfit)}</p>
          <p>{t.pmNetMargin}: {result.netMargin}%</p>
          <p>{t.pmNetProfit}: {utils.formatNumber(result.netProfit)}</p>
        </div>
      )}
    </div>
  );
}
