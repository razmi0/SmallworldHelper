import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
  ChartData,
} from "chart.js";
import { Bar as ChartBar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

type BarProps = {
  data: ChartData<"bar">;
  options: ChartOptions<"bar">;
  theme?: "light" | "dark";
};
export const Bar = ({ data, options, theme = "dark" }: BarProps) => {
  if (options.plugins?.tooltip) {
    options.plugins.tooltip.backgroundColor = theme === "dark" ? "#242424" : "#ffffffde";
    options.plugins.tooltip.bodyColor = theme === "dark" ? "#ffffffde" : "#242424";
  }
  return <ChartBar options={options} data={data} />;
};
