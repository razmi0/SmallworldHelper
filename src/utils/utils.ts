import { flushSync } from "react-dom";

export const getRandomColor = (opacity: number = 1) => {
  const randomRgba = `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(
    Math.random() * 255
  )}, ${Math.floor(Math.random() * 255)}, ${opacity})`;
  console.warn("random color");
  return rgbaToHex(randomRgba);
};

const rgbaToHex = (orig: string) => {
  let a = "ff"; // Default alpha value at full opacity
  const rgb = orig.replace(/\s/g, "").match(/^rgba?\((\d+),(\d+),(\d+),?([^,\s)]+)?/i);
  const alpha = ((rgb && rgb[4]) || "").trim();

  // Convert RGB to Hex and pad with zeroes if necessary
  const hex = rgb
    ? (
        (1 << 24) +
        (parseInt(rgb[1], 10) << 16) +
        (parseInt(rgb[2], 10) << 8) +
        parseInt(rgb[3], 10)
      )
        .toString(16)
        .slice(1)
    : orig;

  // Convert alpha from range 0-1 to 0-255 then to hex, padding with zeroes if necessary
  if (alpha !== "") {
    a = Math.round(parseFloat(alpha) * 255).toString(16);
    a = a.length === 1 ? "0" + a : a;
  }

  return "#" + (hex + a).toUpperCase();
};

export const hexToRgba = (hex: string, opacity = 1) => {
  hex = hex.replace("#", "");
  // Parse the hex color
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);

  // If there is an alpha value in the hex color, use it by converting to decimal
  let a = opacity;
  if (hex.length === 8) {
    a = parseInt(hex.slice(6, 8), 16) / 255;
  }

  // Return the rgba color with the opacity
  return `rgba(${r}, ${g}, ${b}, ${a})`;
};

/** Add 4d at the end of an unsafe hex like string */
export const add4dToHex = (color: string = "#fff") => {
  if (color.length > 7) color = color.slice(0, 7);
  return color + "4d";
};

/** Add 4d at the end of an unsafe hex like string */
export const addOpacityToHex = (color: string = "#fff", opacity: number = 1) => {
  color = color.replace("#", "");
  if (color.length > 6) color = color.slice(0, 6);
  opacity = Math.min(1, Math.max(0, opacity));
  const alphaHex = Math.round(opacity * 255)
    .toString(16)
    .toUpperCase();
  const alphaChannel =
    alphaHex.length === 1 ? `0${alphaHex}` : alphaHex.length > 2 ? "FF" : alphaHex;
  const colorWithAlpha = `#${color}${alphaChannel}`;
  return colorWithAlpha;
};

export const removeOpacityFromHex = (color = "#fff") => {
  const newColor = color.slice(0, 7);
  return newColor;
};
type HistoryItem = {
  history: number[];
};
type HistoryItems = readonly HistoryItem[];

export const findMaxNbrTurns = (arr: HistoryItems | []) => {
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
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    return "Error saving session";
  }
};
/**
 * @param defaultValue: default value if nothing is found in localStorage
 */
export const getFromLocalStorage = <T>(key: string, defaultValue: T = [] as T) => {
  let error = "";
  let storedValue: T = defaultValue;

  try {
    const storedItem = window.localStorage.getItem(key);
    storedValue = storedItem !== null ? JSON.parse(storedItem) : defaultValue;
  } catch (e) {
    error = "Error loading session";
  }

  return { error, stored: storedValue };
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

export const throttle = <T extends unknown[]>(fn: F<T>, delay: number) => {
  let isThrottled = false;
  return function (...args: T) {
    if (isThrottled) return;
    isThrottled = true;
    fn(...args);
    setTimeout(() => {
      isThrottled = false;
    }, delay);
  };
};

export const isProdEnv = () => {
  return import.meta.env.PROD;
};

export const isDevEnv = () => {
  return import.meta.env.DEV;
};

export const beautify = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

export const arrayify = <T>(x: T | T[]): T[] => {
  return Array.isArray(x) ? x : ([x] as T[]);
};

//Array.isArray(children) ? children : [children];
