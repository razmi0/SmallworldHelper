import { ReactNode, CSSProperties, useState, useId } from "react";
import { AddPlayer, IconButton } from "../components/icons/Icons";

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
  isNavOpen: boolean;
  toggleOpenAddPlayer: () => void;
  isAddPlayerOpen: boolean;
  hasPlayers: boolean;
};
export const FreshStartButton = ({
  isNavOpen,
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
          }}
        >
          <h3>Start by adding a player and a start score, good game !</h3>
          <IconButton
            style={{ transform: "translate(0, 0) scale(1.3)", cursor: "pointer" }}
            variant="nav"
            icon={AddPlayer}
            animStartAt={isNavOpen}
            iconName="addplayer"
            onClick={toggleOpenAddPlayer}
          />
        </div>
      )}
    </>
  );
};
