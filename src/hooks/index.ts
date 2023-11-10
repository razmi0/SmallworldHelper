import { usePlayer } from "./players/usePlayer";
import { useIntermediate, useIntermediateDispatch } from "./context/useIntermediateState";
import { useTheme, useSwitchTheme } from "./context/theme/useTheme";
import { useToggle } from "./useToggle";
import { useUndoRedo } from "./useUndoRedo";

// HERE CAN GO THE STORE LATER
// ...

export {
  usePlayer,
  useIntermediate,
  useUndoRedo,
  useIntermediateDispatch,
  useTheme,
  useSwitchTheme,
  useToggle,
};
