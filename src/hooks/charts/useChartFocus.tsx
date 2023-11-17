import { useReducer, useCallback, useEffect, useState } from "react";
import { focusOnBar, focusOnLine, focusOnPie } from "./helper";
import { useMidState } from "../";
import { initialPlayerStates } from "../players/usePlayer";
import { ChartData } from "chart.js";

export type ChartsDataStates = {
  lines: ChartData<"line">;
  bars: ChartData<"bar">;
  pies: ChartData<"pie">;
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
      const focusedPie = focusOnPie(focusedIndex, chartData.pies as ChartData<"pie">);

      return {
        ...state,
        bars: focusedBar,
        lines: focusedLine,
        pies: focusedPie,
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
    pies: initialPlayerStates.pieData(),
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
    focusedPies: chartData.pies,
    setChartState,
  };
};
