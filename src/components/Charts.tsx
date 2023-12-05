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
import { useMidState, useMidAction } from "@Context/useMid";
import {
  TIME_BEFORE_RESET_FOCUS,
  barOptions,
  lineOptions,
  donutOptions,
} from "../utils/charts/options";
import { ChartContainer } from "@Components/Containers";
import { focusOnBar, focusOnLine, focusOndonut } from "../utils/charts/helpers";
import { findSum } from "@Utils/utils";
import { cssModules } from "@Components/styles";
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

type ChartProps = {
  isOpen: boolean;
  lines: ChartData<"line">;
  bars: ChartData<"bar">;
  donuts: ChartData<"doughnut">;
};
const Charts = ({ isOpen, lines, bars, donuts }: ChartProps) => {
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
    focusedDonut = donuts,
    focusedColor = "rgba(255,255,255, 0.3)";

  if (currentlyFocused) {
    const focusedIndex = isFocus.findIndex((isFocused) => isFocused);
    focusedBar = focusOnBar(focusedIndex, bars);
    focusedLine = focusOnLine(focusedIndex, lines);
    focusedDonut = focusOndonut(focusedIndex, donuts);
    focusedColor = findFocusedColor(focusedDonut) || "rgba(255,255,255, 0.3)";
  }

  return (
    <ChartContainer isOpen={isOpen} color={focusedColor}>
      <Line data={currentlyFocused ? focusedLine : lines} options={lineOptions} type="line" />
      <Bar data={currentlyFocused ? focusedBar : bars} options={barOptions} type="bar" />
      <Doughnut
        data={currentlyFocused ? focusedDonut : donuts}
        options={donutOptions}
        type="donut"
      />
    </ChartContainer>
  );
};

export default Charts;
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
      className={`${cssModules.chart["donut-total-vc-ptn"]}`}
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
    <div onClick={handleToggleAxis}>
      <ChartBar data={data} options={optionsState} />
    </div>
  );
};

const findFocusedColor = (data: ChartData<"doughnut">) => {
  const bgColors = data.datasets?.[0].backgroundColor as string[];
  return bgColors.find((color) => color.length === 7 /* no alpha => isFocused */);
};

Doughnut.displayName = "Doughnut";
Line.displayName = "Line";
Bar.displayName = "Bar";
