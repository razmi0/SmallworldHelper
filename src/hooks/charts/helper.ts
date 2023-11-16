import { ChartData } from "chart.js";
import { addOpacityToHex } from "../../utils";

const OPACITY_UNFOCUS_FACTOR = 0.05;

export const focusOnPlayerLine = (isFocus: boolean[], data: ChartData<"line">) => {
  const playerFocusedIndex = isFocus.findIndex((isF) => isF);
  if (playerFocusedIndex === -1 || !data) {
    return data;
  }
  const newDatasets = data.datasets.map((dataset, i) => {
    const playerColor = dataset.backgroundColor as string;
    const playerBorderColor = dataset.borderColor as string;
    if (i === playerFocusedIndex) {
      return {
        ...dataset,
        backgroundColor: addOpacityToHex(playerColor),
        borderColor: addOpacityToHex(playerBorderColor),
      };
    } else {
      return {
        ...dataset,
        backgroundColor: addOpacityToHex(playerColor, OPACITY_UNFOCUS_FACTOR),
        borderColor: addOpacityToHex(playerBorderColor, OPACITY_UNFOCUS_FACTOR),
      };
    }
  });
  return { ...data, datasets: newDatasets };
};

export const focusOnPlayerPie = (isFocus: boolean[], data: ChartData<"pie">) => {
  const playerFocusedIndex = isFocus.findIndex((isF) => isF);
  if (playerFocusedIndex === -1 || data.datasets.length === 0) {
    return data;
  }
  const colors = data.datasets[0].backgroundColor as string[];
  const newColors = colors.map((color, i) =>
    i !== playerFocusedIndex ? addOpacityToHex(color, OPACITY_UNFOCUS_FACTOR) : color
  );
  const newDatasets = data.datasets.map((dataset) => {
    return { ...dataset, backgroundColor: newColors };
  });
  return { ...data, datasets: newDatasets };
};

export const focusOnPlayerBar = (isFocus: boolean[], data: ChartData<"bar">) => {
  const playerFocusedIndex = isFocus.findIndex((isF) => isF);
  if (playerFocusedIndex === -1 || data.datasets.length === 0) {
    return data;
  }
  const newDatasets = data.datasets.map((dataset) => {
    const playersColors = dataset.backgroundColor as string[];
    const newColors = playersColors.map((color, j) =>
      j !== playerFocusedIndex ? addOpacityToHex(color, OPACITY_UNFOCUS_FACTOR) : color
    );
    return { ...dataset, backgroundColor: newColors, borderColor: newColors };
  });
  return { ...data, datasets: newDatasets };
};
