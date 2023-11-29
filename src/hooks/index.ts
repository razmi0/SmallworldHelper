import { usePlayer } from "./players/usePlayer";
import { useMidState, useMidAction } from "./context/useMid";
import { useTheme, useSwitchTheme } from "./context/theme/useTheme";
import { useToggle } from "./useToggle";
import { useUndoRedo } from "./useUndoRedo";
import { useClickOutside } from "./useClickOutside";
import { useLocalStorage } from "./useLocalStorage";
import { useNotif } from "./context/useNotif";
/* PROVIDERS */
import { IntermediateProvider } from "./context/useMid";
import { ThemeProvider } from "./context/theme/useTheme";
import { NotificationProvider } from "./context/useNotif";

// HERE CAN GO THE STORE LATER
// ...

export {
  /* PROVIDERS */
  IntermediateProvider,
  ThemeProvider,
  NotificationProvider,
  /* CONTEXT */
  useNotif,
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
