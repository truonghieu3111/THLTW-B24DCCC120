export function addClub(list: any[], data: any) {
  return {
    id: Date.now(),
    ...data
  };
}
export function addApplication(list: any[], data: any) {
  return {
    id: Date.now(),
    status: "Pending",
    note: "",
    ...data
  };
}
export function addHistory(histories: any[], ids: number[], action: string, note = "") {
  const now = new Date().toLocaleString();

  const newItems = ids.map(id => ({
    id: Date.now() + Math.random(),
    appId: id,
    action,
    note,
    time: now
  }));

  return [...newItems, ...histories];
}
export function updateStatus(apps: any[], ids: number[], status: string, note = "") {
  return apps.map(a =>
    ids.includes(a.id)
      ? { ...a, status, note }
      : a
  );
}

export function changeClub(list: any[], ids: any[], clubId: number) {
  return list.map(item =>
    ids.includes(item.id)
      ? { ...item, clubId }
      : item
  );
}