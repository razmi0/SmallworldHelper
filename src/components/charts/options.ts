import { ChartOptions } from "chart.js";

export const TIME_BEFORE_RESET_FOCUS = 40000;

// declare module "chart.js" {
//   interface TooltipPositionerMap {
//     topleft: TooltipPositionerFunction<ChartType>;
//   }
// }

export const lineOptions: ChartOptions<"line"> = {
  maintainAspectRatio: false,
  spanGaps: true,
  normalized: true,
  animation: {
    delay: 200,
  },
  responsive: true,
  elements: {
    point: {
      radius: 2,
      hoverRadius: 5,
      pointStyle: "circle",
    },
    line: {
      tension: 0.4,
      borderWidth: 3,
    },
  },
  // maintainAspectRatio: false,
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
        label: (context) => {
          return ` ${context.dataset.label || ""} : ${Math.floor(context.parsed.y) || 0}`;
        },
      },
      usePointStyle: true,
      bodyFont: {
        size: 13,
      },
      caretSize: 0,
    },
  },
};

export const barOptions: ChartOptions<"bar"> = {
  maintainAspectRatio: false,
  normalized: true,
  animation: {
    delay: 300,
  },
  responsive: true,
  // maintainAspectRatio: false,
  elements: {
    bar: {
      borderRadius: 4,
    },
  },

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
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      callbacks: {
        label: (context) => {
          return ` ${context.dataset.label || ""} : ${Math.floor(context.parsed.y) || 0}`;
        },
      },
      usePointStyle: true,
      bodyFont: {
        size: 13,
      },
      caretSize: 0,
      itemSort: (a, b) => {
        return b.parsed.y - a.parsed.y;
      },
    },
  },
  interaction: {
    mode: "index",
    intersect: false,
  },
};

export const donutOptions: ChartOptions<"doughnut"> = {
  maintainAspectRatio: false,

  normalized: true,
  spacing: 3,
  animation: {
    delay: 400,
  },
  cutout: "80%",
  responsive: true,
  // maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    decimation: {
      enabled: true,
    },
  },
};

// Tooltip.positioners.topleft = () => {
//   return {
//     x: 40,
//     y: 0,
//   };
// };
