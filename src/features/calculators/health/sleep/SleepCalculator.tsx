'use client';
import { useState } from 'react';
import * as operator from './sleep.utils';
import * as operatorUtils from '@/features/calculators/utils';
import { useTranslation } from '@/core/i18n/useTranslation';

export default function SleepCalculator() {
  const { tCalculators } = useTranslation();
  const sl = tCalculators.sleep;

  const [age, setAge] = useState<string>('30');
  const [wakeUpTime, setWakeUpTime] = useState<string>('07:00');
  const [currentSleepHours, setCurrentSleepHours] = useState<string>('7');
  const [result, setResult] = useState<operator.SleepResult | null>(null);

  function handleCalculate(event: React.FormEvent) {
    event.preventDefault();

    const ageValue = operatorUtils.parseNumber(age);
    const sleepHoursValue = operatorUtils.parseNumber(currentSleepHours);

    if (!ageValue || !wakeUpTime || !sleepHoursValue) {
      setResult(null);
      return;
    }

    const sleepResult = operator.calculateSleep(ageValue, wakeUpTime, sleepHoursValue);
    setResult(sleepResult);
  }

  return (
    <div>
      <h2>{sl.sleepTitle}</h2>

      <form onSubmit={handleCalculate}>
        <div className='calculator-inputs'>
          <div className='calculator-input-group'>
            <label className='calculator-label' htmlFor="sleep-age">
              {sl.sleepAgeLabel}
            </label>
            <input
              id="sleep-age"
              type="number"
              step="1"
              min="1"
              max="120"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className='calculator-input'
            />
          </div>

          <div className='calculator-input-group'>
            <label className='calculator-label' htmlFor="sleep-wakeup">
              {sl.sleepWakeUpLabel}
            </label>
            <input
              id="sleep-wakeup"
              type="time"
              value={wakeUpTime}
              onChange={(e) => setWakeUpTime(e.target.value)}
              className='calculator-input'
            />
          </div>

          <div className='calculator-input-group'>
            <label className='calculator-label' htmlFor="sleep-hours">
              {sl.sleepHoursLabel}
            </label>
            <input
              id="sleep-hours"
              type="number"
              step="0.5"
              min="0"
              max="24"
              value={currentSleepHours}
              onChange={(e) => setCurrentSleepHours(e.target.value)}
              className='calculator-input'
            />
          </div>
        </div>

        <div className='calculator-actions'>
          <button type="submit" className='button'>
            {sl.sleepCalculateButton}
          </button>
        </div>
      </form>

      {result && (
        <div className='calculator-result-card'>
          <h3>{sl.sleepResultTitle}</h3>
          <p>{sl.sleepRecommended}: {result.recommendedHours}h</p>
          <p>{sl.sleepDebt}: {result.sleepDebt}h</p>
          <p>{sl.sleepOptimalBedtime}: {result.optimalBedtime}</p>
        </div>
      )}
    </div>
  );
}
