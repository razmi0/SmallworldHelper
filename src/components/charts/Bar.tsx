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
  option: ChartOptions<"bar">;
  theme?: "light" | "dark";
};
export const Bar = ({ data, option, theme = "dark" }: BarProps) => {
  if (option.plugins?.tooltip) {
    option.plugins.tooltip.backgroundColor = theme === "dark" ? "#242424" : "#ffffffde";
    option.plugins.tooltip.bodyColor = theme === "dark" ? "#ffffffde" : "#242424";
  }
  return <ChartBar options={option} data={data} />;
};
