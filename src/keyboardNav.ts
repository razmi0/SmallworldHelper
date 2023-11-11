import { KeyboardNavigationIdType } from "./types";

// HELPERS
//--

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
    if (i % 3 === 0 && i !== 0) {
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

  // we jump to player[currentPlayer + 1][0] except if currentPlayer === matrice.length -1 we jump to the first player
  const nextPlayerIndex = currentPlayer + 1 < navigableMatrice.length ? currentPlayer + 1 : 0;
  return navigableMatrice[nextPlayerIndex][0];
};

export const findPrevPlayer = (targetId: string): NavigableElement => {
  const navigableMatrice = getNavigableElements();
  const currentPlayer = Number(targetId[0]);

  // we jump to player[currentPlayer - 1][O] except if currentPlayer === 0 we jump to the last player
  const prevPlayerIndex = currentPlayer - 1 >= 0 ? currentPlayer - 1 : navigableMatrice.length - 1;
  return navigableMatrice[prevPlayerIndex][0];
};

export const findRightUtils = (targetId: string): NavigableElement => {
  const navigableMatrice = getNavigableElements();
  const currentPlayer = Number(targetId[0]);
  const currentUtil = Number(targetId[2]);
  if (isNaN(currentUtil)) {
    // we are on player[currentplayer][0] so we go to player[currentPlayer][1]
    return navigableMatrice[currentPlayer][1];
  }
  // we are on player[currentplayer][currentUtil] so we go to player[currentPlayer][currentUtil + 1]
  // except if we are on the last util of the row we jump to the [0] element
  const nextUtilIndex =
    currentUtil + 1 < navigableMatrice[currentPlayer].length ? currentUtil + 1 : 0;
  return navigableMatrice[currentPlayer][nextUtilIndex];
};

export const findLeftUtils = (targetId: string): NavigableElement => {
  const navigableMatrice = getNavigableElements();
  const currentPlayer = Number(targetId[0]);
  const currentUtil = Number(targetId[2]);
  if (isNaN(currentUtil)) {
    // we are on player[currentplayer][0] so we go to player[currentPlayer][2]
    return navigableMatrice[currentPlayer][2];
  }
  // we are on player[currentplayer][currentUtil] so we go to player[currentPlayer][currentUtil - 1]
  // except if we are on the first element [0] of the row we jump to the last element
  const prevUtilIndex =
    currentUtil - 1 >= 0 ? currentUtil - 1 : navigableMatrice[currentPlayer].length - 1;
  return navigableMatrice[currentPlayer][prevUtilIndex];
};

export const navigateTo = (element: HTMLElement) => {
  element.focus();
};
