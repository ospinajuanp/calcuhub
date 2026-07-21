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
import RoiCalculator from './finance/roi/RoiCalculator';
import ProfitMarginCalculator from './finance/profitMargin/ProfitMarginCalculator';
import BloodPressureCalculator from './health/bloodPressure/BloodPressureCalculator';
import HeartRateCalculator from './health/heartRate/HeartRateCalculator';
import TemperatureCalculator from './utilities/temperature/TemperatureCalculator';
import DogAgeCalculator from './utilities/dogAge/DogAgeCalculator';
import AreaCalculator from './utilities/area/AreaCalculator';
import DueDateCalculator from './health/dueDate/DueDateCalculator';
import BodyFatCalculator from './health/bodyFat/BodyFatCalculator';
import TimeCalculator from './utilities/time/TimeCalculator';
import AmortizationCalculator from './finance/amortization/AmortizationCalculator';
import InvestmentCalculator from './finance/investment/InvestmentCalculator';


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
    roi: RoiCalculator,
    profitMargin: ProfitMarginCalculator,
    bloodPressure: BloodPressureCalculator,
    heartRate: HeartRateCalculator,
    temperature: TemperatureCalculator,
    dogAge: DogAgeCalculator,
    area: AreaCalculator,
    dueDate: DueDateCalculator,
    bodyFat: BodyFatCalculator,
    time: TimeCalculator,
    amortization: AmortizationCalculator,
    investment: InvestmentCalculator,
};

