import { ReactNode, useId } from "react";
import styles from "./_.module.css";
import { ContainerProps } from "@Types";

export const ChartContainer = ({ children, isOpen }: { children: ReactNode; isOpen: boolean }) => {
  const childrenArr = Array.isArray(children) ? children : [children];
  const id = useId().replace(/:/g, "_");

  return (
    <section className="charts-ctn">
      {isOpen &&
        children &&
        childrenArr.map((child, i) => {
          return (
            <figure
              id={id}
              key={i}
              className={`grainy lin-dark global-grainy shadow-ctn ${styles["figure-ctn"]}`}
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
