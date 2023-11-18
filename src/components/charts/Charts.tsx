import { MutableRefObject, useEffect, useRef } from "react";
import { Line as ChartLine, Doughnut as ChartDonut, Bar as ChartBar } from "react-chartjs-2";
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
import { useChartFocus, useMidState, useMidAction } from "@Hooks";
import { TIME_BEFORE_RESET_FOCUS, barOptions, lineOptions, donutOptions } from "../charts/data";
import { ChartContainer } from "@Components";
import { LineProps, BarProps, DonutProps } from "@Types";

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
  return (
    <div>
      <ChartLine data={data} options={options} />
    </div>
  );
};

export const Doughnut = ({ data, options /* theme = "dark" */ }: DonutProps) => {
  return (
    <div>
      <ChartDonut data={data} options={options} />
    </div>
  );
};

export const Bar = ({ data, options /* theme = "dark" */ }: BarProps) => {
  return (
    <div>
      <ChartBar data={data} options={options} />
    </div>
  );
};

type ChartProps = {
  isOpen: boolean;
  lines: ChartData<"line">;
  bars: ChartData<"bar">;
  donuts: ChartData<"doughnut">;
};
export const Charts = ({ isOpen, lines, bars, donuts }: ChartProps) => {
  const { isFocus } = useMidState();
  const { focusActions } = useMidAction();
  const { focusedBars, focusedLines, focuseddonuts, setChartState } = useChartFocus();
  const intervalIdRef = useRef(null) as MutableRefObject<ReturnType<typeof setInterval> | null>; // NodeJS.Timeout
  const { resetFocus } = focusActions;

  useEffect(() => {
    setChartState({ lines, bars, donuts });
  }, [lines, bars, donuts]);

  const handleResetFocus = () => {
    if (isFocus.some((isFocused) => isFocused)) resetFocus(); // only one focused
    if (intervalIdRef.current) clearInterval(intervalIdRef.current);
  };

  useEffect(() => {
    intervalIdRef.current = setInterval(handleResetFocus, TIME_BEFORE_RESET_FOCUS);
    return () => {
      if (intervalIdRef.current) clearInterval(intervalIdRef.current);
    };
  }, [isFocus]);

  const noFocus = isFocus.every((isFocused) => !isFocused);

  return (
    <ChartContainer isOpen={isOpen}>
      <Line data={noFocus ? lines : focusedLines} options={lineOptions} />
      <Bar data={noFocus ? bars : focusedBars} options={barOptions} />
      <Doughnut data={noFocus ? donuts : focuseddonuts} options={donutOptions} />
    </ChartContainer>
  );
};
