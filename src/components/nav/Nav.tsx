import { useClickOutside, useMidAction /* useSwitchTheme */ } from "@Hooks";
import { MutableRefObject, useRef } from "react";
import {
  Header,
  IconAddPlayer,
  Chart,
  EyeClose,
  EyeOpen,
  IconButton,
  Load,
  Undo,
  Redo,
  Save,
  Menu,
} from "@Components";
import { cssModules } from "@Styles";
import { Player, UndoRedoActions, UndoRedoStates } from "@Types";
import { MouseTooltipWrapper } from "../OnMouseTooltip";

type NavUndoRedoStates = Pick<UndoRedoStates<Player[]>, "isRedoPossible" | "isUndoPossible">;

type NavProps = {
  playerSize: number;
  toggleOpenAddPlayer: (newState?: boolean) => void;
  toggleOpenCharts: () => void;
  toggleHideScore: () => void;
  toggleOpenNav: () => void;
  isNavOpen: boolean;
  isScoreHidden: boolean;
  undoRedoStates: NavUndoRedoStates;
  undoRedoActions: Omit<UndoRedoActions<Player[]>, "setState">;
  storageActions: ReturnType<typeof useMidAction>["storageActions"];
};

export const Nav = ({
  toggleHideScore,
  toggleOpenAddPlayer,
  toggleOpenCharts,
  toggleOpenNav,
  isNavOpen,
  undoRedoStates,
  undoRedoActions,
  isScoreHidden,
  storageActions,
}: NavProps) => {
  const { setLoadPlayers, setSavePlayers } = storageActions;
  const { isRedoPossible, isUndoPossible } = undoRedoStates;
  const { undo, redo } = undoRedoActions;
  const navRef = useRef<HTMLElement>(null) as MutableRefObject<HTMLElement>;

  useClickOutside(navRef, () => {
    if (isNavOpen && navRef) toggleOpenNav();
  });

  return (
    <Header>
      <nav className={cssModules.nav["nav-ctn"]} ref={navRef}>
        <MouseTooltipWrapper>
          <IconButton variant="nav" iconName="menu" icon={Menu} onClick={() => toggleOpenNav()} />
          <p>Menu</p>
        </MouseTooltipWrapper>
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
              onClick={() => toggleOpenAddPlayer()}
            />
            <IconButton
              variant="nav"
              icon={Chart}
              iconName="chart"
              onClick={() => toggleOpenCharts()}
            />
            <IconButton
              variant="nav"
              icon={isScoreHidden ? EyeClose : EyeOpen}
              iconName="eyes"
              onClick={() => toggleHideScore()}
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
