import { memo } from "react";
import { FormElementPropsType } from "../common/types";
import Input from "./Input";

interface FormElementProps {
  errorMsg?: string;
  InputProps: FormElementPropsType;
}

const FormElement = memo(({ errorMsg, InputProps }: FormElementProps) => {
  return (
    <div className="w-full flex flex-col gap-1">
      <Input {...InputProps} isInvalid={!!errorMsg} />
      {errorMsg && (
        <span className="text-xs relative bottom-1 text-red-500 rounded-full flex items-center justify-center w-fit px-2">
          {errorMsg}
        </span>
      )}
    </div>
  );
});

FormElement.displayName = "FormElement";

export default FormElement;
