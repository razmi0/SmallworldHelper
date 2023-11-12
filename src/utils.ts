// import { flushSync } from "react-dom";

import { flushSync } from "react-dom";

export const getRandomColor = (opacity: number = 1) => {
  const randomRgba = `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(
    Math.random() * 255
  )}, ${Math.floor(Math.random() * 255)}, ${opacity})`;
  console.warn("random color");
  return rgbaToHex(randomRgba);
};

export const rgbaToHex = (orig: string) => {
  let a: string;
  const rgb = orig.replace(/\s/g, "").match(/^rgba?\((\d+),(\d+),(\d+),?([^,\s)]+)?/i);
  const alpha = ((rgb && rgb[4]) || "").trim();
  let hex = rgb
    ? parseInt(rgb[1], 10).toString(16).slice(1) +
      parseInt(rgb[2], 10).toString(16).slice(1) +
      parseInt(rgb[3], 10).toString(16).slice(1)
    : orig;

  if (alpha !== "") {
    a = alpha;
  } else {
    a = "01"; // Default alpha value
  }
  // Multiply before converting to HEX
  a = (parseInt(a, 16) * 255).toString(16).slice(1);
  hex = hex + a;

  return "#" + hex;
};

export const hexToRgba = (hex: string, opacity: number = 1) => {
  const bigint = parseInt(hex.replace("#", ""), 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

/** Add 4d at the end of an hex */
export const add4dToHex = (color: string = "#fff") => {
  return color + "4d";
};

export const addOpacityToHex = (color: string = "#fff", opacity: number = 1) => {
  color = color.replace("#", "");
  opacity = Math.min(1, Math.max(0, opacity));
  const alphaHex = Math.round(opacity * 255)
    .toString(16)
    .toUpperCase();
  const alphaChannel = alphaHex.length === 1 ? `0${alphaHex}` : alphaHex;
  const colorWithAlpha = `#${color}${alphaChannel}`;
  return colorWithAlpha;
};

type HistoryItem = {
  history: number[];
};
export const findMaxNbrTurns = (arr: HistoryItem[] | []) => {
  if (arr.length === 0) return 0;
  let max = arr[0].history.length;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].history.length > max) {
      max = arr[i].history.length;
    }
  }
  return max;
};

export const saveToLocalStorage = <T>(key: string, value: T) => {
  window.localStorage.setItem(key, JSON.stringify(value));
};
/**
 * @param defaultValue: default value if nothing is found in localStorage
 */
export const getFromLocalStorage = <T>(key: string, defaultValue: T = [] as T): T => {
  const storedValue = window.localStorage.getItem(key);
  return storedValue !== null ? (JSON.parse(storedValue) as T) : defaultValue;
};

export const findAverage = (arr: number[]) => {
  const sum = arr.reduce((a, b) => a + b, 0);
  return sum / arr.length || 0;
};

export const findMax = (arr: number[]) => {
  return Math.max(...arr);
};

export const findMin = (arr: number[]) => {
  return Math.min(...arr);
};

export const findSum = (arr: number[]) => {
  return arr.reduce((a, b) => a + b, 0);
};

export const withViewTransition = <T>(fn: (args?: T) => void, args?: T) => {
  const isTransitionable = document.startViewTransition;
  if (!isTransitionable) {
    fn(args);
  } else {
    document.startViewTransition(() => {
      console.log("viewTranstion happening");
      flushSync(() => {
        fn(args);
      });
    });
  }
};

type F<T extends unknown[] = unknown[]> = (...args: T) => unknown | void;
export const debounce = <T extends unknown[]>(fn: F<T>, delay: number) => {
  let timerId: ReturnType<typeof setTimeout>;
  return function (...args: T) {
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      fn(...args);
    }, delay);
  };
};

export const isDevEnv = () => {
  return import.meta.env.DEV ? true : false;
};
