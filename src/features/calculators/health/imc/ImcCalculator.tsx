'use client';
import { useState } from 'react';
import * as operator from './imc.utils'
import { useTranslation } from '@/core/i18n/useTranslation';

export default function ImcCalculator() {
  const [weight, setWeight] = useState<string>('70');
  const [height, setHeight] = useState<string>('170');
  const [bmi, setBmi] = useState<number | null>(null);
  const [resultCalculate, setResultCalculate] = useState<string>('');

  const { tCalculators } = useTranslation();
  const imcTexts = tCalculators.imc;

  function handleCalculate(event: React.FormEvent) {
    event.preventDefault();

    const weightValue = parseFloat(weight);
    const heightValue = parseFloat(height);

    if (!weightValue || !heightValue || heightValue <= 0) {
      setBmi(null);
      setResultCalculate('Por favor ingresa valores válidos.');
      return;
    }

    
    const imcResult = operator.calculateImc(weightValue, heightValue);
    setBmi(imcResult);
    const key = operator.getImcCategoryKey(imcResult);
    setResultCalculate(imcTexts.categories[key]);
  }
 
  return (
    <div>
      <h2>{imcTexts.bmiTitle}</h2>

      <form onSubmit={handleCalculate} className='calculator-form'>
        <div className='calculator-inputs'>
          <div className='calculator-input-group'>
            <label className='calculator-label'>
              {imcTexts.bmiWeightLabel}
              <span> (kg)</span>
            </label>
            <input
              type="number"
              step="0.1"
              min="0"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="70"
              className='calculator-input'
            />
          </div>

          <div className='calculator-input-group'>
            <label className='calculator-label'>
              {imcTexts.bmiHeightLabel}
              <span> (cm)</span>
            </label>
            <input
              type="number"
              step="0.1"
              min="0"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              placeholder="175"
              className='calculator-input'
            />
          </div>
        </div>

        <div className='calculator-actions'>
          <button type="submit" className='button'>
          {imcTexts.bmiCalculateButton}
        </button>
        </div>
      </form>


      {bmi !== null && (
        <div className='calculator-result-card'>
          <h3>{imcTexts.bmiResultTitle}</h3>
          <p>
            {
              imcTexts.bmiYourBmiIs
                .replace('{{bmi}}', bmi.toString())
            }
          </p>
          <p>{resultCalculate}</p>
        </div>
      )}
    </div>
  );
}
