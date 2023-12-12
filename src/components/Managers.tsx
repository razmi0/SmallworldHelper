import { forwardRef, useId } from "react";

import type { KeyboardEvent } from "react";
import type { EventsManagerProps, ContainerProps, KeyboardManagerProps, EventTarget } from "@Types";
import { keyHandlers } from "@/utils/players/helpers";

export const EventsManager = <T extends unknown[]>({
  children,
  pointer,
  className = "",
  as: Element = "div",
  ...rest
}: EventsManagerProps<T>) => {
  const id = `${useId()}_focus_manager`;

  const { args, pointerHandlers } = pointer;
  const { focus, blur, click, enter, leave } = pointerHandlers;
  return (
    <Element
      id={id}
      onFocus={() => focus?.(...args)}
      onBlur={() => blur?.(...args)}
      onClick={() => click?.(...args)}
      onMouseEnter={() => enter?.(...args)}
      onMouseLeave={() => leave?.(...args)}
      className={className}
      {...rest}
    >
      {children}
    </Element>
  );
};

export const RefManager = forwardRef<HTMLDivElement, ContainerProps>((props, ref) => {
  const id = `${useId()}_ref_manager`;
  return (
    <div
      id={id}
      ref={ref}
      style={{
        width: "fit-content",
        height: "fit-content",
        ...props.style,
      }}
    >
      {props.children}
    </div>
  );
});

export const KeyboardManager = <T extends unknown[]>({
  as: Element = "div",
  children,
  keyboard,
}: KeyboardManagerProps<T>) => {
  const displayname = `_keyboard_manager`;

  const onKeyDown = (e: KeyboardEvent<EventTarget>) => {
    if (!keyboard) return;
    const target = e.target as unknown as EventTarget;
    const pressedKey = e.key as keyof typeof keyboard.keyboardHandlers;
    if (!keyHandlers.includes(pressedKey)) return;
    const { args, keyboardHandlers: handlers } = keyboard;
    for (const key of keyHandlers) {
      if (key !== pressedKey) continue;
      handlers[key]?.(target, ...args);
      break;
    }
  };

  return (
    <Element displayname={displayname} onKeyDown={(e: KeyboardEvent<EventTarget>) => onKeyDown(e)}>
      {children}
    </Element>
  );
};
