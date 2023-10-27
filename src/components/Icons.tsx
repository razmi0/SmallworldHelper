import { ComponentType, useState } from "react";

export type SvgProps = {
  color: string;
  size: [string, string];
};

export type SvgStatDataType = {
  size: [string, string];
  filter?: [string, string];
  scale?: string;
  transition?: string;
  icons: {
    [key: string]: {
      color: string;
      stat?: string;
    };
  };
};

export type IconProps = {
  icon: ComponentType<SvgProps>;
  svgData: SvgStatDataType;
};

export type IconButtonProps = {
  icon: ComponentType<SvgProps>;
  svgData: SvgStatDataType;
  onClick?: () => void;
  btnType?: "button" | "submit" | "reset";
};

export const Icon = ({ icon: SvgIcon, svgData }: IconProps) => {
  const [isHover, setIsHover] = useState(false);

  const svgName: string = SvgIcon.name.toLowerCase(); // => NAME OF THE SVG ICON
  const color = svgData.icons[svgName]?.color;
  let dropShadow = "",
    transform = "";

  if (!color) throw new Error(`Icon ${svgName} is missing a color in svgData`);

  if (svgData.filter) {
    dropShadow = isHover
      ? `drop-shadow(0px 0px ${svgData.filter[0]} ${color})`
      : `drop-shadow(0px 0px ${svgData.filter[1]} ${color})`;
    transform = isHover ? `scale(${svgData.scale})` : "none";
  }

  return (
    <div
      className="icon-stat-ctn"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      style={{
        filter: dropShadow ?? "none",
        transform: transform ?? "none",
        transition: svgData.transition ?? "none",
      }}
    >
      <SvgIcon color={color} size={svgData.size} />
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

export const IconButton = ({ icon, svgData, onClick, btnType = "button" }: IconButtonProps) => {
  return (
    <button type={btnType} style={{ all: "unset", cursor: "pointer" }} onClick={onClick}>
      <Icon icon={icon} svgData={svgData} />
    </button>
  );
};

export const SquaredPlus = ({ color, size }: SvgProps) => {
  return (
    <svg width={size[0]} height={size[1]} viewBox="0 0 20.00 20.00" fill={color}>
      <g strokeWidth="0"></g>
      <g strokeLinecap="round" strokeLinejoin="round"></g>
      <g>
        <title>Add Score</title>
        <g strokeWidth="0.00021000000000000004" fill="none" fillRule="evenodd">
          <g transform="translate(-339.500000, -240.000000)" fill={color}>
            <g transform="translate(56.000000, 160.000000)">
              <path d="M285.1,98 L301.9,98 L301.9,82 L285.1,82 L285.1,98 Z M283,100 L304,100 L304,80 L283,80 L283,100 Z M292.45,91 L289.3,91 L289.3,89 L292.45,89 L292.45,86 L294.55,86 L294.55,89 L297.7,89 L297.7,91 L294.55,91 L294.55,94 L292.45,94 L292.45,91 Z"></path>
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
};

export const Save = ({ color, size }: SvgProps) => {
  return (
    <svg width={size[0]} height={size[1]} viewBox="-9.6 -9.6 67.20 67.20" fill="none">
      <title>Save</title>
      <g strokeWidth="0" transform="translate(0,0), scale(1)">
        <path
          transform="translate(-9.6, -9.6), scale(4.2)"
          fill="#96969c92"
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

export const Load = ({ color, size }: SvgProps) => {
  return (
    <svg width={size[0]} height={size[1]} viewBox="-9.6 -9.6 67.20 67.20" fill="none">
      <title>Load</title>
      <g strokeWidth="0">
        <path
          transform="translate(-9.6, -9.6), scale(4.2)"
          fill="#96969c92"
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
    <svg fill={color} width={size[0]} height={size[1]} viewBox="-384 -384 2688.00 2688.00">
      <g strokeWidth="0"></g>
      <g strokeLinecap="round" strokeLinejoin="round"></g>
      <g>
        <path
          d="M915.744 213v702.744H213v87.842h702.744v702.744h87.842v-702.744h702.744v-87.842h-702.744V213z"
          fillRule="evenodd"
        ></path>
      </g>
    </svg>
  );
};

export const AddPlayer = ({ color, size }: SvgProps) => {
  return (
    <svg fill={color} width={size[0]} height={size[1]} viewBox="-4.8 -4.8 33.60 33.60">
      <title>Add a player</title>
      <g strokeWidth="0">
        <path
          transform="translate(-4.8, -4.8), scale(2.1)"
          fill="#96969c92"
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
