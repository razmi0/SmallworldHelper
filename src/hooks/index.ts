import { usePlayer } from "./players/usePlayer";
import { useMidState, useMidAction } from "./context/useMid";
import { useTheme, useSwitchTheme } from "./context/theme/useTheme";
import { useToggle } from "./useToggle";
import { useUndoRedo } from "./useUndoRedo";
import { useClickOutside } from "./useClickOutside";
import { useLocalStorage } from "./useLocalStorage";

/* PROVIDERS */
import { IntermediateProvider } from "./context/useMid";
import { ThemeProvider } from "./context/theme/useTheme";

// HERE CAN GO THE STORE LATER
// ...

export {
  /* PROVIDERS */
  IntermediateProvider,
  ThemeProvider,
  /* CONTEXT */
  useMidState,
  useMidAction,
  useTheme,
  useSwitchTheme,
  /* CHART */
  /* PLAYERS */
  usePlayer,
  /* OTHER */
  useLocalStorage,
  useUndoRedo,
  useToggle,
  useClickOutside,
};
