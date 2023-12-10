import { useEffect, useId, useRef, useState } from "react";
import { Line as ChartLine, Doughnut as ChartDonut, Bar as ChartBar } from "react-chartjs-2";
import Draggable from "react-draggable";
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
import {
  TIME_BEFORE_RESET_FOCUS,
  barOptions,
  lineOptions,
  donutOptions,
} from "../utils/charts/options";
import { focusOnBar, focusOnLine, focusOndonut } from "../utils/charts/helpers";
import { arrayify, findSum } from "@Utils/utils";
import { cssModules, getCardStyles } from "@Components/styles";
import type { ChartData, ChartOptions } from "chart.js";
import type { MutableRefObject, ReactNode, FC } from "react";
import type { LineProps, BarProps, DonutProps, FocusActionsType, FocusStatesType } from "@Types";

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
  focusActions: FocusActionsType;
  focusStates: FocusStatesType & { color: string };
};

const Charts = ({ isOpen, lines, bars, donuts, focusActions, focusStates }: ChartProps) => {
  console.log("Charts");
  const intervalIdRef = useRef(null) as MutableRefObject<ReturnType<typeof setInterval> | null>; // NodeJS.Timeout

  const { focusMap, onlyOneFocus, color, noFocus } = focusStates;
  const { resetFocus } = focusActions;

  useEffect(() => {
    if (noFocus) return;
    intervalIdRef.current = setInterval(handleResetFocus, TIME_BEFORE_RESET_FOCUS);
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

  return (
    <>
      <ChartContainer isOpen={isOpen} color={color || "rgba(255,255,255, 0.3)"}>
        <Line data={onlyOneFocus ? focusedLine : lines} options={lineOptions} type="line" />
        <Bar data={onlyOneFocus ? focusedBar : bars} options={barOptions} type="bar" />
        <Doughnut data={onlyOneFocus ? focusedDonut : donuts} options={donutOptions} type="donut" />
      </ChartContainer>
    </>
  );
};

export default Charts;

type LocalChartType = "donut" | "line" | "bar";
type ChildWithProps = ReactNode & { props: { type: LocalChartType } };
type Props = {
  children: ChildWithProps[] | ChildWithProps;
  isOpen: boolean;
  color: string;
};
const ChartContainer: FC<Props> = ({ children, isOpen, color }) => {
  const childrenArr = arrayify(children);
  const id = useId().replace(/:/g, "_");

  const back = getCardStyles("chart-back");
  const donutBack = getCardStyles("donut-back");

  const getClasses = (chartType: LocalChartType) => {
    if (chartType === "donut") return getCardStyles("donut");
    if (chartType === "line") return getCardStyles("bar");
    if (chartType === "bar") return getCardStyles("line");
  };

  return (
    <section className="charts-ctn">
      {isOpen &&
        children &&
        childrenArr.map((child, i) => {
          const chartType = child.props.type;
          const finalId = `${id}${chartType}`;

          const classes = getClasses(chartType);

          return (
            <Draggable>
              <div
                style={{ boxShadow: `0px 0px 1px 1px ${color}` }} // , borderRadius: "50%"
                key={i}
                className={chartType === "donut" ? donutBack : back}
              >
                <figure id={finalId} className={classes}>
                  {child}
                </figure>
              </div>
            </Draggable>
          );
        })}
    </section>
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
