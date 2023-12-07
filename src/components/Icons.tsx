import { forwardRef, useCallback, useState, CSSProperties } from "react";
import { SvgsComponents } from "../utils/icons/SvgIcons";
import { useTheme } from "@Context/theme/useTheme";
import { getSvgData } from "../utils/icons/data";
import { debounce } from "@Utils/utils";
import { IconProps, IconButtonProps, SvgDataType, IconHeadingProps } from "@Types";
import { cssModules } from "@Components/styles";

const DISABLED_COLOR = "#b5179e";

const getBgColor = (theme: "light" | "dark") => {
  return theme === "light" ? "transparent" : "transparent";
};

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

const Icon = ({ icon: SvgIcon, iconName, className, variant, disabled }: IconProps) => {
  const [isHover, setIsHover] = useState(false);
  const { theme } = useTheme();

  if (!SvgIcon) SvgIcon = SvgsComponents[iconName];

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
  const idxThemeColor = theme === "light" ? 0 : 1;
  const bgColor = getBgColor(theme);
  const color = getColor(iconName, svgData, idxThemeColor);
  const { dropShadow, transform } = getFilter(isHover, svgData, color, disabled);
  const message = getMessage(iconName, svgData);

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
      <SvgIcon color={disabled ? DISABLED_COLOR : color} size={svgData.size} bgColor={bgColor} />
      {message && (
        <IconTooltip isOpen={isHover} size={svgData.size}>
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
  icon: SvgIcon,
  iconName,
  color,
  variant,
  className,
  bgColor = "transparent",
  animationName = "none",
  isHover = false,
}: IconHeadingProps) => {
  if (!SvgIcon) SvgIcon = SvgsComponents[iconName];
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
      <SvgIcon color={color} size={svgData.size} bgColor={bgColor} />
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

const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      disabled,
      variant,
      datatype,
      onClick,
      iconName,
      sx,
      animStartAt = false,
      animStartState = "none",
      ...rest
    },
    ref
  ) => {
    const svgData = getSvgData(variant ?? "");
    const transform = animStartAt
      ? animStartState
      : svgData?.icons[iconName].transform?.() ?? "none";
    const zIndex = svgData?.icons[iconName].zIndex?.() ?? "auto";
    const transition = svgData?.icons[iconName].transition?.() ?? "none";

    // merging with sx
    const styles: CSSProperties = {
      cursor: "pointer",
      transform: transform ?? "none",
      transition: transition ?? "none",
      zIndex: zIndex ?? "auto",
      ...sx,
    };

    return (
      <button
        ref={ref}
        disabled={disabled}
        onClick={onClick}
        style={styles}
        type="button"
        datatype={datatype}
        {...rest}
      >
        <Icon variant={variant} iconName={iconName} disabled={disabled} />
      </button>
    );
  }
);

IconButton.displayName = "IconButton";

export default IconButton;
