// INITIAL STATES
//--
export const initialStorageEvent = {
  save: false,
  load: false,
};

// HELPERS
//--

export const resizeArray = <T>(originalArray: T[], newSize: number, fillValue: T): T[] => {
  const newArr = new Array(Math.max(newSize - originalArray.length, 0)).fill(fillValue);
  return [...originalArray.slice(0, newSize), ...newArr];
};
