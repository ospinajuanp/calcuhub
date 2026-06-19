import ImcCalculator from './health/imc/ImcCalculator';
import TmbCalculator from './health/tmb/TmbCalculator';
import WaterIntakeCalculator from './health/waterIntake/WaterIntake';
import CompoundInterestCalculator from './finance/compoundInterest/CompoundInterest';
import LoanPaymentsCalculator from './finance/loanPayments/LoanPayments';
import PercentageVat from './finance/percentageTax/PercentageTax';
import ExactAge from './date/exactAge/exactAge';
import MortgageCalculator from './finance/mortgage/MortgageCalculator';
import TipsCalculator from './finance/tips/TipsCalculator';
import DiscountCalculator from './finance/discount/DiscountCalculator';
import TdeeCalculator from './health/tdee/TdeeCalculator';
import OvulationCalculator from './health/ovulation/OvulationCalculator';
import SleepCalculator from './health/sleep/SleepCalculator';
import ChildBmiCalculator from './health/childBmi/ChildBmiCalculator';
import SavingsCalculator from './finance/savings/SavingsCalculator';
import CurrencyCalculator from './finance/currency/CurrencyCalculator';
import DateDiffCalculator from './date/dateDiff/DateDiffCalculator';
import UnitsCalculator from './utilities/units/UnitsCalculator';
import PercentageCalc from './utilities/percentage/PercentageCalculator';
import SpeedCalculator from './utilities/speed/SpeedCalculator';
import GradesCalculator from './utilities/grades/GradesCalculator';


export const calculatorRegistry = {
    imc: ImcCalculator,
    tmb: TmbCalculator,
    waterIntake: WaterIntakeCalculator,
    compoundInterest: CompoundInterestCalculator,
    loanPayments: LoanPaymentsCalculator,
    tax: PercentageVat,
    exactAge: ExactAge,
    mortgage: MortgageCalculator,
    tips: TipsCalculator,
    discount: DiscountCalculator,
    tdee: TdeeCalculator,
    ovulation: OvulationCalculator,
    sleep: SleepCalculator,
    childBmi: ChildBmiCalculator,
    savings: SavingsCalculator,
    currency: CurrencyCalculator,
    dateDiff: DateDiffCalculator,
    units: UnitsCalculator,
    percentage: PercentageCalc,
    speed: SpeedCalculator,
    grades: GradesCalculator,
};

