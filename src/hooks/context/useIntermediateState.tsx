import { ReactNode, createContext, useCallback, useContext, useReducer } from "react";
import { resizeArray, initialIntermediateState, initBooleanMap, initNewScores } from "./helper";
import { throwError } from "../../utils";

type newScore = number | string;

type IntermediateStates = {
  booleanMap: boolean[]; // useMap
  newScores: newScore[]; // useMap
  startScore: number; // useIntermediateState
  newPlayerName: string; // useIntermediateState
};

type IntermediateActions =
  | { type: "SET_BOOLEAN_MAP"; payload: { index: number; value: boolean } } // useMap
  | { type: "SET_NEW_SCORES"; payload: { index: number; newScore: number | string } } // useMap
  | { type: "SET_NEW_PLAYER_NAME"; payload: { name: string } } // useIntermediateState
  | { type: "SET_START_SCORE"; payload: { score: number } }; // useIntermediateState

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
    case "SET_BOOLEAN_MAP": {
      const { index, value } = action.payload;
      let newBooleanMap = state.booleanMap;

      if (index >= state.booleanMap.length) {
        newBooleanMap = resizeArray(state.booleanMap, index + 1, false);
      }

      return {
        ...state,
        booleanMap: newBooleanMap.map((item, i) => (i === index ? value : item)),
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
      if (!name) return state;
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
    booleanMap: initBooleanMap(size),
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
export const useIntermediate = () => {
  const states = useContext(IntermediateContext);
  if (states === null) {
    throwError("useIntermediate must be used within a IntermediateProvider");
  }
  const { booleanMap, newScores, startScore, newPlayerName } = states!;
  return { booleanMap, newScores, startScore, newPlayerName };
};

export const useIntermediateDispatch = () => {
  const dispatch = useContext(IntermediateDispatchContext);
  if (dispatch === null) {
    throwError("useIntermediateDispatch must be used within a IntermediateProvider");
  }
  const setBooleanMap = useCallback(
    (index: number, value: boolean) => {
      dispatch!({ type: "SET_BOOLEAN_MAP", payload: { index: index, value: value } });
    },
    [dispatch]
  );
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
  return { setBooleanMap, setNewScores, setNewPlayerName, setStartScore };
};
