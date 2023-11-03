import { ChartOptions, ChartType, Tooltip, TooltipPositionerFunction } from "chart.js";

declare module "chart.js" {
  interface TooltipPositionerMap {
    topleft: TooltipPositionerFunction<ChartType>;
  }
}

export const lineOptions: ChartOptions<"line"> = {
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
          return ` ${context.dataset.label || ""} : ${Math.floor(context.parsed.y) || 0}`;
        },
      },
      position: "topleft",
      usePointStyle: true,
      bodyFont: {
        size: 13,
      },
      caretSize: 0,
    },
  },
};

export const barOptions: ChartOptions<"bar"> = {
  responsive: true,
  maintainAspectRatio: false,

  scales: {
    x: {
      display: false,
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
      position: "topleft",
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

Tooltip.positioners.topleft = () => {
  return {
    x: 40,
    y: 0,
  };
};
