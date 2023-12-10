import { useState, forwardRef } from "react";
import { add4dToHex } from "@Utils/utils";
import type { KeyboardEvent, ReactNode, CSSProperties, InputHTMLAttributes } from "react";
import type { KeyboardNavigationIdType } from "@Types";

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
  ({ pseudoName, sx, color, datatype, value, label = "Add score", ...rest }, ref) => {
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
          className={`form__field--${pseudoName} form__field--commun`}
          id={pseudoName}
          style={sx}
          type="text"
          placeholder={label}
          value={value}
          autoComplete="off"
          required
          {...rest}
        />
        <label htmlFor={pseudoName} className="form__label">
          {label}
        </label>
      </div>
    );
  }
);
export const HardInput = forwardRef<HTMLInputElement, InputProps>(
  ({ pseudoName, color, datatype, value, label = "Add score", ...rest }, ref) => {
    pseudoName = pseudoName.replace(/_/g, "_") + "_input";
    const [isFocus, setIsFocus] = useState(false);
    const noFocusColor = "rgba(255,255,222, 0.3)";
    const styles = isFocus
      ? { color, borderColor: color }
      : {
          color: noFocusColor,
          borderColor: noFocusColor,
        };

    return (
      <div className="input-box">
        <input
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          ref={ref}
          datatype={datatype}
          className={pseudoName}
          id={pseudoName}
          type="text"
          value={value}
          autoComplete="off"
          required
          style={{
            ...styles,
            boxShadow: `0px 5px 3px 5px #0000009c ${isFocus ? "inset" : ""}`,
          }}
          {...rest}
        />
        <label htmlFor={pseudoName} style={styles}>
          {label}
        </label>
      </div>
    );
  }
);
