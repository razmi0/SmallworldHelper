import { ReactNode } from "react";

type FlexProps = {
  children: ReactNode;
  sx?: React.CSSProperties;
};
export const Flex = ({ children, sx }: FlexProps) => {
  return <div style={{ ...sx, display: "flex" }}>{children}</div>;
};

export const ChartContainer = ({ children }: { children: ReactNode }) => {
  return (
    <figure
      style={{
        maxHeight: "250px",
        marginTop: "0px",
        marginBottom: "0px",
      }}
      className="chart-ctn"
    >
      {children}
    </figure>
  );
};
