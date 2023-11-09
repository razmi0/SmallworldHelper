import { flushSync } from "react-dom";
import { useSwitchTheme, useToggle } from "../../hooks";
import { AddPlayer, EyeClose, EyeOpen, IconButton } from "../icons/Icons";
import { LineChart, Load, Menu, Save, Theme } from "../icons/Icons";
import { iconStyle } from "../icons/data";
import styles from "./_.module.css";

type IconName = "MENU" | "THEME" | "LOAD" | "SAVE" | "ADDPLAYER" | "LINECHART" | "EYES" | "";
type NavItemProps = {
  name: IconName;
};
type NavProps = {
  toggleOpenNav: () => void;
  toggleOpenAddPlayer: () => void;
  toggleOpenCharts: () => void;
  toggleHideScore: () => void;
  isNavOpen: boolean;
  isScoreHidden: boolean;
};

export const Nav = ({
  toggleHideScore,
  toggleOpenAddPlayer,
  toggleOpenCharts,
  toggleOpenNav,
  isNavOpen,
  isScoreHidden,
}: NavProps) => {
  const { switchTheme } = useSwitchTheme();

  const handleWithViewTransition = (fn: () => void) => {
    document.startViewTransition(() => {
      flushSync(() => {
        fn();
      });
    });
  };
  return (
    <header>
      <nav className={styles["nav-ctn"]}>
        <IconButton
          icon={Menu}
          sx={{
            zIndex: iconStyle.icons.menu.zIndex,
            transform: isNavOpen ? "none" : iconStyle.icons.menu.transform?.(),
            transition: iconStyle.icons.menu.transition?.(),
          }}
          iconName="menu"
          svgData={iconStyle}
          onClick={toggleOpenNav}
        />
        <IconButton
          icon={Theme}
          sx={{
            transform: isNavOpen ? "translate(0px)" : iconStyle.icons.theme.transform?.(),
            transition: iconStyle.icons.theme.transition?.(),
            zIndex: iconStyle.icons.theme.zIndex,
          }}
          iconName="theme"
          svgData={iconStyle}
          onClick={() => {
            toggleOpenNav();
            switchTheme();
          }}
        />

        <IconButton
          icon={Load}
          sx={{
            transform: isNavOpen ? "translate(0px)" : iconStyle.icons.load.transform?.(),
            transition: iconStyle.icons.load.transition?.(),
            zIndex: iconStyle.icons.load.zIndex,
          }}
          iconName="load"
          svgData={iconStyle}
          onClick={toggleOpenNav}
        />
        <IconButton
          icon={Save}
          sx={{
            transform: isNavOpen ? "translate(0px)" : iconStyle.icons.save.transform?.(),
            transition: iconStyle.icons.save.transition?.(),
            zIndex: iconStyle.icons.save.zIndex,
          }}
          iconName="save"
          svgData={iconStyle}
          onClick={() => {
            toggleOpenNav();
          }}
        />
        <IconButton
          icon={AddPlayer}
          sx={{
            transform: isNavOpen ? "translate(0px)" : iconStyle.icons.addplayer.transform?.(),
            transition: iconStyle.icons.addplayer.transition?.(),
            zIndex: iconStyle.icons.addplayer.zIndex,
          }}
          iconName="addplayer"
          svgData={iconStyle}
          onClick={toggleOpenAddPlayer}
        />
        <IconButton
          icon={LineChart}
          sx={{
            transform: isNavOpen ? "translate(0px)" : iconStyle.icons.linechart.transform?.(),
            transition: iconStyle.icons.linechart.transition?.(),
            zIndex: iconStyle.icons.linechart.zIndex,
          }}
          iconName="linechart"
          svgData={iconStyle}
          onClick={() => {
            toggleOpenNav;
            // if (players.length == 0) return;
            handleWithViewTransition(toggleOpenCharts);
          }}
        />
        <IconButton
          icon={isScoreHidden ? EyeClose : EyeOpen}
          sx={{
            transform: isNavOpen ? "translate(0px)" : iconStyle.icons.eyes.transform?.(),
            transition: iconStyle.icons.eyes.transition?.(),
            zIndex: iconStyle.icons.eyes.zIndex,
          }}
          iconName="eyes"
          svgData={iconStyle}
          onClick={() => {
            toggleOpenNav();
            toggleHideScore();
          }}
        />
      </nav>
    </header>
  );
};

