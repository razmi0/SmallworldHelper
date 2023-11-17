// INITIAL STATES
//--
export const initialIntermediateState = {
  isOnFocus: (size: number): boolean[] => initBooleanMap(size),
  newScores: (size: number): number[] => initNewScores(size),
  startScore: 0,
  newPlayerName: "",
  savePlayers: false,
  loadPlayers: false,
};

// HELPERS
//--
export const initBooleanMap = (size: number) => {
  return Array.from({ length: size }, () => false);
};
export const initNewScores = (size: number) => {
  return Array.from({ length: size }, () => 0);
};

export const resizeArray = <T>(originalArray: T[], newSize: number, fillValue: T): T[] => {
  const newArr = new Array(Math.max(newSize - originalArray.length, 0)).fill(fillValue);
  return [...originalArray.slice(0, newSize), ...newArr];
};

// HOOK from reducer
//--
// export const useIntermediateState = (size: number) => {
//   const [state, dispatch] = useReducer(intermediateReducer, {
//     ...initialIntermediateState,
//     isOnFocus: initBooleanMap(size),
//     newScores: initNewScores(size),
//   });

//   return {
//     isOnFocus: state.isOnFocus,
//     newScores: state.newScores,
//     startScore: state.startScore,
//     newPlayerName: state.newPlayerName,
//     isOnFocus: useCallback((index: number, value: boolean) => {
//       dispatch({ type: "SET_BOOLEAN_MAP", payload: { index: index, value: value } });
//     }, []),
//     setNewScores: useCallback((index: number, newScore: number) => {
//       dispatch({ type: "SET_NEW_SCORES", payload: { index: index, newScore: newScore } });
//     }, []),
//     setNewPlayerName: useCallback((name: string) => {
//       dispatch({ type: "SET_NEW_PLAYER_NAME", payload: { name: name } });
//     }, []),
//     setStartScore: useCallback((score: number) => {
//       dispatch({ type: "SET_START_SCORE", payload: { score: score } });
//     }, []),
//   };
// };
