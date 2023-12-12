import { cssModules, getCardStyles } from "@Components/styles";
import { ElementType, forwardRef } from "react";
import type { ContainerProps } from "@Types";
import { CardType } from "./styles/index";

export const MainContainer = ({ children, ...rest }: ContainerProps) => {
  return (
    <div className={cssModules.container["main-ctn"]} {...rest}>
      {children}
    </div>
  );
};

interface CardStyles extends ContainerProps {
  children: React.ReactNode;
  card?: CardType;
  as?: ElementType;
}
export const CardStyles = ({ children, as: Element = "div", card = "default", ...rest }: CardStyles) => {
  const classes = getCardStyles(card);
  return (
    <>
      <Element className={cssModules.container["header-ctn"] + " " + classes} {...rest}>
        {children}
      </Element>
    </>
  );
};

export const NavContainer = forwardRef<HTMLElement, ContainerProps>(({ children }, navRef) => {
  return (
    <nav className={cssModules.nav["nav-ctn"]} ref={navRef}>
      {children}
    </nav>
  );
});

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
