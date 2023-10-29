import { ChartData, ChartOptions } from "chart.js";

const labels = Array.from({ length: Math.floor(Math.random() * 30) }, (_, i) => i.toString());
console.log(labels);

export const options: ChartOptions<"line"> = {
  responsive: true,
  scales: {
    x: {
      display: false,
      grid: {
        display: false,
      },
    },
    y: {
      grid: {
        display: false,
      },
    },
  },
  plugins: {
    legend: {
      display: false,
    },
  },
};

export const data: ChartData<"line"> = {
  labels,
  datasets: [
    {
      label: "Dataset 1",
      data: labels.map((_, i) => i + Math.random() * 10),
    },
    {
      label: "Dataset 2",
      data: labels.map((_, i) => i + Math.random() * 10),
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};
