import React, { use, useState } from 'react';
import * as operator from './loanPayments.utils'
import * as operatorUtils from '@/features/calculators/utils'
import { useTranslation } from '@/core/i18n/useTranslation';

export default function LoanPayments (){
    const { tCalculators, tCommon } = useTranslation();
    const lp = tCalculators.loanPayments

    const [resultCalculate, setResultCalculate] = useState<string | null>(null)
    
    const [mount, setMount] = useState<string>('100')
    const [interestRage, setInterestRate] = useState<string>('20')
    const [numberLoanYears,setNumberLoanYears] = useState<string>('12')
    const [termYears, setTermYears] = useState<string>('5')
    const [totalPaid, setTotalPaid] = useState<number>(0)
    const mountValue = operatorUtils.parseNumber(mount);
    const interestRageValue = operatorUtils.parseNumber(interestRage);
    const numberLoanYearsValue = operatorUtils.parseNumber(numberLoanYears);
    const termYearsValue = operatorUtils.parseNumber(termYears);


    if (!mountValue || !interestRageValue || !numberLoanYearsValue || termYearsValue <= 0){
        setTotalPaid(0)
        setResultCalculate(tCommon.badInput);
        return;
    }


    const handleCalculate = (event : React.FormEvent)=>{
        event.preventDefault();

        const result = operator.calculateLoanPayments(mountValue,interestRageValue, numberLoanYearsValue,termYearsValue)
        setResultCalculate(result.toString())
        setTotalPaid(((result)*(numberLoanYearsValue*termYearsValue))-mountValue)

    }

    return (
        <>
            <h2>{lp.lpTitle}</h2>

            <form onSubmit={handleCalculate}>
                <div className='calculatoro-inputs'>

                    <div className='calculator-input-group'>
                        <label className='calculator-label'>
                            {lp.lpAmount}
                        </label>
                        <input 
                            type="number"
                            step="0.1"
                            min="0"
                            value={mount}
                            onChange={(e) => setMount(e.target.value)}
                            placeholder="100"
                            className='calculator-input'
                        />
                    </div>
                    
                    <div className='calculator-input-group'>
                        <label className='calculator-label'>
                            {lp.lpInteresRate}
                        </label>
                        <input 
                            type="number"
                            step="0.1"
                            min="0"
                            value={interestRage}
                            onChange={(e) => setInterestRate(e.target.value)}
                            placeholder="10"
                            className='calculator-input'
                        />
                    </div>

                    <div className='calculator-input-group'>
                        <label className='calculator-label'>
                            {lp.lpNumberLoanYears}
                        </label>
                        <input 
                            type="number"
                            step="0.1"
                            min="0"
                            value={numberLoanYears}
                            onChange={(e) => setNumberLoanYears(e.target.value)}
                            placeholder="1"
                            className='calculator-input'
                        />
                    </div>

                    <div className='calculator-input-group'>
                        <label className='calculator-label'>
                            {lp.lpTermYears}
                        </label>
                        <input 
                            type="number"
                            step="0.1"
                            min="0"
                            value={termYears}
                            onChange={(e) => setTermYears(e.target.value) }
                            placeholder="1"
                            className='calculator-input'
                        />
                    </div>

                </div>


                <div className='calculator-actions'>
                    <button type="submit" className='button'>
                        {lp.lpCalculateButton}
                    </button>
                </div>
            </form>

            {resultCalculate !== null && (
                <div className='calculator-result-card'>
                <h3>{lp.lpTitle}</h3>
                <p>
                    {
                    lp.lpResult
                        .replace('{{loan}}', resultCalculate)
                        .replace('{{paid}}', totalPaid.toString())
                    }
                </p>
                </div>
            )}
        </>
    )
}