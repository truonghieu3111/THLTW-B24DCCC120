export function filterDest(list: any[], type: string) {
  return type ? list.filter(d => d.type === type) : list;
}

export function calcBudget(list: any[]) {
  return list.reduce(
    (sum, d) => sum + d.food + d.hotel + d.transport,
    0
  );
}