import { forwardRef, useMemo } from "react";
import Icon from "./Icons";
import { arrayify } from "@Utils/utils";
import { getSvgData } from "@Icons/data";
import type { CSSProperties, ReactNode } from "react";
import type { IconButtonProps } from "@Types";

export const CloseButton = ({ onClick, ...rest }: { onClick: () => void }) => {
  return <IconButton onClick={onClick} iconName="close" variant="utility" {...rest} />;
};

export const ResetButton = ({ onClick }: { onClick: () => void }) => {
  return <IconButton onClick={onClick} iconName="reset" variant="utility" />;
};

type ChildWithProps = ReactNode & { props: { style: CSSProperties } };
type Props = {
  children: ChildWithProps[] | ChildWithProps;
  isOpen: boolean;
};

export const UtilityButtonGroup = ({ children, isOpen }: Props) => {
  const childrenArr = arrayify(children);
  return (
    <>
      {childrenArr.map((child, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            top: 0,
            right: `${i * 1.2}em`,
            visibility: isOpen ? "visible" : "hidden",
          }}
        >
          {child}
        </div>
      ))}
    </>
  );
};

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    { href, disabled, variant, datatype, onClick, iconName, sx, animStartAt = false, animStartState = "none", ...rest },
    ref
  ) => {
    const svgData = useMemo(() => getSvgData(variant ?? ""), [variant]);

    const transform = animStartAt ? animStartState : svgData?.icons[iconName]?.transform?.() ?? "none";
    const zIndex = svgData?.icons[iconName]?.zIndex?.() ?? "auto";
    const transition = svgData?.icons[iconName]?.transition?.() ?? "none";

    // merging with sx
    const styles: CSSProperties = {
      cursor: "pointer",
      transform: transform ?? "none",
      transition: transition ?? "none",
      zIndex: zIndex ?? "auto",
      ...sx,
    };

    return (
      <>
        {href && (
          <a href={href} data-all-inherit target="_blank">
            <button
              aria-label={`button ${iconName}`}
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
          </a>
        )}
        {!href && (
          <button
            aria-label={`button ${iconName}`}
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
        )}
      </>
    );
  }
);
<a href="https://github.com/razmi0/SmallworldHelper"></a>;

IconButton.displayName = "IconButton";
