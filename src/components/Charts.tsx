import { useEffect, useRef, useState } from "react";
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
} from "chart.js";
import { TIME_BEFORE_RESET_FOCUS, barOptions, lineOptions, donutOptions } from "../utils/charts/options";
import { focusOnBar, focusOnLine, focusOndonut } from "../utils/charts/helpers";
import { findSum } from "@Utils/utils";
import { ChartCard } from "./ChartCard";
import { cssModules } from "@Components/styles";
import type { ChartData, ChartOptions } from "chart.js";
import type { MutableRefObject, ReactNode, FC } from "react";
import type { LineProps, BarProps, DonutProps, FocusActionsType, FocusStatesType } from "@Types";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement, BarElement);

type ChartProps = {
  isOpen: boolean;
  lines: ChartData<"line">;
  bars: ChartData<"bar">;
  donuts: ChartData<"doughnut">;
  focusActions: FocusActionsType;
  focusStates: FocusStatesType & { color: string };
};

const Charts = ({ isOpen, lines, bars, donuts, focusActions, focusStates }: ChartProps) => {
  // console.log("Charts");
  const intervalIdRef = useRef(null) as MutableRefObject<ReturnType<typeof setInterval> | null>; // NodeJS.Timeout

  const { focusMap, onlyOneFocus, color, noFocus } = focusStates;
  const { resetFocus } = focusActions;

  useEffect(() => {
    if (!noFocus) intervalIdRef.current = setInterval(handleResetFocus, TIME_BEFORE_RESET_FOCUS);
    return () => {
      if (intervalIdRef.current) clearInterval(intervalIdRef.current);
    };
  }, [focusMap]);

  const handleResetFocus = () => {
    if (onlyOneFocus) resetFocus(); // only one focused
    if (intervalIdRef.current) clearInterval(intervalIdRef.current); // if interval all ready set in useEffect, clear it, already have one
  };

  let focusedLine = lines,
    focusedBar = bars,
    focusedDonut = donuts;

  if (onlyOneFocus.focused) {
    focusedBar = focusOnBar(onlyOneFocus.index, bars);
    focusedLine = focusOnLine(onlyOneFocus.index, lines);
    focusedDonut = focusOndonut(onlyOneFocus.index, donuts);
  }

  const finalColor = color || "rgba(255,255,255, 0.3)";

  return (
    <>
      <ChartsContainer isOpen={isOpen}>
        <ChartCard color={finalColor} type="line" drag>
          <Line data={onlyOneFocus ? focusedLine : lines} options={lineOptions} type="line" />
        </ChartCard>

        <ChartCard color={finalColor} type="bar" drag>
          <Bar data={onlyOneFocus ? focusedBar : bars} options={barOptions} type="bar" />
        </ChartCard>

        <ChartCard color={finalColor} type="donut" drag>
          <Doughnut data={onlyOneFocus ? focusedDonut : donuts} options={donutOptions} type="donut" />
        </ChartCard>
      </ChartsContainer>
    </>
  );
};

export default Charts;

type LocalChartType = "donut" | "line" | "bar";
type ChildWithProps = ReactNode & { props: { type: LocalChartType } };
type Props = {
  children: ChildWithProps[] | ChildWithProps;
  isOpen: boolean;
  // color: string;
  // type: Extract<CardStyleType, "default" | "default-back" | "donut" | "line" | "bar">;
};
const ChartsContainer: FC<Props> = ({ children, isOpen }) => {
  return <section className="charts-ctn">{isOpen && children}</section>;
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
