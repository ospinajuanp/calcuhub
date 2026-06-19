'use client';
import { useState } from 'react';
import * as operator from './speed.utils';
import * as operatorUtils from '@/features/calculators/utils';
import { useTranslation } from '@/core/i18n/useTranslation';

type SpeedMode = 'speed' | 'distance' | 'time';

export default function SpeedCalculator() {
  const { tCalculators } = useTranslation();
  const sp = tCalculators.speed;

  const [mode, setMode] = useState<SpeedMode>('speed');
  const [distance, setDistance] = useState<string>('100');
  const [timeHours, setTimeHours] = useState<string>('2');
  const [speed, setSpeed] = useState<string>('50');
  const [result, setResult] = useState<string | null>(null);

  function handleCalculate(event: React.FormEvent) {
    event.preventDefault();

    let calcResult: string;

    switch (mode) {
      case 'speed': {
        const d = operatorUtils.parseNumber(distance);
        const t = operatorUtils.parseNumber(timeHours);
        if (!d && d !== 0 || !t) {
          setResult(null);
          return;
        }
        const speedVal = operator.calculateSpeed(d, t);
        calcResult = `${speedVal} km/h`;
        break;
      }
      case 'distance': {
        const s = operatorUtils.parseNumber(speed);
        const t = operatorUtils.parseNumber(timeHours);
        if (!s && s !== 0 || !t) {
          setResult(null);
          return;
        }
        const distVal = operator.calculateDistance(s, t);
        calcResult = `${distVal} km`;
        break;
      }
      case 'time': {
        const d = operatorUtils.parseNumber(distance);
        const s = operatorUtils.parseNumber(speed);
        if (!d && d !== 0 || !s && s !== 0) {
          setResult(null);
          return;
        }
        const timeVal = operator.calculateTime(d, s);
        calcResult = operator.formatTime(timeVal);
        break;
      }
      default:
        calcResult = '';
    }

    setResult(calcResult);
  }

  return (
    <div>
      <h2>{sp.speedTitle}</h2>

      <form onSubmit={handleCalculate}>
        <div className='calculator-inputs'>
          <div className='calculator-input-group'>
            <label className='calculator-label' htmlFor="sp-mode">
              {sp.speedModeLabel}
            </label>
            <select
              id="sp-mode"
              className='calculator-input'
              value={mode}
              onChange={(e) => {
                setMode(e.target.value as SpeedMode);
                setResult(null);
              }}
            >
              <option value="speed">{sp.speedModeCalcSpeed}</option>
              <option value="distance">{sp.speedModeCalcDistance}</option>
              <option value="time">{sp.speedModeCalcTime}</option>
            </select>
          </div>

          {mode !== 'time' && (
            <div className='calculator-input-group'>
              <label className='calculator-label' htmlFor="sp-time">
                {sp.speedTimeLabel} (hours)
              </label>
              <input
                id="sp-time"
                type="number"
                step="0.1"
                min="0"
                value={timeHours}
                onChange={(e) => setTimeHours(e.target.value)}
                className='calculator-input'
              />
            </div>
          )}

          {mode !== 'distance' && (
            <div className='calculator-input-group'>
              <label className='calculator-label' htmlFor="sp-speed">
                {sp.speedSpeedLabel} (km/h)
              </label>
              <input
                id="sp-speed"
                type="number"
                step="0.1"
                min="0"
                value={speed}
                onChange={(e) => setSpeed(e.target.value)}
                className='calculator-input'
              />
            </div>
          )}

          {mode !== 'speed' && (
            <div className='calculator-input-group'>
              <label className='calculator-label' htmlFor="sp-distance">
                {sp.speedDistanceLabel} (km)
              </label>
              <input
                id="sp-distance"
                type="number"
                step="0.1"
                min="0"
                value={distance}
                onChange={(e) => setDistance(e.target.value)}
                className='calculator-input'
              />
            </div>
          )}
        </div>

        <div className='calculator-actions'>
          <button type="submit" className='button'>
            {sp.speedCalculateButton}
          </button>
        </div>
      </form>

      {result && (
        <div className='calculator-result-card'>
          <h3>{sp.speedResultTitle}</h3>
          <p>{result}</p>
        </div>
      )}
    </div>
  );
}
