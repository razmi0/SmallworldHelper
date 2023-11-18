import { ChartData, ChartOptions } from "chart.js";
import { HTMLAttributes, ButtonHTMLAttributes, ComponentType, ReactNode } from "react";

export type Player = {
  id: number;
  name: string;
  victoryPtn: number;
  history: number[];
  addedScores: number[];
  rankChange: number;
  color: string;
  max: number;
  min: number;
  avg: number;
  sum: number;
};

export type LineData = {
  labels: string[]; // x-axis & ...turns
  datasets: {
    label: string; // player name
    data: number[]; // history
    backgroundColor: string; // player color
    borderColor: string; // player color with opacity
  }[];
};

export type BarData = {
  labels: string[]; // x-axis & players name
  datasets: {
    label: string; // maxscore, minscore, average
    data: number[]; // treated data from Player['addedScores'] [fn maxscoredata, fn minscoredata, fn average data]
    backgroundColor: string[]; // player color with opacity
    borderColor: string[]; // player color
    borderWidth: number;
  }[];
};

export type DonutData = {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string[];
    borderColor: string[];
    borderWidth: number;
  }[];
};

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

export type DonutProps = {
  data: ChartData<"doughnut">;
  options: ChartOptions<"doughnut">;
  theme?: "light" | "dark";
};

// ICONS
//--

export type SvgProps = {
  color: string;
  size: [string, string];
  bgColor?: string;
};

export type SvgDataType = {
  nbrOfIcons?: number;
  size: [string, string]; // width, height in px
  filter?: [string, string]; // dropshadow
  scale?: string; // scale factor for the dropshadow
  transition?: string; // transition for the dropshadow
  bezierParams?: [number, number]; // bezier factor for the animation
  gap?: string; // gap between icons in px
  subscribeColors?: () => Generator<string, never, string>;
  maxZIndex?: number;
  icons: {
    [key: string]: {
      index?: number;
      color: [string, string]; // light dark
      label?: string; // label of the icon
      transform?: () => string;
      transition?: () => string;
      zIndex?: () => number;
      getAnimation?: () => string;
      message?: string;
    };
  };
  animations?: {
    [key: string]: {
      name: string;
      duration: number;
      timing: string;
      delay: number;
      iteration: string;
      direction: string;
      keyframes?: string;
      getAnimation?: () => string;
    };
  };
};

export type VariantType = "utility" | "nav" | "chart" | "player" | "heading" | "";
export interface IconProps {
  icon: ComponentType<SvgProps>;
  iconName: IconName;
  sx?: React.CSSProperties;
  className?: string;
  svgData?: SvgDataType;
  variant?: VariantType;
  disabled?: boolean;
  message?: string;
}

export interface IconHeadingProps {
  icon: ComponentType<SvgProps>;
  color: string;
  svgData?: SvgDataType;
  className?: string;
  bgColor?: string;
  animationName?: string;
  isHover?: boolean;
  i?: number;
  variant?: VariantType;
}

export type IconName =
  | "menu"
  | "theme"
  | "load"
  | "save"
  | "addplayer"
  | "chart"
  | "eyes"
  | "reset"
  | "delete"
  | "undo"
  | "redo";

export type KeyboardNavigationIdType = "soft-input" | "utility";

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, IconProps {
  datatype?: string; // not a standard button attribute ?
  btnType?: string;
  animStartAt?: boolean;
  animStartState?: string;
}

export type PlayerState = {
  players: Player[];
  lines: LineData;
  bars: BarData;
  donuts: DonutData;
};

export type FullSetterType = [Player[], LineData, BarData, DonutData];

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export type UndoRedoActions<T> = {
  undo: () => void;
  redo: () => void;
  setState: (newState: T) => void;
};

export type UndoRedoStates<T> = {
  past: T[];
  present: T;
  future: T[];
  nbrOfUndos: number;
  nbrOfRedos: number;
  isUndoPossible: boolean;
  isRedoPossible: boolean;
};
