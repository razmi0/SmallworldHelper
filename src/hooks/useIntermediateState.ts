import { useCallback, useReducer } from "react";

type IntermediateStates = {
  booleanMap: boolean[]; // useMap
  newScores: number[]; // useMap
  startScore: number; // useIntermediateState
  newPlayerName: string; // useIntermediateState
};

type IntermediateActions =
  | { type: "SET_BOOLEAN_MAP"; payload: { index: number; value: boolean } } // useMap
  | { type: "SET_NEW_SCORES"; payload: { index: number; newScore: number } } // useMap
  | { type: "SET_NEW_PLAYER_NAME"; payload: { name: string } } // useIntermediateState
  | { type: "SET_START_SCORE"; payload: { score: number } }; // useIntermediateState

const initialIntermediateState = {
  booleanMap: (size: number): boolean[] => initBooleanMap(size),
  newScores: (size: number): number[] => initNewScores(size),
  startScore: 0,
  newPlayerName: "",
};

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

// HELPERS
//--
const initBooleanMap = (size: number) => {
  return Array.from({ length: size }, () => false);
};
const initNewScores = (size: number) => {
  return Array.from({ length: size }, () => 0);
};

const resizeArray = <T>(originalArray: T[], newSize: number, fillValue: T): T[] => {
  return [
    ...originalArray.slice(0, newSize),
    ...new Array(Math.max(newSize - originalArray.length, 0)).fill(fillValue),
  ];
};

// HOOK
//--
export const useIntermediateState = (size: number) => {
  const [state, dispatch] = useReducer(intermediateReducer, {
    ...initialIntermediateState,
    booleanMap: initBooleanMap(size),
    newScores: initNewScores(size),
  });

  return {
    booleanMap: state.booleanMap,
    newScores: state.newScores,
    startScore: state.startScore,
    newPlayerName: state.newPlayerName,
    setBooleanMap: useCallback((index: number, value: boolean) => {
      dispatch({ type: "SET_BOOLEAN_MAP", payload: { index: index, value: value } });
    }, []),
    setNewScores: useCallback((index: number, newScore: number) => {
      dispatch({ type: "SET_NEW_SCORES", payload: { index: index, newScore: newScore } });
    }, []),
    setNewPlayerName: useCallback((name: string) => {
      dispatch({ type: "SET_NEW_PLAYER_NAME", payload: { name: name } });
    }, []),
    setStartScore: useCallback((score: number) => {
      dispatch({ type: "SET_START_SCORE", payload: { score: score } });
    }, []),
  };
};
