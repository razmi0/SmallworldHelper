import { createContext, useCallback, useContext, useReducer } from "react";
import type { Dispatch, ReactNode } from "react";
import { initialStorageEvent } from "./helpers";

type StorageStates = {
  /**
   * @description inputs tracker
   */
  save: boolean;
  load: boolean;
};

type StorageActions =
  | { type: "SET_SAVE_EVENT"; payload: boolean }
  | { type: "SET_LOAD_EVENT"; payload: boolean };

// CONTEXT
//--
const StorageContext = createContext<{
  states: StorageStates;
  dispatch: Dispatch<StorageActions>;
} | null>(null);

// REDUCER
//--
const storageReducer = (state: StorageStates, action: StorageActions): StorageStates => {
  switch (action.type) {
    case "SET_SAVE_EVENT": {
      const { payload } = action;
      return {
        ...state,
        save: payload,
      };
    }

    case "SET_LOAD_EVENT": {
      const { payload } = action;
      return {
        ...state,
        load: payload,
      };
    }

    default:
      return state;
  }
};

// PROVIDER
//--
export const StorageProvider = ({ children }: { children: ReactNode; size?: number }) => {
  const [states, dispatch] = useReducer(storageReducer, initialStorageEvent);

  return <StorageContext.Provider value={{ states, dispatch }}>{children}</StorageContext.Provider>;
};

// HOOKS
//--

export const useStorage = () => {
  const { states, dispatch } = useContext(StorageContext) || {};
  if (!dispatch || !states) {
    throw new Error("useStorageAction must be used within a IntermediateProvider");
  }

  const { save, load } = states;

  const storageEvent = save ? "SAVE" : load ? "LOAD" : "";

  const setSave = useCallback((payload: boolean) => {
    dispatch({ type: "SET_SAVE_EVENT", payload });
  }, []);

  const setLoad = useCallback((payload: boolean) => {
    dispatch({ type: "SET_LOAD_EVENT", payload });
  }, []);

  return {
    /**
     * @description storage states and actions
     */
    storageActions: { setSave, setLoad }, // storage
    storageEvent, // storage
  };
};
