import { arrayify } from "@/utils/utils";
import { MutableRefObject, useEffect } from "react";

type ClickOutsideRef = MutableRefObject<HTMLElement[]> | MutableRefObject<HTMLElement>;
type TouchOrMouseEvent = MouseEvent | TouchEvent;
export const useClickOutside = (
  ref: ClickOutsideRef,
  handler: (event: TouchOrMouseEvent) => void
) => {
  const elements = arrayify(ref.current);
  useEffect(() => {
    const listener = (event: TouchOrMouseEvent) => {
      elements.map((element) => {
        if (!element || element.contains(event.target as Node)) {
          return;
        }
        handler(event);
      });
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
};
