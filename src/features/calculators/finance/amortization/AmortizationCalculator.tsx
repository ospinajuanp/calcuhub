'use client';
import { useState } from 'react';
import * as amort from './amortization.utils';
import * as utils from '@/features/calculators/utils';
import { useTranslation } from '@/core/i18n/useTranslation';

export default function AmortizationCalculator() {
  const { tCalculators } = useTranslation();
  const t = tCalculators.amortization;

  const [principal, setPrincipal] = useState<string>('');
  const [rate, setRate] = useState<string>('');
  const [years, setYears] = useState<string>('');
  const [result, setResult] = useState<amort.AmortizationResult | null>(null);

  function handleCalculate(e: React.FormEvent) {
    e.preventDefault();
    const p = utils.parseNumber(principal);
    const r = utils.parseNumber(rate);
    const y = parseInt(years);

    if (!p || !r || !y || p <= 0 || r < 0 || y <= 0) {
      setResult(null);
      return;
    }

    setResult(amort.calculateAmortization(p, r, y));
  }

  return (
    <div>
      <form onSubmit={handleCalculate}>
        <div className='calculator-inputs'>
          <div className='calculator-input-group'>
            <label className='calculator-label' htmlFor="amort-principal">{t.amortPrincipalLabel}</label>
            <input id="amort-principal" type="number" step="0.01" min="0" value={principal} onChange={(e) => setPrincipal(e.target.value)} placeholder="200000" className='calculator-input' />
          </div>
          <div className='calculator-input-group'>
            <label className='calculator-label' htmlFor="amort-rate">{t.amortRateLabel}</label>
            <input id="amort-rate" type="number" step="0.01" min="0" value={rate} onChange={(e) => setRate(e.target.value)} placeholder="6.5" className='calculator-input' />
          </div>
          <div className='calculator-input-group'>
            <label className='calculator-label' htmlFor="amort-years">{t.amortYearsLabel}</label>
            <input id="amort-years" type="number" step="1" min="1" value={years} onChange={(e) => setYears(e.target.value)} placeholder="30" className='calculator-input' />
          </div>
        </div>
        <div className='calculator-actions'>
          <button type="submit" className='button'>{t.amortCalculateButton}</button>
        </div>
      </form>
      {result && (
        <div className='calculator-result-card'>
          <h3>{t.amortResultTitle}</h3>
          <p>{t.amortMonthlyPayment}: {utils.formatNumber(result.monthlyPayment)}</p>
          <p>{t.amortTotalPayment}: {utils.formatNumber(result.totalPayment)}</p>
          <p>{t.amortTotalInterest}: {utils.formatNumber(result.totalInterest)}</p>
          <div style={{ maxHeight: '200px', overflowY: 'auto', marginTop: '10px' }}>
            <table style={{ width: '100%', fontSize: '12px' }}>
              <thead>
                <tr>
                  <th>{t.amortMonthCol}</th>
                  <th>{t.amortPaymentCol}</th>
                  <th>{t.amortPrincipalCol}</th>
                  <th>{t.amortInterestCol}</th>
                  <th>{t.amortBalanceCol}</th>
                </tr>
              </thead>
              <tbody>
                {result.schedule.slice(0, 24).map((row) => (
                  <tr key={row.month}>
                    <td>{row.month}</td>
                    <td>{row.payment.toFixed(2)}</td>
                    <td>{row.principal.toFixed(2)}</td>
                    <td>{row.interest.toFixed(2)}</td>
                    <td>{row.balance.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
