// CSS MODULES
import chartStyles from "./charts.module.css";
import containerStyles from "./containers.module.css";
import playerStyles from "./players.module.css";
import utilsStyles from "./utils.module.css";
import navStyles from "./nav.module.css";
import iconsStyles from "./icons.module.css";
import themeStyles from "@Context/theme/_.module.css";

import type { CardStyleType } from "@Types";
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

const defaultRadius = "grainy-default-radius lin-dark-default-radius global-grainy-default-radius";
const donutRadius = "grainy-donut-radius lin-dark-donut-radius global-grainy-donut-radius";
const texture = "grainy lin-dark global-grainy shadow-ctn";
const brightness = "brightness-15";
export const getCardStyles = (card: CardStyleType) => {
  switch (card) {
    case "player":
      return spaced(
        brightness,
        texture,
        defaultRadius,
        cssModules.player["board-card"],
        cssModules.player["card-size-player"],
        cssModules.player["list-element-ctn"],
        cssModules.player["player-ctn"]
      );

    case "utility":
      return spaced(
        texture,
        defaultRadius,
        cssModules.player["addplayer-card"],
        cssModules.player["card-size-utility"],
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

    case "line-back":
      return cssModules.chart["chart-back"];

    case "bar-back":
      return cssModules.chart["chart-back"];

    case "donut-back":
      return cssModules.chart["donut-back"];

    case "player-back":
      return cssModules.player["player-back"];

    case "utility-back":
      return cssModules.player["utility-back"];

    case "nav":
      return spaced(texture, cssModules.nav["nav-ctn"], defaultRadius);

    case "nav-back":
      return spaced(cssModules.nav["nav-back"], cssModules.container["header-ctn"]);

    case "default-back":
      return spaced(cssModules.nav["nav-back"]);

    default:
      console.warn(` getCardStyles : No card type specified ${card}`);
      return spaced(texture, brightness, defaultRadius); // cardStyles +
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
