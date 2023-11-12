import { ComponentType, ReactNode } from "react";

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

export type PieData = {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string[];
    borderColor: string[];
    borderWidth: number;
  }[];
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
      get?: () => string;
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

export interface IconButtonProps extends IconProps {
  disabled?: boolean;
  onClick?: () => void;
  btnType?: "button" | "submit" | "reset";
  sx?: React.CSSProperties;
  animStartAt?: boolean;
  animStartState?: string;
  onMouseEnter?: () => void;
  id?: string | number;
  onFocus?: () => void;
  onBlur?: () => void;
  datatype?: KeyboardNavigationIdType;
  onKeyUp?: (e: React.KeyboardEvent<HTMLButtonElement>) => void;
}

export type PlayerState = {
  players: Player[];
  lines: LineData;
  bars: BarData;
  pies: PieData;
};

export type FullSetterType = [Player[], LineData, BarData, PieData];

export type ContainerProps = {
  children: ReactNode;
};
