import { MutableRefObject, useRef } from "react";
import { useClickOutside } from "@Hooks/useClickOutside";
import { Header } from "@Components/Containers";
import IconButton from "@Components/Icons";
import { cssModules } from "@Components/styles";
import { Player, UndoRedoActions, UndoRedoStates } from "@Types";

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
    setSavePlayers: (payload: boolean) => void;
    setLoadPlayers: (payload: boolean) => void;
  };
};

const Nav = ({
  togglers,
  isNavOpen,
  undoRedoStates,
  undoRedoActions,
  isScoreHidden,
  storageActions,
}: NavProps) => {
  const { setLoadPlayers, setSavePlayers } = storageActions;
  const { isRedoPossible, isUndoPossible } = undoRedoStates;
  const { undo, redo } = undoRedoActions;
  const { hideScore, openAddPlayer, openCharts, openNav } = togglers;
  const navRef = useRef<HTMLElement>(null) as MutableRefObject<HTMLElement>;

  useClickOutside(navRef, () => isNavOpen && navRef && openNav());

  return (
    <Header>
      <nav className={cssModules.nav["nav-ctn"]} ref={navRef}>
        <IconButton variant="nav" iconName="menu" onClick={() => openNav()} />
        {isNavOpen && (
          <>
            <IconButton variant="nav" iconName="load" onClick={() => setLoadPlayers(true)} />
            <IconButton variant="nav" iconName="save" onClick={() => setSavePlayers(true)} />
            <IconButton variant="nav" iconName="addplayer" onClick={() => openAddPlayer()} />
            <IconButton variant="nav" iconName="chart" onClick={() => openCharts()} />
            <IconButton
              variant="nav"
              iconName={isScoreHidden ? "eyeclose" : "eyeopen"}
              onClick={() => hideScore()}
            />
            <IconButton
              variant="nav"
              iconName="undo"
              onClick={() => undo()}
              disabled={!isUndoPossible}
            />
            <IconButton
              variant="nav"
              iconName="redo"
              onClick={() => redo()}
              disabled={!isRedoPossible}
            />
          </>
        )}
      </nav>
    </Header>
  );
};
export default Nav;
