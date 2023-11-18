import { useEffect, useReducer } from "react";
import { UndoRedoStates, UndoRedoActions } from "@Types";
type HistoryState<T> = {
  past: T[];
  present: T;
  future: T[];
};
type ActionType = "SET_STATE" | "UNDO" | "REDO";
const SET_STATE = "SET_STATE";
const UNDO = "UNDO";
const REDO = "REDO";
type Actions<T> = { type: ActionType; payload?: HistoryState<T>["present"] };

const reducerWithUndoRedo = <T>(state: HistoryState<T>, action: Actions<T>) => {
  const { past, present, future } = state;

  switch (action.type) {
    case SET_STATE:
      return {
        past: [...past, present],
        present: action.payload,
        future: [],
      };
    case UNDO:
      return {
        past: past.slice(0, past.length - 1),
        present: past[past.length - 1],
        future: [present, ...future],
      };
    case REDO:
      return {
        past: [...past, present],
        present: future[0],
        future: future.slice(1),
      };
    default:
      throw new Error();
  }
};

export const useUndoRedo = <T>(externalState: T, updateExternalState: (newStates: T) => void) => {
  const [state, dispatch] = useReducer(reducerWithUndoRedo, {
    past: [] as T[],
    present: externalState,
    future: [] as T[],
  });
  const { past, present, future } = state as HistoryState<T>;

  // STATE SYNC  playersStates
  useEffect(() => {
    if (externalState !== present) updateExternalState(present);
  }, [present]);

  useEffect(() => {
    if (externalState !== present) setState(externalState);
  }, [externalState /* DONT CHANGE */]);

  const setState = (newState: T) => dispatch({ type: SET_STATE, payload: newState });
  const undo = () => dispatch({ type: UNDO });
  const redo = () => dispatch({ type: REDO });
  const isUndoPossible = past && past.length > 0;
  const isRedoPossible = future && future.length > 0;

  return {
    undoRedoActions: {
      undo,
      redo,
      setState,
    } as UndoRedoActions<T>,
    undoRedoStates: {
      past: past as T[],
      present: present as T,
      future: future as T[],
      nbrOfUndos: past.length,
      nbrOfRedos: future.length,
      isUndoPossible,
      isRedoPossible,
    } as UndoRedoStates<T>,
  };
};

export default useUndoRedo;

// export const useUndoRedo = <T>(externalState: T, updateExternalState: (newStates: T) => void) => {
//   const [state, dispatch] = useReducer(reducerWithUndoRedo, {
//     past: [] as T[],
//     present: externalState,
//     future: [] as T[],
//   });

//   // ref to track who initiated the update
//   const initiatedByHook = useRef(false);

//   const { past, present, future } = state as HistoryState<T>;

//   // Synchronize when externalState changes, ignoring updates initiated by the hook
//   useEffect(() => {
//     if (!initiatedByHook.current && externalState !== present) {
//       dispatch({ type: SET_STATE, payload: externalState });
//     }
//     // Disable initiatedByHook after handling externalState update
//     initiatedByHook.current = false;
//   }, [externalState, present]);

//   // Synchronize present back to external state when updated by hook
//   useEffect(() => {
//     if (initiatedByHook.current) {
//       updateExternalState(present);
//     }
//   }, [present, updateExternalState]);

//   // Dispatchers for undo and redo actions
//   const undo = () => dispatch({ type: UNDO });
//   const redo = () => dispatch({ type: REDO });

//   // Wrapper for setState to set the initiatedByHook flag
//   const setState = (newState: T) => {
//     initiatedByHook.current = true;
//     dispatch({ type: SET_STATE, payload: newState });
//   };

//   const isUndoPossible = past && past.length > 0;
//   const isRedoPossible = future && future.length > 0;

//   return {
//     undoRedoActions: {
//       undo,
//       redo,
//       setState,
//     } as UndoRedoActions<T>,
//     undoRedoStates: {
//       past: past as T[],
//       present: present as T,
//       future: future as T[],
//       nbrOfUndos: past.length,
//       nbrOfRedos: future.length,
//       isUndoPossible,
//       isRedoPossible,
//     },
//   };
// };
