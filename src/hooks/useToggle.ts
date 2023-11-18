import { useCallback, useReducer } from "react";

type ToggleState = {
  isNavOpen: boolean;
  isAddPlayerOpen: boolean;
  isChartsOpen: boolean;
  isScoreHidden: boolean;
};

type ToggleActions =
  | { type: "TOGGLE_HIDE_SCORE" }
  | { type: "TOGGLE_OPEN_ADD_PLAYER"; payload?: boolean }
  | { type: "TOGGLE_OPEN_NAV"; payload?: boolean }
  | { type: "TOGGLE_OPEN_CHARTS" };

// INITIAL STATES
//--
const initialToggleStates = {
  isNavOpen: false,
  isAddPlayerOpen: false,
  isChartsOpen: true,
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
      return action.payload
        ? { ...state, isAddPlayerOpen: action.payload }
        : { ...state, isAddPlayerOpen: !state.isAddPlayerOpen };
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
  const [toggleStates, dispatch] = useReducer(toggleReducer, {
    ...initialToggleStates,
  });

  // Group action creators
  const toggleActions = {
    hideScore: useCallback(() => dispatch({ type: "TOGGLE_HIDE_SCORE" }), []),
    openAddPlayer: useCallback(
      (newState?: boolean) => dispatch({ type: "TOGGLE_OPEN_ADD_PLAYER", payload: newState }),
      []
    ),
    openNav: useCallback(
      (newState?: boolean) => dispatch({ type: "TOGGLE_OPEN_NAV", payload: newState }),
      []
    ),
    openCharts: useCallback(() => dispatch({ type: "TOGGLE_OPEN_CHARTS" }), []),
  };

  return { toggleStates, toggleActions };
};
