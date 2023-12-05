import { KeyboardEvent, ReactNode, CSSProperties, forwardRef, InputHTMLAttributes } from "react";
import { add4dToHex } from "@Utils/utils";
import { KeyboardNavigationIdType } from "@Types";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  datatype?: KeyboardNavigationIdType;
  label?: string;
  pseudoName: string;
  onEnter?: (e: KeyboardEvent<HTMLInputElement>) => void;
  children?: ReactNode;
  sx?: CSSProperties;
  theme?: "light" | "dark";
  color?: string;
  value?: number | string;
  isFocus?: boolean;
}

// interface InputButtonProps extends InputProps {
//   btnText: string;
//   onClick?: MouseEventHandler<HTMLButtonElement>;
// }

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ onEnter, children, pseudoName, label: labelText, ...rest }, ref) => {
    const handleEnter = (e: KeyboardEvent<HTMLInputElement>) => {
      if (onEnter && e.key === "Enter") {
        onEnter(e);
      }
    };

    return (
      <div style={{ display: "flex", alignItems: "center" }}>
        <label style={{ marginRight: "3px" }} htmlFor={pseudoName}>
          {labelText}
        </label>
        {children}
        <input
          ref={ref}
          {...rest}
          minLength={1}
          type="text"
          name={pseudoName}
          id={pseudoName}
          onKeyUp={(e) => handleEnter(e)}
        />
      </div>
    );
  }
);

export const SoftInput = forwardRef<HTMLInputElement, InputProps>(
  ({ pseudoName, sx, color, datatype, value, onEnter, label = "Add score", ...rest }, ref) => {
    const handleEnter = (e: KeyboardEvent<HTMLInputElement>) => {
      if (onEnter && e.key === "Enter") {
        onEnter(e);
      }
    };

    return (
      <div className="form__group">
        <style>
          {`
        .form__field--${pseudoName}:focus {
          border-image: linear-gradient(to right, ${color}, ${add4dToHex(color)});
          border-image-slice: 1;
          color: ${color};
        }
        .form__field--${pseudoName}:focus ~ .form__label {
          color: ${color};
        }
      `}
        </style>
        <input
          ref={ref}
          datatype={datatype}
          onKeyUp={(e) => handleEnter(e)}
          className={`form__field--${pseudoName} form__field--commun`}
          id={pseudoName}
          style={sx}
          type="text"
          placeholder={label}
          value={value}
          autoComplete="off"
          {...rest}
        />
        <label htmlFor={pseudoName} className="form__label">
          {label}
        </label>
      </div>
    );
  }
);
