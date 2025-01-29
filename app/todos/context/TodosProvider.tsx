import { createContext, useContext, useState } from "react";
import { TodoCategoryType, TodoType } from "@/app/todos/types";

const initialTodosContext: {
  todos: TodoType[];
  setTodos: (todos: TodoType[]) => void;
  categories: TodoCategoryType[];
  setCategories: (categories: TodoCategoryType[]) => void;
  selectedCategory: TodoCategoryType | null;
  setSelectedCategory: (category: TodoCategoryType | null) => void;
} = {
  todos: [],
  setTodos: () => {},
  categories: [],
  setCategories: () => {},
  selectedCategory: null,
  setSelectedCategory: () => {},
};

const TodosContext = createContext(initialTodosContext);

const TodosProvider = ({ children }: { children: React.ReactNode }) => {
  const [todos, setTodos] = useState<TodoType[]>([]);
  const [categories, setCategories] = useState<TodoCategoryType[]>([]);
  const [selectedCategory, setSelectedCategory] =
    useState<TodoCategoryType | null>(null);

  return (
    <TodosContext.Provider
      value={{
        todos,
        setTodos,
        categories,
        setCategories,
        selectedCategory,
        setSelectedCategory,
      }}
    >
      {children}
    </TodosContext.Provider>
  );
};

export const useTodos = () => {
  const context = useContext(TodosContext);

  if (!context) {
    throw new Error("useTodos must be used within a TodosProvider");
  }
  return context;
};

export default TodosProvider;
