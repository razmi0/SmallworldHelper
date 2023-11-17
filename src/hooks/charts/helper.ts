import { ChartData } from "chart.js";
import { addOpacityToHex, removeOpacityFromHex } from "@Utils";

const OPACITY_UNFOCUS_FACTOR = 0.05;

export const focusOnLine = (index: number, data: ChartData<"line">) => {
  const newDatasets = data.datasets.map((dataset, i) => {
    const color = dataset.backgroundColor as string;
    const borderColor = dataset.borderColor as string;
    if (i === index) {
      return {
        ...dataset,
        backgroundColor: removeOpacityFromHex(color),
        borderColor: addOpacityToHex(borderColor, 1),
      };
    } else {
      return {
        ...dataset,
        backgroundColor: addOpacityToHex(color, OPACITY_UNFOCUS_FACTOR),
        borderColor: addOpacityToHex(borderColor, OPACITY_UNFOCUS_FACTOR),
      };
    }
  });
  return { ...data, datasets: newDatasets };
};

export const focusOnPie = (index: number, data: ChartData<"pie">) => {
  const colors = data.datasets[0].backgroundColor as string[];
  const newColors = colors.map((color, i) =>
    i !== index ? addOpacityToHex(color, OPACITY_UNFOCUS_FACTOR) : removeOpacityFromHex(color)
  );
  const newDatasets = data.datasets.map((dataset) => {
    return { ...dataset, backgroundColor: newColors };
  });
  return { ...data, datasets: newDatasets };
};

export const focusOnBar = (index: number, data: ChartData<"bar">) => {
  const newDatasets = data.datasets.map((dataset) => {
    const colors = dataset.backgroundColor as string[];
    const newColors = colors.map((color, j) =>
      j !== index ? addOpacityToHex(color, OPACITY_UNFOCUS_FACTOR) : removeOpacityFromHex(color)
    );
    return { ...dataset, backgroundColor: newColors, borderColor: newColors };
  });
  return { ...data, datasets: newDatasets };
};
