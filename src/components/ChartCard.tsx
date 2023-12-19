import { CardStyleManager } from "./Managers";
import Draggable from "react-draggable";
import type { ReactNode } from "react";
import type { CardStyleType } from "@Types";

export const ChartCard = ({
  color,
  children,
  type,
  drag,
}: {
  color: string;
  children: ReactNode;
  type: Extract<CardStyleType, "default" | "default-back" | "donut" | "line" | "bar">;
  drag?: boolean;
}) => {
  const backProps = { style: { boxShadow: `0px 0px 1px 1px ${color}` } };
  return (
    <Draggable disabled={!drag}>
      <div>
        <CardStyleManager card={[`${type}-back` as CardStyleType, type]} as={["div", "figure"]} backProps={backProps}>
          {children}
        </CardStyleManager>
      </div>
    </Draggable>
  );
};
