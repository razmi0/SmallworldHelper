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
