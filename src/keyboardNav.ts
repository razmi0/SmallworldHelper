import { KeyboardNavigationIdType } from "./types";

// KEYBOARD
//--
type NavigableElement = HTMLInputElement | HTMLButtonElement;
const getDatatypesElement = (datatype: KeyboardNavigationIdType) => {
  const query = `[datatype=${datatype}]`;
  const res = Array.from(document.querySelectorAll<NavigableElement>(query));
  console.log("res", res);
  return res;
};

export const findNextPlayer = (targetId: string): NavigableElement => {
  const softs = getDatatypesElement("soft-input");
  const softIndex = softs.findIndex((soft) => soft.id === targetId);
  if (softIndex === -1) {
    throw new Error("SoftInput not found");
  }
  const nextSoftInput = softIndex + 1 < softs.length ? softs[softIndex + 1] : softs[0];
  return nextSoftInput;
};

export const findPrevPlayer = (targetId: string): NavigableElement => {
  const softs = getDatatypesElement("soft-input");
  const softIndex = softs.findIndex((soft) => soft.id === targetId);
  if (softIndex === -1) {
    throw new Error("SoftInput not found");
  }
  const previousSoftInput = softIndex - 1 >= 0 ? softs[softIndex - 1] : softs[softs.length - 1];
  return previousSoftInput;
};

export const findRightUtils = (targetId: string): NavigableElement => {
  const utils = getDatatypesElement("utility").filter((util) => util.id[0] === targetId[0]);
  console.log("id", targetId);
  console.log("utils", utils);

  const utilsIndex = utils.findIndex((util) => util.id[2] === targetId[0]);
  if (utilsIndex === -1) {
    throw new Error("Utility not found");
  }
  const nextUtil = utilsIndex + 1 < utils.length ? utils[utilsIndex + 1] : utils[0];
  return nextUtil;
};

export const findLeftUtils = (targetId: string): NavigableElement => {
  const utils = getDatatypesElement("utility").filter((util) => util.id === targetId[0]);
  console.log("id", targetId);

  const utilsIndex = utils.findIndex((util) => util.id === targetId[0]);
  if (utilsIndex === -1) {
    throw new Error("Utility not found");
  }
  const prevUtil = utilsIndex - 1 >= 0 ? utils[utilsIndex - 1] : utils[utils.length - 1];
  return prevUtil;
};

export const navigateTo = (element: HTMLElement) => {
  element.focus();
  console.log("element", element);
};
