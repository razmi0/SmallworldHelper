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
};
export const Line = ({ data, option }: LineProps) => {
  return (
    <figure
      style={{
        maxHeight: "250px",
      }}
    >
      <ChartLine data={data} options={option} />
    </figure>
  );
};
