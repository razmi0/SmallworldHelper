import {
  InputHTMLAttributes,
  KeyboardEvent,
  ReactNode,
  FC,
  CSSProperties,
  MouseEventHandler,
} from "react";
import { add4dToHex } from "../utils";

interface InputProps {
  labelText?: string;
  subjectId: string;
  onEnter?: (e: KeyboardEvent<HTMLInputElement>) => void;
  children?: ReactNode;
  sx?: CSSProperties;
  theme?: "light" | "dark";
  onFocus?: () => void;
  onBlur?: () => void;
  color?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyUp?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  value?: number | string;
}

interface InputButtonProps extends InputProps {
  btnText: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
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
  value,
  onChange = () => {},
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
        onChange={onChange}
        value={value}
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

export const SoftInput = ({
  subjectId,
  sx,
  onFocus,
  onBlur,
  color,
  onChange,
  onKeyUp,
  value,
}: InputProps) => {
  return (
    <div className="form__group">
      <style>
        {`
        .form__field--${subjectId}:focus {
          border-image: linear-gradient(to right, ${color}, ${add4dToHex(color)});
          border-image-slice: 1;
        }
        .form__field--${subjectId}:focus ~ .form__label {
          color: ${color};
        }
      `}
      </style>
      <input
        onFocus={onFocus}
        onBlur={onBlur}
        className={`form__field--${subjectId} form__field--commun`}
        placeholder="Score"
        id={subjectId}
        name="soft-input"
        style={sx}
        type="text"
        onChange={onChange}
        onKeyUp={onKeyUp}
        value={value}
      />
      <label htmlFor={subjectId} className="form__label">
        Score
      </label>
    </div>
  );
};
