import { SvgDataType, VariantType } from "@Types";

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

    case "toaster":
      return TOASTER_STYLES;

    default:
      return NAV_STYLES;
  }
};

// ICON DATA FOR THE NAV MENU BUTTONS
//--

/**
 * @description icon data .
 *              positions increment from left to right to match the order of the buttons in the nav menu
 *              and subsequent translate factor animation.
 */
const NAV_STYLES: SvgDataType = {
  size: ["40px", "40px"],
  filter: ["0px", "0px"],
  transition: "all 0.2s ease-in-out",
  gap: "5px",
  bezierParams: [0.4, 0.2],
  icons: {
    /* position 0 */

    menu: {
      color: ["#646cff", "#609dff"],
      message: "Open menu",
    },

    /* position 1 */

    theme: {
      index: 1,
      color: ["#646cff", "#609dff"],
      message: "Toggle theme",
    },

    /* position 2 */

    load: {
      index: 2,
      color: ["#646cff", "#609dff"],
      message: "Load session",
    },

    /* position 3 */

    save: {
      index: 3,
      color: ["#646cff", "#609dff"],
      message: "Save session",
    },

    /* position 4 */

    addplayer: {
      index: 4,
      color: ["#646cff", "#609dff"],
      message: "Add player",
    },

    /* position 5 */

    chart: {
      index: 5,
      color: ["#646cff", "#609dff"],
      message: "Toggle chart",
    },

    /* position 6 */

    eyes: {
      index: 6,
      color: ["#646cff", "#609dff"],
      message: "Hide scores",
    },

    eyeopen: {
      index: 6,
      color: ["#646cff", "#609dff"],
      message: "Show scores",
    },

    eyeclose: {
      index: 6,
      color: ["#646cff", "#609dff"],
      message: "Hide scores",
    },

    /* position 7 */

    undo: {
      index: 7,
      color: ["#646cff", "#609dff"],
      message: "Undo action",
    },

    /* position 8 */

    redo: {
      index: 8,
      color: ["#646cff", "#609dff"],
      message: "Redo action",
    },

    // ADD MORE ICONS HERE
    //...
  },
};

// ICON DATA FOR UTILITY BUTTONS IN PLAYERLIST COMPONENT
//--
const UTILITY_STYLES: SvgDataType = {
  size: ["27px", "27px"],
  transition: "all 0.2s linear",
  filter: ["0px", "0px"],
  icons: {
    close: {
      color: ["#242424", "#242424"],

      // message: "Remove player",
    },
    reset: {
      color: ["#9b9b9b", "#9b9b9b"],
      size: ["22px", "22px"],
      transform() {
        return `translate(0px, 2px)`;
      },
      // message: "Reset score",
    },
  },
};

// ICON DATA FOR THE HEADING STAR IN PLAYERLIST COMPONENT
//--
const HEADING_STYLES: SvgDataType = {
  size: ["40px", "40px"],
  filter: ["15px", "30px"], // [blur, spread]
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
      getAnimation: function () {
        return `${this.name} ${this.duration}s ${this.timing} ${this.delay}s ${this.iteration} ${this.direction}`;
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
      getAnimation: function () {
        return `${this.name} ${this.duration}s ${this.timing} ${this.delay}s ${this.iteration} ${this.direction}`;
      },
    },
  },
};
const TOASTER_STYLES: SvgDataType = {
  size: ["27px", "27px"],
  transition: "all 1s ease-in-out",
  filter: ["0px", "0px"],
  icons: {
    close: {
      color: ["#242424", "#242424"],
    },
    reset: {
      color: ["#242424", "#242424"],
    },
  },
};

if (HEADING_STYLES.animations?.translate.getAnimation)
  HEADING_STYLES.animations.translate.getAnimation =
    HEADING_STYLES.animations.translate.getAnimation.bind(HEADING_STYLES.animations?.translate);

if (HEADING_STYLES.animations?.rotate.getAnimation)
  HEADING_STYLES.animations.rotate.getAnimation =
    HEADING_STYLES.animations.rotate.getAnimation.bind(HEADING_STYLES.animations?.rotate);
