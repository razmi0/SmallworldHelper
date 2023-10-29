import { SvgStatDataType } from "./Icons";

export const iconStyle: SvgStatDataType = {
  size: ["50px", "50px"],
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
      color: ["#646cff", "#609dff"],
    },
  },
};

export const playerIconStyle: SvgStatDataType = {
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
