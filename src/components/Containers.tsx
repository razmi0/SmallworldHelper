import { FC, ReactNode, useId } from "react";
import { ContainerProps } from "@Types";
import { cssModules, getCardStyles } from "@Components/styles";
import { arrayify } from "@Utils/utils";

type LocalChartType = "donut" | "line" | "bar";
type ChildWithProps = ReactNode & { props: { type: LocalChartType } };
type Props = {
  children: ChildWithProps[] | ChildWithProps;
  isOpen: boolean;
  color: string;
};
export const ChartContainer: FC<Props> = ({ children, isOpen, color }) => {
  const childrenArr = arrayify(children);
  const id = useId().replace(/:/g, "_");

  const back = getCardStyles("chart-back");
  const donutBack = getCardStyles("donut-back");

  const getClasses = (chartType: LocalChartType) => {
    if (chartType === "donut") return getCardStyles("donut");
    if (chartType === "line") return getCardStyles("bar");
    if (chartType === "bar") return getCardStyles("line");
  };

  return (
    <section className="charts-ctn">
      {isOpen &&
        children &&
        childrenArr.map((child, i) => {
          const chartType = child.props.type;
          const finalId = `${id}${chartType}`;

          const classes = getClasses(chartType);

          return (
            <div
              style={{ boxShadow: `0px 0px 1px 1px ${color}` }}
              key={i}
              className={chartType === "donut" ? donutBack : back}
            >
              <figure id={finalId} className={classes}>
                {child}
              </figure>
            </div>
          );
        })}
    </section>
  );
};

export const Header = ({ children, ...rest }: ContainerProps) => {
  return (
    <>
      <header className={cssModules.container["header-ctn"]} {...rest}>
        {children}
      </header>
    </>
  );
};

export const MainContainer = ({ children, ...rest }: ContainerProps) => {
  return (
    <div className={cssModules.container["main-ctn"]} {...rest}>
      {children}
    </div>
  );
};

export const InputContainer = ({ children, ...rest }: ContainerProps) => {
  return (
    <div className={cssModules.container["input-ctn"]} {...rest}>
      {children}
    </div>
  );
};
