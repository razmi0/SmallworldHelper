import { SvgDataType } from "../../types";

export const iconStyle: SvgDataType = {
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
        return iconStyle.bezierParams
          ? `transform ${iconStyle.bezierParams[0] * iconStyle.bezierParams[1] * 0.8}s `
          : iconStyle.transition ?? "none";
      },
    },
    addplayer: {
      // 4
      color: ["#646cff", "#609dff"],
      transform: () =>
        `translate(-${
          (Number(iconStyle.size[0].replace("px", "")) + Number(iconStyle.gap?.replace("px", "")) ||
            1) * 4
        }px)`,
      transition: () => {
        return iconStyle.bezierParams
          ? `transform ${iconStyle.bezierParams[0] * iconStyle.bezierParams[1] * 4}s `
          : iconStyle.transition ?? "none";
      },
      zIndex: 6,
    },
    save: {
      // 3
      color: ["#646cff", "#609dff"],
      transform: () =>
        `translate(-${
          (Number(iconStyle.size[0].replace("px", "")) + Number(iconStyle.gap?.replace("px", "")) ||
            1) * 3
        }px)`,
      transition: () => {
        return iconStyle.bezierParams
          ? `transform ${iconStyle.bezierParams[0] * iconStyle.bezierParams[1] * 3}s `
          : iconStyle.transition ?? "none";
      },
      zIndex: 7,
    },
    load: {
      // 2
      color: ["#646cff", "#609dff"],
      transform: () =>
        `translate(-${
          (Number(iconStyle.size[0].replace("px", "")) + Number(iconStyle.gap?.replace("px", "")) ||
            1) * 2
        }px)`,
      transition: () => {
        return iconStyle.bezierParams
          ? `transform ${iconStyle.bezierParams[0] * iconStyle.bezierParams[1] * 2}s `
          : iconStyle.transition ?? "none";
      },
      zIndex: 8,
    },
    theme: {
      // 1
      color: ["#646cff", "#609dff"],
      transform: () =>
        `translate(-${
          (Number(iconStyle.size[0].replace("px", "")) + Number(iconStyle.gap?.replace("px", "")) ||
            1) * 1
        }px)`,
      transition: () => {
        return iconStyle.bezierParams
          ? `transform ${iconStyle.bezierParams[0] * iconStyle.bezierParams[1] * 1}s `
          : iconStyle.transition ?? "none";
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
          (Number(iconStyle.size[0].replace("px", "")) + Number(iconStyle.gap?.replace("px", "")) ||
            1) * 5
        }px)`,
      transition: () => {
        return iconStyle.bezierParams
          ? `transform ${iconStyle.bezierParams[0] * iconStyle.bezierParams[1] * 5}s `
          : iconStyle.transition ?? "none";
      },
      zIndex: 5,
    },
    eyes: {
      //6
      color: ["#646cff", "#609dff"],
      transform: () =>
        `translate(-${
          (Number(iconStyle.size[0].replace("px", "")) + Number(iconStyle.gap?.replace("px", "")) ||
            1) * 6
        }px)`,
      transition: () => {
        return iconStyle.bezierParams
          ? `transform ${iconStyle.bezierParams[0] * iconStyle.bezierParams[1] * 6}s `
          : iconStyle.transition ?? "none";
      },
      zIndex: 4,
    },
  },
};

export const utilityButtonSvg: SvgDataType = {
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

export const headingStarIconStyle: SvgDataType = {
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
        return `${headingStarIconStyle.animations?.rotate.name} ${headingStarIconStyle.animations?.rotate.duration}s ${headingStarIconStyle.animations?.rotate.timing} ${headingStarIconStyle.animations?.rotate.delay}s ${headingStarIconStyle.animations?.rotate.iteration} ${headingStarIconStyle.animations?.rotate.direction}`;
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
        return `${headingStarIconStyle.animations?.translate.name} ${headingStarIconStyle.animations?.translate.duration}s ${headingStarIconStyle.animations?.translate.timing} ${headingStarIconStyle.animations?.translate.delay}s ${headingStarIconStyle.animations?.translate.iteration} ${headingStarIconStyle.animations?.translate.direction}`;
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
