import { KeyboardEvent, ReactNode, CSSProperties, forwardRef, InputHTMLAttributes } from "react";
import { add4dToHex } from "../utils";
import { KeyboardNavigationIdType } from "../types";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  datatype?: KeyboardNavigationIdType;
  label?: string;
  subjectId: string;
  onEnter?: (e: KeyboardEvent<HTMLInputElement>) => void;
  children?: ReactNode;
  sx?: CSSProperties;
  theme?: "light" | "dark";
  color?: string;
  value?: number | string;
}

// interface InputButtonProps extends InputProps {
//   btnText: string;
//   onClick?: MouseEventHandler<HTMLButtonElement>;
// }

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ onEnter, children, subjectId, label: labelText, ...rest }, ref) => {
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
          ref={ref}
          {...rest}
          minLength={1}
          type="text"
          name={subjectId}
          id={subjectId}
          onKeyUp={(e) => handleEnter(e)}
        />
      </div>
    );
  }
);
// export const InputButton: FC<InputButtonProps & InputHTMLAttributes<HTMLInputElement>> = ({
//   onEnter = () => {},
//   children,
//   subjectId,
//   label : labelText,
//   btnText,
//   onClick = () => {},
//   value,
// }: InputButtonProps) => {
//   const handleEnter = (e: KeyboardEvent<HTMLInputElement>) => {
//     if (onEnter && e.key === "Enter") {
//       onEnter(e);
//     }
//   };

//   return (
//     <div style={{ display: "flex", alignItems: "center" }}>
//       <label style={{ marginRight: "3px" }} htmlFor={subjectId}>
//         {labelText}
//       </label>
//       {children}
//       <input
//         onChange={onChange}
//         value={value}
//         minLength={1}
//         type="text"
//         name={subjectId}
//         id={subjectId}
//         onKeyUp={(e) => handleEnter(e)}
//       />
//       <button
//         onClick={onClick}
//         style={{
//           transform: "translate(-5px, 25px)",
//           zIndex: 1,
//         }}
//       >
//         {btnText}
//       </button>
//     </div>
//   );
// };

export const SoftInput = forwardRef<HTMLInputElement, InputProps>(
  ({ subjectId, sx, color, datatype, value, onEnter, label = "Add score", ...rest }, ref) => {
    const handleEnter = (e: KeyboardEvent<HTMLInputElement>) => {
      if (onEnter && e.key === "Enter") {
        onEnter(e);
      }
    };
    return (
      <div className="form__group">
        <style>
          {`
        .form__field--${subjectId}:focus {
          border-image: linear-gradient(to right, ${color}, ${add4dToHex(color)});
          border-image-slice: 1;
          color: ${color};
        }
        .form__field--${subjectId}:focus ~ .form__label {
          color: ${color};
        }
      `}
        </style>
        <input
          ref={ref}
          datatype={datatype}
          onKeyUp={(e) => handleEnter(e)}
          className={`form__field--${subjectId} form__field--commun`}
          id={subjectId}
          style={sx}
          type="text"
          placeholder={label}
          value={value}
          autoComplete="off"
          {...rest}
        />
        <label htmlFor={subjectId} className="form__label">
          {label}
        </label>
      </div>
    );
  }
);
