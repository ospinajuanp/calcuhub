import ImcCalculator from './health/imc/ImcCalculator';
import TmbCalculator from './health/tmb/TmbCalculator';
import WaterIntakeCalculator from './health/waterIntake/WaterIntake';
import CompoundInterestCalculator from './finance/compoundInterest/CompoundInterest';
import LoanPaymentsCalculator from './finance/loanPayments/LoanPayments';


export const calculatorRegistry = {
    imc: ImcCalculator,
    tmb: TmbCalculator,
    waterIntake: WaterIntakeCalculator,
    compoundInterest: CompoundInterestCalculator,
    loanPayments: LoanPaymentsCalculator,
};

