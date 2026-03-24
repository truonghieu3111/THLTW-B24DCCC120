export const books = [
  { year: 2024, currentNumber: 2 },
  { year: 2025, currentNumber: 1 }
];

export const decisions = [
  { id: 1, soQD: "QD01", date: "2024-06-01", desc: "Đợt 1", year: 2024, views: 0 },
  { id: 2, soQD: "QD02", date: "2024-09-01", desc: "Đợt 2", year: 2024, views: 0 }
];

export const fields = [
  { name: "Điểm TB", type: "number" },
  { name: "Nơi sinh", type: "string" }
];

export const diplomas: any[] = JSON.parse(
  localStorage.getItem("diplomas") || "[]"
);