import React, { useState } from 'react';
import * as operador from './compoundInterest.utils'
import { useTranslation } from '@/core/i18n/useTranslation';

export default function compoundInterest (){
    const { tCalculators } = useTranslation();
    const ci = tCalculators.compoundInterest

    const [amount, setAmount] = useState<number | null>(null);

    const [capital, setCapital] = useState<string>('100');
    const [interestRate, setInterestRate] = useState<string>('10');
    const [numberCapitalizations, setNumberCapitalizations] = useState<string>('1');
    const [timeYears, setTimeYears] = useState<string>('1');

    const [resultCalculate, setResultCalculate] = useState<string>('');


    function handleCalculate (event: React.FormEvent){
        event.preventDefault();
        
        const capitalValue = operador.parseNumber(capital);
        const interestRateValue = operador.parseNumber(interestRate);
        const numberCapitalizationsValue = operador.parseNumber(numberCapitalizations);
        const timeYearsValue = operador.parseNumber(timeYears);
        
        if (!capitalValue || !interestRateValue || !numberCapitalizationsValue || timeYearsValue <= 0){
            setAmount(null);
            setResultCalculate(ci.ciBadInput)
            return;
        }

        const ciResult = operador.calculateCompoundInterest(capitalValue,interestRateValue,numberCapitalizationsValue,timeYearsValue);

        setAmount(ciResult);
        
    }

    return (
        <div>
            <h2>{ci.name}</h2>

            <form onSubmit={handleCalculate}>
                <div className='calculatoro-inputs'>

                    <div className='calculator-input-group'>
                        <label className='calculator-label'>
                            {ci.ciCapital}
                        </label>
                        <input 
                            type="number"
                            step="0.1"
                            min="0"
                            value={capital}
                            onChange={(e) => setCapital(e.target.value)}
                            placeholder="100"
                            className='calculator-input'
                        />
                    </div>
                    
                    <div className='calculator-input-group'>
                        <label className='calculator-label'>
                            {ci.ciInteresRate}
                        </label>
                        <input 
                            type="number"
                            step="0.1"
                            min="0"
                            value={interestRate}
                            onChange={(e) => setInterestRate(e.target.value)}
                            placeholder="10"
                            className='calculator-input'
                        />
                    </div>

                    <div className='calculator-input-group'>
                        <label className='calculator-label'>
                            {ci.ciNumberCapitalizations}
                        </label>
                        <input 
                            type="number"
                            step="0.1"
                            min="0"
                            value={numberCapitalizations}
                            onChange={(e) => setNumberCapitalizations(e.target.value)}
                            placeholder="1"
                            className='calculator-input'
                        />
                    </div>

                    <div className='calculator-input-group'>
                        <label className='calculator-label'>
                            {ci.ciTimeYears}
                        </label>
                        <input 
                            type="number"
                            step="0.1"
                            min="0"
                            value={timeYears}
                            onChange={(e) => setTimeYears(e.target.value)}
                            placeholder="1"
                            className='calculator-input'
                        />
                    </div>




                </div>


                <div className='calculator-actions'>
                    <button type="submit" className='button'>
                        {ci.ciCalculateButton}
                    </button>
                </div>
            </form>
            {amount !== null && (
                <div className='calculator-result-card'>
                <h3>{ci.ciTitle}</h3>
                <p>
                    {
                    ci.ciResult
                        .replace('{{time}}', timeYears)
                        .replace('{{amount}}',amount.toString())
                    }
                </p>
                <p>{resultCalculate}</p>
                </div>
            )}


        </div>
    )
}