export const NavItem = ({ name = "" }: NavItemProps) => {
  const {
    isNavOpen,
    toggleOpenNav,
    toggleOpenAddPlayer,
    toggleOpenCharts,
    toggleHideScore,
    isScoreHidden,
  } = useToggle();
  const { switchTheme } = useSwitchTheme();

  const handleWithViewTransition = (fn: () => void) => {
    document.startViewTransition(() => {
      flushSync(() => {
        fn();
      });
    });
  };

  switch (name) {
    case "MENU":
      return (
        <IconButton
          icon={Menu}
          sx={{
            zIndex: iconStyle.icons.menu.zIndex,
            transform: isNavOpen ? "none" : iconStyle.icons.menu.transform?.(),
            transition: iconStyle.icons.menu.transition?.(),
          }}
          iconName="menu"
          svgData={iconStyle}
          onClick={toggleOpenNav}
        />
      );
    case "THEME":
      return (
        <IconButton
          icon={Theme}
          sx={{
            transform: isNavOpen ? "translate(0px)" : iconStyle.icons.theme.transform?.(),
            transition: iconStyle.icons.theme.transition?.(),
            zIndex: iconStyle.icons.theme.zIndex,
          }}
          iconName="theme"
          svgData={iconStyle}
          onClick={() => {
            toggleOpenNav();
            switchTheme();
          }}
        />
      );
    case "LOAD":
      return (
        <IconButton
          icon={Load}
          sx={{
            transform: isNavOpen ? "translate(0px)" : iconStyle.icons.load.transform?.(),
            transition: iconStyle.icons.load.transition?.(),
            zIndex: iconStyle.icons.load.zIndex,
          }}
          iconName="load"
          svgData={iconStyle}
          onClick={toggleOpenNav}
        />
      );
    case "SAVE":
      return (
        <IconButton
          icon={Save}
          sx={{
            transform: isNavOpen ? "translate(0px)" : iconStyle.icons.save.transform?.(),
            transition: iconStyle.icons.save.transition?.(),
            zIndex: iconStyle.icons.save.zIndex,
          }}
          iconName="save"
          svgData={iconStyle}
          onClick={() => {
            // saveToLocalStorage("players", players);
            // saveToLocalStorage("lineData", lines);
            // saveToLocalStorage("barData", bars);
            // saveToLocalStorage("pieData", pies);
            toggleOpenNav();
          }}
        />
      );
    case "ADDPLAYER":
      return (
        <IconButton
          icon={AddPlayer}
          sx={{
            transform: isNavOpen ? "translate(0px)" : iconStyle.icons.addplayer.transform?.(),
            transition: iconStyle.icons.addplayer.transition?.(),
            zIndex: iconStyle.icons.addplayer.zIndex,
          }}
          iconName="addplayer"
          svgData={iconStyle}
          onClick={toggleOpenAddPlayer}
        />
      );
    case "LINECHART":
      return (
        <IconButton
          icon={LineChart}
          sx={{
            transform: isNavOpen ? "translate(0px)" : iconStyle.icons.linechart.transform?.(),
            transition: iconStyle.icons.linechart.transition?.(),
            zIndex: iconStyle.icons.linechart.zIndex,
          }}
          iconName="linechart"
          svgData={iconStyle}
          onClick={() => {
            toggleOpenNav;
            handleWithViewTransition(toggleOpenCharts);
          }}
        />
      );
    case "EYES":
      return (
        <IconButton
          icon={isScoreHidden ? EyeClose : EyeClose}
          sx={{
            transform: isNavOpen ? "translate(0px)" : iconStyle.icons.eyes.transform?.(),
            transition: iconStyle.icons.eyes.transition?.(),
            zIndex: iconStyle.icons.eyes.zIndex,
          }}
          iconName="eyes"
          svgData={iconStyle}
          onClick={() => {
            toggleOpenNav();
            toggleHideScore();
          }}
        />
      );
    default:
      return <></>;
  }
};

type NavButtonProps = {
  onClick: () => void;
  sx?: React.CSSProperties;
  className?: string;
  children: React.ReactNode;
};
const NavButton = ({ onClick, sx, className, children }: NavButtonProps) => {
  return (
    <button
      type="button"
      style={{ cursor: "pointer", ...sx }}
      onClick={onClick}
      className={className}
    >
      {children}
    </button>
  );
};
