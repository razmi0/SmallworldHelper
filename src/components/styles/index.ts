// CSS MODULES
import chartStyles from "./charts.module.css";
import containerStyles from "./containers.module.css";
import playerStyles from "./players.module.css";
import utilsStyles from "./utils.module.css";
import navStyles from "./nav.module.css";
import iconsStyles from "./icons.module.css";
import themeStyles from "@Context/theme/_.module.css";
// import globalStyles from ".../components/css/index.css/?inline";

type ModuleNames =
  | "chart"
  | "container"
  | "player"
  | "utils"
  | "nav"
  | "icons"
  | "theme"
  | ("global" & undefined);
type CssStyles = Record<ModuleNames, CSSModuleClasses>;
/* eslint-disable no-re-export/no-re-export */
export const cssModules: CssStyles = {
  chart: chartStyles,
  container: containerStyles,
  player: playerStyles,
  utils: utilsStyles,
  nav: navStyles,
  icons: iconsStyles,
  theme: themeStyles,
};

// UI
//--

const defaultRadius =
  " grainy-default-radius lin-dark-default-radius global-grainy-default-radius ";
const donutRadius = ` grainy-donut-radius lin-dark-donut-radius global-grainy-donut-radius `;
const texture = " grainy lin-dark global-grainy shadow-ctn ";

export type CardType =
  | "player"
  | "utility"
  | "default"
  | "line"
  | "bar"
  | "donut"
  | "player-back"
  | "utility-back"
  | "chart-back"
  | "donut-back";
export const getCardStyles = (card: CardType) => {
  const statsClasses = cssModules.player["board-card"] + texture;
  const chartClasses = cssModules.container["figure-ctn"] + texture;
  const playerBack = cssModules.player["player-back"];
  const chartBack = cssModules.chart["chart-back"];
  const donutBack = cssModules.chart["donut-back"];
  const utilityBack = cssModules.player["utility-back"];

  switch (card) {
    case "player":
      return (
        statsClasses +
        cssModules.player["card-size-player"] +
        defaultRadius +
        cssModules.player["list-element-ctn"]
      );

    case "utility":
      return (
        statsClasses +
        cssModules.player["card-size-utility"] +
        defaultRadius +
        cssModules.player["addplayer-ctn"]
      );

    case "line":
      return chartClasses + defaultRadius;

    case "bar":
      return chartClasses + defaultRadius;

    case "donut":
      return chartClasses + cssModules.chart["donut"] + donutRadius + cssModules.chart["donut-ctn"];

    case "chart-back":
      return chartBack;

    case "donut-back":
      return donutBack;

    case "player-back":
      return playerBack;

    case "utility-back":
      return utilityBack;

    default:
      return "DEFAULT"; // cardStyles +
  }
};
