import { ChartOptions, ChartType, Tooltip, TooltipPositionerFunction } from "chart.js";

declare module "chart.js" {
  interface TooltipPositionerMap {
    topleft: TooltipPositionerFunction<ChartType>;
  }
}

export const options: ChartOptions<"line"> = {
  responsive: true,
  elements: {
    point: {
      radius: 0,
      hoverRadius: 6,
      pointStyle: "triangle",
    },
    line: {
      tension: 0.4,
      borderWidth: 3,
    },
  },
  maintainAspectRatio: false,
  scales: {
    x: {
      display: true,
      grid: {
        display: false,
      },
    },
    y: {
      display: true,
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
        label: (context) => {
          return ` ${context.dataset.label || ""} : ${context.parsed.y || 0}`;
        },
      },
      position: "topleft",
      usePointStyle: true,
      bodyFont: {
        size: 15,
      },
      caretSize: 0,
      itemSort: (a, b) => {
        return b.parsed.y - a.parsed.y;
      },
    },
  },
};

Tooltip.positioners.topleft = () => {
  return {
    x: 40,
    y: 0,
  };
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
