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
  ArcElement,
  BarElement,
} from "chart.js";
import { Line as ChartLine, Pie as ChartPie, Bar as ChartBar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement
);

export type LineProps = {
  data: ChartData<"line">;
  options: ChartOptions<"line">;
  theme?: "light" | "dark";
};

export type BarProps = {
  data: ChartData<"bar">;
  options: ChartOptions<"bar">;
  theme?: "light" | "dark";
};

export type PieProps = {
  data: ChartData<"pie">;
  options: ChartOptions<"pie">;
  theme?: "light" | "dark";
};

export const Line = ({ data, options, theme = "dark" }: LineProps) => {
  if (options.plugins?.tooltip) {
    options.plugins.tooltip.backgroundColor = theme === "dark" ? "#242424" : "#ffffffde";
    options.plugins.tooltip.bodyColor = theme === "dark" ? "#ffffffde" : "#242424";
  }
  return <ChartLine data={data} options={options} />;
};

export const Pie = ({ data, options, theme = "dark" }: PieProps) => {
  if (options.plugins?.tooltip) {
    options.plugins.tooltip.backgroundColor = theme === "dark" ? "#242424" : "#ffffffde";
    options.plugins.tooltip.bodyColor = theme === "dark" ? "#ffffffde" : "#242424";
  }
  return <ChartPie data={data} options={options} />;
};

export const Bar = ({ data, options, theme = "dark" }: BarProps) => {
  if (options.plugins?.tooltip) {
    options.plugins.tooltip.backgroundColor = theme === "dark" ? "#242424" : "#ffffffde";
    options.plugins.tooltip.bodyColor = theme === "dark" ? "#ffffffde" : "#242424";
  }
  return <ChartBar options={options} data={data} />;
};
