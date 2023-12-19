import { useId } from "react";
import { IconButton } from "@Components/Buttons";
import { useNotif } from "@Context/useNotif";
import { cssModules, getCardStyles } from "@Components/styles";
import type { ReactNode, CSSProperties } from "react";
import type { ContainerProps } from "@Types";
import { isProdEnv } from "@/utils/utils";

/*
 * DRAGGABLE
 * If running in React Strict mode, ReactDOM.findDOMNode() is deprecated.
 * Unfortunately, in order for <Draggable> to work properly, we need raw access
 * to the underlying DOM node. If you want to avoid the warning, pass a `nodeRef`
 * as in this example:
 *
 * function MyComponent() {
 *   const nodeRef = React.useRef(null);
 *   return (
 *     <Draggable nodeRef={nodeRef}>
 *       <div ref={nodeRef}>Example Target</div>
 *     </Draggable>
 *   );
 * }
 *
 * This can be used for arbitrarily nested components, so long as the ref ends up
 * pointing to the actual child DOM node and not a custom component.
 */

const root = document.querySelector(":root") as HTMLHtmlElement;
export const RisingStars = ({ color }: { color: string }) => {
  root?.style.setProperty("--raining-stars-color", color || "#FFF");
  return (
    <>
      <div className="rising-stars rising-stars-visible">
        <div style={{ height: "1px", width: "1px" }}></div>
        <div style={{ height: "2px", width: "2px" }}></div>
        <div style={{ height: "1px", width: "1px" }}></div>
      </div>
    </>
  );
};

export const Toast = () => {
  const { notifs, removeNotif } = useNotif();

  return (
    <ListContainer>
      {notifs.map((notif, i) => {
        const { message, type } = notif;
        const color = getToastColorType(type);
        return (
          <ListElement color={color} key={i}>
            <ToastBody onClick={() => removeNotif(notifs[0].id)}>
              <ToastMessage message={message} />
            </ToastBody>
          </ListElement>
        );
      })}
    </ListContainer>
  );
};

const getToastColorType = (type: "success" | "error" | "warning" | "info") => {
  return type === "success" ? "green" : type === "error" ? "red" : type === "warning" ? "orange" : "blue";
};

const ListContainer = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <style>
        {`@keyframes slide {
        0% {
          transform: translateY(100%);
        }
        100% {
          transform: translateX(0%);
        }
    }`}
      </style>
      <ul className={cssModules.utils["toast-list-ctn"]}>{children}</ul>
    </>
  );
};

const ListElement = ({ children, color }: { children: ReactNode; color: string }) => {
  const classes = getCardStyles("default");
  return (
    <li
      style={{
        boxShadow: ` 0px 0px 1px 1px ${color}`,
        overflow: "hidden",
      }}
      className={cssModules.utils["toast-list-element"] + " " + classes}
    >
      {children}
    </li>
  );
};

type ToastHeaderProps = {
  children: ReactNode;
  onClick: () => void;
};
const ToastBody = ({ children, onClick }: ToastHeaderProps) => {
  return (
    <div style={{ display: "flex", flexDirection: "row" }} className="">
      <div className={cssModules.utils["toast-body"]}>{children}</div>
      <IconButton onClick={onClick} iconName="close" variant="toaster" sx={{ position: "absolute", right: 0 }} />
    </div>
  );
};

const ToastMessage = ({ message }: { message: string }) => {
  return (
    <div className={cssModules.utils["toast-message"]}>
      <span>{message}</span>
    </div>
  );
};

export const Separator = () => {
  return <hr className={cssModules.utils["separator"]} />;
};
type FlexProps = {
  children: ReactNode;
  sx?: CSSProperties;
};
export const Spacer = ({ sx }: { sx?: CSSProperties }) => {
  const id = useId() + "_spacer";
  return <div style={{ ...sx, flex: 1 }} id={id}></div>;
};
export const Flex = ({ children, sx }: FlexProps) => {
  return <div style={{ ...sx, display: "flex" }}>{children}</div>;
};

type StartButtonProps = {
  isNavOpen?: boolean;
  toggleOpenAddPlayer: () => void;
  isAddPlayerOpen: boolean;
  hasPlayers: boolean;
};
export const StartButton = ({ toggleOpenAddPlayer, isAddPlayerOpen, hasPlayers }: StartButtonProps) => {
  return (
    <>
      {!hasPlayers && !isAddPlayerOpen && (
        <Position position={"absolute-center"}>
          <h3 style={{ fontSize: "1.3rem" }}>Start new board</h3>
          <IconButton
            style={{ cursor: "pointer", transform: "scale(1.2)" }}
            variant="nav"
            iconName="addcard"
            onClick={toggleOpenAddPlayer}
          />
        </Position>
      )}
    </>
  );
};

type PositionType = "absolute-center" | { x: number; y: number };
interface PositionContainerProps extends ContainerProps {
  position: PositionType;
}
export const Position = ({ position, children }: PositionContainerProps) => {
  let classes: string;
  position === "absolute-center" ? (classes = cssModules.utils["absolute-center"]) : (classes = "");

  if (typeof position === "object") {
    const { x, y } = position;
    // classes = cssModules.utils["absolute-center"];
    return (
      <div style={{ position: "absolute", top: y, left: x }} className={classes}>
        {children}
      </div>
    );
  }
  return <div className={classes}>{children}</div>;
};

type MockButtonType = {
  setMock: () => void;
};
export const MockButton = ({ setMock }: MockButtonType) => {
  if (isProdEnv()) return <></>;
  return (
    <button className="mock" onClick={setMock}>
      Mock
    </button>
  );
};
