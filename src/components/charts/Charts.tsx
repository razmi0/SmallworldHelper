import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
  ArcElement,
  BarElement,
} from "chart.js";
import { Line as ChartLine, Pie as ChartPie, Bar as ChartBar } from "react-chartjs-2";
import { useIntermediate } from "../../hooks";
import { addOpacityToHex } from "../../utils";
import { useEffect, useState } from "react";

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

export type LineProps = {
  data: ChartData<"line">;
  options: ChartOptions<"line">;
  theme?: "light" | "dark";
};

export type BarProps = {
  data: ChartData<"bar">;
  options: ChartOptions<"bar">;
  theme?: "light" | "dark";
};

export type PieProps = {
  data: ChartData<"pie">;
  options: ChartOptions<"pie">;
  theme?: "light" | "dark";
};

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
        backgroundColor: addOpacityToHex(playerColor, 0.1),
        borderColor: addOpacityToHex(playerBorderColor, 0.1),
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
    i !== playerFocusedIndex ? addOpacityToHex(color, 0.1) : color
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
      j !== playerFocusedIndex ? addOpacityToHex(color, 0.1) : color
    );
    return { ...dataset, backgroundColor: newColors, borderColor: newColors };
  });
  return { ...data, datasets: newDatasets };
};

export const Line = ({ data, options /* theme = "dark" */ }: LineProps) => {
  const { isFocus } = useIntermediate();
  const [treatedData, setTreatedData] = useState<ChartData<"line">>(data);

  useEffect(() => {
    setTreatedData(focusOnPlayerLine(isFocus, data));
  }, [isFocus]);

  return <ChartLine data={treatedData} options={options} />;
};

export const Pie = ({ data, options /* theme = "dark" */ }: PieProps) => {
  const { isFocus } = useIntermediate();
  const [treatedData, setTreatedData] = useState<ChartData<"pie">>(data);

  useEffect(() => {
    setTreatedData(focusOnPlayerPie(isFocus, data));
  }, [isFocus]);

  return <ChartPie data={treatedData} options={options} />;
};

export const Bar = ({ data, options /* theme = "dark" */ }: BarProps) => {
  const { isFocus } = useIntermediate();
  const [treatedData, setTreatedData] = useState<ChartData<"bar">>(data);

  useEffect(() => {
    setTreatedData(focusOnPlayerBar(isFocus, data));
  }, [isFocus]);

  return <ChartBar data={treatedData} options={options} />;
};
