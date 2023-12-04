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
import { ContainerProps, Player, UndoRedoActions, UndoRedoStates } from "@Types";

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
    if (isNavOpen && navRef) toggleOpenNav;
  });

  return (
    <Header>
      <nav className={cssModules.nav["nav-ctn"]} ref={navRef}>
        <IconButton variant="nav" iconName="menu" icon={Menu} onClick={() => toggleOpenNav} />
        {isNavOpen && (
          <ViewTransitionManager>
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
              onClick={() => toggleOpenAddPlayer}
            />
            <IconButton
              variant="nav"
              icon={Chart}
              iconName="chart"
              onClick={() => toggleOpenCharts}
            />
            <IconButton
              variant="nav"
              icon={isScoreHidden ? EyeClose : EyeOpen}
              iconName="eyes"
              onClick={toggleHideScore}
            />
            <IconButton
              variant="nav"
              icon={Undo}
              iconName="undo"
              onClick={() => undo}
              disabled={!isUndoPossible}
            />
            <IconButton
              variant="nav"
              icon={Redo}
              iconName="redo"
              onClick={() => redo}
              disabled={!isRedoPossible}
            />
          </ViewTransitionManager>
        )}
      </nav>
    </Header>
  );
};

const ViewTransitionManager = ({ children }: ContainerProps) => {
  return (
    <>
      <style>
        {`
            ::view-transition-new(nav-vt) {
              animation : slide-in-from-left 0.2s ease-out;
            }

            @keyframes slide-in-from-left {
              0% {
                transform: translateX(-200%);
              }
              100% {
                transform: translateX(0);
              }
            }
        `}
      </style>
      <div className={cssModules.nav["view-transition-manager"]}>{children}</div>
    </>
  );
};
