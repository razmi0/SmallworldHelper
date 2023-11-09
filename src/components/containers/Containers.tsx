import { ReactNode } from "react";
import styles from "./_.module.css";

export type ContainerProps = {
  children: ReactNode;
};

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

export const MainContainer = ({ children }: ContainerProps) => {
  return <div className={styles["main-ctn"]}>{children}</div>;
};

export const InputContainer = ({ children }: ContainerProps) => {
  return <div className={styles["input-ctn"]}>{children}</div>;
};
