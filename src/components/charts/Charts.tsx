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
import { useMidState, useMidAction } from "@Hooks";
import { TIME_BEFORE_RESET_FOCUS, barOptions, lineOptions, donutOptions } from "../charts/data";
import { ChartContainer } from "@Components";
import { LineProps, BarProps, DonutProps } from "@Types";
import { focusOnBar, focusOnLine, focusOndonut } from "@/hooks/charts/helper";

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
    <div
      style={{
        maxWidth: "150px",
      }}
    >
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
  const intervalIdRef = useRef(null) as MutableRefObject<ReturnType<typeof setInterval> | null>; // NodeJS.Timeout
  const { resetFocus } = focusActions;

  const currentlyFocused = isFocus.some((isFocused) => isFocused);

  useEffect(() => {
    intervalIdRef.current = setInterval(handleResetFocus, TIME_BEFORE_RESET_FOCUS);
    return () => {
      if (intervalIdRef.current) clearInterval(intervalIdRef.current);
    };
  }, [isFocus]);

  const handleResetFocus = () => {
    if (currentlyFocused) resetFocus(); // only one focused
    if (intervalIdRef.current) clearInterval(intervalIdRef.current); // if interval all ready set in useEffect, clear it, already have one
  };

  let focusedLine = lines,
    focusedBar = bars,
    focusedDonut = donuts;

  if (currentlyFocused) {
    const focusedIndex = isFocus.findIndex((isFocused) => isFocused);
    focusedBar = focusOnBar(focusedIndex, bars) as ChartData<"bar">;
    focusedLine = focusOnLine(focusedIndex, lines);
    focusedDonut = focusOndonut(focusedIndex, donuts);
  }

  return (
    <ChartContainer isOpen={isOpen}>
      <Line data={currentlyFocused ? focusedLine : lines} options={lineOptions} />
      <Bar data={currentlyFocused ? focusedBar : bars} options={barOptions} />
      <Doughnut data={currentlyFocused ? focusedDonut : donuts} options={donutOptions} />
    </ChartContainer>
  );
};
