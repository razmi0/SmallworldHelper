import {
  Dispatch,
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
} from "react";
import { resizeArray, initialMidState, initNewScores } from "./helpers";

type newScoreType = number | string; // string => transitional value of input === "-"

type IntermediateStates = {
  /**
   * @description inputs tracker
   */
  newScores: newScoreType[]; // useMap
  save: boolean;
  load: boolean;
};

type IntermediateActions =
  | { type: "SET_NEW_SCORES"; payload: { index: number; newScore: newScoreType } } // useMap
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
        save: payload,
      };
    }

    case "SET_LOAD_PLAYERS": {
      const { payload } = action;
      return {
        ...state,
        load: payload,
      };
    }

    case "SET_NEW_SCORES": {
      console.log("SET_NEW_SCORES");

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
      ...initialMidState,
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

  const { newScores, save, load } = states;

  const storageEvent = save ? "SAVE" : load ? "LOAD" : "";

  const setNewScores = useCallback((index: number, newScore: number | string) => {
    dispatch({ type: "SET_NEW_SCORES", payload: { index: index, newScore: newScore } });
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
    setNewScores, // addPlayer
    newScores, // addPlayer

    /**
     * @description context
     */
    storageActions: { setSavePlayers, setLoadPlayers }, // storage
    storageEvent, // storage
  };
};

// focus addplayer storage
