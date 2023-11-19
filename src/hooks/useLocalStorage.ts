// import { useEffect, useState } from "react";
// import { getFromLocalStorage, saveToLocalStorage } from "@Utils";
// import { useMidAction, useMidState } from "@Hooks";

export const useLocalStorage = () => {};

// export const useLocalStorage = <T>(
//   key: string,
//   external: T
//   // updateExternal: (newState: T) => void
// ) => {
//   const [save, setSave] = useState(external);

//   const { setLoadPlayers, setSavePlayers } = useMidAction();
//   const { loadPlayers, savePlayers } = useMidState();

//   useEffect(() => {
//     setSave(external);
//     if (savePlayers) {
//       saveToLocalStorage(key, save);
//       setSavePlayers(false);
//     } else if (loadPlayers) {
//       try {
//         const storedData = getFromLocalStorage(key);
//         setSave(storedData as T);
//         setLoadPlayers(false);
//       } catch (error) {
//         throw new Error("No players found in local storage");
//       }
//     }
//   }, [savePlayers, loadPlayers]);

//   return { save };
// };
// // type LocalStorageReducerAction<T> =
// //   | { type: "SAVE"; payload: { key: string; data: T } }
// //   | { type: "LOAD"; payload: { key: string } }
// //   | { type: "UPDATE"; payload: { data: T } };

// // const localStorageReducer = <T>(state: T, action: LocalStorageReducerAction<T>) => {
// //   switch (action.type) {
// //     case "SAVE": {
// //       saveToLocalStorage(action.payload.key, action.payload.data);
// //       return { ...state, ...action.payload.data };
// //     }
// //     case "LOAD": {
// //       const storedData = getFromLocalStorage(action.payload.key);
// //       return { ...state, ...(storedData as T) };
// //     }
// //     case "UPDATE": {
// //       return { ...state, ...action.payload.data };
// //     }
// //     default:
// //       return state;
// //   }
// // };

// // export const useLocalStorage = <T>(
// //   key: string,
// //   externalState: T,
// //   updateExternalState: (newState: T) => void
// // ) => {
// //   const [state, dispatch] = useReducer(localStorageReducer, externalState);
// //   const { setLoadPlayers, setSavePlayers } = useMidAction();
// //   const { loadPlayers, savePlayers } = useMidState();

// //   // if external state changes, update state with the SET action

// //   const save = (data: T) => {
// //     dispatch({ type: "SAVE", payload: { key, data: data } });
// //   };
// //   const load = () => {
// //     dispatch({ type: "LOAD", payload: { key } });
// //   };
// //   const update = (data: T) => {
// //     dispatch({ type: "UPDATE", payload: { data } });
// //   };

// //   // STATE SYNC WITH EXTERNAL STATE (CURRENTLY playersStates)
// //   useEffect(() => {
// //     if (externalState !== state) updateExternalState(state);
// //   }, [state]);

// //     useEffect(() => {
// //         if (externalState !== state) update(state);
// //     }, [externalState]);

// //   useEffect(() => {
// //     if (savePlayers) {
// //       save(state); //
// //       setSavePlayers(false);
// //     } else if (loadPlayers) {
// //       load();
// //       setLoadPlayers(false);
// //     }
// //   }, [savePlayers, loadPlayers]);

// //   return { state, save, load, update };
// // };

// // const { save, load } = useLocalStorage("players", players, setPlayers);

// //     const { savePlayers, loadPlayers } = useMidState();
// //   const { setLoadPlayers, setSavePlayers } = useMidAction();
// // useEffect(() => {
// //     if (savePlayers) {
// //       saveToLocalStorage("players", players);
// //       setSavePlayers(false);
// //     } else if (loadPlayers) {
// //       const storedPlayers = getFromLocalStorage("players");
// //       if (!storedPlayers) throw new Error("No players found in local storage");
// //       setLoadPlayers(false);
// //       setPlayers(storedPlayers as Player[]);
// //     }
// //   }, [savePlayers, loadPlayers]);
