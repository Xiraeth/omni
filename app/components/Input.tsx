import { useRef, useState, forwardRef } from "react";
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
    const [isFocused, setIsFocused] = useState(false);
    const [isEmpty, setIsEmpty] = useState(true);
    const innerRef = useRef<HTMLInputElement>(null);

    const handleElementClick = () => {
      if (innerRef.current) {
        innerRef.current.focus();
        setIsFocused(true);
      }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.value.trim()) {
        setIsEmpty(false);
      } else {
        setIsEmpty(true);
      }
      onChange?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      onBlur?.(e);
    };

    // Combine base classes with dynamic focus classes and custom classes
    const inputClasses = clsx(
      "outline-none",
      "w-full",
      "py-2",
      "px-4",
      "rounded-md",
      "transition-all",
      "duration-150",
      "border-2",
      {
        "border-blue-400": isFocused && !isInvalid,
        "border-slate-200": !(isFocused && !isInvalid),
        "bg-red-400/20": isInvalid,
        "bg-zinc-50": !isInvalid,
      },
      className
    );

    const labelClasses = clsx(
      "absolute",
      "left-4",
      "-translate-y-1/2",
      "text-black/70",
      "transition-all",
      "duration-50",
      "z-10",
      "px-1",
      "cursor-text",
      "select-none",
      {
        "top-0 text-xs": isFocused || !isEmpty,
        "top-1/2 text-base": !(isFocused || !isEmpty),
        "text-blue-400": isFocused && !isInvalid,
        "text-black/70": !(isFocused && !isInvalid),
        "text-red-500": isFocused && isInvalid,
        "bg-transparent": !isFocused && isInvalid,
        "bg-zinc-50": isFocused && !isInvalid,
      }
    );

    const combinedRef = (node: HTMLInputElement | null) => {
      innerRef.current = node;
      if (typeof forwardedRef === "function") {
        forwardedRef(node);
      } else if (forwardedRef) {
        forwardedRef.current = node;
      }
    };

    return (
      <div className="w-full relative">
        <label className={labelClasses} onClick={handleElementClick}>
          {placeholder}
        </label>
        <input
          {...props}
          ref={combinedRef}
          type={type}
          className={inputClasses}
          onChange={handleInputChange}
          onFocus={() => setIsFocused(true)}
          onBlur={handleBlur}
        />
      </div>
    );
  }
);

// Add display name for React DevTools
Input.displayName = "Input";

export default Input;
