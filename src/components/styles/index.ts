// CSS MODULES
import chartStyles from "./charts.module.css";
import containerStyles from "./containers.module.css";
import playerStyles from "./players.module.css";
import utilsStyles from "./utils.module.css";
import navStyles from "./nav.module.css";
import iconsStyles from "./icons.module.css";
import themeStyles from "@Context/theme/_.module.css";
// import globalStyles from ".../components/css/index.css/?inline";

type ModuleNames = "chart" | "container" | "player" | "utils" | "nav" | "icons" | "theme" | ("global" & undefined);
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

export type CardType =
  | "player"
  | "utility"
  | "default"
  | "line"
  | "header"
  | "bar"
  | "donut"
  | "default-back"
  | "player-back"
  | "utility-back"
  | "chart-back"
  | "donut-back"
  | "nav"
  | "nav-back";

const defaultRadius = "grainy-default-radius lin-dark-default-radius global-grainy-default-radius";
const donutRadius = "grainy-donut-radius lin-dark-donut-radius global-grainy-donut-radius";
const texture = "grainy lin-dark global-grainy shadow-ctn";
const brightness = "brightness-15";
export const getCardStyles = (card: CardType) => {
  switch (card) {
    case "player":
      return spaced(
        cssModules.player["board-card"],
        texture,
        cssModules.player["card-size-player"],
        defaultRadius,
        cssModules.player["list-element-ctn"],
        brightness
      );

    case "utility":
      return spaced(
        cssModules.player["board-card"],
        texture,
        cssModules.player["card-size-utility"],
        defaultRadius,
        cssModules.player["list-element-ctn"]
      );

    case "line":
      return spaced(cssModules.container["figure-ctn"], texture, defaultRadius, brightness);

    case "bar":
      return spaced(cssModules.container["figure-ctn"], texture, defaultRadius, brightness);

    case "donut":
      return spaced(
        cssModules.container["figure-ctn"],
        texture,
        cssModules.chart["donut"],
        donutRadius,
        cssModules.chart["donut-ctn"],
        brightness
      );

    case "chart-back":
      return cssModules.chart["chart-back"];

    case "donut-back":
      return cssModules.chart["donut-back"];

    case "player-back":
      return cssModules.player["player-back"];

    case "utility-back":
      return cssModules.player["utility-back"];

    case "nav":
      return spaced(texture, cssModules.nav["nav-ctn"]);

    case "nav-back":
      return spaced(cssModules.nav["nav-back"], cssModules.container["header-ctn"]);

    case "default-back":
      return spaced(texture, brightness);

    default:
      console.warn("No card type specified in getCardStyles");
      return "DEFAULT"; // cardStyles +
  }
};

/**
 * Join strings with a space
 * @param str
 * @returns
 */
const spaced = (...str: string[]) => {
  return str.join(" ");
};
