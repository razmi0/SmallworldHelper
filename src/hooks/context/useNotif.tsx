import { createContext, useContext, useReducer } from "react";
import type { NotificationType, NotificationTypeInComponent } from "@Types";

const SELF_DESTRUCT_TIMEOUT = 6000 as const;
const RANDOM_ID_FACTOR = 100 as const;

const getId = () => {
  return Date.now() + parseInt((Math.random() * RANDOM_ID_FACTOR).toFixed());
};

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
  | {
      type: "ADD";
      payload: { notif: NotificationTypeInComponent; removeNotif: (id: number) => void };
    };

const NotifContext = createContext<NotifContextType | null>(null);

const notificationReducer = (state: NotifStates, action: NotifActions): NotifStates => {
  switch (action.type) {
    case "ADD": {
      const { notif, removeNotif } = action.payload;
      const id = getId();
      const newNotif = {
        ...notif,
        id: id,
        timeout: Date.now(),
        fn: setTimeout(() => {
          removeNotif(id);
        }, SELF_DESTRUCT_TIMEOUT),
      } as NotificationType;

      return {
        ...state,
        notifs: [...state.notifs, newNotif],
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

  const removeNotif = (id: number) => {
    dispatch({ type: "REMOVE_AT", payload: { id } });
  };

  const removeAllNotifs = () => {
    dispatch({ type: "REMOVE_ALL" });
  };

  const post = (notif: NotificationTypeInComponent) => {
    dispatch({ type: "ADD", payload: { notif, removeNotif } });
  };

  return { notifs, post, removeNotif, removeAllNotifs };
};
