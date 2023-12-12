import { cssModules } from "@Components/styles";
import { forwardRef } from "react";
import type { ContainerProps } from "@Types";

export const MainContainer = ({ children, ...rest }: ContainerProps) => {
  return (
    <div className={cssModules.container["main-ctn"]} {...rest}>
      {children}
    </div>
  );
};

export const BoardView = ({ children }: ContainerProps) => {
  return <main className={cssModules.player["board-view"]}>{children}</main>;
};

export const PlayerList = forwardRef<HTMLUListElement, ContainerProps>(({ children }, ref) => {
  return (
    <section className={cssModules.player["players-view"]}>
      <ul ref={ref} className={cssModules.player["players-list-ctn"]}>
        {children}
      </ul>
    </section>
  );
});

export const InputContainer = ({ children, ...rest }: ContainerProps) => {
  return (
    <div className={cssModules.container["input-ctn"]} {...rest}>
      {children}
    </div>
  );
};
