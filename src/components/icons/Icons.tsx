import { useCallback, useState } from "react";
import { useTheme } from "../../hooks";
import { IconProps, IconButtonProps, IconHeadingProps, SvgProps, SvgDataType } from "../../types";
import { getSvgData } from "./data";
import { debounce } from "../../utils";

const getBgColor = (theme: "light" | "dark") => {
  return theme === "light" ? "#bdbdc7" : "#636367";
};

const getFilter = (isHover: boolean, svgData: SvgDataType, color: string) => {
  if (!svgData.filter) throw new Error(`Filter is missing in svgData`);
  const dropShadow = isHover
    ? `drop-shadow(0px 0px ${svgData.filter[0]} ${color})`
    : `drop-shadow(0px 0px ${svgData.filter[1]} ${color})`;
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

export const Icon = ({ icon: SvgIcon, iconName, className, variant }: IconProps) => {
  const { theme } = useTheme();
  const [isHover, setIsHover] = useState(false);

  const animate = isHover; // isFocus ||

  const svgData = getSvgData(variant ?? "");

  const events = {
    onMouseEnter: useCallback(
      debounce(() => setIsHover(true), 200),
      []
    ),
    onMouseLeave: useCallback(
      debounce(() => setIsHover(false), 200),
      []
    ),
  };

  const idxThemeColor = theme === "light" ? 0 : 1;
  const bgColor = getBgColor(theme);

  const color = getColor(iconName, svgData, idxThemeColor);

  const { dropShadow, transform } = getFilter(animate, svgData, color);

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
      <SvgIcon color={color} size={svgData.size} bgColor={bgColor} />
    </div>
  );
};

