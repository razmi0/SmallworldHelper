import { useReducer, useCallback } from "react";

type ThemeState = {
  theme: "dark" | "light";
};
type ThemeActions = { type: "SWITCH_THEME" };

// INITIAL STATES
//--
const initialThemeStates = {
  theme: "dark" as "dark" | "light",
};

// REDUCER
//--
const themeReducer = (state: ThemeState, action: ThemeActions): ThemeState => {
  switch (action.type) {
    case "SWITCH_THEME": {
      return { ...state, theme: state.theme === "dark" ? "light" : "dark" };
    }
    default:
      return state;
  }
};

// HOOK
//--
export const useTheme = () => {
  const [state, dispatch] = useReducer(themeReducer, {
    ...initialThemeStates,
  });
  return {
    theme: state.theme,
    switchTheme: useCallback(() => dispatch({ type: "SWITCH_THEME" }), []),
  };
};
