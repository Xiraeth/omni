export interface FormElementPropsType
  extends React.InputHTMLAttributes<HTMLInputElement> {
  isInvalid?: boolean;
  value?: string;
}
