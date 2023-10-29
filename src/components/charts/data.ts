import { ChartData, ChartOptions } from "chart.js";

const labels = ["January", "February", "March", "April", "May", "June", "July"];

export const options: ChartOptions<"line"> = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Chart.js Line Chart",
    },
  },
};

export const data: ChartData<"line"> = {
  labels,
  datasets: [
    {
      label: "Dataset 1",
      data: labels.map(() => 1),
    },
    {
      label: "Dataset 2",
      data: labels.map(() => 1),
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};
