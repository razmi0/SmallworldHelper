import { useCallback, useReducer } from "react";
import { resizeArray } from "./context/helpers";

type newScoreType = number | string; // string => transitional value of input === "-"
type State = {
  scoreMap: newScoreType[];
};
type Actions = {
  type: "CHANGE_SCORE";
  payload: { index: number; value: number | string };
};

const scoreReducer = (state: State, action: Actions) => {
  switch (action.type) {
    case "CHANGE_SCORE":
      const { index, value } = action.payload;
      console.log(typeof value);

      let newScoreMap = state.scoreMap;
      if (index >= state.scoreMap.length) {
        newScoreMap = resizeArray(state.scoreMap, index + 1, 0);
      }

      return {
        ...state,
        scoreMap: newScoreMap.map((score, i) => (i === index ? value : score)),
      };
    default:
      return state;
  }
};

export const useInputScore = (size: number) => {
  const [state, dispatch] = useReducer(scoreReducer, {
    scoreMap: new Array(size).fill(0),
  });

  const changeScore = useCallback((index: number, value: number | string) => {
    dispatch({ type: "CHANGE_SCORE", payload: { index, value } });
  }, []);

  const { scoreMap } = state;
  return { scoreMap, changeScore };
};
