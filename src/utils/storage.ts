import { Player } from "@Types";
import { getFromLocalStorage, saveToLocalStorage } from "@Utils";

export const manageStorage = (
  load: boolean,
  save: boolean,
  setLoad: (value: boolean) => void,
  setSave: (value: boolean) => void,
  payload: Player[]
) => {
  if (load) {
    setLoad(false);
    try {
      const storedData = getFromLocalStorage<Player[]>("players");
      return storedData;
    } catch (e) {
      return new Error("No players found in local storage");
    }
  } else if (save) {
    setSave(false);
    try {
      saveToLocalStorage<Player[]>("players", payload);
    } catch (e) {
      return new Error("Unable to save players to local storage");
    }
  }
};
