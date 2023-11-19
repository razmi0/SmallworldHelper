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

type NavUndoRedoStates = Pick<UndoRedoStates<Player[]>, "isRedoPossible" | "isUndoPossible">;

type NavProps = {
  toggleOpenAddPlayer: (newState?: boolean) => void;
  toggleOpenCharts: () => void;
  toggleHideScore: () => void;
  isScoreHidden: boolean;
  undoRedoStates: NavUndoRedoStates;
  undoRedoActions: Omit<UndoRedoActions<Player[]>, "setState">;
  storageActions: ReturnType<typeof useMidAction>["storageActions"];
};

export const Nav = ({
  toggleHideScore,
  toggleOpenAddPlayer,
  toggleOpenCharts,
  undoRedoStates,
  undoRedoActions,
  isScoreHidden,
  storageActions,
}: NavProps) => {
  const { setLoadPlayers, setSavePlayers } = storageActions;
  const { isRedoPossible, isUndoPossible } = undoRedoStates;
  const { undo, redo } = undoRedoActions;

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
          onClick={undo}
          disabled={!isUndoPossible}
        />
        <IconButton
          variant="nav"
          icon={Redo}
          iconName="redo"
          onClick={redo}
          disabled={!isRedoPossible}
        />
      </nav>
    </Header>
  );
};
