import { memo, ReactNode } from "react";

interface FormElementProps {
  errorMsg?: string;
  children: ReactNode;
}

/**
 * A wrapper component for form elements that handles error display
 * @param {Object} props - Component props
 * @param {string} [props.errorMsg] - Error message to display
 * @param {ReactNode} props.children - Form element(s) to wrap
 * @returns {JSX.Element} Wrapped form element with error handling
 */
const FormElement = memo(({ errorMsg, children }: FormElementProps) => {
  return (
    <div className="flex flex-col gap-1 items-center">
      {children}
      {errorMsg && (
        <span className="text-xs relative bottom-1 text-red-500 rounded-full flex items-center justify-center px-2">
          {errorMsg}
        </span>
      )}
    </div>
  );
});

export default FormElement;
