import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { MouseToolTipContext } from "@Context/MouseToolTipContext";
import type { FC, PropsWithChildren, ReactNode } from "react";

export type TooltipPosition = { top: number; left: number };

type Props = PropsWithChildren<{ className?: string; initialPosition?: TooltipPosition }>;
const UnmountedMouseTooltip: FC<Props> = ({ initialPosition, children }) => {
  const [isMounted, setIsMounted] = useState(false);
  const [position, setPosition] = useState<TooltipPosition>(
    initialPosition || { top: -1000, left: 0 }
  );

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      setPosition({
        top: e.clientY,
        left: e.clientX,
      });
    };

    setIsMounted(true);
    document.body.addEventListener("mousemove", handler);
    return () => {
      document.body.removeEventListener("mousemove", handler);
    };
  }, []);

  return (
    <>
      <style>{`
    .box{
        transition: opacity 300ms;
        position: absolute;
        z-index: 90;
        opacity: 1;
        max-width: 400px;
        margin-left: 20px;
        background-color: #fff;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
        width: 200px;
        height: 100px;
    }
    .opacity-0{
        opacity: 0;
    }
    `}</style>
      <div className={"mouse-tooltip box " + !isMounted && "opacity-0"} style={position}>
        {children}
      </div>
    </>
  );
};

const MouseTooltip: FC<Props> = ({ children, ...props }) => (
  <MouseToolTipContext.Consumer>
    {(context: { portalTarget: HTMLDivElement }) =>
      createPortal(
        <UnmountedMouseTooltip {...props}>{children}</UnmountedMouseTooltip>,
        context.portalTarget
      )
    }
  </MouseToolTipContext.Consumer>
);

export const MouseTooltipWrapper: FC<
  PropsWithChildren<{ children: [ReactNode] | [ReactNode, ReactNode] }>
> = ({ children: [target, tipContent] }) => {
  const [position, setPosition] = useState<TooltipPosition | null>(null);

  return (
    <div
      onMouseEnter={(e) => {
        setPosition({
          top: e.clientY,
          left: e.clientX,
        });
      }}
      onMouseLeave={() => {
        setPosition(null);
      }}
    >
      {target}
      {position && tipContent && (
        <MouseTooltip initialPosition={position}>{tipContent}</MouseTooltip>
      )}
    </div>
  );
};

export default MouseTooltip;
