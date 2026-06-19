export interface ChildBmiResult {
  bmi: number;
  percentile: string;
  category: string;
}

export function calculateChildBmi(age: number, weight: number, height: number): ChildBmiResult {
  const heightM = height / 100;
  const bmi = weight / (heightM * heightM);

  let percentile: string;
  let category: string;

  if (bmi < 5) {
    percentile = 'Underweight';
    category = 'Bajo peso';
  } else if (bmi < 85) {
    percentile = 'Normal weight';
    category = 'Peso normal';
  } else if (bmi < 95) {
    percentile = 'Overweight';
    category = 'Sobrepeso';
  } else {
    percentile = 'Obesity';
    category = 'Obesidad';
  }

  return {
    bmi: Math.round(bmi * 10) / 10,
    percentile,
    category,
  };
}
