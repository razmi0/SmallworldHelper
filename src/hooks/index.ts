import { usePlayer } from "./players/usePlayer";
import { useIntermediate, useIntermediateDispatch } from "./context/useIntermediateState";
import { useTheme, useSwitchTheme } from "./context/theme/useTheme";
import { useToggle } from "./useToggle";
import { useUndoRedo } from "./useUndoRedo";
import { useClickOutside } from "./useClickOutside";
import { useChartFocus } from "./charts/useChartFocus";

// HERE CAN GO THE STORE LATER
// ...

export {
  useChartFocus,
  useClickOutside,
  usePlayer,
  useIntermediate,
  useUndoRedo,
  useIntermediateDispatch,
  useTheme,
  useSwitchTheme,
  useToggle,
};
