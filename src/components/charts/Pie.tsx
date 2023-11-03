import { Chart as ChartJS, ArcElement, Tooltip, Legend, ChartData, ChartOptions } from "chart.js";
import { Pie as ChartPie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

type PieProps = {
  data: ChartData<"pie">;
  options: ChartOptions<"pie">;
  theme?: "light" | "dark";
};
export const Pie = ({ data, options, theme = "dark" }: PieProps) => {
  if (options.plugins?.tooltip) {
    options.plugins.tooltip.backgroundColor = theme === "dark" ? "#242424" : "#ffffffde";
    options.plugins.tooltip.bodyColor = theme === "dark" ? "#ffffffde" : "#242424";
  }
  return <ChartPie data={data} options={options} />;
};
