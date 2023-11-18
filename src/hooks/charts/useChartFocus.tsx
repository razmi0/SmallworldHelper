import { useReducer, useCallback, useEffect, useState } from "react";
import { focusOnBar, focusOnLine, focusOndonut } from "./helper";
import { useMidState } from "@Hooks";
import { initialPlayerStates } from "../players/usePlayer";
import { ChartData } from "chart.js";

export type ChartsDataStates = {
  lines: ChartData<"line">;
  donuts: ChartData<"doughnut">;
  bars: ChartData<"bar">;
};
type ChartFocusActions = {
  type: "FOCUS_ON_PLAYER_CHART";
  payload: { chartData: ChartsDataStates; isFocus: boolean[] };
};

const chartFocusReducer = (state: ChartsDataStates, action: ChartFocusActions) => {
  const { chartData, isFocus } = action.payload;
  switch (action.type) {
    case "FOCUS_ON_PLAYER_CHART": {
      const focusedIndex = isFocus.findIndex((isFocused) => isFocused);
      const focusedBar = focusOnBar(focusedIndex, chartData.bars as ChartData<"bar">);
      const focusedLine = focusOnLine(focusedIndex, chartData.lines as ChartData<"line">);
      const focuseddonut = focusOndonut(focusedIndex, chartData.donuts as ChartData<"doughnut">);

      return {
        ...state,
        bars: focusedBar,
        lines: focusedLine,
        donuts: focuseddonut,
      };
    }

    default:
      return state;
  }
};

export const useChartFocus = () => {
  const [chartData, dispatch] = useReducer(chartFocusReducer, {
    lines: initialPlayerStates.lineData(),
    bars: initialPlayerStates.barData(),
    donuts: initialPlayerStates.DonutData(),
  });
  const { isFocus } = useMidState();
  const [chartState, setChartState] = useState<ChartsDataStates>(chartData);

  const focusOnPlayerChart = useCallback((chartData: ChartsDataStates, isFocus: boolean[]) => {
    dispatch({ type: "FOCUS_ON_PLAYER_CHART", payload: { chartData, isFocus } });
  }, []);

  useEffect(() => {
    focusOnPlayerChart(chartState, isFocus);
  }, [isFocus, chartState]);

  return {
    focusedLines: chartData.lines,
    focusedBars: chartData.bars,
    focuseddonuts: chartData.donuts,
    setChartState,
  };
};
