import { withViewTransition, debounce } from "../../utils";
import { useSwitchTheme, useToggle } from "../../hooks";
import { AddPlayer, EyeClose, EyeOpen, IconButton } from "../icons/Icons";
import { Chart, Load, Menu, Save, Theme } from "../icons/Icons";
import { iconStyle } from "../icons/data";
import styles from "./_.module.css";
import { useCallback } from "react";

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
  const { isNavOpen, toggleOpenNav } = useToggle();

  const debouncedToggleOpenNav = useCallback(
    (arg: boolean) => debounce(() => toggleOpenNav(arg), 100),
    [toggleOpenNav]
  );

  return (
    <header>
      <nav className={styles["nav-ctn"]} onMouseLeave={debouncedToggleOpenNav(false)}>
        <IconButton
          icon={Menu}
          animStartAt={isNavOpen}
          iconName="menu"
          svgData={iconStyle}
          onMouseEnter={debouncedToggleOpenNav(true)}
        />
        <IconButton
          icon={Theme}
          animStartAt={isNavOpen}
          iconName="theme"
          svgData={iconStyle}
          onClick={switchTheme}
        />
        <IconButton icon={Load} animStartAt={isNavOpen} iconName="load" svgData={iconStyle} />
        <IconButton icon={Save} animStartAt={isNavOpen} iconName="save" svgData={iconStyle} />
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
