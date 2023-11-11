import { useCallback } from "react";
import { useIntermediateDispatch, useSwitchTheme, useToggle } from "../../hooks";
import { debounce, withViewTransition } from "../../utils";
import {
  AddPlayer,
  Chart,
  EyeClose,
  EyeOpen,
  IconButton,
  Load,
  Menu,
  Save,
  Theme,
} from "../icons/Icons";
import styles from "./_.module.css";

type NavProps = {
  toggleOpenAddPlayer: () => void;
  toggleOpenCharts: () => void;
  toggleHideScore: () => void;
  isScoreHidden: boolean;
};

export const Nav = ({
  toggleHideScore,
  toggleOpenAddPlayer,
  toggleOpenCharts,
  isScoreHidden,
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
    <header>
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
          icon={isScoreHidden ? EyeClose : EyeOpen}
          animStartAt={isNavOpen}
          iconName="eyes"
          onClick={toggleHideScore}
        />
      </nav>
    </header>
  );
};
