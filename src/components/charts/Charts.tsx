import { MutableRefObject, useEffect, useRef } from "react";
import { Line as ChartLine, Pie as ChartPie, Bar as ChartBar } from "react-chartjs-2";
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
import { useChartFocus, useIntermediate, useIntermediateDispatch } from "../../hooks";
import { TIME_BEFORE_RESET_FOCUS, barOptions, lineOptions, pieOptions } from "../charts/data";
import { ChartContainer } from "../";
import { LineProps, BarProps, PieProps } from "../../types";

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
  const { focusedBars, focusedLines, focusedPies, setChartState } = useChartFocus();
  const intervalIdRef = useRef(null) as MutableRefObject<ReturnType<typeof setInterval> | null>; // NodeJS.Timeout
  const { resetFocus } = focusActions;

  useEffect(() => {
    setChartState({ lines, bars, pies });
  }, [lines, bars, pies]);

  useEffect(() => {
    const handleResetFocus = () => {
      if (isFocus.some((isFocused) => isFocused)) resetFocus();
      if (intervalIdRef.current) clearInterval(intervalIdRef.current);
    };
    intervalIdRef.current = setInterval(handleResetFocus, TIME_BEFORE_RESET_FOCUS);
    return () => {
      if (intervalIdRef.current) clearInterval(intervalIdRef.current);
    };
  }, [isFocus, resetFocus]);

  const noFocus = isFocus.every((isFocused) => !isFocused);

  return (
    <ChartContainer isOpen={isOpen}>
      <Line data={noFocus ? lines : focusedLines} options={lineOptions} />
      <Bar data={noFocus ? bars : focusedBars} options={barOptions} />
      <Pie data={noFocus ? pies : focusedPies} options={pieOptions} />
    </ChartContainer>
  );
};
