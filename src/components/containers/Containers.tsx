import { ReactNode } from "react";
import styles from "./_.module.css";
import { ContainerProps } from "../../types";

export const ChartContainer = ({ children, isOpen }: { children: ReactNode; isOpen: boolean }) => {
  const childrenArr = Array.isArray(children) ? children : [children];
  return (
    <section className="charts-ctn">
      {isOpen &&
        children &&
        childrenArr.map((child, i) => {
          return (
            <figure
              key={i}
              style={{
                maxHeight: "250px",
                marginTop: "0px",
                marginBottom: "0px",
                paddingLeft: "1.2rem",
                paddingRight: "1.2rem",
              }}
              className="chart-ctn bg-grey-alpha"
            >
              {child}
            </figure>
          );
        })}
    </section>
  );
};

export const Header = ({ children }: { children: React.ReactNode }) => {
  return <header className={styles["header-ctn"]}>{children}</header>;
};

export const MainContainer = ({ children }: ContainerProps) => {
  return <div className={styles["main-ctn"]}>{children}</div>;
};

export const InputContainer = ({ children }: ContainerProps) => {
  return <div className={styles["input-ctn"]}>{children}</div>;
};
