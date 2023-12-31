import { createRef } from "react";
import type { KeyboardEvent } from "react";

export type PointerType = "click" | "blur" | "focus" | "enter" | "leave";

export type EventsManagerType<Arguments extends unknown[]> = {
  blur: (...arg: Arguments) => void;
  focus: (...arg: Arguments) => void;
  click: (...arg: Arguments) => void;
  enter: (...arg: Arguments) => void;
  leave: (...arg: Arguments) => void;
};

// KEYBOARD NAVIGATION
//--
export type KeysType = "Enter" | "Backspace" | "ArrowUp" | "ArrowRight" | "ArrowDown" | "ArrowLeft" | "Tab" | "Escape";

export const keys = {
  ENTER: "Enter",
  BACKSPACE: "Backspace",
  ARROW_UP: "ArrowUp",
  ARROW_RIGHT: "ArrowRight",
  ARROW_DOWN: "ArrowDown",
  ARROW_LEFT: "ArrowLeft",
  TAB: "Tab",
  ESCAPE: "Escape",
};
export const keyHandlers = Object.values(keys) as KeysType[];
export const pointers = {
  CLICK: "click",
  MOUSE_DOWN: "mousedown",
  MOUSE_UP: "mouseup",
  MOUSE_MOVE: "mousemove",
  MOUSE_ENTER: "mouseenter",
  MOUSE_LEAVE: "mouseleave",
  BLUR: "blur",
  FOCUS: "focus",
};

/**
 * [[0, 0, 0, 0] * 3]
 */
const ROW_SIZE = 4;

// const matrice = new Array(3).fill(null).map(() => new Array(4).fill(null));
export type Directions = "PREV" | "NEXT" | "RIGHT" | "LEFT" | "SELF";
export const navigateTo = (matrice: HTMLElement[], currentIndex: number, direction?: Directions) => {
  //
  switch (direction) {
    case "PREV":
      goPrev(matrice, currentIndex);
      break;

    //

    case "NEXT":
      goNext(matrice, currentIndex);
      break;

    //

    case "RIGHT": {
      const wantedIndex = currentIndex + ROW_SIZE;
      if (wantedIndex > matrice.length) return;
      else goWanted(matrice, wantedIndex);
      break;
    }

    //

    case "LEFT": {
      const wantedIndex = currentIndex - ROW_SIZE;
      if (wantedIndex < 0) return;
      else goWanted(matrice, wantedIndex);
      break;
    }

    case "SELF":
      goWanted(matrice, currentIndex);
      break;

    //
  }
};

const goLast = (matrice: HTMLElement[]) => {
  matrice[matrice.length - 1].focus();
};

const goFirst = (matrice: HTMLElement[]) => {
  matrice[0].focus();
};

const goWanted = (matrice: HTMLElement[], wantedIndex: number) => {
  matrice[wantedIndex].focus();
};

const goPrev = (matrice: HTMLElement[], currentIndex: number) => {
  const wantedIndex = currentIndex - 1;
  wantedIndex >= 0 //
    ? goWanted(matrice, wantedIndex) // not == 0 => focus
    : goLast(matrice); // == 0 => go last
};

const goNext = (matrice: HTMLElement[], currentIndex: number) => {
  const wantedIndex = currentIndex + 1;
  wantedIndex < matrice.length
    ? goWanted(matrice, wantedIndex) // not > to length => so focus
    : goFirst(matrice); // > to length => go first
};

// VALIDATION
//--

export const isDeletable = (e: KeyboardEvent<HTMLInputElement | HTMLButtonElement>) => {
  if (!e.currentTarget.value) return false;
  return e.key === "Backspace" && e.currentTarget.value.length === 1 ? true : false;
};

export const validateIntOnChange = (str: string) => {
  if (str === "-") return str;
  const valid = /^-?\d+$/.test(str);
  if (!valid) return;
  const num = Number(str);
  if (isNaN(num)) return;
  return num;
};

// BLUR FOCUS LOGIC
//--

export const blurInput = (inputsRefs: HTMLInputElement[]) => {
  inputsRefs.map((input) => {
    if (input) {
      input.blur();
    }
  });
};

export const createRefsArr = (size: number) => {
  return new Array(size).fill(null).map(() => createRef<HTMLInputElement>()) as unknown as HTMLInputElement[];
};
