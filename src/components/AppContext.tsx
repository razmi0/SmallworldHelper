import { createContext } from "react";

export const AppContext = createContext<{ portalTarget: HTMLDivElement }>({
  portalTarget: document.createElement("div"),
});
