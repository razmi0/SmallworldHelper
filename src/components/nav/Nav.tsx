import { useCallback } from "react";
import { useIntermediateDispatch, useSwitchTheme, useToggle, useUndoRedo } from "../../hooks";
import { debounce, withViewTransition } from "../../utils";
import {
  AddPlayer,
  Chart,
  EyeClose,
  EyeOpen,
  IconButton,
  Load,
  Menu,
  Undo,
  Redo,
  Save,
  Theme,
} from "../icons/Icons";
import styles from "./_.module.css";
import { Header } from "../containers";

type NavProps = {
  toggleOpenAddPlayer: () => void;
  toggleOpenCharts: () => void;
  toggleHideScore: () => void;
  isScoreHidden: boolean;
  undo: () => void;
  redo: () => void;
  isUndoPossible: boolean;
  isRedoPossible: boolean;
};

export const Nav = ({
  toggleHideScore,
  toggleOpenAddPlayer,
  toggleOpenCharts,
  undo,
  redo,
  isScoreHidden,
  isUndoPossible,
  isRedoPossible,
}: NavProps) => {
  const { switchTheme } = useSwitchTheme();
  const { toggleActions, toggleStates } = useToggle();
  const { isNavOpen } = toggleStates;
  const { openNav } = toggleActions;
  const { setLoadPlayers, setSavePlayers } = useIntermediateDispatch();

  const debouncedToggleOpenNav = useCallback(
    (arg: boolean) => debounce(() => openNav(arg), 100),
    [openNav]
  );

  return (
    <Header>
      <nav className={styles["nav-ctn"]} onMouseLeave={debouncedToggleOpenNav(false)}>
        <IconButton
          variant="nav"
          icon={Menu}
          animStartAt={toggleStates.isNavOpen}
          iconName="menu"
          onMouseEnter={debouncedToggleOpenNav(true)}
          onClick={debouncedToggleOpenNav(!isNavOpen)}
        />
        <IconButton
          variant="nav"
          icon={Theme}
          animStartAt={isNavOpen}
          iconName="theme"
          onClick={switchTheme}
        />
        <IconButton
          variant="nav"
          icon={Load}
          animStartAt={isNavOpen}
          iconName="load"
          onClick={() => setLoadPlayers(true)}
        />
        <IconButton
          variant="nav"
          icon={Save}
          onClick={() => setSavePlayers(true)}
          animStartAt={isNavOpen}
          iconName="save"
        />
        <IconButton
          variant="nav"
          icon={AddPlayer}
          animStartAt={isNavOpen}
          iconName="addplayer"
          onClick={toggleOpenAddPlayer}
        />
        <IconButton
          variant="nav"
          icon={Chart}
          animStartAt={isNavOpen}
          iconName="chart"
          onClick={() => withViewTransition(toggleOpenCharts)}
        />
        <IconButton
          variant="nav"
          animStartAt={isNavOpen}
          icon={isScoreHidden ? EyeClose : EyeOpen}
          iconName="eyes"
          onClick={toggleHideScore}
        />
        <IconButton
          variant="nav"
          animStartAt={isNavOpen}
          icon={Undo}
          iconName="undo"
          onClick={undo}
        />
        <IconButton
          variant="nav"
          animStartAt={isNavOpen}
          icon={Redo}
          iconName="redo"
          onClick={redo}
        />
      </nav>
    </Header>
  );
};
