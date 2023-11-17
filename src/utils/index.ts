import {
  add4dToHex,
  addOpacityToHex,
  debounce,
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
  withViewTransition,
} from "./utils";

/* */

export {
  /* COLORS */
  add4dToHex,
  addOpacityToHex,
  hexToRgba,
  getRandomColor,
  removeOpacityFromHex,
  /* DEV */
  isDevEnv,
  /* LOCALSTORAGE */
  saveToLocalStorage,
  getFromLocalStorage,
  /* MATH */
  findAverage,
  findMax,
  findMin,
  findSum,
  findMaxNbrTurns,
  /* OTHER */
  withViewTransition,
  debounce,
};
