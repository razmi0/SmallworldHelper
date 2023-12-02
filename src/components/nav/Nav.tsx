import { useClickOutside, useMidAction /* useSwitchTheme */ } from "@Hooks";
import { MutableRefObject, useEffect, useRef, useState } from "react";
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
import { withViewTransition } from "@Utils";
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
  playerSize,
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
  const [allowViewTransition, setAllowViewTransition] = useState(false);
  const { setLoadPlayers, setSavePlayers } = storageActions;
  const { isRedoPossible, isUndoPossible } = undoRedoStates;
  const { undo, redo } = undoRedoActions;
  const navRef = useRef<HTMLElement>(null) as MutableRefObject<HTMLElement>;

  useEffect(() => {
    setAllowViewTransition(true);
  }, [playerSize]);

  useClickOutside(navRef, () => {
    if (isNavOpen && navRef) withViewTransition(toggleOpenNav);
  });

  return (
    <Header>
      <nav className={cssModules.nav["nav-ctn"]} ref={navRef}>
        <IconButton
          variant="nav"
          iconName="menu"
          icon={Menu}
          onClick={() => withViewTransition(toggleOpenNav)}
        />
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
              onClick={() => withViewTransition(toggleOpenAddPlayer)}
            />
            <IconButton
              variant="nav"
              icon={Chart}
              iconName="chart"
              onClick={() => withViewTransition(toggleOpenCharts)}
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
              onClick={() => {
                if (!allowViewTransition) {
                  undo();
                  return;
                }
                withViewTransition(undo);
                setAllowViewTransition(false);
              }}
              disabled={!isUndoPossible}
            />
            <IconButton
              variant="nav"
              icon={Redo}
              iconName="redo"
              onClick={() => {
                if (!allowViewTransition) {
                  redo();
                  return;
                }
                withViewTransition(redo);
                setAllowViewTransition(false);
              }}
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
