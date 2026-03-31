const defaultClubs = [
  {
    id: 1,
    name: "CLB Công nghệ",
    createdAt: "2024-01-01",
    leader: "Nguyễn Văn A",
    active: true,
    image:"",
    description: "<p>CLB về lập trình<p>"
  },
  {
    id: 2,
    name: "CLB Âm nhạc",
    createdAt: "2024-02-01",
    leader: "Trần Thị B",
    active: true
  }
];

const defaultApps = [
  {
    id: 1,
    name: "Lê Văn C",
    clubId: 1,
    status: "Pending",
    note: ""
  },
  {
    id: 2,
    name: "Phạm Thị D",
    clubId: 2,
    status: "Approved",
    note: ""
  }
];

const defaultHistories = [
  {
    id: 1,
    appId: 2,
    action: "Approved",
    note: "",
    time: "10:00 01/03/2025"
  }
];


export const clubs = JSON.parse(localStorage.getItem("clubs") || "null") || defaultClubs;

export const applications = JSON.parse(localStorage.getItem("apps") || "null") || defaultApps;

export const histories = JSON.parse(localStorage.getItem("histories") || "null") || defaultHistories;