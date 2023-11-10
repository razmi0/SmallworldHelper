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
import { iconStyle } from "../icons/data";
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
          icon={Menu}
          animStartAt={toggleStates.isNavOpen}
          iconName="menu"
          svgData={iconStyle}
          onMouseEnter={debouncedToggleOpenNav(true)}
          onClick={debouncedToggleOpenNav(!isNavOpen)}
        />
        <IconButton
          icon={Theme}
          animStartAt={isNavOpen}
          iconName="theme"
          svgData={iconStyle}
          onClick={switchTheme}
        />
        <IconButton
          icon={Load}
          animStartAt={isNavOpen}
          iconName="load"
          svgData={iconStyle}
          onClick={() => setLoadPlayers(true)}
        />
        <IconButton
          icon={Save}
          onClick={() => setSavePlayers(true)}
          animStartAt={isNavOpen}
          iconName="save"
          svgData={iconStyle}
        />
        <IconButton
          icon={AddPlayer}
          animStartAt={isNavOpen}
          iconName="addplayer"
          svgData={iconStyle}
          onClick={toggleOpenAddPlayer}
        />
        <IconButton
          icon={Chart}
          animStartAt={isNavOpen}
          iconName="chart"
          svgData={iconStyle}
          onClick={() => withViewTransition(toggleOpenCharts)}
        />
        <IconButton
          icon={isScoreHidden ? EyeClose : EyeOpen}
          animStartAt={isNavOpen}
          iconName="eyes"
          svgData={iconStyle}
          onClick={toggleHideScore}
        />
      </nav>
    </header>
  );
};
