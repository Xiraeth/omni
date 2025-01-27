import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      username?: string;
      email?: string;
      name?: string;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    email: string;
  }
}

export interface FormElementPropsType
  extends React.InputHTMLAttributes<HTMLInputElement> {
  isInvalid?: boolean;
  value?: string;
}

export interface LoginFormData {
  email: string;
  password: string;
  username: string;
}

export interface SignupFormData {
  email: string;
  password: string;
  confirmPassword: string;
  username: string;
}

export interface UserType {
  id: string;
  email?: string | null;
  username?: string | null;
  password?: string | null;
  name?: string | null;
  image?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}
