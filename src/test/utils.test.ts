import { describe, it, expect, vitest } from "vitest";

// TESTED VARS HELPERS
//--
const __TEST_HEX_REG = /^#([A-Fa-f0-9]{8}|[A-Fa-f0-9]{3})$/i;
const __TEST_RGBA_COLORS = [
  "rgba(0, 0, 0, 1)",
  "rgba(255, 255, 255, 1)",
  "rgba(255, 0, 0, 1)",
  "rgba(0, 255, 0, 1)",
  "rgba(0, 0, 255, 1)",
  "rgba(255, 255, 0, 1)",
  "rgba(0, 255, 255, 1)",
  "rgba(255, 0, 255, 1)",
];
const __TEST_HEX_COLORS = [
  "#000000FF",
  "#FFFFFFFF",
  "#FF0000FF",
  "#00FF00FF",
  "#0000FFFF",
  "#FFFF00FF",
  "#00FFFFFF",
  "#FF00FFFF",
];
const __TEST_FIND_MAX_LENGTH_HISTORY_ITEM: HistoryItem[] = [
  { history: [1, 2, 3, 4, 5, 6, 7, 8, 9] },
  { history: [1, 2, 3, 4] },
  { history: [1, 2, 3, 4, 5, 6, 7] },
];
// TESTED FUNCTIONS
//--
const getRandomColor = (opacity: number = 1) => {
  const randomRgba = `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(
    Math.random() * 255
  )}, ${Math.floor(Math.random() * 255)}, ${opacity})`;
  console.warn("random color");
  return rgbaToHex(randomRgba);
};

describe("getRandomColor", () => {
  it("should return a random color", () => {
    const color = getRandomColor();
    expect(color).toMatch(__TEST_HEX_REG);
  });
  it("should return a random color with opacity", () => {
    const color = getRandomColor(0.5);
    expect(color).toMatch(__TEST_HEX_REG);
  });
});

/* rgbaToHex tested in getRandomColor */
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

describe("rgbaToHex", () => {
  it("should return an array of hex color similar to expectedColors", () => {
    const colors = __TEST_RGBA_COLORS.map((color) => rgbaToHex(color));
    expect(colors).toMatchObject(__TEST_HEX_COLORS);
  });
});

const hexToRgba = (hex: string, opacity = 1) => {
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

describe("hexToRgba", () => {
  it("should return an array of rgba color similar to expectedColors", () => {
    const colors = __TEST_HEX_COLORS.map((color) => hexToRgba(color));
    expect(colors).toMatchObject(__TEST_RGBA_COLORS);
  });
});

/** Add 4d at the end of an hex */
const add4dToHex = (color: string = "#fff") => {
  return color + "4d";
};

describe("add4dToHex", () => {
  it("should return a string with 4d at the end", () => {
    const str = add4dToHex("#fff");
    expect(str).toMatch("#fff4d");
  });
});

const addOpacityToHex = (color: string = "#fff", opacity: number = 1) => {
  color = color.replace("#", "");
  opacity = Math.min(1, Math.max(0, opacity));
  const alphaHex = Math.round(opacity * 255)
    .toString(16)
    .toUpperCase();
  const alphaChannel = alphaHex.length === 1 ? `0${alphaHex}` : alphaHex;
  const colorWithAlpha = `#${color}${alphaChannel}`;
  return colorWithAlpha;
};

describe("addOpacityToHex", () => {
  it("should return a string with 80 at the end", () => {
    const str = addOpacityToHex("#fff", 0.5);
    expect(str).toMatch("#fff80");
  });
});

type HistoryItem = {
  history: number[];
};
const findMaxNbrTurns = (arr: HistoryItem[] | []) => {
  if (arr.length === 0) return 0;
  let max = arr[0].history.length;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].history.length > max) {
      max = arr[i].history.length;
    }
  }
  return max;
};

describe("findMaxNbrTurns", () => {
  it("should return 0", () => {
    const max = findMaxNbrTurns([]);
    expect(max).toBe(0);
  });
  it("should return 9", () => {
    const max = findMaxNbrTurns(__TEST_FIND_MAX_LENGTH_HISTORY_ITEM);
    expect(max).toBe(9);
  });
});

type F<T extends unknown[] = unknown[]> = (...args: T) => unknown | void;
const debounce = <T extends unknown[]>(fn: F<T>, delay: number) => {
  let timerId: ReturnType<typeof setTimeout>;
  return function (...args: T) {
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      fn(...args);
    }, delay);
  };
};

describe("debounce", () => {
  it("should return a function", () => {
    const fn = debounce(() => {}, 100);
    expect(typeof fn).toBe("function");
  });
  it("should execute the function after 100ms", () => {
    const fn = vitest.fn();
    const debouncedFn = debounce(fn, 100);
    debouncedFn();
    expect(fn).not.toBeCalled();
    setTimeout(() => {
      expect(fn).toBeCalled();
    }, 100);
  });
});