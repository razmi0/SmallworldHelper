// use-undo-redo.js

import { useEffect, useReducer } from "react";
import { UndoRedoStates, UndoRedoActions } from "../types";
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

  // STATE SYNC WITH EXTERNAL STATE (CURRENTLY playersStates)
  useEffect(() => {
    if (externalState !== present) updateExternalState(present);
  }, [present]);
  useEffect(
    () => {
      if (externalState !== present) setState(externalState);
    },
    /* DONT CHANGE */ [externalState]
  );

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
