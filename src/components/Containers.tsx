import type { ContainerProps } from "@Types";
import { cssModules, getCardStyles } from "@Components/styles";

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
export const InputContainer = ({ children, ...rest }: ContainerProps) => {
  return (
    <div className={cssModules.container["input-ctn"]} {...rest}>
      {children}
    </div>
  );
};
