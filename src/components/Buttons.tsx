import { CSSProperties, ReactNode } from "react";
import IconButton, { Close, Reset } from "./Icons";
import { arrayify } from "@/utils/utils";
export const CloseButton = ({ onClick }: { onClick: () => void }) => {
  return <IconButton onClick={onClick} icon={Close} iconName="close" variant="toaster" />;
};

export const ResetButton = ({ onClick }: { onClick: () => void }) => {
  return <IconButton onClick={onClick} icon={Reset} iconName="reset" variant="toaster" />;
};

type ChildWithProps = ReactNode & { props: { style: CSSProperties } };
type Props = {
  children: ChildWithProps[] | ChildWithProps;
  isOpen: boolean;
};

export const UtilityButtonGroup = ({ children, isOpen }: Props) => {
  const childrenArr = arrayify(children);

  console.log(childrenArr[0].props.style);

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
