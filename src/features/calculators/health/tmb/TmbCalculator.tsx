'use client';
import { useState } from 'react';
import * as operator from './tmb.utils'
import { useTranslation } from '@/core/i18n/useTranslation';

export default function TmbCalculator() {
  const [weight, setWeight] = useState<string>('70');
  const [height, setHeight] = useState<string>('170');
  const [age, setAge] = useState<string>('30'); 
  const [gender, setGender] = useState<string>('male');
  const [tmb, setTmb] = useState<number | null>(null);
  const { tCalculators } = useTranslation();
  const tmbTexts = tCalculators.tmb;

  function handleCalculate(event: React.FormEvent) {
    event.preventDefault();

    const weightValue = parseFloat(weight);
    const heightValue = parseFloat(height);
    const ageValue = parseInt(age, 10);

    if (!weightValue || !heightValue || !ageValue || heightValue <= 0 || ageValue <= 0) {
      setTmb(null);
      return;
    }

    const tmbResult = operator.calculateTmb(weightValue, heightValue, ageValue, gender )
    setTmb(tmbResult);
  }

  return (
    <div>
      <h2>{tmbTexts.tmbTitle}</h2>
      
      <form onSubmit={handleCalculate}>
        <div className='calculator-form'>
          <div className='calculator-inputs'>
            <div className='calculator-input-group'>
              <label className='calculator-label'>
                {tmbTexts.tmbWeightLabel} (kg)
              </label>
              <input
                type="number"
                step="0.1"
                min="0"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className='calculator-input'
              />
            </div>

            <div className='calculator-input-group'>
              <label className='calculator-label'>
                {tmbTexts.tmbHeightLabel} (cm)
              </label>
              <input
                type="number"
                step="0.1"
                min="0"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                className='calculator-input'
              />
            </div>

            <div className='calculator-input-group'>
              <label className='calculator-label'>
                {tmbTexts.tmbAgeLabel}
              </label>
              <input
                type="number"
                step="1"
                min="0"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className='calculator-input'
              />
            </div>
            
            <div className='calculator-input-group'>
              <label className='calculator-label'>
                {tmbTexts.tmbGenderLabel}
              </label>
              <select className='calculator-input'
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="male">{tmbTexts.tmbMaleOption}</option>
                <option value="female">{tmbTexts.tmbFemaleOption}</option>
              </select>
            </div>

            <div className='calculator-actions'>
              <button type="submit" className='button'>
                {tmbTexts.tmbCalculateButton}
              </button>
            </div>

          </div>

        </div>

      </form>

      {tmb !== null && (
        <div className='calculator-result-card'>
          <h3>{tmbTexts.tmbResultTitle}</h3>
          <p>
            {
              tmbTexts.tmbYourTmbIs
                .replace('{{tmb}}', operator.formatTmbResult(tmb))
            }
          </p>
        </div>
      )}


    </div>
  );
}