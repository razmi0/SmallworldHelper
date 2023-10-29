import { ComponentType, useState } from "react";

export type SvgProps = {
  color: string;
  size: [string, string];
  bgColor?: string;
};
/**
 * @type SvgDataType
 * @param size [width, height] in px
 * @param filter [light, dark] dropshadow
 * @param scale scale factor for the dropshadow
 * @param transition transition for the dropshadow
 * @param bezierParams bezier factor for the animation
 * @param gap gap between icons in px
 * @param icons object of icons
 * @param icons[iconName].color [light, dark] color of the icon
 * @param icons[iconName].label label of the icon
 * @param icons[iconName].transform transform of the icon
 * @param icons[iconName].transition transition of the icon
 * @param icons[iconName].zIndex zIndex of the icon
 */
export type SvgDataType = {
  size: [string, string]; // width, height in px
  filter?: [string, string]; // dropshadow
  scale?: string; // scale factor for the dropshadow
  transition?: string; // transition for the dropshadow
  bezierParams?: [number, number]; // bezier factor for the animation
  gap?: string; // gap between icons in px
  icons: {
    [key: string]: {
      color: [string, string]; // light dark
      label?: string; // label of the icon
      transform?: () => string;
      transition?: () => string;
      zIndex?: number;
    };
  };
};

export interface IconProps {
  icon: ComponentType<SvgProps>;
  svgData: SvgDataType;
  iconName: string;
  theme?: "light" | "dark";
  sx?: React.CSSProperties;
  className?: string;
}

export interface IconButtonProps extends IconProps {
  onClick?: () => void;
  btnType?: "button" | "submit" | "reset";
  sx?: React.CSSProperties;
}

const getBgColor = (theme: "light" | "dark") => {
  return theme === "light" ? "#bdbdc7" : "#636367";
};

export const Icon = ({
  icon: SvgIcon,
  svgData,
  iconName,
  theme = "light",
  className,
}: IconProps) => {
  const [isHover, setIsHover] = useState(false);

  const idxThemeColor = theme === "light" ? 0 : 1;
  const bgColor = getBgColor(theme);

  const color = svgData.icons[iconName]?.color[idxThemeColor];
  let dropShadow = "",
    transform = "";

  if (!color) throw new Error(`Icon ${iconName} is missing a color in svgData`);

  if (svgData.filter) {
    dropShadow = isHover
      ? `drop-shadow(0px 0px ${svgData.filter[0]} ${color})`
      : `drop-shadow(0px 0px ${svgData.filter[1]} ${color})`;
    transform = isHover ? `scale(${svgData.scale})` : "none";
  }

  return (
    <div
      className={`icon-stat-ctn ${className || ""}`}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      style={{
        filter: dropShadow ?? "none",
        transform: transform ?? "none",
        transition: svgData.transition ?? "none",
      }}
    >
      <SvgIcon color={color} size={svgData.size} bgColor={bgColor} />
      <style>
        {` 
          .icon-stat-ctn {
            display: flex;
            place-content: center;
          }
        `}
      </style>
    </div>
  );
};

export const IconButton = ({
  onClick,
  btnType = "button",
  icon,
  svgData,
  iconName,
  theme = "light",
  sx,
  className,
}: IconButtonProps) => {
  return (
    <button
      type={btnType}
      style={{ all: "unset", cursor: "pointer", ...sx }}
      onClick={onClick}
      className={className}
    >
      <Icon icon={icon} svgData={svgData} iconName={iconName} theme={theme} />
    </button>
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

export const LineChart = ({ color, size, bgColor }: SvgProps) => {
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
        <path d="M29.5 7c-1.381 0-2.5 1.12-2.5 2.5 0 0.284 0.058 0.551 0.144 0.805l-6.094 5.247c-0.427-0.341-0.961-0.553-1.55-0.553-0.68 0-1.294 0.273-1.744 0.713l-4.774-2.39c-0.093-1.296-1.162-2.323-2.482-2.323-1.38 0-2.5 1.12-2.5 2.5 0 0.378 0.090 0.732 0.24 1.053l-4.867 5.612c-0.273-0.102-0.564-0.166-0.873-0.166-1.381 0-2.5 1.119-2.5 2.5s1.119 2.5 2.5 2.5c1.381 0 2.5-1.119 2.5-2.5 0-0.332-0.068-0.649-0.186-0.939l4.946-5.685c0.236 0.073 0.48 0.124 0.74 0.124 0.727 0 1.377-0.316 1.834-0.813l4.669 2.341c0.017 1.367 1.127 2.471 2.497 2.471 1.381 0 2.5-1.119 2.5-2.5 0-0.044-0.011-0.086-0.013-0.13l6.503-5.587c0.309 0.137 0.649 0.216 1.010 0.216 1.381 0 2.5-1.119 2.5-2.5s-1.119-2.5-2.5-2.5z"></path>{" "}
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
