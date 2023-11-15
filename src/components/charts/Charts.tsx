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

export const Line = ({ data, options /* theme = "dark" */ }: LineProps) => {
  return <ChartLine data={data} options={options} />;
};

export const Pie = ({ data, options /* theme = "dark" */ }: PieProps) => {
  return <ChartPie data={data} options={options} />;
};

export const Bar = ({ data, options /* theme = "dark" */ }: BarProps) => {
  return <ChartBar options={options} data={data} />;
};
