import { InputHTMLAttributes, KeyboardEvent, ReactNode, FC, CSSProperties } from "react";

interface InputProps {
  labelText: string;
  subjectId: string;
  onEnter?: (e: KeyboardEvent<HTMLInputElement>) => void;
  children?: ReactNode;
  sx?: CSSProperties;
  theme?: "light" | "dark";
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

export const SoftInput = ({ labelText, subjectId, onEnter, sx, theme }: InputProps) => {
  const handleEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (onEnter && e.key === "Enter") {
      onEnter(e);
    }
  };

  return (
    <div className="form__group field">
      <style>
        {`
      .form__group {
        position: relative;
        padding: 20px 0 0;
        width: 100%;
      }
      .form__field {
        font-family: inherit;
        width: 100%;
        border: none;
        border-bottom: 3px solid #9b9b9b;
        outline: 0;
        font-size: 17px;
        color: #fff;
        padding: 7px 0;
        background: transparent;
        transition: border-color 0.2s;
      }
      .form__field::placeholder {
        color: transparent;
      }
      .form__field:placeholder-shown ~ .form__label {
        font-size: 17px;
        cursor: text;
        top: 20px;
      }
      .form__label {
        position: absolute;
        top: 0;
        display: block;
        transition: 0.2s;
        font-size: 17px;
        color: #9b9b9b;
        pointer-events: none;
      }
      .form__field:focus {
        padding-bottom: 6px;
        font-weight: 700;
        border-width: 4px;
        border-image: linear-gradient(to right, ${
          theme == "light" ? "#646cff, #609dff" : "#609dff, #646cff"
        } );
        border-image-slice: 1;
      }
      .form__field:focus ~ .form__label {
        position: absolute;
        top: 0;
        display: block;
        transition: 0.2s;
        font-size: 17px;
        color: ${theme == "light" ? "#646cff" : "#609dff"};
        font-weight: 700;
      }
      /* reset input */
      .form__field:required, .form__field:invalid {
        box-shadow: none;
      }
      `}
      </style>
      <input
        onKeyUp={(e) => handleEnter(e)}
        className="form__field"
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
