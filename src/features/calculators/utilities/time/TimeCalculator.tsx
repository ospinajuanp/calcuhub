'use client';
import { useState } from 'react';
import * as time from './time.utils';
import { useTranslation } from '@/core/i18n/useTranslation';

type TimeMode = 'add' | 'subtract' | 'convert' | 'dateDiff';

export default function TimeCalculator() {
  const { tCalculators } = useTranslation();
  const t = tCalculators.time;

  const [mode, setMode] = useState<TimeMode>('add');
  const [h1, setH1] = useState<string>('0');
  const [m1, setM1] = useState<string>('0');
  const [s1, setS1] = useState<string>('0');
  const [h2, setH2] = useState<string>('0');
  const [m2, setM2] = useState<string>('0');
  const [s2, setS2] = useState<string>('0');
  const [convertValue, setConvertValue] = useState<string>('1');
  const [fromUnit, setFromUnit] = useState<string>('hours');
  const [toUnit, setToUnit] = useState<string>('minutes');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [excludeWeekends, setExcludeWeekends] = useState<boolean>(false);
  const [result, setResult] = useState<string>('');

  function handleCalculate(e: React.FormEvent) {
    e.preventDefault();
    let res = '';

    switch (mode) {
      case 'add': {
        const r = time.addTime(parseInt(h1) || 0, parseInt(m1) || 0, parseInt(s1) || 0);
        res = `${r.hours}h ${r.minutes}m ${r.seconds}s`;
        break;
      }
      case 'subtract': {
        const r = time.subtractTime(parseInt(h1) || 0, parseInt(m1) || 0, parseInt(s1) || 0, parseInt(h2) || 0, parseInt(m2) || 0, parseInt(s2) || 0);
        res = `${r.hours}h ${r.minutes}m ${r.seconds}s`;
        break;
      }
      case 'convert': {
        const val = parseFloat(convertValue);
        if (!isNaN(val)) {
          const r = time.convertTime(val, fromUnit, toUnit);
          res = `${val} ${fromUnit} = ${r.toFixed(2)} ${toUnit}`;
        }
        break;
      }
      case 'dateDiff': {
        if (startDate && endDate) {
          const start = new Date(startDate);
          const end = new Date(endDate);
          const r = time.dateDiffDays(start, end, excludeWeekends);
          res = `${r.days} days${excludeWeekends ? ` (${r.workingDays} working days)` : ''}`;
        }
        break;
      }
    }
    setResult(res);
  }

  return (
    <div>
      <form onSubmit={handleCalculate}>
        <div className='calculator-inputs'>
          <div className='calculator-input-group'>
            <label className='calculator-label' htmlFor="time-mode">{t.timeModeLabel}</label>
            <select id="time-mode" className='calculator-input' value={mode} onChange={(e) => setMode(e.target.value as TimeMode)}>
              <option value="add">{t.timeModeAdd}</option>
              <option value="subtract">{t.timeModeSubtract}</option>
              <option value="convert">{t.timeModeConvert}</option>
              <option value="dateDiff">{t.timeModeDateDiff}</option>
            </select>
          </div>

          {(mode === 'add' || mode === 'subtract') && (
            <>
              <div className='calculator-input-group'>
                <label className='calculator-label'>{t.timeHoursLabel}</label>
                <input type="number" step="1" min="0" value={h1} onChange={(e) => setH1(e.target.value)} className='calculator-input' />
              </div>
              <div className='calculator-input-group'>
                <label className='calculator-label'>{t.timeMinutesLabel}</label>
                <input type="number" step="1" min="0" max="59" value={m1} onChange={(e) => setM1(e.target.value)} className='calculator-input' />
              </div>
              <div className='calculator-input-group'>
                <label className='calculator-label'>{t.timeSecondsLabel}</label>
                <input type="number" step="1" min="0" max="59" value={s1} onChange={(e) => setS1(e.target.value)} className='calculator-input' />
              </div>
            </>
          )}

          {mode === 'subtract' && (
            <>
              <div className='calculator-input-group'>
                <label className='calculator-label'>{t.timeHours2Label}</label>
                <input type="number" step="1" min="0" value={h2} onChange={(e) => setH2(e.target.value)} className='calculator-input' />
              </div>
              <div className='calculator-input-group'>
                <label className='calculator-label'>{t.timeMinutes2Label}</label>
                <input type="number" step="1" min="0" max="59" value={m2} onChange={(e) => setM2(e.target.value)} className='calculator-input' />
              </div>
              <div className='calculator-input-group'>
                <label className='calculator-label'>{t.timeSeconds2Label}</label>
                <input type="number" step="1" min="0" max="59" value={s2} onChange={(e) => setS2(e.target.value)} className='calculator-input' />
              </div>
            </>
          )}

          {mode === 'convert' && (
            <>
              <div className='calculator-input-group'>
                <label className='calculator-label'>{t.timeValueLabel}</label>
                <input type="number" step="0.01" value={convertValue} onChange={(e) => setConvertValue(e.target.value)} className='calculator-input' />
              </div>
              <div className='calculator-input-group'>
                <label className='calculator-label'>{t.timeFromLabel}</label>
                <select className='calculator-input' value={fromUnit} onChange={(e) => setFromUnit(e.target.value)}>
                  <option value="seconds">{t.timeSecondsUnit}</option>
                  <option value="minutes">{t.timeMinutesUnit}</option>
                  <option value="hours">{t.timeHoursUnit}</option>
                  <option value="days">{t.timeDaysUnit}</option>
                </select>
              </div>
              <div className='calculator-input-group'>
                <label className='calculator-label'>{t.timeToLabel}</label>
                <select className='calculator-input' value={toUnit} onChange={(e) => setToUnit(e.target.value)}>
                  <option value="seconds">{t.timeSecondsUnit}</option>
                  <option value="minutes">{t.timeMinutesUnit}</option>
                  <option value="hours">{t.timeHoursUnit}</option>
                  <option value="days">{t.timeDaysUnit}</option>
                </select>
              </div>
            </>
          )}

          {mode === 'dateDiff' && (
            <>
              <div className='calculator-input-group'>
                <label className='calculator-label'>{t.timeStartDateLabel}</label>
                <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className='calculator-input' />
              </div>
              <div className='calculator-input-group'>
                <label className='calculator-label'>{t.timeEndDateLabel}</label>
                <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className='calculator-input' />
              </div>
              <div className='calculator-input-group'>
                <label className='calculator-label'>
                  <input type="checkbox" checked={excludeWeekends} onChange={(e) => setExcludeWeekends(e.target.checked)} />
                  {' '}{t.timeExcludeWeekendsLabel}
                </label>
              </div>
            </>
          )}
        </div>
        <div className='calculator-actions'>
          <button type="submit" className='button'>{t.timeCalculateButton}</button>
        </div>
      </form>
      {result && (
        <div className='calculator-result-card'>
          <h3>{t.timeResultTitle}</h3>
          <p>{result}</p>
        </div>
      )}
    </div>
  );
}
