export interface FormElementPropsType
  extends React.InputHTMLAttributes<HTMLInputElement> {
  isInvalid?: boolean;
  value?: string;
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface SignupFormData {
  email: string;
  password: string;
  confirmPassword: string;
}
