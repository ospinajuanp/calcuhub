export interface BloodPressureResult {
  systolic: number;
  diastolic: number;
  category: string;
  description: string;
}

export function classifyBloodPressure(
  systolic: number,
  diastolic: number
): BloodPressureResult {
  let category: string;
  let description: string;

  if (systolic < 120 && diastolic < 80) {
    category = 'normal';
    description = 'bloodPressureNormal';
  } else if (systolic < 130 && diastolic < 80) {
    category = 'elevated';
    description = 'bloodPressureElevated';
  } else if (systolic < 140 || diastolic < 90) {
    category = 'stage1';
    description = 'bloodPressureStage1';
  } else if (systolic >= 140 || diastolic >= 90) {
    category = 'stage2';
    description = 'bloodPressureStage2';
  } else {
    category = 'crisis';
    description = 'bloodPressureCrisis';
  }

  return {
    systolic,
    diastolic,
    category,
    description,
  };
}
