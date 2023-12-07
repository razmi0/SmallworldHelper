import { CSSProperties, ReactNode } from "react";
import IconButton from "./Icons";
import { arrayify } from "@/utils/utils";

export const CloseButton = ({ onClick }: { onClick: () => void }) => {
  return <IconButton onClick={onClick} iconName="close" variant="utility" />;
};

export const ResetButton = ({ onClick }: { onClick: () => void }) => {
  return <IconButton onClick={onClick} iconName="reset" variant="utility" />;
};

type ChildWithProps = ReactNode & { props: { style: CSSProperties } };
type Props = {
  children: ChildWithProps[] | ChildWithProps;
  isOpen: boolean;
};

export const UtilityButtonGroup = ({ children, isOpen }: Props) => {
  const childrenArr = arrayify(children);

  if (!isOpen) return null;

  return (
    <>
      {childrenArr.map((child, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            top: 0,
            right: `${i * 1.2}em`,
          }}
        >
          {child}
        </div>
      ))}
    </>
  );
};
