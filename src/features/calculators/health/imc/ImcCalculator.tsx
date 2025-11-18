'use client';
import { useState } from 'react';
import * as operator from './imc.utils'
import { useTranslation } from '@/core/i18n/useTranslation';

export default function ImcCalculator() {
  const [weight, setWeight] = useState<string>('');
  const [height, setHeight] = useState<string>('');
  const [bmi, setBmi] = useState<number | null>(null);
  const [category, setCategory] = useState<string>('');

  const { tCalculators } = useTranslation();
  const imcTexts = tCalculators.imc;

  function handleCalculate(event: React.FormEvent) {
    event.preventDefault();

    const weightValue = parseFloat(weight);
    const heightValue = parseFloat(height);

    if (!weightValue || !heightValue || heightValue <= 0) {
      setBmi(null);
      setCategory('Por favor ingresa valores válidos.');
      return;
    }

    
    const imcResult = operator.calculateImc(weightValue, heightValue);
    setBmi(imcResult);
    const key = operator.getImcCategoryKey(imcResult);
    setCategory(imcTexts.categories[key]);
  }
 
  return (
    <div>
      <h2>{imcTexts.bmiTitle}</h2>

      <form onSubmit={handleCalculate}>
        <div className='calculator-form-grid'>
          <label>
            {imcTexts.bmiWeightLabel}
            <span> (kg)</span>
          </label>
          <input
            type="number"
            step="0.1"
            min="0"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="Ej: 70"
          />
        </div>

        <div>
          <label>
            {imcTexts.bmiHeightLabel}
            <span> (cm)</span>
          </label>
          <input
            type="number"
            step="0.1"
            min="0"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            placeholder="Ej: 175"
          />
        </div>

        <div className='calculator-actions'>
          <button type="submit" className='button'>
          {imcTexts.bmiCalculateButton}
        </button>
        </div>
      </form>


      {bmi !== null && (
        <div>
          <h3>{imcTexts.bmiResultTitle}</h3>
          <p>
            {
              imcTexts.bmiYourBmiIs
                .replace('{{bmi}}', bmi.toString())
            }
          </p>
          <p>{category}</p>
        </div>
      )}
    </div>
  );
}
