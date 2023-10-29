export const getRandomColor = (opacity: number = 1) => {
  const randomRgba = `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(
    Math.random() * 255
  )}, ${Math.floor(Math.random() * 255)}, ${opacity})`;
  return rgbaToHex(randomRgba);
};

const rgbaToHex = (orig: string) => {
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

export const saveToLocalStorage = (key: string, value: unknown) => {
  window.localStorage.setItem(key, JSON.stringify(value));
};
export const getFromLocalStorage = (key: string) => {
  return JSON.parse(window.localStorage.getItem(key) || "null");
};
