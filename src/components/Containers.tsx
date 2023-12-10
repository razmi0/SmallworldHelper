import { ContainerProps } from "@Types";
import { cssModules, getCardStyles } from "@Components/styles";

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
