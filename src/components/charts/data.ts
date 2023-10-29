import { ChartOptions } from "chart.js";

export const options: ChartOptions<"line"> = {
  responsive: true,
  elements: {
    point: {
      radius: 0,
    },
    line: {
      tension: 0.4,
      borderWidth: 3,
    },
  },
  maintainAspectRatio: false,
  scales: {
    x: {
      display: false,
      grid: {
        display: false,
      },
    },
    y: {
      display: false,

      grid: {
        display: false,
      },
    },
  },
  interaction: {
    mode: "index",
    intersect: false,
  },

  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      callbacks: {
        title: () => "",
      },
      bodyFont: {
        size: 16,
      },
    },
  },
};

export const playerColors = [
  "#f94144",
  "#43aa8b",
  "#4cc9f0",
  "#3a0ca3",
  "#f9c74f",
  "#4d908e",
  "#4361ee",
  "#f3722c",
  "#f72585",
  "#4895ef",
  "#560bad",
  "#277da1",
  "#3f37c9",
  "#f8961e",
  "#577590",
  "#b5179e",
  "#90be6d",
];
