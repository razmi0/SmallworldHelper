import { KeyboardEvent } from "react";

export const keys = {
  ENTER: "Enter",
  BACKSPACE: "Backspace",
  ARROW_UP: "ArrowUp",
  ARROW_RIGHT: "ArrowRight",
  ARROW_DOWN: "ArrowDown",
  ARROW_LEFT: "ArrowLeft",
  TAB: "Tab",
};

// VALIDATION
//--

export const isDeletable = (e: KeyboardEvent<HTMLInputElement>) => {
  return e.key === "Backspace" && e.currentTarget.value.length === 1 ? true : false;
};

export const validateOnChange = (str: string) => {
  if (str === "-") return str;
  const valid = /^-?\d+$/.test(str);
  if (!valid) return;
  const num = Number(str);
  if (isNaN(num)) return;
  return num;
};
