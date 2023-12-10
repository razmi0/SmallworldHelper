import { useCallback, useReducer } from "react";
import { resizeArray } from "@Context/helpers";
import type { FocusActionsType, FocusStatesType } from "@Types";

type FocusStates = boolean[];
type FocusAction =
  | { type: "CHANGE_FOCUS"; payload: { index: number; value?: boolean } } // useMap
  | { type: "CHANGE_FOCUS_LENGTH"; payload: { newLength: number; fillValue?: boolean } } // useMap
  | { type: "RESET_FOCUS" }; // useMap

const focusReducer = (state: FocusStates, action: FocusAction): FocusStates => {
  const { type } = action;

  switch (type) {
    case "CHANGE_FOCUS": {
      const { index, value } = action.payload;
      const newState = [...state];
      newState[index] = value ?? !newState[index];
      return newState;
    }

    case "CHANGE_FOCUS_LENGTH": {
      const { newLength, fillValue } = action.payload;
      const fill = fillValue ?? false;
      return resizeArray(state, newLength, fill);
    }

    case "RESET_FOCUS": {
      return new Array(state.length).fill(false);
    }

    default:
      throw new Error(`Unhandled action type: ${type}`);
  }
};

export const useFocus = (initialSize: number) => {
  const [states, dispatch] = useReducer(focusReducer, new Array(initialSize).fill(false));
  if (!states || !dispatch) throw new Error("useFocus must be used inside a FocusProvider");

  /**
   * states
   */
  const focusMap = states;
  const { onlyOneFocus, noFocus } = focusVars(states);

  const changeFocus = useCallback((index: number, value?: boolean) => {
    dispatch({ type: "CHANGE_FOCUS", payload: { index, value } });
  }, []);

  const changeFocusLength = useCallback((newLength: number, fillValue?: boolean) => {
    dispatch({ type: "CHANGE_FOCUS_LENGTH", payload: { newLength, fillValue } });
  }, []);

  const resetFocus = useCallback(() => {
    dispatch({ type: "RESET_FOCUS" });
  }, []);

  return {
    focusActions: { changeFocus, changeFocusLength, resetFocus } as FocusActionsType,
    focusStates: { onlyOneFocus, focusMap, noFocus } as FocusStatesType,
  };
};

const focusVars = (state: FocusStates) => {
  const onlyOneFocus: { index: number; focused: boolean } = { index: -1, focused: false };
  let found = false;
  for (let i = 0; i < state.length; i++) {
    if (state[i] && !found) {
      onlyOneFocus.index = i;
      onlyOneFocus.focused = true;
      found = true;
    } else if (state[i] && found) {
      onlyOneFocus.focused = false;
      onlyOneFocus.index = -1;
      break;
    }
  }
  return {
    onlyOneFocus,
    noFocus: found ? false : true,
  };
};
