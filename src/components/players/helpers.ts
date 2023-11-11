import { KeyboardEvent } from "react";
import { throwError } from "../../utils";

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

// KEYBOARD
//--
type InputName = '[name="soft-input"]' | '[datatype="utility"]';
const allInputsType = (name: InputName) => {
  const res = Array.from(document.querySelectorAll<HTMLInputElement>(name));
  console.log("res", res);
  return res;
};

export const findNextPlayer = (targetId: string): HTMLInputElement => {
  const softs = allInputsType('[name="soft-input"]');
  const softIndex = softs.findIndex((soft) => soft.id === targetId);
  if (softIndex === -1) {
    throwError("SoftInput not found");
  }
  const nextSoftInput = softIndex + 1 < softs.length ? softs[softIndex + 1] : softs[0];
  return nextSoftInput;
};

export const findPrevPlayer = (targetId: string): HTMLInputElement => {
  const softs = allInputsType('[name="soft-input"]');
  const softIndex = softs.findIndex((soft) => soft.id === targetId);
  if (softIndex === -1) {
    throwError("SoftInput not found");
  }
  const previousSoftInput = softIndex - 1 >= 0 ? softs[softIndex - 1] : softs[softs.length - 1];
  return previousSoftInput;
};

export const findRightUtils = (targetId: string): HTMLInputElement => {
  const utils = allInputsType('[datatype="utility"]').filter((util) => util.id[0] === targetId[0]);
  console.log("id", targetId);
  console.log("utils", utils);

  const utilsIndex = utils.findIndex((util) => util.id[2] === targetId[0]);
  if (utilsIndex === -1) {
    throwError("Utility not found");
  }
  const nextUtil = utilsIndex + 1 < utils.length ? utils[utilsIndex + 1] : utils[0];
  return nextUtil;
};

export const findLeftUtils = (targetId: string): HTMLInputElement => {
  const utils = allInputsType('[datatype="utility"]').filter((util) => util.id === targetId[0]);
  console.log("id", targetId);

  const utilsIndex = utils.findIndex((util) => util.id === targetId[0]);
  if (utilsIndex === -1) {
    throwError("Utility not found");
  }
  const prevUtil = utilsIndex - 1 >= 0 ? utils[utilsIndex - 1] : utils[utils.length - 1];
  return prevUtil;
};

// navigateTo(findRightUtils(e.currentTarget.id));

export const navigateTo = (element: HTMLElement) => {
  element.focus();
  console.log("element", element);
};
