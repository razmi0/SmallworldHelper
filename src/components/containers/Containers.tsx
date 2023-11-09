import { ReactNode } from "react";
import styles from "./_.module.css";

type FlexProps = {
  children: ReactNode;
  sx?: React.CSSProperties;
};
export const Flex = ({ children, sx }: FlexProps) => {
  return <div style={{ ...sx, display: "flex" }}>{children}</div>;
};

export const ChartContainer = ({ children }: { children: ReactNode }) => {
  const childrenArr = Array.isArray(children) ? children : [children];
  return (
    <section className="charts-ctn">
      {children &&
        childrenArr.map((child, i) => {
          return (
            <figure
              key={i}
              style={{
                maxHeight: "250px",
                marginTop: "0px",
                marginBottom: "0px",
              }}
              className="chart-ctn"
            >
              {child}
            </figure>
          );
        })}
    </section>
  );
};

export const MainContainer = ({ children }: { children: ReactNode }) => {
  return <div className={styles["main-ctn"]}>{children}</div>;
};
