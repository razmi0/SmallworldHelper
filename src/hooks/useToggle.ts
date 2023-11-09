import { useCallback, useReducer } from "react";

type ToggleState = {
  isNavOpen: boolean;
  isAddPlayerOpen: boolean;
  isChartsOpen: boolean;
  isScoreHidden: boolean;
};

type ToggleActions =
  | { type: "TOGGLE_HIDE_SCORE" }
  | { type: "TOGGLE_OPEN_ADD_PLAYER" }
  | { type: "TOGGLE_OPEN_NAV"; payload?: boolean }
  | { type: "TOGGLE_OPEN_CHARTS" };

// INITIAL STATES
//--
const initialToggleStates = {
  isNavOpen: false,
  isAddPlayerOpen: false,
  isChartsOpen: false,
  isScoreHidden: false,
};

// REDUCER
//--
const toggleReducer = (state: ToggleState, action: ToggleActions): ToggleState => {
  switch (action.type) {
    case "TOGGLE_HIDE_SCORE": {
      return { ...state, isScoreHidden: !state.isScoreHidden };
    }

    case "TOGGLE_OPEN_ADD_PLAYER": {
      return { ...state, isAddPlayerOpen: !state.isAddPlayerOpen };
    }

    case "TOGGLE_OPEN_NAV": {
      return action.payload
        ? { ...state, isNavOpen: action.payload }
        : { ...state, isNavOpen: !state.isNavOpen };
    }

    case "TOGGLE_OPEN_CHARTS": {
      return { ...state, isChartsOpen: !state.isChartsOpen };
    }

    default:
      return state;
  }
};

// HOOK
//--
export const useToggle = () => {
  const [state, dispatch] = useReducer(toggleReducer, {
    ...initialToggleStates,
  });
  return {
    isNavOpen: state.isNavOpen,
    isAddPlayerOpen: state.isAddPlayerOpen,
    isChartsOpen: state.isChartsOpen,
    isScoreHidden: state.isScoreHidden,
    toggleHideScore: useCallback(() => dispatch({ type: "TOGGLE_HIDE_SCORE" }), []),
    toggleOpenAddPlayer: useCallback(() => dispatch({ type: "TOGGLE_OPEN_ADD_PLAYER" }), []),
    toggleOpenNav: useCallback(
      (newState?: boolean) => dispatch({ type: "TOGGLE_OPEN_NAV", payload: newState }),
      []
    ),
    toggleOpenCharts: useCallback(() => dispatch({ type: "TOGGLE_OPEN_CHARTS" }), []),
  };
};
