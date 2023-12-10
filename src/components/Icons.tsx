import { useCallback, useState } from "react";
import spriteHref from "/sprite.svg?url";
import { Star } from "./Star";
import { getSvgData } from "@Icons/data";
import { debounce } from "@Utils/utils";
import { cssModules } from "@Components/styles";
import type { SVGProps } from "react";
import type { IconName, IconProps, SvgDataType, IconHeadingProps } from "@Types";

const DISABLED_COLOR = "#b5179e";

const getMessage = (iconName: string, svgData: SvgDataType) => {
  const message = svgData.icons[iconName]?.message;
  if (!message) return null;
  return message;
};

const getFilter = (
  isHover: boolean,
  svgData: SvgDataType,
  color: string,
  disabled: boolean = false
) => {
  if (!svgData.filter) throw new Error(`Filter is missing in svgData`);
  const filterHover = svgData.filter[0];
  const filter = svgData.filter[1];
  const finalColor = disabled ? DISABLED_COLOR : color;

  const dropShadow = isHover
    ? `drop-shadow(0px 0px ${filterHover} ${finalColor})`
    : `drop-shadow(0px 0px ${filter} ${finalColor})`;

  const transform = isHover ? `scale(${svgData.scale})` : "none";

  return { dropShadow, transform };
};

const getColor = (iconName: string, svgData: SvgDataType, idxThemedColr: number) => {
  if (!svgData.icons)
    throw new Error(`Icon ${iconName} is missing an icon in svgData : ${svgData.icons}`);

  const color = svgData.icons[iconName]?.color[idxThemedColr];

  if (!color) throw new Error(`Icon ${iconName} is missing a color in svgData : ${color}`);
  return color;
};

/** */

const SvgIcon = ({
  name,
  ...props
}: SVGProps<SVGSVGElement> & {
  name: IconName;
  style?: string;
}) => {
  return (
    <svg {...props}>
      <use href={`${spriteHref}#${name}`} />
    </svg>
  );
};

export const Icon = ({ iconName, className, variant, disabled }: IconProps) => {
  const [isHover, setIsHover] = useState(false);

  const svgData = getSvgData(variant ?? "");
  const events = {
    onMouseEnter: useCallback(
      debounce(() => setIsHover(true), 100),
      []
    ),
    onMouseLeave: useCallback(
      debounce(() => setIsHover(false), 100),
      []
    ),
  };
  const color = getColor(iconName, svgData, 0);
  const { dropShadow, transform } = getFilter(isHover, svgData, color, disabled);
  const message = getMessage(iconName, svgData);

  let size: [string, string] = ["0px", "0px"];
  size = svgData.icons[iconName].size ? svgData.icons[iconName].size ?? size : svgData.size ?? size;

  return (
    <div
      className={`icon-stat-ctn ${className || ""}`}
      onMouseEnter={events.onMouseEnter}
      onMouseLeave={events.onMouseLeave}
      style={{
        filter: dropShadow ?? "none",
        transform: transform ?? "none",
        transition: svgData.transition ?? "none",
      }}
    >
      <SvgIcon name={iconName} width={size[0]} height={size[1]} />
      {message && (
        <IconTooltip isOpen={isHover} size={size}>
          {message}
        </IconTooltip>
      )}
    </div>
  );
};
type IconTooltipProps = {
  isOpen: boolean;
  theme?: "light" | "dark";
  children?: React.ReactNode;
  size?: [string, string];
};

const IconTooltip = ({ isOpen, children, size = ["auto", "auto"] }: IconTooltipProps) => {
  const classes = `${cssModules.icons["icon-tooltip"]}`;
  return (
    <>
      {isOpen && (
        <span style={{ width: `${size[0]}` }} className={classes}>
          {children}
        </span>
      )}
    </>
  );
};

export const IconHeading = ({
  color,
  variant,
  className,
  bgColor = "transparent",
  animationName = "none",
  isHover = false,
}: IconHeadingProps) => {
  const svgData = getSvgData(variant ?? "");
  const { dropShadow, transform } = getFilter(isHover, svgData, color);
  const keyframes = svgData.animations?.[animationName].keyframes;
  const getAnimation = svgData.animations?.[animationName].getAnimation ?? (() => {});

  return (
    <div
      className={`star-head-ctn ${className || ""}`}
      style={{
        zIndex: -1,
        filter: dropShadow ?? "none",
        transform: transform ?? "none",
        transition: svgData.transition ?? "none",
        animation: isHover ? `${getAnimation()}` : "none",
      }}
    >
      <Star color={color} size={svgData.size || ["20px", "20px"]} bgColor={bgColor} />
      <style>
        {` 
          @keyframes ${animationName} {
            ${keyframes}
          }
        `}
      </style>
    </div>
  );
};

export default Icon;
