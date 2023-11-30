import { ReactNode, useId } from "react";
import styles from "./_.module.css";
import chartStyles from "../charts/_.module.css";
import { ContainerProps } from "@Types";

export const ChartContainer = ({ children, isOpen }: { children: ReactNode; isOpen: boolean }) => {
  const childrenArr = Array.isArray(children) ? children : [children];
  const id = useId().replace(/:/g, "_");
  const communClasses = `${styles["figure-ctn"]} grainy lin-dark global-grainy shadow-ctn `;
  const donutClasses = `${chartStyles["donut"]} grainy-donut-radius lin-dark-donut-radius global-grainy-donut-radius`;
  const otherClasses =
    " grainy-default-radius lin-dark-default-radius global-grainy-default-radius";

  return (
    <section className="charts-ctn">
      {isOpen &&
        children &&
        childrenArr.map((child, i) => {
          const chartType = child.props.type;
          const finalId = `${id}${chartType}`;
          const isDonut = chartType === "donut"; // doesn't pass minifying

          return (
            <figure
              id={finalId}
              key={i}
              className={`${communClasses} ${isDonut ? donutClasses : otherClasses}`}
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
