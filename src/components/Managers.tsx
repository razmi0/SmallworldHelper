import { forwardRef, useId } from "react";
import { keyHandlers } from "@/utils/players/helpers";
import { getCardStyles } from "./styles";
import type { CSSProperties, ElementType, KeyboardEvent, ReactNode } from "react";
import type { EventsManagerProps, ContainerProps, KeyboardManagerProps, EventTarget } from "@Types";
import type { CardType } from "./styles";

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

export type RefManagerProps = {
  children?: ReactNode;
  style?: CSSProperties;
  as?: ElementType;
};
export const RefManager = forwardRef<HTMLDivElement, RefManagerProps>(
  ({ children, style, as: Element = "div" }, ref) => {
    const displayname = `_ref_manager`;
    return (
      <Element ref={ref} data-all-inherit style={style} displayname={displayname}>
        {children}
      </Element>
    );
  }
);

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

interface CardStyleManagerProps extends ContainerProps {
  children: ReactNode;
  card?: [CardType, CardType];
  as?: [ElementType, ElementType];
}
export const CardStyleManager = ({
  children,
  as: Element = ["div", "div"],
  card = ["default-back", "default"],
  ...rest
}: CardStyleManagerProps) => {
  const displayname = `_card_style_manager`;
  const classes = card.map((card) => getCardStyles(card));

  const ElementBack = Element[0];
  const ElementFront = Element[1];

  return (
    <ElementBack className={classes[0]} displayname={displayname}>
      <ElementFront className={classes[1]} displayname={displayname} {...rest}>
        {children}
      </ElementFront>
    </ElementBack>
  );
};
