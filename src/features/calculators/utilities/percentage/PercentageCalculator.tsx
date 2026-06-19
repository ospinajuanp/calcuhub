'use client';
import { useState } from 'react';
import * as operator from './percentage.utils';
import * as operatorUtils from '@/features/calculators/utils';
import { useTranslation } from '@/core/i18n/useTranslation';

type PercentageMode = 'of' | 'what' | 'increase';

export default function PercentageCalculator() {
  const { tCalculators } = useTranslation();
  const pc = tCalculators.percentage;

  const [mode, setMode] = useState<PercentageMode>('of');
  const [value1, setValue1] = useState<string>('100');
  const [value2, setValue2] = useState<string>('15');
  const [result, setResult] = useState<number | null>(null);

  function handleCalculate(event: React.FormEvent) {
    event.preventDefault();

    const val1 = operatorUtils.parseNumber(value1);
    const val2 = operatorUtils.parseNumber(value2);

    if (!val1 && val1 !== 0) {
      setResult(null);
      return;
    }

    let calcResult: number;

    switch (mode) {
      case 'of':
        calcResult = operator.calculatePercentageOf(val1, val2);
        break;
      case 'what':
        calcResult = operator.calculateWhatPercentage(val1, val2);
        break;
      case 'increase':
        calcResult = operator.calculatePercentageIncrease(val1, val2);
        break;
      default:
        calcResult = 0;
    }

    setResult(calcResult);
  }

  return (
    <div>
      <h2>{pc.percentageTitle}</h2>

      <form onSubmit={handleCalculate}>
        <div className='calculator-inputs'>
          <div className='calculator-input-group'>
            <label className='calculator-label' htmlFor="pc-mode">
              {pc.percentageModeLabel}
            </label>
            <select
              id="pc-mode"
              className='calculator-input'
              value={mode}
              onChange={(e) => {
                setMode(e.target.value as PercentageMode);
                setResult(null);
              }}
            >
              <option value="of">{pc.percentageModeOf}</option>
              <option value="what">{pc.percentageModeWhat}</option>
              <option value="increase">{pc.percentageModeIncrease}</option>
            </select>
          </div>

          <div className='calculator-input-group'>
            <label className='calculator-label' htmlFor="pc-value1">
              {mode === 'of' ? pc.percentageValue1Label :
               mode === 'what' ? pc.percentageTotalLabel :
               pc.percentageInitialLabel}
            </label>
            <input
              id="pc-value1"
              type="number"
              step="any"
              value={value1}
              onChange={(e) => setValue1(e.target.value)}
              className='calculator-input'
            />
          </div>

          <div className='calculator-input-group'>
            <label className='calculator-label' htmlFor="pc-value2">
              {mode === 'of' ? pc.percentageLabel :
               mode === 'what' ? pc.percentageValue2Label :
               pc.percentageFinalLabel}
            </label>
            <input
              id="pc-value2"
              type="number"
              step="any"
              value={value2}
              onChange={(e) => setValue2(e.target.value)}
              className='calculator-input'
            />
          </div>
        </div>

        <div className='calculator-actions'>
          <button type="submit" className='button'>
            {pc.percentageCalculateButton}
          </button>
        </div>
      </form>

      {result !== null && (
        <div className='calculator-result-card'>
          <h3>{pc.percentageResultTitle}</h3>
          <p>
            {mode === 'of' ? `${value2}% of ${value1} = ${result}` :
             mode === 'what' ? `${value1} is ${result}% of ${value2}` :
             `Increase from ${value1} to ${value2} = ${result}%`}
          </p>
        </div>
      )}
    </div>
  );
}
