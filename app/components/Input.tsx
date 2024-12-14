import { useRef, useState, forwardRef, useMemo } from "react";
import { FormElementPropsType } from "../common/types";
import clsx from "clsx";

/**
 * Input component with focus state styling
 * @param {Object} props - Component props
 * @param {string} props.type - Input type (e.g., "text", "password", "email")
 * @param {string} props.placeholder - Placeholder text for the input
 * @param {string} [props.className] - Additional CSS classes
 * @returns {JSX.Element} Input component
 */
const Input = forwardRef<HTMLInputElement, FormElementPropsType>(
  (
    {
      type,
      placeholder,
      className = "",
      onChange,
      onBlur,
      isInvalid = false,
      ...props
    },
    forwardedRef
  ) => {
    // Combine states into a single object to reduce re-renders
    const [state, setState] = useState({
      isFocused: false,
      isEmpty: true,
    });

    const innerRef = useRef<HTMLInputElement>(null);

    // Memoize class calculations
    const { inputClasses, labelClasses } = useMemo(
      () => ({
        inputClasses: clsx(
          "outline-none w-full py-2 px-4 rounded-md transition-all duration-150 border-2",
          {
            "border-blue-400": state.isFocused && !isInvalid,
            "border-slate-200": !(state.isFocused && !isInvalid),
            "bg-red-400/20": isInvalid,
            "bg-zinc-50": !isInvalid,
          },
          className
        ),
        labelClasses: clsx(
          "absolute left-4 -translate-y-1/2 text-black/70 transition-all duration-50 z-10 px-1 cursor-text select-none",
          {
            "top-0 text-xs": state.isFocused || !state.isEmpty,
            "top-1/2 text-base": !(state.isFocused || !state.isEmpty),
            "text-blue-400": state.isFocused && !isInvalid,
            "text-black/70": !(state.isFocused && !isInvalid),
            "text-red-500": state.isFocused && isInvalid,
            "bg-transparent": !state.isFocused && isInvalid,
            "bg-zinc-50": state.isFocused && !isInvalid,
          }
        ),
      }),
      [state.isFocused, state.isEmpty, isInvalid, className]
    );

    // Memoize event handlers
    const handleElementClick = (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();

      const targetRef =
        typeof forwardedRef === "function"
          ? innerRef
          : forwardedRef || innerRef;

      if (targetRef.current) {
        targetRef.current.focus();
        setState((prev) => ({ ...prev, isFocused: true }));
      }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setState((prev) => ({
        ...prev,
        isEmpty: !e.target.value.trim(),
      }));
      onChange?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setState((prev) => ({ ...prev, isFocused: false }));
      onBlur?.(e);
    };

    return (
      <div className="w-full relative">
        <label className={labelClasses} onClick={handleElementClick}>
          {placeholder}
        </label>
        <input
          {...props}
          ref={
            typeof forwardedRef === "function"
              ? innerRef
              : forwardedRef || innerRef
          }
          type={type}
          className={inputClasses}
          onChange={handleInputChange}
          onFocus={() => setState((prev) => ({ ...prev, isFocused: true }))}
          onBlur={handleBlur}
        />
      </div>
    );
  }
);

// Add display name for React DevTools
Input.displayName = "Input";

export default Input;
