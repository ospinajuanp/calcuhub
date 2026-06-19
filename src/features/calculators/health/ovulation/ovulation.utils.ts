export interface OvulationResult {
  ovulationDate: Date;
  fertileStart: Date;
  fertileEnd: Date;
  nextPeriod: Date;
}

export function calculateOvulation(lastPeriodStart: Date, cycleLength: number = 28): OvulationResult {
  const ovulationDate = new Date(lastPeriodStart);
  ovulationDate.setDate(ovulationDate.getDate() + cycleLength - 14);

  const fertileStart = new Date(ovulationDate);
  fertileStart.setDate(fertileStart.getDate() - 5);

  const fertileEnd = new Date(ovulationDate);
  fertileEnd.setDate(fertileEnd.getDate() + 1);

  const nextPeriod = new Date(lastPeriodStart);
  nextPeriod.setDate(nextPeriod.getDate() + cycleLength);

  return {
    ovulationDate,
    fertileStart,
    fertileEnd,
    nextPeriod,
  };
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
