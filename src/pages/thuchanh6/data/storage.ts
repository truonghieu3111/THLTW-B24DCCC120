export const defaultDestinations = [
  {
    id: 1,
    name: "Đà Nẵng",
    type: "biển",
    price: 2000000,
    rating: 4,
    image: "https://i.imgur.com/6VBx3io.png",
    desc: "Biển đẹp",
    food: 500000,
    hotel: 1000000,
    transport: 500000
  },
  {
    id: 2,
    name: "Sapa",
    type: "núi",
    price: 1500000,
    rating: 5,
    image: "https://i.imgur.com/6VBx3io.png",
    desc: "Núi đẹp",
    food: 400000,
    hotel: 700000,
    transport: 400000
  }
];

export const destinations =
  JSON.parse(localStorage.getItem("destinations") || "null") ||
  defaultDestinations;