export const IconHeading = ({
  icon: SvgIcon,
  color,
  // svgData,
  variant,
  className,
  bgColor = "transparent",
  animationName = "none",
  isHover = false,
}: IconHeadingProps) => {
  const svgData = getSvgData(variant ?? "");
  const { dropShadow, transform } = getFilter(isHover, svgData, color);
  const keyframes = svgData.animations?.[animationName].keyframes;
  const get = svgData.animations?.[animationName].get ?? (() => "");

  return (
    <div
      className={`star-head-ctn ${className || ""}`}
      style={{
        zIndex: -1,
        filter: dropShadow ?? "none",
        transform: transform ?? "none",
        transition: svgData.transition ?? "none",
        animation: isHover ? `${get()}` : "none",
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

export const IconButton = ({
  variant,
  datatype,
  onClick,
  btnType = "button",
  icon,
  iconName,
  sx,
  className,
  animStartAt = false,
  animStartState = "none",
  onMouseEnter,
  id,
  onFocus,
  onBlur,
  onKeyUp,
}: IconButtonProps) => {
  const svgData = getSvgData(variant ?? "");
  const transform = animStartAt ? animStartState : svgData?.icons[iconName].transform?.();
  const zIndex = svgData?.icons[iconName].zIndex?.();
  const transition = svgData?.icons[iconName].transition?.();

  return (
    <button
      onFocus={onFocus}
      onBlur={onBlur}
      id={id?.toString()}
      datatype={datatype}
      type={btnType}
      onMouseEnter={onMouseEnter}
      style={{
        cursor: "pointer",
        transform: `${transform}`,
        transition: `${transition}`,
        zIndex: `${zIndex}`,
        ...sx,
      }}
      onClick={onClick}
      className={className}
      onKeyUp={onKeyUp}
    >
      <Icon icon={icon} variant={variant} iconName={iconName} />
    </button>
  );
};

export const Undo = ({ color, size, bgColor }: SvgProps) => {
  return (
    <svg width={size[0]} height={size[1]} viewBox="-4.8 -4.8 33.60 33.60" fill={bgColor}>
      <g strokeWidth="0">
        <path
          transform="translate(-4.8, -4.8), scale(2.1)"
          fill={bgColor}
          d="M9.166.33a2.25 2.25 0 00-2.332 0l-5.25 3.182A2.25 2.25 0 00.5 5.436v5.128a2.25 2.25 0 001.084 1.924l5.25 3.182a2.25 2.25 0 002.332 0l5.25-3.182a2.25 2.25 0 001.084-1.924V5.436a2.25 2.25 0 00-1.084-1.924L9.166.33z"
          strokeWidth="0"
        ></path>
      </g>
      <g strokeLinecap="round" strokeLinejoin="round"></g>
      <g>
        <path
          d="M4 7H15C17.7614 7 20 9.23857 20 12C20 14.7614 17.7614 17 15 17H8.00001M4 7L7 4M4 7L7 10"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
      </g>
    </svg>
  );
};

export const Redo = ({ color, size, bgColor }: SvgProps) => {
  return (
    <svg width={size[0]} height={size[1]} viewBox="-4.8 -4.8 33.60 33.60" fill={color}>
      <g strokeWidth="0">
        <path
          transform="translate(-4.8, -4.8), scale(2.1)"
          fill={bgColor}
          d="M9.166.33a2.25 2.25 0 00-2.332 0l-5.25 3.182A2.25 2.25 0 00.5 5.436v5.128a2.25 2.25 0 001.084 1.924l5.25 3.182a2.25 2.25 0 002.332 0l5.25-3.182a2.25 2.25 0 001.084-1.924V5.436a2.25 2.25 0 00-1.084-1.924L9.166.33z"
          strokeWidth="0"
        ></path>
      </g>
      <g strokeLinecap="round" strokeLinejoin="round"></g>
      <g>
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M16.4697 3.46967C16.7626 3.17678 17.2374 3.17678 17.5303 3.46967L20.5303 6.46967C20.8232 6.76256 20.8232 7.23744 20.5303 7.53033L17.5303 10.5303C17.2374 10.8232 16.7626 10.8232 16.4697 10.5303C16.1768 10.2374 16.1768 9.76256 16.4697 9.46967L18.1893 7.75H9.00001C8.05159 7.75 7.39042 7.75072 6.8778 7.79718C6.37549 7.84271 6.0899 7.92737 5.875 8.05144C5.53296 8.24892 5.24893 8.53295 5.05145 8.87499C4.92738 9.0899 4.84271 9.37548 4.79718 9.87779C4.75072 10.3904 4.75 11.0516 4.75 12C4.75 12.9484 4.75072 13.6096 4.79718 14.1222C4.84271 14.6245 4.92737 14.9101 5.05144 15.125C5.24892 15.467 5.53296 15.7511 5.875 15.9486C6.0899 16.0726 6.37549 16.1573 6.87779 16.2028C7.39041 16.2493 8.05158 16.25 9 16.25H16C16.4142 16.25 16.75 16.5858 16.75 17C16.75 17.4142 16.4142 17.75 16 17.75H8.96423C8.05998 17.75 7.3307 17.75 6.7424 17.6967C6.13605 17.6417 5.60625 17.5254 5.125 17.2476C4.55493 16.9185 4.08154 16.4451 3.75241 15.875C3.47455 15.3937 3.35826 14.8639 3.3033 14.2576C3.24998 13.6693 3.24999 12.94 3.25 12.0358V11.9642C3.24999 11.06 3.24999 10.3307 3.30331 9.74239C3.35826 9.13604 3.47456 8.60624 3.75241 8.12499C4.08154 7.55492 4.55493 7.08154 5.125 6.75241C5.60625 6.47456 6.13605 6.35826 6.7424 6.3033C7.33069 6.24998 8.05997 6.24999 8.96421 6.25L18.1893 6.25L16.4697 4.53033C16.1768 4.23744 16.1768 3.76256 16.4697 3.46967Z"
          fill={color}
        ></path>
      </g>
    </svg>
  );
};

export const Load = ({ color, size, bgColor }: SvgProps) => {
  return (
    <svg width={size[0]} height={size[1]} viewBox="-9.6 -9.6 67.20 67.20" fill="none">
      <title>Load</title>
      <g strokeWidth="0" transform="translate(0,0), scale(1)">
        <path
          transform="translate(-9.6, -9.6), scale(4.2)"
          fill={bgColor}
          d="M9.166.33a2.25 2.25 0 00-2.332 0l-5.25 3.182A2.25 2.25 0 00.5 5.436v5.128a2.25 2.25 0 001.084 1.924l5.25 3.182a2.25 2.25 0 002.332 0l5.25-3.182a2.25 2.25 0 001.084-1.924V5.436a2.25 2.25 0 00-1.084-1.924L9.166.33z"
          strokeWidth="0"
        ></path>
      </g>
      <g strokeLinecap="round" strokeLinejoin="round"></g>
      <g>
        <rect width={size[0]} height={size[1]} fill="white" fillOpacity="0.01"></rect>
        <path
          d="M11.6777 20.271C7.27476 21.3181 4 25.2766 4 30C4 35.5228 8.47715 40 14 40V40C14.9474 40 15.864 39.8683 16.7325 39.6221"
          stroke={color}
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
        <path
          d="M36.0547 20.271C40.4577 21.3181 43.7324 25.2766 43.7324 30C43.7324 35.5228 39.2553 40 33.7324 40V40C32.785 40 31.8684 39.8683 30.9999 39.6221"
          stroke={color}
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
        <path
          d="M36 20C36 13.3726 30.6274 8 24 8C17.3726 8 12 13.3726 12 20"
          stroke={color}
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
        <path
          d="M17.0654 30.119L23.9999 37.0764L31.1318 30"
          stroke={color}
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
        <path
          d="M24 20V33.5382"
          stroke={color}
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
      </g>
    </svg>
  );
};

export const Save = ({ color, size, bgColor }: SvgProps) => {
  return (
    <svg width={size[0]} height={size[1]} viewBox="-9.6 -9.6 67.20 67.20" fill="none">
      <title>Save</title>
      <g strokeWidth="0">
        <path
          transform="translate(-9.6, -9.6), scale(4.2)"
          fill={bgColor}
          d="M9.166.33a2.25 2.25 0 00-2.332 0l-5.25 3.182A2.25 2.25 0 00.5 5.436v5.128a2.25 2.25 0 001.084 1.924l5.25 3.182a2.25 2.25 0 002.332 0l5.25-3.182a2.25 2.25 0 001.084-1.924V5.436a2.25 2.25 0 00-1.084-1.924L9.166.33z"
          strokeWidth="0"
        ></path>
      </g>
      <g strokeLinecap="round" strokeLinejoin="round"></g>
      <g>
        <rect width="48" height="48" fill="white" fillOpacity="0.01"></rect>
        <path
          d="M11.6777 20.271C7.27476 21.3181 4 25.2766 4 30C4 35.5228 8.47715 40 14 40C14.9474 40 15.864 39.8683 16.7325 39.6221"
          stroke={color}
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
        <path
          d="M36.0547 20.271C40.4577 21.3181 43.7324 25.2766 43.7324 30C43.7324 35.5228 39.2553 40 33.7324 40V40C32.785 40 31.8684 39.8683 30.9999 39.6221"
          stroke={color}
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
        <path
          d="M36 20C36 13.3726 30.6274 8 24 8C17.3726 8 12 13.3726 12 20"
          stroke={color}
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
        <path
          d="M17.0654 27.881L23.9999 20.9236L31.1318 28"
          stroke={color}
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
        <path
          d="M24 38V24.4618"
          stroke={color}
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
      </g>
    </svg>
  );
};

export const AddScore = ({ color, size }: SvgProps) => {
  return (
    <svg width={size[0]} height={size[1]} viewBox="-4.8 -4.8 33.60 33.60" fill="none">
      <g strokeWidth="0"></g>
      <g strokeLinecap="round" strokeLinejoin="round"></g>
      <g>
        <path
          d="M20 4L4 20"
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        ></path>
        <path
          d="M4 7H7M10 7H7M7 7V4M7 7V10"
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        ></path>
        <path
          d="M14 17H17H20"
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        ></path>
      </g>
    </svg>
  );
};

export const AddPlayer = ({ color, size, bgColor }: SvgProps) => {
  return (
    <svg fill={color} width={size[0]} height={size[1]} viewBox="-4.8 -4.8 33.60 33.60">
      <title>Add a player</title>
      <g strokeWidth="0">
        <path
          transform="translate(-4.8, -4.8), scale(2.1)"
          fill={bgColor}
          d="M9.166.33a2.25 2.25 0 00-2.332 0l-5.25 3.182A2.25 2.25 0 00.5 5.436v5.128a2.25 2.25 0 001.084 1.924l5.25 3.182a2.25 2.25 0 002.332 0l5.25-3.182a2.25 2.25 0 001.084-1.924V5.436a2.25 2.25 0 00-1.084-1.924L9.166.33z"
          strokeWidth="0"
        ></path>
      </g>
      <g strokeLinecap="round" strokeLinejoin="round"></g>
      <g>
        <path d="M2,21h8a1,1,0,0,0,0-2H3.071A7.011,7.011,0,0,1,10,13a5.044,5.044,0,1,0-3.377-1.337A9.01,9.01,0,0,0,1,20,1,1,0,0,0,2,21ZM10,5A3,3,0,1,1,7,8,3,3,0,0,1,10,5ZM23,16a1,1,0,0,1-1,1H19v3a1,1,0,0,1-2,0V17H14a1,1,0,0,1,0-2h3V12a1,1,0,0,1,2,0v3h3A1,1,0,0,1,23,16Z"></path>
      </g>
    </svg>
  );
};

export const Theme = ({ color, size, bgColor }: SvgProps) => {
  return (
    <svg fill={color} height={size[0]} width={size[1]} viewBox="-60.41 -60.41 422.88 422.88">
      <g strokeWidth="0">
        <path
          transform="translate(-60.41, -60.41), scale(26.43)"
          fill={bgColor}
          d="M9.166.33a2.25 2.25 0 00-2.332 0l-5.25 3.182A2.25 2.25 0 00.5 5.436v5.128a2.25 2.25 0 001.084 1.924l5.25 3.182a2.25 2.25 0 002.332 0l5.25-3.182a2.25 2.25 0 001.084-1.924V5.436a2.25 2.25 0 00-1.084-1.924L9.166.33z"
          strokeWidth="0"
        ></path>
      </g>
      <g strokeLinecap="round" strokeLinejoin="round"></g>
      <g>
        <g>
          <g>
            <g>
              <path d="M243.228,50.942c-3.627-5.713-11.727-6.427-16.512-1.647c-0.054,0.048-0.102,0.102-0.156,0.156 c-3.508,3.503-4.147,8.954-1.497,13.143c9.592,15.166,14.329,32.955,13.251,51.603c-1.352,23.369-12.779,45.037-30.069,60.819 c-14.211,12.966-23.32,30.268-25.89,48.738H117.18c-2.511-19.383-11.77-37.472-26.689-51.785 c-7.741-7.425-14.603-15.847-18.878-25.681C44.923,84.916,88.731,24.36,146.852,21.666c15.128-0.676,29.753,2.446,42.864,8.943 c4.013,1.99,8.857,1.057,12.028-2.108l0.156-0.156c5.247-5.236,3.621-13.964-3.02-17.247 c-16.234-8.02-34.313-11.883-53.019-10.965C83.516,3.024,34.386,59.278,43.04,123.649c3.305,24.586,15.563,47.156,33.24,64.569 c12.918,12.725,20.026,29.12,20.037,46.27c0.005,5.96,4.415,10.826,10.375,10.826h79.156c12.387,0,17.349-4.614,17.312-10.434 c-0.102-16.765,7.285-32.998,20.236-44.495c23.272-20.665,36.619-50.326,36.619-81.382 C260.02,88.044,254.14,68.13,243.228,50.942z"></path>
              <path d="M191.341,251.581h-85.036c-5.955,0-10.778,4.828-10.778,10.778c0,5.949,4.823,10.778,10.778,10.778h85.036 c5.955,0,10.778-4.828,10.778-10.778S197.296,251.581,191.341,251.581z"></path>
              <path d="M175.66,280.507h-53.674c-5.955,0-10.778,4.828-10.778,10.778c0,5.949,4.823,10.778,10.778,10.778h53.668 c5.955,0,10.778-4.828,10.778-10.778S181.615,280.507,175.66,280.507z"></path>
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
};

export const Menu = ({ color, size, bgColor }: SvgProps) => {
  return (
    <svg width={size[0]} height={size[1]} viewBox="-4.8 -4.8 33.60 33.60" fill="none">
      <g strokeWidth="0">
        <path
          transform="translate(-4.8, -4.8), scale(2.1)"
          fill={bgColor}
          d="M9.166.33a2.25 2.25 0 00-2.332 0l-5.25 3.182A2.25 2.25 0 00.5 5.436v5.128a2.25 2.25 0 001.084 1.924l5.25 3.182a2.25 2.25 0 002.332 0l5.25-3.182a2.25 2.25 0 001.084-1.924V5.436a2.25 2.25 0 00-1.084-1.924L9.166.33z"
          strokeWidth="0"
        ></path>
      </g>
      <g strokeLinecap="round" strokeLinejoin="round"></g>
      <g>
        <path
          d="M4 12H20M4 8H20M4 16H12"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
      </g>
    </svg>
  );
};

export const Delete = ({ color, size }: SvgProps) => {
  return (
    <svg fill={color} width={size[0]} height={size[1]} viewBox="-4.8 -4.8 33.60 33.60">
      <g strokeLinecap="round" strokeLinejoin="round"></g>
      <g>
        <path d="M1,20a1,1,0,0,0,1,1h8a1,1,0,0,0,0-2H3.071A7.011,7.011,0,0,1,10,13a5.044,5.044,0,1,0-3.377-1.337A9.01,9.01,0,0,0,1,20ZM10,5A3,3,0,1,1,7,8,3,3,0,0,1,10,5Zm12.707,9.707L20.414,17l2.293,2.293a1,1,0,1,1-1.414,1.414L19,18.414l-2.293,2.293a1,1,0,0,1-1.414-1.414L17.586,17l-2.293-2.293a1,1,0,0,1,1.414-1.414L19,15.586l2.293-2.293a1,1,0,0,1,1.414,1.414Z"></path>
      </g>
    </svg>
  );
};

export const Reset = ({ color, size }: SvgProps) => {
  return (
    <svg fill={color} width={size[0]} height={size[1]} viewBox="-102.4 -102.4 716.80 716.80">
      <g strokeWidth="0"></g>
      <g strokeLinecap="round" strokeLinejoin="round"></g>
      <g>
        <path d="M64,256H34A222,222,0,0,1,430,118.15V85h30V190H355V160h67.27A192.21,192.21,0,0,0,256,64C150.13,64,64,150.13,64,256Zm384,0c0,105.87-86.13,192-192,192A192.21,192.21,0,0,1,89.73,352H157V322H52V427H82V393.85A222,222,0,0,0,478,256Z"></path>
      </g>
    </svg>
  );
};

export const Chart = ({ color, size, bgColor }: SvgProps) => {
  return (
    <svg fill={color} width={size[0]} height={size[1]} viewBox="-6.4 -6.4 44.80 44.80">
      <g strokeWidth="0">
        <path
          transform="translate(-6.4, -6.4), scale(2.8)"
          fill={bgColor}
          d="M9.166.33a2.25 2.25 0 00-2.332 0l-5.25 3.182A2.25 2.25 0 00.5 5.436v5.128a2.25 2.25 0 001.084 1.924l5.25 3.182a2.25 2.25 0 002.332 0l5.25-3.182a2.25 2.25 0 001.084-1.924V5.436a2.25 2.25 0 00-1.084-1.924L9.166.33z"
          strokeWidth="0"
        ></path>
      </g>
      <g strokeLinecap="round" strokeLinejoin="round"></g>
      <g>
        <path d="M29.5 7c-1.381 0-2.5 1.12-2.5 2.5 0 0.284 0.058 0.551 0.144 0.805l-6.094 5.247c-0.427-0.341-0.961-0.553-1.55-0.553-0.68 0-1.294 0.273-1.744 0.713l-4.774-2.39c-0.093-1.296-1.162-2.323-2.482-2.323-1.38 0-2.5 1.12-2.5 2.5 0 0.378 0.090 0.732 0.24 1.053l-4.867 5.612c-0.273-0.102-0.564-0.166-0.873-0.166-1.381 0-2.5 1.119-2.5 2.5s1.119 2.5 2.5 2.5c1.381 0 2.5-1.119 2.5-2.5 0-0.332-0.068-0.649-0.186-0.939l4.946-5.685c0.236 0.073 0.48 0.124 0.74 0.124 0.727 0 1.377-0.316 1.834-0.813l4.669 2.341c0.017 1.367 1.127 2.471 2.497 2.471 1.381 0 2.5-1.119 2.5-2.5 0-0.044-0.011-0.086-0.013-0.13l6.503-5.587c0.309 0.137 0.649 0.216 1.010 0.216 1.381 0 2.5-1.119 2.5-2.5s-1.119-2.5-2.5-2.5z"></path>
      </g>
    </svg>
  );
};

export const Star = ({ color, size }: SvgProps) => {
  return (
    <svg width={size[0]} height={size[1]} viewBox="-102.4 -102.4 716.80 716.80" fill={color}>
      <g strokeWidth="0"></g>
      <g strokeLinecap="round" strokeLinejoin="round"></g>
      <g>
        <path
          fill={color}
          d="M256 38.013c-22.458 0-66.472 110.3-84.64 123.502-18.17 13.2-136.674 20.975-143.614 42.334-6.94 21.358 84.362 97.303 91.302 118.662 6.94 21.36-22.286 136.465-4.116 149.665 18.17 13.2 118.61-50.164 141.068-50.164 22.458 0 122.9 63.365 141.068 50.164 18.17-13.2-11.056-128.306-4.116-149.665 6.94-21.36 98.242-97.304 91.302-118.663-6.94-21.36-125.444-29.134-143.613-42.335-18.168-13.2-62.182-123.502-84.64-123.502z"
        ></path>
      </g>
    </svg>
  );
};

export const EyeOpen = ({ color, size, bgColor }: SvgProps) => {
  return (
    <svg width={size[0]} height={size[1]} viewBox="-9.6 -9.6 67.20 67.20" fill={color}>
      <g strokeWidth="0">
        <path
          transform="translate(-9.6, -9.6), scale(4.2)"
          fill={bgColor}
          d="M9.66.33a2.25 2.25 0 00-2.332 0l-5.25 3.182A2.25 2.25 0 00.5 5.436v5.128a2.25 2.25 0 001.084 1.924l5.25 3.182a2.25 2.25 0 002.332 0l5.25-3.182a2.25 2.25 0 001.084-1.924V5.436a2.25 2.25 0 00-1.084-1.924L9.166.33z"
          strokeWidth="0"
        ></path>
      </g>
      <g strokeLinecap="round" strokeLinejoin="round"></g>
      <g>
        <title>eye-open</title>
        <g>
          <g>
            <rect width="48" height="48" fill="none"></rect>
          </g>
          <g>
            <path d="M45.3,22.1h0C43.2,19.5,35.4,11,24,11S4.8,19.5,2.7,22.1a3,3,0,0,0,0,3.8C4.8,28.5,12.6,37,24,37s19.2-8.5,21.3-11.1A3,3,0,0,0,45.3,22.1ZM24,33c-8.8,0-15.3-6.2-17.7-9,2.4-2.8,8.9-9,17.7-9s15.3,6.2,17.7,9C39.3,26.8,32.8,33,24,33Z"></path>
            <circle cx="24" cy="24" r="6"></circle>
          </g>
        </g>
      </g>
    </svg>
  );
};

export const EyeClose = ({ color, size, bgColor }: SvgProps) => {
  return (
    <svg width={size[0]} height={size[1]} viewBox="-9.6 -9.6 67.20 67.20" fill={color}>
      <g strokeWidth="0">
        <path
          transform="translate(-9.6, -9.6), scale(4.2)"
          fill={bgColor}
          d="M9.166.33a2.25 2.25 0 00-2.332 0l-5.25 3.182A2.25 2.25 0 00.5 5.436v5.128a2.25 2.25 0 001.084 1.924l5.25 3.182a2.25 2.25 0 002.332 0l5.25-3.182a2.25 2.25 0 001.084-1.924V5.436a2.25 2.25 0 00-1.084-1.924L9.166.33z"
          strokeWidth="0"
        ></path>
      </g>
      <g strokeLinecap="round" strokeLinejoin="round"></g>
      <g>
        <title>eye-close</title>
        <g>
          <g>
            <rect width="48" height="48" fill="none"></rect>
          </g>
          <g>
            <g>
              <path d="M45.3,22.1C43.2,19.5,35.4,11,24,11a23.4,23.4,0,0,0-3.8.3L23.8,15H24c8.8,0,15.3,6.2,17.7,9a33.7,33.7,0,0,1-4.6,4.3l2.8,2.8a30.1,30.1,0,0,0,5.4-5.2A3,3,0,0,0,45.3,22.1Z"></path>
              <path d="M29.4,26.6A5.8,5.8,0,0,0,30,24a6,6,0,0,0-6-6,5.8,5.8,0,0,0-2.6.6L9.7,6.9A2,2,0,0,0,6.9,9.7l4.7,4.8a32.1,32.1,0,0,0-8.9,7.6,3,3,0,0,0,0,3.8C4.8,28.5,12.6,37,24,37a23,23,0,0,0,8.5-1.6l5.8,5.7a2,2,0,1,0,2.8-2.8ZM24,33c-8.8,0-15.3-6.2-17.7-9a29.7,29.7,0,0,1,8.3-6.6l4,4A5.8,5.8,0,0,0,18,24a6,6,0,0,0,6,6,5.8,5.8,0,0,0,2.6-.6l2.8,2.8A19.1,19.1,0,0,1,24,33Z"></path>
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
};
