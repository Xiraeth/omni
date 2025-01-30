import { UserType } from "@/app/common/types";

export type TodoSortByType = "time" | "priority";

export type TodoPriorityType = "low" | "medium" | "high";

export type TodoType = {
  _id: string;
  title: string;
  description?: string;
  completed: boolean;
  priority: TodoPriorityType;
  dateFor: string;
  timeFor?: string;
  createdAt: Date;
  updatedAt?: Date;
  category: {
    _id: string;
    name: string;
  };
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

export type UpsertTodoFormDataType = {
  _id?: string;
  title: string;
  description?: string;
  dateFor: string;
  timeFor?: string;
  priority: TodoPriorityType;
  category: string;
};

export type UpsertTodoReturnType = {
  todo: TodoType;
};

export type UpdateCheckedTodoDataType = {
  todoId: string;
  completed?: boolean;
  title?: string;
  description?: string;
  dateFor?: string;
  timeFor?: string;
  priority?: string;
};

export type UpdateCheckedTodoReturnType = {
  message: string;
  todo: TodoType;
};

export type DeleteTodoDataType = {
  todoId: string;
  userId: string;
};

export type DeleteTodoReturnType = {
  message: string;
  todo: TodoType;
};
