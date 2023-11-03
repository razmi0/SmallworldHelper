import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
} from "chart.js";
import { Line as ChartLine } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

type LineProps = {
  data: ChartData<"line">;
  options: ChartOptions<"line">;
  theme?: "light" | "dark";
};
export const Line = ({ data, options, theme = "dark" }: LineProps) => {
  if (options.plugins?.tooltip) {
    options.plugins.tooltip.backgroundColor = theme === "dark" ? "#242424" : "#ffffffde";
    options.plugins.tooltip.bodyColor = theme === "dark" ? "#ffffffde" : "#242424";
  }
  return <ChartLine data={data} options={options} />;
};
