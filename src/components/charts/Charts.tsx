import { MutableRefObject, useEffect, useRef, useState } from "react";
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
  ChartOptions,
} from "chart.js";
import { useMidState, useMidAction } from "@Hooks";
import { TIME_BEFORE_RESET_FOCUS, barOptions, lineOptions, donutOptions } from "./options";
import { ChartContainer } from "@Components";
import { LineProps, BarProps, DonutProps } from "@Types";
import { focusOnBar, focusOnLine, focusOndonut } from "@/hooks/charts/helper";
import { findSum } from "@/utils";
import styles from "./_.module.css";

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

interface HasBothAxis extends ChartOptions {
  scales: {
    x: {
      display: boolean;
    };
    y: {
      display: boolean;
    };
  };
}
const Line = ({ data, options }: LineProps) => {
  const [optionsState, setOptionsState] = useState(options);

  const handleToggleAxis = () => {
    const newOptions = { ...optionsState } as HasBothAxis;
    newOptions.scales.x.display = !newOptions.scales.x?.display;
    newOptions.scales.y.display = !newOptions.scales.y?.display;
    setOptionsState(newOptions);
  };

  return (
    <div onClick={handleToggleAxis}>
      <ChartLine data={data} options={optionsState} />
    </div>
  );
};

const Doughnut = ({ data, options }: DonutProps) => {
  const color = findFocusedColor(data) || "#FFF";
  const total = findSum(data.datasets?.[0].data);
  const vcPtn = total === 0 ? "" : total;
  return (
    <div
      style={{
        color: color,
      }}
      className={`${styles["donut-total-vc-ptn"]} ${styles["donut-ctn-size"]} `}
      data-total-vc-ptn={vcPtn}
    >
      <ChartDonut data={data} options={options} />
    </div>
  );
};

const Bar = ({ data, options }: BarProps) => {
  const [optionsState, setOptionsState] = useState(options);

  const handleToggleAxis = () => {
    const newOptions = { ...optionsState } as HasBothAxis;
    newOptions.scales.x.display = !newOptions.scales.x?.display;
    newOptions.scales.y.display = !newOptions.scales.y?.display;
    setOptionsState(newOptions);
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
      }}
      onClick={handleToggleAxis}
    >
      <ChartBar data={data} options={optionsState} />
    </div>
  );
};

const findFocusedColor = (data: ChartData<"doughnut">) => {
  const bgColors = data.datasets?.[0].backgroundColor as string[];
  return bgColors.find((color) => color.length === 7 /* no alpha */);
};

Doughnut.displayName = "Doughnut";
Line.displayName = "Line";
Bar.displayName = "Bar";
