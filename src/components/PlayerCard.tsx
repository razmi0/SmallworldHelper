import Draggable from "react-draggable";
import { EventsManager, KeyboardManager } from "./Managers";
import { arrayify } from "@Utils/utils";
import { cssModules, getCardStyles } from "@CssModules";
import type { HTMLAttributes, ReactNode } from "react";
import type { KeyboardHandlerTypeWithArgs, PointerHandlerTypeWithArgs, ContainerProps, IconName } from "@Types";
import { IconHeading } from "./Icons";

interface PlayerCardProps extends ContainerProps {
  color: string;
}

const PlayerCard = ({ children, color }: PlayerCardProps) => {
  const classes = getCardStyles("player");
  const back = getCardStyles("player-back");
  const backShadowColor = color === "inherit" ? "rgba(255,255,222, 0.3)" : color;

  return (
    <div className={back} style={{ boxShadow: `0px 0px 1px 1px ${backShadowColor}` }} color={backShadowColor}>
      <div id="card" className={classes}>
        {children}
      </div>
    </div>
  );
};

export default PlayerCard;

interface PlayerHandlerProps<T extends unknown[], P extends unknown[]> {
  children: ReactNode;
  drag: boolean;
  keyboard: KeyboardHandlerTypeWithArgs<T>;
  pointer: PointerHandlerTypeWithArgs<P>;
}
export const PlayerHandler = <T extends unknown[], P extends unknown[]>({
  children,
  pointer,
  drag,
  keyboard,
}: PlayerHandlerProps<T, P>) => {
  return (
    <Draggable disabled={!drag}>
      <EventsManager pointer={pointer} as="li">
        <KeyboardManager keyboard={keyboard}>{children}</KeyboardManager>
      </EventsManager>
    </Draggable>
  );
};

interface HeadingBaseProps {
  ids: string[];
  color: string;
  isHover?: boolean;
  iconName?: IconName;
  iconColor?: string;
  children?: ReactNode;
}
// Conditional type to make certain props required based on the presence of iconName
type ConditionalHeadingProps<T extends IconName | undefined> = T extends IconName
  ? {
      isHover: boolean;
      iconName: T;
      iconColor: string;
    }
  : {
      isHover?: boolean;
      iconName?: T;
      iconColor?: string;
    };

export type HeadingProps = HeadingBaseProps & ConditionalHeadingProps<HeadingBaseProps["iconName"]>;

/**
 * The children[1] will be rendered with the icon id icon are passed.
 */
export const Heading = ({ children, ids, color, iconName, isHover, iconColor }: HeadingProps) => {
  const childrenArr = arrayify(children);
  return (
    <PlayerTextContainer>
      {childrenArr.map((child, i) => {
        return (
          <PlayerText color={color} id={ids[i]} key={i}>
            {i === 1 && iconName && (
              <IconHeading
                animationName="rotate"
                isHover={isHover}
                color={iconColor as string}
                iconName={iconName}
                variant="heading"
              />
            )}
            {child}
          </PlayerText>
        );
      })}
    </PlayerTextContainer>
  );
};

const PlayerTextContainer = ({ children }: ContainerProps) => {
  return <div className={cssModules.player["player-text-ctn"]}>{children}</div>;
};

interface PlayerTextProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  color: string;
}

const PlayerText = ({ children, color, ...props }: PlayerTextProps) => {
  return (
    <div {...props} style={{ color }} className={cssModules.player["player-text"]}>
      {children}
    </div>
  );
};
