import { InputHTMLAttributes, KeyboardEvent, ReactNode, FC } from "react";

interface InputProps {
  labelText: string;
  subjectId: string;
  onEnter?: (e: KeyboardEvent<HTMLInputElement>) => void;
  children?: ReactNode;
}

interface InputButtonProps extends InputProps {
  btnText: string;
  onClick?: () => void;
  inputProps?: InputHTMLAttributes<HTMLInputElement>;
}

export const Input: FC<InputProps & InputHTMLAttributes<HTMLInputElement>> = ({
  onEnter = () => {},
  children,
  subjectId,
  labelText,
  ...inputProps
}: InputProps) => {
  const handleEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (onEnter && e.key === "Enter") {
      onEnter(e);
    }
  };

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <label style={{ marginRight: "3px" }} htmlFor={subjectId}>
        {labelText}
      </label>
      {children}
      <input
        {...inputProps}
        minLength={1}
        type="text"
        name={subjectId}
        id={subjectId}
        onKeyUp={(e) => handleEnter(e)}
      />
    </div>
  );
};

export const InputButton: FC<InputButtonProps & InputHTMLAttributes<HTMLInputElement>> = ({
  onEnter = () => {},
  children,
  subjectId,
  labelText,
  btnText,
  onClick = () => {},
  ...inputProps
}: InputButtonProps) => {
  const handleEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (onEnter && e.key === "Enter") {
      onEnter(e);
    }
  };

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <label style={{ marginRight: "3px" }} htmlFor={subjectId}>
        {labelText}
      </label>
      {children}
      <input
        {...inputProps}
        minLength={1}
        type="text"
        name={subjectId}
        id={subjectId}
        onKeyUp={(e) => handleEnter(e)}
      />
      <button
        onClick={onClick}
        style={{
          transform: "translate(-5px, 25px)",
          zIndex: 1,
        }}
      >
        {btnText}
      </button>
    </div>
  );
};
