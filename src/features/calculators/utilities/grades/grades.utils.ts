export interface GradeResult {
  average: number;
  letterGrade: string;
  status: string;
}

export function calculateAverage(grades: number[]): number {
  if (grades.length === 0) return 0;
  const sum = grades.reduce((acc, g) => acc + g, 0);
  return Math.round((sum / grades.length) * 100) / 100;
}

export function getLetterGrade(average: number): string {
  if (average >= 90) return 'A';
  if (average >= 80) return 'B';
  if (average >= 70) return 'C';
  if (average >= 60) return 'D';
  return 'F';
}

export function getGradeStatus(average: number, passingGrade: number = 60): string {
  return average >= passingGrade ? 'Approved' : 'Not approved';
}
