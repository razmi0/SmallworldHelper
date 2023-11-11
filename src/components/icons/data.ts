import { SvgDataType, VariantType } from "../../types";

// ICON DATA FOR THE NAV MENU BUTTONS
//--
const NAV_STYLES: SvgDataType = {
  size: ["40px", "40px"],
  filter: ["4px", "0px"],
  transition: "all 0.2s ease-in-out",
  gap: "5px",
  bezierParams: [0.4, 0.2],
  icons: {
    menu: {
      color: ["#646cff", "#609dff"],
      zIndex: 10,
      transform: () => {
        return `scale(1.2)`;
      },
      transition: () => {
        return NAV_STYLES.bezierParams
          ? `transform ${NAV_STYLES.bezierParams[0] * NAV_STYLES.bezierParams[1] * 0.8}s `
          : NAV_STYLES.transition ?? "none";
      },
    },
    addplayer: {
      // 4
      color: ["#646cff", "#609dff"],
      transform: () =>
        `translate(-${
          (Number(NAV_STYLES.size[0].replace("px", "")) +
            Number(NAV_STYLES.gap?.replace("px", "")) || 1) * 4
        }px)`,
      transition: () => {
        return NAV_STYLES.bezierParams
          ? `transform ${NAV_STYLES.bezierParams[0] * NAV_STYLES.bezierParams[1] * 4}s `
          : NAV_STYLES.transition ?? "none";
      },
      zIndex: 6,
    },
    save: {
      // 3
      color: ["#646cff", "#609dff"],
      transform: () =>
        `translate(-${
          (Number(NAV_STYLES.size[0].replace("px", "")) +
            Number(NAV_STYLES.gap?.replace("px", "")) || 1) * 3
        }px)`,
      transition: () => {
        return NAV_STYLES.bezierParams
          ? `transform ${NAV_STYLES.bezierParams[0] * NAV_STYLES.bezierParams[1] * 3}s `
          : NAV_STYLES.transition ?? "none";
      },
      zIndex: 7,
    },
    load: {
      // 2
      color: ["#646cff", "#609dff"],
      transform: () =>
        `translate(-${
          (Number(NAV_STYLES.size[0].replace("px", "")) +
            Number(NAV_STYLES.gap?.replace("px", "")) || 1) * 2
        }px)`,
      transition: () => {
        return NAV_STYLES.bezierParams
          ? `transform ${NAV_STYLES.bezierParams[0] * NAV_STYLES.bezierParams[1] * 2}s `
          : NAV_STYLES.transition ?? "none";
      },
      zIndex: 8,
    },
    theme: {
      // 1
      color: ["#646cff", "#609dff"],
      transform: () =>
        `translate(-${
          (Number(NAV_STYLES.size[0].replace("px", "")) +
            Number(NAV_STYLES.gap?.replace("px", "")) || 1) * 1
        }px)`,
      transition: () => {
        return NAV_STYLES.bezierParams
          ? `transform ${NAV_STYLES.bezierParams[0] * NAV_STYLES.bezierParams[1] * 1}s `
          : NAV_STYLES.transition ?? "none";
      },
      zIndex: 9,
    },
    addscore: {
      // unused
      color: ["#646cff", "#609dff"],
    },
    chart: {
      // 5
      color: ["#646cff", "#609dff"],
      transform: () =>
        `translate(-${
          (Number(NAV_STYLES.size[0].replace("px", "")) +
            Number(NAV_STYLES.gap?.replace("px", "")) || 1) * 5
        }px)`,
      transition: () => {
        return NAV_STYLES.bezierParams
          ? `transform ${NAV_STYLES.bezierParams[0] * NAV_STYLES.bezierParams[1] * 5}s `
          : NAV_STYLES.transition ?? "none";
      },
      zIndex: 5,
    },
    eyes: {
      //6
      color: ["#646cff", "#609dff"],
      transform: () =>
        `translate(-${
          (Number(NAV_STYLES.size[0].replace("px", "")) +
            Number(NAV_STYLES.gap?.replace("px", "")) || 1) * 6
        }px)`,
      transition: () => {
        return NAV_STYLES.bezierParams
          ? `transform ${NAV_STYLES.bezierParams[0] * NAV_STYLES.bezierParams[1] * 6}s `
          : NAV_STYLES.transition ?? "none";
      },
      zIndex: 4,
    },
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
      delay: 0.2,
      duration: 2,
      timing: "ease-in-out",
      iteration: "infinite",
      direction: "alternate",
      name: "rotate",
      keyframes: `0%  {transform: rotate(0deg) }
                  100% {transform: rotate(360deg)}`,

      get: () => {
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
      get: () => {
        return `${HEADING_STYLES.animations?.translate.name} ${HEADING_STYLES.animations?.translate.duration}s ${HEADING_STYLES.animations?.translate.timing} ${HEADING_STYLES.animations?.translate.delay}s ${HEADING_STYLES.animations?.translate.iteration} ${HEADING_STYLES.animations?.translate.direction}`;
      },
    },
  },
};

export const playerColors = [
  "#f9c74f",
  "#3a0ca3",
  "#f94144",
  "#f3722c",
  "#43aa8b",
  "#4cc9f0",
  "#4d908e",
  "#4361ee",
  "#f72585",
  "#4895ef",
  "#560bad",
  "#277da1",
  "#3f37c9",
  "#f8961e",
  "#577590",
  "#b5179e",
  "#90be6d",
];

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
