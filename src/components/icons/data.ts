import { SvgDataType, VariantType } from "../../types";

// Helpers
//--

export const PLAYER_COLORS = [
  "#F9C74F",
  "#4CC9F0",
  "#F94144",
  "#F3722C",
  "#43AA8B",
  "#4D908E",
  "#4361EE",
  "#F72585",
  "#4895EF",
  "#560BAD",
  "#277DA1",
  "#3F37C9",
  "#F8961E",
  "#577590",
  "#B5179E",
  "#90BE6D",
] as const;

export const getSvgData = (variant: VariantType) => {
  switch (variant) {
    case "heading":
      return HEADING_STYLES;

    case "nav":
      return NAV_STYLES;

    case "utility":
      return UTILITY_STYLES;

    default:
      return NAV_STYLES;
  }
};

const MAX_Z_INDEX = 20 as const;

const buildTransform = (index: number) => {
  return `translate(-${
    (Number(NAV_STYLES.size[0].replace("px", "")) + Number(NAV_STYLES.gap?.replace("px", "")) ||
      1) * index
  }px)`;
};

const buildTransition = (index: number) => {
  return NAV_STYLES.bezierParams
    ? `transform ${NAV_STYLES.bezierParams[0] * NAV_STYLES.bezierParams[1] * index}s `
    : NAV_STYLES.transition ?? "none";
};

const zIndex = (index: number) => {
  return MAX_Z_INDEX - index;
};

// ICON DATA FOR THE NAV MENU BUTTONS
//--

/**
 * @description This is the data structure for the icons in the nav menu.
 *              positions increment from left to right to match the order of the buttons in the nav menu
 *              and subsequent translate factor animation.
 */
const NAV_STYLES: SvgDataType = {
  size: ["40px", "40px"],
  filter: ["4px", "0px"],
  transition: "all 0.2s ease-in-out",
  gap: "5px",
  bezierParams: [0.4, 0.2],
  icons: {
    /* position 0 */

    menu: {
      color: ["#646cff", "#609dff"],
      transform: () => {
        return `scale(1.2)`;
      },
      transition: () => buildTransition(0.8),
      zIndex: () => zIndex(0),
    },

    /* position 1 */

    theme: {
      index: 1,
      color: ["#646cff", "#609dff"],
      transform: () => buildTransform(1),
      transition: () => buildTransition(1),
      zIndex: () => zIndex(1),
    },

    /* position 2 */

    load: {
      index: 2,
      color: ["#646cff", "#609dff"],
      transform: () => buildTransform(2),
      transition: () => buildTransition(2),
      zIndex: () => zIndex(2),
    },

    /* position 3 */

    save: {
      index: 3,
      color: ["#646cff", "#609dff"],
      transform: () => buildTransform(3),
      transition: () => buildTransition(3),
      zIndex: () => zIndex(3),
    },

    /* position 4 */

    addplayer: {
      index: 4,
      color: ["#646cff", "#609dff"],
      transform: () => buildTransform(4),
      transition: () => buildTransition(4),
      zIndex: () => zIndex(4),
    },

    /* position 5 */

    chart: {
      index: 5,
      color: ["#646cff", "#609dff"],
      transform: () => buildTransform(5),
      transition: () => buildTransition(5),
      zIndex: () => zIndex(5),
    },

    /* position 6 */

    eyes: {
      index: 6,
      color: ["#646cff", "#609dff"],
      transform: () => buildTransform(6),
      transition: () => buildTransition(6),
      zIndex: () => zIndex(6),
    },

    /* position 7 */

    undo: {
      index: 7,
      color: ["#646cff", "#609dff"],
      transform: () => buildTransform(7),
      transition: () => buildTransition(7),
      zIndex: () => zIndex(7),
    },

    /* position 8 */

    redo: {
      index: 8,
      color: ["#646cff", "#609dff"],
      transform: () => buildTransform(8),
      transition: () => buildTransition(8),
      zIndex: () => zIndex(8),
    },

    // ADD MORE ICONS HERE
    //...
  },
};

// ICON DATA FOR UTILITY BUTTONS IN PLAYERLIST COMPONENT
//--
const UTILITY_STYLES: SvgDataType = {
  size: ["35px", "35px"],
  filter: ["4px", "0px"],
  transition: "all 0.2s ease-in-out",
  icons: {
    delete: {
      color: ["#e14512", "#e14512"],
    },
    reset: {
      color: ["#e19f12", "#e19f12"],
    },
  },
};

// ICON DATA FOR THE HEADING STAR IN PLAYERLIST COMPONENT
//--
const HEADING_STYLES: SvgDataType = {
  size: ["40px", "40px"],
  filter: ["7px", "2px"],
  transition: "all 1s ease-in-out",
  icons: {},
  animations: {
    rotate: {
      name: "rotate",
      duration: 2,
      timing: "ease-in-out",
      delay: 0.2,
      iteration: "infinite",
      direction: "alternate",
      keyframes: `0%  {transform: rotate(0deg) }
                  100% {transform: rotate(360deg)}`,
      getAnimation: () => {
        return `${HEADING_STYLES.animations?.rotate.name} ${HEADING_STYLES.animations?.rotate.duration}s ${HEADING_STYLES.animations?.rotate.timing} ${HEADING_STYLES.animations?.rotate.delay}s ${HEADING_STYLES.animations?.rotate.iteration} ${HEADING_STYLES.animations?.rotate.direction}`;
      },
    },
    translate: {
      delay: 0.3,
      duration: 1.2,
      timing: "ease-in-out",
      iteration: "infinite",
      direction: "alternate",
      name: "translate",
      keyframes:
        "0% {transform: translate(0px, 0px) ; transform: rotate(0deg)} 50% {transform : translate(0px, 5px)} 100% {transform: translate(0px, -5px) ; transform: rotate(360deg)}",
      getAnimation: () => {
        return `${HEADING_STYLES.animations?.translate.name} ${HEADING_STYLES.animations?.translate.duration}s ${HEADING_STYLES.animations?.translate.timing} ${HEADING_STYLES.animations?.translate.delay}s ${HEADING_STYLES.animations?.translate.iteration} ${HEADING_STYLES.animations?.translate.direction}`;
      },
    },
  },
};
