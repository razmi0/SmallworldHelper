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
  option: ChartOptions<"line">;
  theme?: "light" | "dark";
};
export const Line = ({ data, option, theme = "dark" }: LineProps) => {
  if (option.plugins?.tooltip) {
    option.plugins.tooltip.backgroundColor = theme === "dark" ? "#242424" : "#ffffffde";
    option.plugins.tooltip.bodyColor = theme === "dark" ? "#ffffffde" : "#242424";
  }
  return (
    <figure
      style={{
        maxHeight: "250px",
        marginTop: "0px",
        marginBottom: "0px",
      }}
      className="chart-ctn"
    >
      <ChartLine data={data} options={option} />
    </figure>
  );
};
