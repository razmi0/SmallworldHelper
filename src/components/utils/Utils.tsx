import {
  ReactNode,
  CSSProperties,
  useState,
  useId,
  ElementType,
  KeyboardEvent,
  forwardRef,
} from "react";
import { IconAddPlayer, IconButton } from "@Components";
import { ContainerProps } from "@Types";
import { useNotif } from "@Hooks";
import styles from "./_.module.css";

export const Toast = () => {
  const id = useId();
  const { notifs, removeNotif } = useNotif();

  //
  setTimeout(() => {
    if (notifs.length > 0) {
      removeNotif(notifs[0].id);
    }
  }, 5000);

  return (
    <ListContainer>
      {notifs.map((notif) => {
        const { title, message, type } = notif;
        const color = getToastColorType(type);
        return (
          <li key={id}>
            <div className={styles["toast-header"]}>
              <Bullet color={color} />
              <div>{title}</div>
            </div>
            <div>{message}</div>
          </li>
        );
      })}
    </ListContainer>
  );
};

export const getToastColorType = (type: "success" | "error" | "warning" | "info") => {
  return type === "success"
    ? "green"
    : type === "error"
    ? "red"
    : type === "warning"
    ? "orange"
    : "blue";
};

const Bullet = ({ color }: { color: string }) => {
  return <div className={styles["bullet"]} style={{ backgroundColor: color }} />;
};

const ListContainer = ({ children }: { children: ReactNode }) => {
  return <ul className={styles["toast-list-ctn"]}>{children}</ul>;
};

interface FocusManagerProps extends ContainerProps {
  onFocus: () => void;
  onBlur?: () => void;
  onClick?: () => void;
  as?: ElementType;
}
export const FocusManager = ({
  children,
  onFocus,
  onBlur,
  onClick,
  className = "",
  as: Element = "div",
}: FocusManagerProps) => {
  const id = `${useId()}_focus_manager`;
  return (
    <Element id={id} onFocus={onFocus} onBlur={onBlur} onClick={onClick} className={className}>
      {children}
    </Element>
  );
};

interface KeyboardManagerProps extends ContainerProps {
  onKeyUp: (e: KeyboardEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void;
  as?: ElementType;
}

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

export const KeyboardManager = ({
  as: Element = "div",
  children,
  onKeyUp,
  onKeyDown,
}: KeyboardManagerProps) => {
  const id = `${useId()}_keyboard_manager`;
  return (
    <Element id={id} onKeyUp={onKeyUp} onKeyDown={onKeyDown}>
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

type UndoRedo = {
  undo: () => void;
  redo: () => void;
  isUndoPossible: boolean;
  isRedoPossible: boolean;
};
export const UndoRedo = ({ undo, redo, isRedoPossible, isUndoPossible }: UndoRedo) => {
  return (
    <div>
      <button
        onClick={undo}
        disabled={!isUndoPossible}
        style={{ color: `${isUndoPossible ? "green" : "red"}` }}
      >
        Undo
      </button>
      <button
        onClick={redo}
        disabled={!isRedoPossible}
        style={{ color: `${isRedoPossible ? "green" : "red"}` }}
      >
        Redo
      </button>
      <button>Add</button>
    </div>
  );
};

type FreshStartButtonProps = {
  isNavOpen?: boolean;
  toggleOpenAddPlayer: () => void;
  isAddPlayerOpen: boolean;
  hasPlayers: boolean;
};
export const FreshStartButton = ({
  toggleOpenAddPlayer,
  isAddPlayerOpen,
  hasPlayers,
}: FreshStartButtonProps) => {
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
          <h3 style={{ fontSize: "1.3rem" }}>
            Start by adding a player and a start score, good game !
          </h3>
          <IconButton
            style={{ cursor: "pointer", transform: "scale(1.2)" }}
            variant="nav"
            icon={IconAddPlayer}
            iconName="addplayer"
            onClick={toggleOpenAddPlayer}
          />
        </div>
      )}
    </>
  );
};

type PositionType = "nav-extension";
interface PositionContainerProps extends ContainerProps {
  variant: PositionType;
}
export const Position = ({ variant, children }: PositionContainerProps) => {
  let classes: string;
  if (variant === "nav-extension") classes = styles["nav-extension"];
  else classes = "";
  return <div className={classes}>{children}</div>;
};
