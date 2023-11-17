import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement,
  ChartData,
} from "chart.js";
import { Line as ChartLine, Pie as ChartPie, Bar as ChartBar } from "react-chartjs-2";
import { LineProps, BarProps, PieProps } from "../../types";
import { useChartFocus } from "../../hooks/charts/useChartFocus";
import { barOptions, lineOptions, pieOptions } from "../charts/data";
import { ChartContainer } from "../containers/Containers";
import { useEffect } from "react";
import { useIntermediate, useIntermediateDispatch } from "../../hooks";

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

export const Line = ({ data, options /* theme = "dark" */ }: LineProps) => {
  return <ChartLine data={data} options={options} />;
};

export const Pie = ({ data, options /* theme = "dark" */ }: PieProps) => {
  return <ChartPie data={data} options={options} />;
};

export const Bar = ({ data, options /* theme = "dark" */ }: BarProps) => {
  return <ChartBar data={data} options={options} />;
};

type ChartProps = {
  isOpen: boolean;
  lines: ChartData<"line">;
  bars: ChartData<"bar">;
  pies: ChartData<"pie">;
};
export const Charts = ({ isOpen, lines, bars, pies }: ChartProps) => {
  const { isFocus } = useIntermediate();
  const { focusActions } = useIntermediateDispatch();
  const { resetFocus } = focusActions;
  const { focusedBars, focusedLines, focusedPies, setChartState } = useChartFocus();
  const noFocus = isFocus.every((isFocused) => !isFocused);

  const id = setInterval(() => {
    if (isFocus.some((isFocused) => isFocused)) {
      resetFocus();
    }
    clearInterval(id);
  }, 40000);

  useEffect(() => {
    setChartState({ lines, bars, pies });
  }, [lines, bars, pies]);

  return (
    <ChartContainer isOpen={isOpen}>
      <Line data={noFocus ? lines : focusedLines} options={lineOptions} />
      <Bar data={noFocus ? bars : focusedBars} options={barOptions} />
      <Pie data={noFocus ? pies : focusedPies} options={pieOptions} />
    </ChartContainer>
  );
};
