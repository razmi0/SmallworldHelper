import { cssModules, getCardStyles } from "@Components/styles";
import { forwardRef } from "react";
import type { ContainerProps } from "@Types";

export const MainContainer = ({ children, ...rest }: ContainerProps) => {
  return (
    <div className={cssModules.container["main-ctn"]} {...rest}>
      {children}
    </div>
  );
};

export const Header = ({ children, ...rest }: ContainerProps) => {
  const classes = getCardStyles("header");
  return (
    <>
      <header className={cssModules.container["header-ctn"] + " " + classes} {...rest}>
        {children}
      </header>
    </>
  );
};

export const BoardView = ({ children }: ContainerProps) => {
  return <section className={cssModules.player["board-view"]}>{children}</section>;
};

export const PlayerList = forwardRef<HTMLUListElement, ContainerProps>(({ children }, ref) => {
  return (
    <div className={cssModules.player["players-view"]}>
      <ul ref={ref} className={cssModules.player["players-list-ctn"]}>
        {children}
      </ul>
    </div>
  );
});

export const InputContainer = ({ children, ...rest }: ContainerProps) => {
  return (
    <div className={cssModules.container["input-ctn"]} {...rest}>
      {children}
    </div>
  );
};
