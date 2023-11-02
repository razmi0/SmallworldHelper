import { InputHTMLAttributes, KeyboardEvent, ReactNode, FC, CSSProperties } from "react";
import { add4dToHex } from "../utils";

interface InputProps {
  labelText: string;
  subjectId: string;
  onEnter?: (e: KeyboardEvent<HTMLInputElement>) => void;
  children?: ReactNode;
  sx?: CSSProperties;
  theme?: "light" | "dark";
  onFocus?: () => void;
  onBlur?: () => void;
  color?: string;
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

export const SoftInput = ({
  labelText,
  subjectId,
  onEnter,
  sx,
  onFocus,
  onBlur,
  color,
}: InputProps) => {
  const handleEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (onEnter && e.key === "Enter") {
      onEnter(e);
    }
  };
  const fontSize = sx?.fontSize || "15px";

  return (
    <div className="form__group">
      <style>
        {`
      .form__group {
        position: relative;
        padding: 20px 5px;
        padding-top : 0px;
        width: 100%;
      }
      .form__field--${subjectId} {
        font-family: inherit;
        width: 100%;
        border: none;
        border-bottom: 2px solid #9b9b9b;
        outline: 0;
        font-size: ${fontSize};
        color: #fff;
        padding: 7px 0;
        background: transparent;
        transition: border-color 0.2s;
      }
      .form__field--${subjectId}::placeholder {
        color: transparent;
      }
      .form__field--${subjectId}:placeholder-shown ~ .form__label {
        font-size: ${fontSize};
        cursor: text;
        top: 6px;
      }
      .form__label {
        position: absolute;
        top: 0;
        display: block;
        transition: 0.2s;
        font-size: ${fontSize};
        color: #9b9b9b;
        pointer-events: none;
      }
      .form__field--${subjectId}:focus {
        padding-bottom: 6px;
        font-weight: 700;
        border-width: 3px;
        border-image: linear-gradient(to right, ${color}, ${add4dToHex(color)});
        border-image-slice: 1;
      }
      .form__field--${subjectId}:focus ~ .form__label {
        position: absolute;
        top: -10px;
        display: block;
        transition: 0.2s;
        font-size: ${fontSize};
        color: ${color};
        font-weight: 700;
      }
      /* reset input */
      .form__field--${subjectId}:required, .form__field--${subjectId}:invalid {
        box-shadow: none;
      }
      `}
      </style>
      <input
        onKeyUp={(e) => handleEnter(e)}
        onFocus={onFocus}
        onBlur={onBlur}
        className={`form__field--${subjectId}`}
        placeholder={labelText}
        minLength={1}
        id={subjectId}
        name={subjectId}
        style={sx}
      />
      <label htmlFor={subjectId} className="form__label">
        {labelText}
      </label>
    </div>
  );
};
