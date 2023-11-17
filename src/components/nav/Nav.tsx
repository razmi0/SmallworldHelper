import { useIntermediateDispatch /* useSwitchTheme */ } from "../../hooks";
import { withViewTransition } from "../../utils";
import {
  AddPlayer,
  Chart,
  EyeClose,
  EyeOpen,
  IconButton,
  Load,
  Undo,
  Redo,
  Save,
  // Theme,
} from "../icons/Icons";
import styles from "./_.module.css";
import { Header } from "../containers";
import { Player, UndoRedoActions, UndoRedoStates } from "../../types";

type NavProps = {
  toggleOpenAddPlayer: () => void;
  toggleOpenCharts: () => void;
  toggleHideScore: () => void;
  isScoreHidden: boolean;
  undoRedoStates: Omit<UndoRedoStates<Player[]>, "future" | "present" | "past">;
  undoRedoActions: Omit<UndoRedoActions<Player[]>, "setState">;
};

export const Nav = ({
  toggleHideScore,
  toggleOpenAddPlayer,
  toggleOpenCharts,
  undoRedoStates,
  undoRedoActions,
  isScoreHidden,
}: NavProps) => {
  const { setLoadPlayers, setSavePlayers } = useIntermediateDispatch();

  const { isRedoPossible, isUndoPossible } = undoRedoStates;
  const { undo, redo } = undoRedoActions;

  return (
    <Header>
      <nav className={styles["nav-ctn"]}>
        {/* <IconButton variant="nav" icon={Theme} iconName="theme" onClick={switchTheme} /> */}
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
          icon={AddPlayer}
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
