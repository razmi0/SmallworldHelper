import { createContext, useContext, ReactNode, useReducer, useCallback } from "react";
import { getFromLocalStorage, saveToLocalStorage } from "../../../utils";
import styles from "./_.module.css";

type ThemeState = "light" | "dark";
type ThemeContextType = "light" | "dark";
type ThemeDispatchContextType = () => void;

const ThemeContext = createContext<ThemeContextType | null>(null);
const ThemeDispatchContext = createContext<ThemeDispatchContextType | null>(null);

const themeReducer = (state: ThemeState, action = "SWITCH"): ThemeState => {
  switch (action) {
    case "SWITCH": {
      const newState = state === "dark" ? "light" : "dark";
      saveToLocalStorage(`__smallWorld_th`, newState);
      setStyles(newState);
      return newState;
    }
    default:
      return state;
  }
};

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, switchTheme] = useReducer(themeReducer, initTheme());

  return (
    <ThemeContext.Provider value={theme}>
      <ThemeDispatchContext.Provider value={switchTheme}>{children}</ThemeDispatchContext.Provider>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const theme = useContext(ThemeContext);
  if (theme === null) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return { theme };
};

export const useSwitchTheme = () => {
  const dispatch = useContext(ThemeDispatchContext);
  if (dispatch === null) {
    throw new Error("useSwitchTheme must be used within a ThemeProvider");
  }
  const switchTheme = useCallback(() => dispatch!(), [dispatch]);
  return { switchTheme };
};

const initTheme = () => {
  const systemMode = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  const localMode = getFromLocalStorage("__smallWorld_th", false) as ThemeState | false;
  setStyles(localMode || systemMode);
  return localMode || systemMode;
};

const body = document.querySelector("body")!;
const setStyles = (theme: ThemeState) => {
  const isDark = theme === "dark";

  body.className = `${styles["body-no-settings"]} ${
    isDark ? styles["dark-body"] : styles["light-body"]
  }`;
};
