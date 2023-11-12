// import { describe, it, expect } from "vitest";
import { KeyboardNavigationIdType } from "./types";

// HELPERS
//--

const GROUP_OF_PLAYER_INPUTS_SIZE = 3;

/**
 * @important For the moment datatype attribute is only used for keyboard navigation so be carefull
 * ( see if I implement custom attr like navigeable for exemple)
 */

// KEYBOARD
//--
type ButtonOrInput = HTMLInputElement | HTMLButtonElement;
type NavigableElement<T extends ButtonOrInput = ButtonOrInput> = T & {
  attributes: {
    datatype?: KeyboardNavigationIdType;
  };
};
/**
 * @returns all navigable elements as an array
 */
const getNavigableElements = () => {
  const queryAll = "[datatype]";
  const navigables = Array.from(document.querySelectorAll<NavigableElement>(queryAll));
  return buildNavigableMatrice(navigables);
};

/**
 * @returns [
 *              [1, 2, 3],
 *              [4, 5, 6],
 *              [7, 8, 9],
 *                 ...
 *          ]
 */
const buildNavigableMatrice = (navigables: NavigableElement[]): NavigableElement[][] => {
  // [ [1, 2, 3], [4, 5, 6], [7, 8, 9] ]
  const matrice = [];
  let row = [];
  for (let i = 0; i < navigables.length; i++) {
    if (i % GROUP_OF_PLAYER_INPUTS_SIZE === 0 && i !== 0) {
      matrice.push(row);
      row = [];
    }
    row.push(navigables[i]);
  }
  matrice.push(row);
  return matrice;
};

export const findNextPlayer = (targetId: string): NavigableElement => {
  const navigableMatrice = getNavigableElements();
  const currentPlayer = Number(targetId[0]);
  const nextPlayerIndex = goLastOrFirstIndex(currentPlayer, navigableMatrice.length, "right");
  return navigableMatrice[nextPlayerIndex][0];
};

export const findPrevPlayer = (targetId: string): NavigableElement => {
  const navigableMatrice = getNavigableElements();
  const currentPlayer = Number(targetId[0]);
  const prevPlayerIndex = goLastOrFirstIndex(currentPlayer, navigableMatrice.length, "left");
  return navigableMatrice[prevPlayerIndex][0];
};

export const findRightUtils = (targetId: string): NavigableElement => {
  const navigableMatrice = getNavigableElements();
  const currentPlayer = Number(targetId[0]);
  const currentUtil = Number(targetId[2]);
  if (isNaN(currentUtil)) {
    return navigableMatrice[currentPlayer][1];
  }
  const nextTargetIndex = goLastOrFirstIndex(
    currentUtil,
    navigableMatrice[currentPlayer].length,
    "right"
  );
  return navigableMatrice[currentPlayer][nextTargetIndex];
};

export const findLeftUtils = (targetId: string): NavigableElement => {
  const navigableMatrice = getNavigableElements();
  const currentPlayer = Number(targetId[0]);
  const currentUtil = Number(targetId[2]);

  if (isNaN(currentUtil)) {
    return navigableMatrice[currentPlayer][2];
  }
  const nextTargetIndex = goLastOrFirstIndex(
    currentUtil,
    navigableMatrice[currentPlayer].length,
    "left"
  );
  return navigableMatrice[currentPlayer][nextTargetIndex];
};

export const navigateTo = (element: HTMLElement) => {
  console.log(element);
  element.focus();
};

// const returnNbrFromId = (id: string) => {
//   const idArray = id
//     .split(".")
//     .filter((el) => !isNaN(Number(el)))
//     .map((el) => Number(el));

//   return idArray;
// };

const goLastOrFirstIndex = (currentIndex: number, size: number, direction: "left" | "right") => {
  if (direction === "right") {
    return currentIndex + 1 < size ? currentIndex + 1 : 0;
  }
  return currentIndex - 1 >= 0 ? currentIndex - 1 : size - 1;
};

// describe("returnNbrFromId", () => {
//   it("should return an array of number", () => {
//     const id = "1.1";
//     const result = returnNbrFromId(id);
//     expect(result).toBe([1, 1]);
//   });
// });
