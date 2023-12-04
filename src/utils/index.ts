import { manageStorage } from "./storage";
import {
  add4dToHex,
  addOpacityToHex,
  debounce,
  throttle,
  findAverage,
  findMax,
  findMaxNbrTurns,
  findMin,
  findSum,
  getFromLocalStorage,
  getRandomColor,
  hexToRgba,
  isDevEnv,
  removeOpacityFromHex,
  saveToLocalStorage,
  beautify,
  isProdEnv,
} from "./utils";

/* */

export {
  beautify,
  /* COLORS */
  add4dToHex,
  addOpacityToHex,
  hexToRgba,
  getRandomColor,
  removeOpacityFromHex,
  /* DEV */
  isDevEnv,
  isProdEnv,
  /* LOCALSTORAGE */
  saveToLocalStorage,
  getFromLocalStorage,
  /* MATH */
  findAverage,
  findMax,
  findMin,
  findSum,
  findMaxNbrTurns,
  /* HIGH ORDER FUNCTION */
  debounce,
  throttle,
  /* STORAGE */
  manageStorage,
};
