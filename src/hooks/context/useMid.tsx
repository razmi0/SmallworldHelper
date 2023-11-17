import { ReactNode, createContext, useCallback, useContext, useReducer } from "react";
import { resizeArray, initialIntermediateState, initBooleanMap, initNewScores } from "./helper";

type newScore = number | string;

type IntermediateStates = {
  /**
   * @description inputs tracker
   */
  isFocus: boolean[]; // useMap
  newScores: newScore[]; // useMap
  startScore: number; // useMidState
  newPlayerName: string; // useMidState
  savePlayers: boolean;
  loadPlayers: boolean;
};

type IntermediateActions =
  | { type: "CHANGE_FOCUS"; payload: { index: number; value: boolean } } // useMap
  | { type: "CHANGE_FOCUS_LENGTH"; payload: { newLength: number; fillValue: boolean } } // useMap
  | { type: "RESET_FOCUS" } // useMap
  | { type: "SET_NEW_SCORES"; payload: { index: number; newScore: number | string } } // useMap
  | { type: "SET_NEW_PLAYER_NAME"; payload: { name: string } } // useMidState
  | { type: "SET_START_SCORE"; payload: { score: number } } // useMidState
  | { type: "SET_SAVE_PLAYERS"; payload: boolean } // useMidState
  | { type: "SET_LOAD_PLAYERS"; payload: boolean }; // useMidState

type IntermediateDispatchContextType = (actions: IntermediateActions) => void;

// CONTEXT
//--
const IntermediateContext = createContext<IntermediateStates | null>(null);
const IntermediateDispatchContext = createContext<IntermediateDispatchContextType | null>(null);

// REDUCER
//--
const intermediateReducer = (
  state: IntermediateStates,
  action: IntermediateActions
): IntermediateStates => {
  switch (action.type) {
    case "SET_SAVE_PLAYERS": {
      const { payload } = action;
      return {
        ...state,
        savePlayers: payload,
      };
    }

    case "SET_LOAD_PLAYERS": {
      const { payload } = action;
      return {
        ...state,
        loadPlayers: payload,
      };
    }

    case "CHANGE_FOCUS": {
      const { index, value } = action.payload;
      let newBooleanMap = state.isFocus;

      if (index >= state.isFocus.length) {
        newBooleanMap = resizeArray(state.isFocus, index + 1, false);
      }

      return {
        ...state,
        isFocus: newBooleanMap.map((item, i) => (i === index ? value : item)),
      };
    }

    case "CHANGE_FOCUS_LENGTH": {
      const { newLength, fillValue } = action.payload;
      return {
        ...state,
        isFocus: resizeArray(state.isFocus, newLength, fillValue),
        newScores: resizeArray(state.newScores, newLength, 0),
      };
    }

    case "RESET_FOCUS": {
      return {
        ...state,
        isFocus: state.isFocus.map(() => false),
      };
    }

    case "SET_NEW_SCORES": {
      const { index, newScore } = action.payload;
      let newNewScores = state.newScores;

      if (index >= state.newScores.length) {
        newNewScores = resizeArray(state.newScores, index + 1, 0);
      }

      return {
        ...state,
        newScores: newNewScores.map((score, i) => (i === index ? newScore : score)),
      };
    }

    case "SET_NEW_PLAYER_NAME": {
      const { name } = action.payload;
      if (!name && name.length !== 0) return state;
      return { ...state, newPlayerName: name };
    }
    case "SET_START_SCORE": {
      const { score } = action.payload;
      if (!score) return state;
      return { ...state, startScore: score };
    }
    default:
      return state;
  }
};

// PROVIDER
//--
export const IntermediateProvider = ({
  children,
  size = 0,
}: {
  children: ReactNode;
  size?: number;
}) => {
  const [state, dispatch] = useReducer(intermediateReducer, {
    ...initialIntermediateState,
    isFocus: initBooleanMap(size),
    newScores: initNewScores(size),
  });

  return (
    <IntermediateContext.Provider value={state}>
      <IntermediateDispatchContext.Provider value={dispatch}>
        {children}
      </IntermediateDispatchContext.Provider>
    </IntermediateContext.Provider>
  );
};

// HOOKS
//--
export const useMidState = () => {
  const states = useContext(IntermediateContext);
  if (states === null) {
    throw new Error("useMidState must be used within a IntermediateProvider");
  }
  const { isFocus, newScores, startScore, newPlayerName, savePlayers, loadPlayers } = states;
  return { isFocus, newScores, startScore, newPlayerName, savePlayers, loadPlayers };
};

export const useMidAction = () => {
  const dispatch = useContext(IntermediateDispatchContext);
  if (dispatch === null) {
    throw new Error("useMidAction must be used within a IntermediateProvider");
  }

  const isOnFocus = useCallback(
    (index: number, value: boolean) => {
      dispatch!({ type: "CHANGE_FOCUS", payload: { index: index, value: value } });
    },
    [dispatch]
  );

  const setIsOnFocus = useCallback(
    (newLength: number, fillValue: boolean) => {
      dispatch!({
        type: "CHANGE_FOCUS_LENGTH",
        payload: { newLength: newLength, fillValue: fillValue },
      });
    },
    [dispatch]
  );

  const resetFocus = useCallback(() => {
    dispatch!({ type: "RESET_FOCUS" });
  }, [dispatch]);

  const setNewScores = useCallback(
    (index: number, newScore: number | string) => {
      dispatch!({ type: "SET_NEW_SCORES", payload: { index: index, newScore: newScore } });
    },
    [dispatch]
  );
  const setNewPlayerName = useCallback(
    (name: string) => {
      dispatch!({ type: "SET_NEW_PLAYER_NAME", payload: { name: name } });
    },
    [dispatch]
  );
  const setStartScore = useCallback(
    (score: number) => {
      dispatch!({ type: "SET_START_SCORE", payload: { score: score } });
    },
    [dispatch]
  );
  const setSavePlayers = useCallback(
    (payload: boolean) => {
      dispatch!({ type: "SET_SAVE_PLAYERS", payload });
    },
    [dispatch]
  );
  const setLoadPlayers = useCallback(
    (payload: boolean) => {
      dispatch!({ type: "SET_LOAD_PLAYERS", payload });
    },
    [dispatch]
  );

  return {
    focusActions: { resetFocus, isOnFocus, setIsOnFocus }, // as [typeof isOnFocus, typeof setIsOnFocus]
    setNewScores,
    setNewPlayerName,
    setStartScore,
    setSavePlayers,
    setLoadPlayers,
  };
};