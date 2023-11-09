import { ReactNode } from "react";

type FlexProps = {
  children: ReactNode;
  sx?: React.CSSProperties;
};
export const Spacer = () => {
  return <div style={{ flex: 1 }}></div>;
};
export const Flex = ({ children, sx }: FlexProps) => {
  return <div style={{ ...sx, display: "flex" }}>{children}</div>;
};
