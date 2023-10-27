import { InputHTMLAttributes, KeyboardEvent, ReactNode, FC } from "react";

interface InputProps {
  labelText: string;
  subjectId: string;
  onEnter?: (e: KeyboardEvent<HTMLInputElement>) => void;
  children?: ReactNode;
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
    <>
      <label htmlFor={subjectId}>{labelText}</label>
      {children}
      <input
        {...inputProps}
        style={{ marginLeft: "3px" }}
        minLength={1}
        maxLength={3}
        type="text"
        name={subjectId}
        id={subjectId}
        onKeyUp={(e) => handleEnter(e)}
      />
    </>
  );
};

interface InputButtonProps extends InputProps {
  btnText: string;
  onClick?: () => void;
}
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
    <>
      <label htmlFor={subjectId}>{labelText}</label>
      {children}
      <input
        {...inputProps}
        style={{ marginLeft: "3px" }}
        minLength={1}
        maxLength={3}
        type="text"
        name={subjectId}
        id={subjectId}
        onKeyUp={(e) => handleEnter(e)}
      />
      <button onClick={onClick}>{btnText}</button>
    </>
  );
};
