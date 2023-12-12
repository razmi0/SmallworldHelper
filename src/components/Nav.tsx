import { useRef } from "react";
import { useClickOutside } from "@Hooks/useClickOutside";
import { CardStyles } from "./Containers";
import { IconButton } from "./Buttons";
import type { MutableRefObject } from "react";
import type { Player, UndoRedoActions, UndoRedoStates } from "@Types";

type NavUndoRedoStates = Pick<UndoRedoStates<Player[]>, "isRedoPossible" | "isUndoPossible">;

type NavProps = {
  playerSize: number;
  togglers: {
    hideScore: () => void;
    openAddPlayer: (newState?: boolean | undefined) => void;
    openNav: (newState?: boolean | undefined) => void;
    openCharts: () => void;
  };
  isNavOpen: boolean;
  isScoreHidden: boolean;
  undoRedoStates: NavUndoRedoStates;
  undoRedoActions: Omit<UndoRedoActions<Player[]>, "setState">;
  storageActions: {
    setSave: (payload: boolean) => void;
    setLoad: (payload: boolean) => void;
  };
};

const Nav = ({ togglers, isNavOpen, undoRedoStates, undoRedoActions, isScoreHidden, storageActions }: NavProps) => {
  const { setLoad, setSave } = storageActions;
  const { isRedoPossible, isUndoPossible } = undoRedoStates;
  const { undo, redo } = undoRedoActions;
  const { hideScore, openAddPlayer, openCharts, openNav } = togglers;
  const navRef = useRef<HTMLElement>(null) as MutableRefObject<HTMLElement>;

  useClickOutside(navRef, () => isNavOpen && navRef && openNav());

  const eye = isScoreHidden ? "eyeclose" : "eyeopen";

  return (
    <CardStyles as={["header", "nav"]} card={["nav-back", "nav"]}>
      {/* <NavContainer ref={navRef}> */}
      <IconButton variant="nav" iconName="menu" onClick={() => openNav()} />
      {isNavOpen && (
        <>
          <IconButton variant="nav" iconName="load" onClick={() => setLoad(true)} />
          <IconButton variant="nav" iconName="save" onClick={() => setSave(true)} />
          <IconButton variant="nav" iconName="addplayer" onClick={() => openAddPlayer()} />
          <IconButton variant="nav" iconName="chart" onClick={() => openCharts()} />
          <IconButton variant="nav" iconName={eye} onClick={() => hideScore()} />
          <IconButton variant="nav" iconName="undo" onClick={() => undo()} disabled={!isUndoPossible} />
          <IconButton variant="nav" iconName="redo" onClick={() => redo()} disabled={!isRedoPossible} />
          <IconButton variant="nav" iconName="github" onClick={() => console.log("github")} />
        </>
      )}
      {/* </NavContainer> */}
    </CardStyles>
  );
};

export default Nav;
