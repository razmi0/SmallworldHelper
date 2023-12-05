import { createContext } from "react";

export const MouseToolTipContext = createContext<{ portalTarget: HTMLDivElement }>({
  portalTarget: document.createElement("div"),
});
