import {
  Dispatch,
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
} from "react";
import { resizeArray, initialIntermediateState, initBooleanMap, initNewScores } from "./helpers";

type newScoreType = number | string; // string => transitional value of input === "-"

type IntermediateStates = {
  /**
   * @description inputs tracker
   */
  newScores: newScoreType[]; // useMap
  startScore: newScoreType; // useMidState
  newPlayerName: string; // useMidState
  savePlayers: boolean;
  loadPlayers: boolean;
};

type IntermediateActions =
  | { type: "SET_NEW_SCORES"; payload: { index: number; newScore: newScoreType } } // useMap
  | { type: "SET_NEW_PLAYER_NAME"; payload: { name: string } } // useMidState
  | { type: "SET_START_SCORE"; payload: { score: newScoreType } } // useMidState
  | { type: "SET_SAVE_PLAYERS"; payload: boolean } // useMidState
  | { type: "SET_LOAD_PLAYERS"; payload: boolean }; // useMidState

// CONTEXT
//--
const IntermediateContext = createContext<{
  states: IntermediateStates;
  dispatch: Dispatch<IntermediateActions>;
} | null>(null);

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

    case "SET_NEW_SCORES": {
      const { index, newScore } = action.payload;
      let newScores = state.newScores;

      if (index >= state.newScores.length) {
        newScores = resizeArray(state.newScores, index + 1, 0);
      }

      return {
        ...state,
        newScores: newScores.map((score, i) => (i === index ? newScore : score)),
      };
    }

    case "SET_NEW_PLAYER_NAME": {
      const { name } = action.payload;
      if (!name && name.length !== 0) return state;
      return { ...state, newPlayerName: name };
    }
    case "SET_START_SCORE": {
      const { score } = action.payload;
      if (!score && score !== 0) return state;
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
  const initial = useMemo(
    () => ({
      ...initialIntermediateState,
      isFocus: initBooleanMap(size),
      newScores: initNewScores(size),
    }),
    []
  );

  const [states, dispatch] = useReducer(intermediateReducer, initial);

  return (
    <IntermediateContext.Provider value={{ states, dispatch }}>
      {children}
    </IntermediateContext.Provider>
  );
};

// HOOKS
//--

export const useMid = () => {
  const { states, dispatch } = useContext(IntermediateContext) || {};
  if (!dispatch || !states) {
    throw new Error("useMidAction must be used within a IntermediateProvider");
  }

  const { newScores, startScore, newPlayerName, savePlayers, loadPlayers } = states; // isFocus,

  const storageEvent = savePlayers ? "SAVE" : loadPlayers ? "LOAD" : "";

  const setNewScores = useCallback((index: number, newScore: number | string) => {
    dispatch({ type: "SET_NEW_SCORES", payload: { index: index, newScore: newScore } });
  }, []);

  const setNewPlayerName = useCallback((name: string) => {
    dispatch({ type: "SET_NEW_PLAYER_NAME", payload: { name: name } });
  }, []);

  const setStartScore = useCallback((score: newScoreType) => {
    dispatch({ type: "SET_START_SCORE", payload: { score: score } });
  }, []);

  const setSavePlayers = useCallback((payload: boolean) => {
    dispatch({ type: "SET_SAVE_PLAYERS", payload });
  }, []);

  const setLoadPlayers = useCallback((payload: boolean) => {
    dispatch({ type: "SET_LOAD_PLAYERS", payload });
  }, []);

  return {
    /**
     * @description local add player hook
     */
    addPlayerActions: { setNewPlayerName, setStartScore }, // addPlayer
    setNewScores, // addPlayer
    newScores, // addPlayer
    startScore, // addPlayer
    newPlayerName, // addPlayer

    /**
     * @description context
     */
    storageActions: { setSavePlayers, setLoadPlayers }, // storage
    savePlayers, // storage
    loadPlayers, // storage
    storageEvent, // storage
  };
};

// focus addplayer storage
