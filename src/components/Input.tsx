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

const Styling = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <style>
        {`
        input {
          border: unset;
          height: var(--std-height);
          padding: 0 1.2em;
          font-size: 1em;
          font-weight: 500;
          font-family: inherit;
          background-color: #96969c92;
          transition: border-color 0.25s;
          border 2px solid #96969c92;
          outline: none;
        }
        input:focus,
        input:focus-visible {
          border-color: #646cff;
        }
        `}
      </style>
      {children}
    </>
  );
};

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
    <Styling>
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
    </Styling>
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
    <Styling>
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
    </Styling>
  );
};
