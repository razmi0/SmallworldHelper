// CSS MODULES
import chartStyles from "../components/charts/charts.module.css";
import containerStyles from "../components/containers/containers.module.css";
import playerStyles from "../components/players/players.module.css";
import utilsStyles from "../components/utils/utils.module.css";
import navStyles from "../components/nav/nav.module.css";
import iconsStyles from "../components/icons/icons.module.css";
import themeStyles from "../hooks/context/theme/_.module.css";
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
  | "chart-back"
  | "donut-back";
export const getCardStyles = (card: CardType) => {
  const statsClasses = cssModules.player["board-card"] + texture;
  const chartClasses = cssModules.container["figure-ctn"] + texture;
  const playerBack = cssModules.player["player-back"];
  const chartBack = cssModules.chart["chart-back"];
  const donutBack = cssModules.chart["donut-back"];

  switch (card) {
    case "player":
      return (
        statsClasses +
        cssModules.player["card-size-player"] +
        defaultRadius +
        cssModules.player["list-element-ctn"]
      );

    case "player-back":
      return playerBack;

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

    default:
      return "NOPNOPNOPNOPNOP"; // cardStyles +
  }
};
