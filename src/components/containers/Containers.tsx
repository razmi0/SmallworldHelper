import { ReactNode, useId } from "react";
import styles from "./_.module.css";
import { ContainerProps } from "@Types";

export const ChartContainer = ({ children, isOpen }: { children: ReactNode; isOpen: boolean }) => {
  const childrenArr = Array.isArray(children) ? children : [children];
  const id = useId().replace(/:/g, (Math.random() * 1000).toFixed(1));

  return (
    <section className="charts-ctn">
      {isOpen &&
        children &&
        childrenArr.map((child, i) => {
          return (
            <figure
              id={id}
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
              <style>{}</style>
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
