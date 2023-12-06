import { MutableRefObject, useRef } from "react";
import { useClickOutside } from "@Hooks/useClickOutside";
import { Header } from "@Components/Containers";
import IconButton, {
  Chart,
  AddPlayer as IconAddPlayer,
  EyeClose,
  EyeOpen,
  Load,
  Undo,
  Redo,
  Save,
  Menu,
} from "@Components/Icons";
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

  useClickOutside(navRef, () => {
    if (isNavOpen && navRef) openNav();
  });

  return (
    <Header>
      <nav className={cssModules.nav["nav-ctn"]} ref={navRef}>
        <IconButton variant="nav" iconName="menu" icon={Menu} onClick={() => openNav()} />
        {isNavOpen && (
          <>
            <IconButton
              variant="nav"
              icon={Load}
              iconName="load"
              onClick={() => setLoadPlayers(true)}
            />
            <IconButton
              variant="nav"
              icon={Save}
              onClick={() => setSavePlayers(true)}
              iconName="save"
            />
            <IconButton
              variant="nav"
              icon={IconAddPlayer}
              iconName="addplayer"
              onClick={() => openAddPlayer()}
            />
            <IconButton variant="nav" icon={Chart} iconName="chart" onClick={() => openCharts()} />
            <IconButton
              variant="nav"
              icon={isScoreHidden ? EyeClose : EyeOpen}
              iconName="eyes"
              onClick={() => hideScore()}
            />
            <IconButton
              variant="nav"
              icon={Undo}
              iconName="undo"
              onClick={() => undo()}
              disabled={!isUndoPossible}
            />
            <IconButton
              variant="nav"
              icon={Redo}
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
