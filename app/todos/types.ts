import { UserType } from "@/app/common/types";

export type TodoType = {
  _id: string;
  title: string;
  description?: string;
  completed: boolean;
  dateFor: Date;
  createdAt: Date;
  updatedAt?: Date;
  category: TodoCategoryType;
  user: UserType;
};

export type TodoCategoryType = {
  _id: string;
  name: string;
  description?: string;
  createdAt: Date;
  updatedAt?: Date;
  user?: UserType;
  userId: string;
};

export type TodoFormDataType = {
  name: string;
  description?: string;
  userId: string;
};

export type TodoFormDataReturnType = {
  message: string;
  category: TodoCategoryType;
};
