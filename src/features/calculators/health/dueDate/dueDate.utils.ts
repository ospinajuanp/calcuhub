export interface DueDateResult {
  dueDate: Date;
  conceptionDate: Date;
  trimesters: {
    first: Date;
    second: Date;
    third: Date;
  };
  weeksRemaining: number;
}

export function calculateDueDate(lastPeriodStart: Date, cycleLength: number = 28): DueDateResult {
  const ovulationDay = Math.floor(cycleLength / 2);
  const conceptionDate = new Date(lastPeriodStart);
  conceptionDate.setDate(conceptionDate.getDate() + ovulationDay);

  const dueDate = new Date(lastPeriodStart);
  dueDate.setDate(dueDate.getDate() + 280);

  const trimesters = {
    first: new Date(dueDate),
    second: new Date(dueDate),
    third: new Date(dueDate),
  };
  trimesters.first.setDate(trimesters.first.getDate() - 182);
  trimesters.second.setDate(trimesters.second.getDate() - 91);
  trimesters.third.setDate(trimesters.third.getDate() - 28);

  const today = new Date();
  const diffTime = dueDate.getTime() - today.getTime();
  const weeksRemaining = Math.max(0, Math.floor(diffTime / (1000 * 60 * 60 * 24 * 7)));

  return {
    dueDate,
    conceptionDate,
    trimesters,
    weeksRemaining,
  };
}
