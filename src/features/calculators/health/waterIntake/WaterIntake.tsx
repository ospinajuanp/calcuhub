'use client';
import { useState } from 'react';
import * as operator from './waterIntake.utils'
import { useTranslation } from '@/core/i18n/useTranslation';

export default function WaterIntake() {
  const { tCalculators } = useTranslation();
  const [weight, setWeight] = useState<string>('70');
  const [gender, setGender] = useState<string>('male');
  const [intake, setIntake] = useState<Array<number> | null>(null);
  const waterIntakeTexts = tCalculators.waterIntake;
  
  function handleCalculate(event: React.FormEvent) {
    event.preventDefault();
    
    const weightValue = parseFloat(weight);

    alert(weightValue);

    if (!weightValue || weightValue <= 0) {
      setIntake(null);
      return;
    }

    const intakeResult = operator.calculateWaterIntake(weightValue, gender)
    setIntake(intakeResult);
  }


  return (
    <div>
      <h2>{waterIntakeTexts.waterIntakeTitle}</h2>
      
      <form onSubmit={handleCalculate}>
        <div className='calculator-form'>
          <div className='calculator-inputs'>
            <div className='calculator-input-group'>
              <label className='calculator-label'>
                {waterIntakeTexts.waterIntakeWeightLabel} (kg)
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
                {waterIntakeTexts.waterIntakeGenderLabel}
              </label>
              <select className='calculator-input' onChange={(e) => setGender(e.target.value)}>
                <option value="male">{waterIntakeTexts.waterIntakeMaleOption}</option>
                <option value="female">{waterIntakeTexts.waterIntakeFemaleOption}</option>
              </select>
            </div>
          </div>

          <div className='calculator-actions'>
            <button type="submit" className='button'>
              {waterIntakeTexts.waterIntakeCalculateButton}
            </button>
          </div>
        </div>
      </form>

      {intake && (
        <div className='calculator-result'>
          <h3>{waterIntakeTexts.waterIntakeResultTitle}</h3>
          <p>
            {
              waterIntakeTexts.waterIntakeYourIntakeIs
                .replace('{{min}}', operator.formatWaterIntakeResult(intake[0]))
                .replace('{{max}}', operator.formatWaterIntakeResult(intake[1]))
            
            }
          </p>
        </div>
      )}
    </div>
  );
}