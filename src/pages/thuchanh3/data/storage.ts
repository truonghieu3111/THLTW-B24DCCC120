export const employees = [
  { id: 1, name: "An", maxPerDay: 5, workingHours: "9:00-17:00" },
  { id: 2, name: "Bình", maxPerDay: 3, workingHours: "10:00-18:00" }
];

export const services = [
  { id: 1, name: "Cắt tóc", price: 100000, duration: 30 },
  { id: 2, name: "Spa", price: 300000, duration: 60 }
];


export const bookings: any[] = [];

export const ratings: any[] = JSON.parse(
  localStorage.getItem("ratings") || "[]"
);