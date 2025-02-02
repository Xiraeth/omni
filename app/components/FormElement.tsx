import clsx from "clsx";
import { memo, ReactNode } from "react";

interface FormElementProps {
  errorMsg?: string;
  children: ReactNode;
  width?: string;
  className?: string;
}

/**
 * A wrapper component for form elements that handles error display
 * @param {Object} props - Component props
 * @param {string} [props.errorMsg] - Error message to display
 * @param {string} [props.width] - Width of the form element
 * @param {ReactNode} props.children - Form element(s) to wrap
 * @returns {JSX.Element} Wrapped form element with error handling
 */
const FormElement = memo(
  ({ errorMsg, children, width, className }: FormElementProps) => {
    return (
      <div
        className={clsx("flex flex-col gap-1 items-center", width, className)}
      >
        {children}
        {errorMsg && (
          <span
            className="text-xs relative bottom-1 text-center text-red-600 font-bold rounded-full flex 
        items-center justify-center px-2"
          >
            {errorMsg}
          </span>
        )}
      </div>
    );
  }
);

// Add displayName for better debugging
FormElement.displayName = "FormElement";

export default FormElement;
