import { createContext, useContext, useReducer } from "react";
import { NotificationType } from "@Types";

type NotifContextType = {
  state: NotifStates;
  dispatch: React.Dispatch<NotifActions>;
};

type NotifStates = {
  notifs: NotificationType[];
};
type NotifActions =
  | { type: "REMOVE_AT"; payload: { id: number } }
  | { type: "REMOVE_ALL" }
  | { type: "ADD"; payload: { notif: NotificationType } };

const NotifContext = createContext<NotifContextType | null>(null);

const notificationReducer = (state: NotifStates, action: NotifActions): NotifStates => {
  switch (action.type) {
    case "ADD": {
      const { notif } = action.payload;
      return {
        ...state,
        notifs: [...state.notifs, notif],
      };
    }

    case "REMOVE_AT": {
      const { id } = action.payload;
      return {
        ...state,
        notifs: state.notifs.filter((notif) => notif.id !== id),
      };
    }

    case "REMOVE_ALL": {
      return {
        ...state,
        notifs: [],
      };
    }

    default:
      return state;
  }
};

export const NotificationProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(notificationReducer, { notifs: [] });
  return <NotifContext.Provider value={{ state, dispatch }}>{children}</NotifContext.Provider>;
};

export const useNotif = () => {
  const context = useContext(NotifContext);
  if (context === null) {
    throw new Error("useNotif must be used within a NotificationProvider");
  }

  const { state, dispatch } = context;
  const { notifs } = state;

  const addNotif = (notif: NotificationType) => {
    dispatch({ type: "ADD", payload: { notif } });
  };

  const removeNotif = (id: number) => {
    dispatch({ type: "REMOVE_AT", payload: { id } });
  };

  const removeAllNotifs = () => {
    dispatch({ type: "REMOVE_ALL" });
  };

  return { notifs, addNotif, removeNotif, removeAllNotifs };
};
