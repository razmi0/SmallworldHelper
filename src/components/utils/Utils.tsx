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
  as: Element = "div",
}: FocusManagerProps) => {
  return (
    <Element onFocus={onFocus} onBlur={onBlur} onClick={onClick}>
      {children}
    </Element>
  );
};

interface KeyboardManagerProps extends ContainerProps {
  onKeyUp: (e: KeyboardEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void;
  as?: ElementType;
}

export const RefManager = forwardRef<HTMLDivElement, ContainerProps>(({ children }, ref) => {
  const id = `${useId()}_refManager`;
  return (
    <div id={id} ref={ref}>
      {children}
    </div>
  );
});

export const KeyboardManager = ({
  as: Element = "div",
  children,
  onKeyUp,
  onKeyDown,
}: KeyboardManagerProps) => {
  return (
    <Element onKeyUp={onKeyUp} onKeyDown={onKeyDown}>
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
