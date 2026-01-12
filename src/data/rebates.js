export const rebates = [
  {
    id: 1,
    label: "2 for 1",
    description: "Køb 2 betal for 1",
    calculate: (price) => price
  },
  {
    id: 2,
    label: "50% rabat",
    description: "Halv pris",
    calculate: (price) => price * 0.5
  },
  {
    id: 3,
    label: "20% rabat",
    description: "20% besparelse",
    calculate: (price) => price * 0.8
  }
];
