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
                marginRight: "0px",
                marginLeft: "0px",
                marginTop: "0px",
                marginBottom: "0px",
                // paddingLeft: "1.2rem",
                // paddingRight: "1.2rem",
                padding: "1.2rem",
                width: "100%",
                height: "100%",
              }}
              className="grainy lin-dark global-grainy shadow-ctn"
            >
              {child}
            </figure>
          );
        })}
    </section>
  );
};

export const Header = ({ children, ...rest }: ContainerProps) => {
  return (
    <header className={styles["header-ctn"]} {...rest}>
      {children}
    </header>
  );
};

export const MainContainer = ({ children, ...rest }: ContainerProps) => {
  return (
    <div className={styles["main-ctn"]} {...rest}>
      {children}
    </div>
  );
};

export const InputContainer = ({ children, ...rest }: ContainerProps) => {
  return (
    <div className={styles["input-ctn"]} {...rest}>
      {children}
    </div>
  );
};
