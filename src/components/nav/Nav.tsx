import { useMidAction /* useSwitchTheme */ } from "@Hooks";
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
} from "@Components";
import { withViewTransition } from "@Utils";
import { Player, UndoRedoActions, UndoRedoStates } from "@Types";
import styles from "./_.module.css";
import { useEffect, useState } from "react";

type NavUndoRedoStates = Pick<UndoRedoStates<Player[]>, "isRedoPossible" | "isUndoPossible">;

type NavProps = {
  playerSize: number;
  toggleOpenAddPlayer: (newState?: boolean) => void;
  toggleOpenCharts: () => void;
  toggleHideScore: () => void;
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
  undoRedoStates,
  undoRedoActions,
  isScoreHidden,
  storageActions,
}: NavProps) => {
  const [allowViewTransition, setAllowViewTransition] = useState(false);
  const { setLoadPlayers, setSavePlayers } = storageActions;
  const { isRedoPossible, isUndoPossible } = undoRedoStates;
  const { undo, redo } = undoRedoActions;

  useEffect(() => {
    setAllowViewTransition(true);
  }, [playerSize]);

  return (
    <Header>
      <nav className={styles["nav-ctn"]}>
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
      </nav>
    </Header>
  );
};
