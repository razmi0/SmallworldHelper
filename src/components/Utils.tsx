import { useState, useId, forwardRef, useMemo, useRef } from "react";
import { IconButton } from "@Components/Buttons";
import { useNotif } from "@Context/useNotif";
import { cssModules, getCardStyles } from "@Components/styles";
import type { ReactNode, CSSProperties, KeyboardEvent } from "react";
import type { ContainerProps, EventTarget, EventsManagerProps, KeyboardManagerProps } from "@Types";
import { keyHandlers } from "@/utils/players/helpers";
import { isProdEnv } from "@/utils/utils";

/*
 * DRAGGABLE
 * If running in React Strict mode, ReactDOM.findDOMNode() is deprecated.
 * Unfortunately, in order for <Draggable> to work properly, we need raw access
 * to the underlying DOM node. If you want to avoid the warning, pass a `nodeRef`
 * as in this example:
 *
 * function MyComponent() {
 *   const nodeRef = React.useRef(null);
 *   return (
 *     <Draggable nodeRef={nodeRef}>
 *       <div ref={nodeRef}>Example Target</div>
 *     </Draggable>
 *   );
 * }
 *
 * This can be used for arbitrarily nested components, so long as the ref ends up
 * pointing to the actual child DOM node and not a custom component.
 */

const root = document.querySelector(":root") as HTMLHtmlElement;
export const RisingStars = ({ color }: { color: string }) => {
  root?.style.setProperty("--raining-stars-color", color || "#FFF");
  return (
    <>
      <div className="rising-stars rising-stars-visible">
        <div style={{ height: "1px", width: "1px" }}></div>
        <div style={{ height: "2px", width: "2px" }}></div>
        <div style={{ height: "1px", width: "1px" }}></div>
      </div>
    </>
  );
};

export const Toast = () => {
  const { notifs, removeNotif } = useNotif();

  return (
    <ListContainer>
      {notifs.map((notif, i) => {
        const { message, type } = notif;
        const color = getToastColorType(type);
        return (
          <ListElement color={color} key={i}>
            <ToastBody onClick={() => removeNotif(notifs[0].id)}>
              <ToastMessage message={message} />
            </ToastBody>
          </ListElement>
        );
      })}
    </ListContainer>
  );
};

const getToastColorType = (type: "success" | "error" | "warning" | "info") => {
  return type === "success" ? "green" : type === "error" ? "red" : type === "warning" ? "orange" : "blue";
};

const ListContainer = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <style>
        {`@keyframes slide {
        0% {
          transform: translateY(100%);
        }
        100% {
          transform: translateX(0%);
        }
    }`}
      </style>
      <ul className={cssModules.utils["toast-list-ctn"]}>{children}</ul>
    </>
  );
};

const ListElement = ({ children, color }: { children: ReactNode; color: string }) => {
  const classes = getCardStyles("default");
  return (
    <li
      style={{
        boxShadow: ` 0px 0px 1px 1px ${color}`,
        overflow: "hidden",
      }}
      className={cssModules.utils["toast-list-element"] + " " + classes}
    >
      {children}
    </li>
  );
};

type ToastHeaderProps = {
  children: ReactNode;
  onClick: () => void;
};
const ToastBody = ({ children, onClick }: ToastHeaderProps) => {
  return (
    <div style={{ display: "flex", flexDirection: "row" }} className="">
      <div className={cssModules.utils["toast-body"]}>{children}</div>
      <IconButton onClick={onClick} iconName="close" variant="toaster" sx={{ position: "absolute", right: 0 }} />
    </div>
  );
};

const ToastMessage = ({ message }: { message: string }) => {
  return (
    <div className={cssModules.utils["toast-message"]}>
      <span>{message}</span>
    </div>
  );
};

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

export const Separator = () => {
  return <hr className={cssModules.utils["separator"]} />;
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

type FlexProps = {
  children: ReactNode;
  sx?: CSSProperties;
};
export const Spacer = ({ sx }: { sx?: CSSProperties }) => {
  const id = useId() + "_spacer";
  return <div style={{ ...sx, flex: 1 }} id={id}></div>;
};
export const Flex = ({ children, sx }: FlexProps) => {
  return <div style={{ ...sx, display: "flex" }}>{children}</div>;
};

type Clock = {
  seconds: number;
  minutes?: number;
};
export const Clock = () => {
  const [state, setClock] = useState<Clock>({ seconds: 0, minutes: 0 });

  setTimeout(() => {
    let s = state.seconds;
    let m = state.minutes || 0;
    m = s === 59 ? m + 1 : m;
    s = s === 59 ? 0 : s + 1;

    setClock({ seconds: s, minutes: m });
  }, 1000);

  return (
    <span style={{ position: "absolute", left: 0, top: 0, fontSize: 18 }}>
      Last refresh : {state.minutes} : {state.seconds}
    </span>
  );
};

type StartButtonProps = {
  isNavOpen?: boolean;
  toggleOpenAddPlayer: () => void;
  isAddPlayerOpen: boolean;
  hasPlayers: boolean;
};
export const StartButton = ({ toggleOpenAddPlayer, isAddPlayerOpen, hasPlayers }: StartButtonProps) => {
  return (
    <>
      {!hasPlayers && !isAddPlayerOpen && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "center",
            width: "100%",
            height: "100%",
            gap: 20,
          }}
        >
          <h3 style={{ fontSize: "1.3rem" }}>Start by adding a player and a start score, good game !</h3>
          <IconButton
            style={{ cursor: "pointer", transform: "scale(1.2)" }}
            variant="nav"
            iconName="addplayer"
            onClick={toggleOpenAddPlayer}
          />
        </div>
      )}
    </>
  );
};

type PositionType = "absolute-center";
interface PositionContainerProps extends ContainerProps {
  variant: PositionType;
}
export const Position = ({ variant, children }: PositionContainerProps) => {
  let classes: string;
  variant === "absolute-center" ? (classes = cssModules.utils["absolute-center"]) : (classes = "");
  return <div className={classes}>{children}</div>;
};

type MockButtonType = {
  setMock: () => void;
};
export const MockButton = ({ setMock }: MockButtonType) => {
  if (isProdEnv()) return <></>;
  return (
    <button className="mock" onClick={setMock}>
      Mock
    </button>
  );
};
