import { usePlayer } from "./players/usePlayer";
import { useMidState, useMidAction } from "./context/useMid";
import { useTheme, useSwitchTheme } from "./context/theme/useTheme";
import { useToggle } from "./useToggle";
import { useUndoRedo } from "./useUndoRedo";
import { useClickOutside } from "./useClickOutside";
import { useChartFocus } from "./charts/useChartFocus";

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
  useChartFocus,
  /* PLAYERS */
  usePlayer,
  /* OTHER */
  useUndoRedo,
  useToggle,
  useClickOutside,
};
