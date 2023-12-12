import type { ChartData, ChartOptions } from "chart.js";
import type { HTMLAttributes, ButtonHTMLAttributes, ComponentType, ReactNode, ElementType } from "react";
import type { KeysType, PointerType } from "@/utils/players/helpers";

export type EventsManagerType<Arguments extends unknown[]> = {
  [key in PointerType]: (...arg: Arguments) => void;
};

export interface PointerHandlerTypeWithArgs<Arguments extends unknown[]> {
  pointerHandlers: Partial<EventsManagerType<Arguments>>;
  args: Arguments;
}

export interface EventsManagerProps<Arguments extends unknown[]> extends ContainerProps {
  pointer: PointerHandlerTypeWithArgs<Arguments>;
  as?: ElementType;
}

export interface KeyboardHandlerTypeWithArgs<Arguments extends unknown[]> {
  // 2
  keyboardHandlers: Partial<KeyboardHandlerType<Arguments>>;
  args: Arguments;
}
export type KeyboardHandlerType<Arguments extends unknown[]> = {
  // 3
  [key in KeysType]: (target?: EventTarget, ...args: Arguments) => void;
};

export type EventTarget = HTMLInputElement | HTMLButtonElement;

export interface KeyboardManagerProps<Arguments extends unknown[]> extends ContainerProps {
  // 1
  keyboard: KeyboardHandlerTypeWithArgs<Arguments>;
  as?: ElementType;
}

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

export type LineDataType = {
  labels: string[]; // x-axis & ...turns
  datasets: {
    label: string; // player name
    data: number[]; // history
    backgroundColor: string; // player color
    borderColor: string; // player color with opacity
  }[];
};

export type BarDataType = {
  labels: string[]; // x-axis & players name
  datasets: {
    label: string; // maxscore, minscore, average
    data: number[]; // treated data from Player['addedScores'] [fn maxscoredata, fn minscoredata, fn average data]
    backgroundColor: string[]; // player color with opacity
    borderColor: string[]; // player color
    borderWidth: number;
  }[];
};

export type DonutDataType = {
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
  type: "line";
};

export type BarProps = {
  data: ChartData<"bar">;
  options: ChartOptions<"bar">;
  theme?: "light" | "dark";
  type: "bar";
};

export type DonutProps = {
  data: ChartData<"doughnut">;
  options: ChartOptions<"doughnut">;
  theme?: "light" | "dark";
  type: "donut";
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
  size?: [string, string]; // width, height in px
  filter?: [string, string]; // dropshadow
  scale?: string; // scale factor for the dropshadow
  transition?: string; // transition for the dropshadow
  bezierParams?: [number, number]; // bezier factor for the animation
  gap?: string; // gap between icons in px
  subscribeColors?: () => Generator<string, never, string>;
  maxZIndex?: number;
  backgroundColor?: string;
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
      size?: [string, string];
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

export type VariantType = "utility" | "nav" | "chart" | "player" | "heading" | "toaster" | "";
export interface IconProps {
  icon?: ComponentType<SvgProps>;
  iconName: IconName;
  sx?: React.CSSProperties;
  className?: string;
  svgData?: SvgDataType;
  variant?: VariantType;
  disabled?: boolean;
  message?: string;
}

export interface IconHeadingProps {
  icon?: ComponentType<SvgProps>;
  iconName: IconName;
  color: string;
  svgData?: SvgDataType;
  className?: string;
  bgColor?: string;
  animationName?: string;
  isHover?: boolean;
  i?: number;
  variant?: VariantType;
  children?: ReactNode;
}

export type IconName =
  | "menu"
  | "theme"
  | "load"
  | "save"
  | "addplayer"
  | "chart"
  | "eyeopen"
  | "eyeclose"
  | "reset"
  | "delete"
  | "undo"
  | "redo"
  | "close"
  | "star"
  | "github";
export type KeyboardNavigationIdType = "soft-input" | "utility";

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, IconProps {
  datatype?: string; // not a standard button attribute ?
  btnType?: string;
  animStartAt?: boolean;
  animStartState?: string;
  href?: string;
}

export type PlayerState = {
  players: Player[];
  lines: LineDataType;
  bars: BarDataType;
  donuts: DonutDataType;
};

export type FullSetterType = [Player[], LineDataType, BarDataType, DonutDataType];

export type FocusActionsType = {
  changeFocus: (index: number, value?: boolean) => void;
  changeFocusLength: (newLength: number, fillValue?: boolean) => void;
  resetFocus: () => void;
};
export type FocusStatesType = {
  onlyOneFocus: {
    index: number;
    focused: boolean;
  };
  focusMap: boolean[];
  noFocus: boolean;
};

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

export type NotificationTypeInComponent = Omit<NotificationType, "id" | "timeout">;
export type NotificationType = {
  id: number;
  message: string;
  type: "success" | "error" | "warning" | "info";
  timeout: number;
};
