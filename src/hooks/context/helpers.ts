// INITIAL STATES
//--
export const initialMidState = {
  newScores: (size: number): number[] => initNewScores(size),
  save: false,
  load: false,
};

// HELPERS
//--

export const initNewScores = (size: number) => {
  return Array.from({ length: size }, () => 0);
};

export const resizeArray = <T>(originalArray: T[], newSize: number, fillValue: T): T[] => {
  const newArr = new Array(Math.max(newSize - originalArray.length, 0)).fill(fillValue);
  return [...originalArray.slice(0, newSize), ...newArr];
};
