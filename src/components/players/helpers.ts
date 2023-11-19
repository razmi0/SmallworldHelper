import { KeyboardEvent, createRef } from "react";
import styles from "./_.module.css";

// KEYBOARD NAVIGATION
//--
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

export const navigateTo = (
  matrice: HTMLElement[],
  currentIndex: number,
  direction: "PREV" | "NEXT" | "" = ""
) => {
  switch (direction) {
    case "PREV":
      currentIndex - 1 >= 0
        ? matrice[currentIndex - 1].focus()
        : matrice[matrice.length - 1].focus();
      break;
    case "NEXT":
      currentIndex + 1 < matrice.length ? matrice[currentIndex + 1].focus() : matrice[0].focus();
      break;
    default:
      matrice[currentIndex].focus();
      break;
  }
};

// VALIDATION
//--

export const isDeletable = (e: KeyboardEvent<HTMLInputElement | HTMLButtonElement>) => {
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

// BLUR FOCUS LOGIC
//--

export const blurInput = (inputsRefs: HTMLInputElement[]) => {
  inputsRefs.map((input) => {
    if (input) {
      input.blur();
    }
  });
};

export const initInputsRefs = (size: number) => {
  return new Array(size)
    .fill(null)
    .map(() => createRef<HTMLInputElement>()) as unknown as HTMLInputElement[];
};

// UI
//--
export const getCardStyles = () => {
  return `${styles["list-element-ctn"]} ${styles["board-card"]} grainy lin-dark global-grainy shadow-ctn`;
};

export const getCardViewTransition = (id: string, duration: string) => `
  ::view-transition-new(player-card${id}) {
    animation-duration: ${duration}s;
    animation-fill-mode: forwards;
    animation-name: player-card-animation;
  }
  ::view-transition-old(player-card${id}) {
    display: none;
  }
  @keyframes player-card-animation {
    0% {
      scale: 1;
    }
    50% {
      scale: 1.01;
      opacity: 0.95;
    }
    100% {
      scale: 1;
      opacity: 1;
    }
  }
`;
