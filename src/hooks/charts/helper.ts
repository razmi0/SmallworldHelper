import { ChartData } from "chart.js";
import { addOpacityToHex } from "../../utils";

const OPACITY_UNFOCUS_FACTOR = 0.05;

export const focusOnLine = (Index: number, data: ChartData<"line">) => {
  const newDatasets = data.datasets.map((dataset, i) => {
    const color = dataset.backgroundColor as string;
    const borderColor = dataset.borderColor as string;
    if (i === Index) {
      return {
        ...dataset,
        backgroundColor: addOpacityToHex(color),
        borderColor: addOpacityToHex(borderColor),
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
    i !== index ? addOpacityToHex(color, OPACITY_UNFOCUS_FACTOR) : color
  );
  const newDatasets = data.datasets.map((dataset) => {
    return { ...dataset, backgroundColor: newColors };
  });
  return { ...data, datasets: newDatasets };
};

export const focusOnBar = (Index: number, data: ChartData<"bar">) => {
  const newDatasets = data.datasets.map((dataset) => {
    const colors = dataset.backgroundColor as string[];
    const newColors = colors.map((color, j) =>
      j !== Index ? addOpacityToHex(color, OPACITY_UNFOCUS_FACTOR) : color
    );
    return { ...dataset, backgroundColor: newColors, borderColor: newColors };
  });
  return { ...data, datasets: newDatasets };
};
