import { createContext, useContext, useState } from "react";
import { TodoCategoryType, TodoType } from "@/app/todos/lib/types";

const initialTodosContext: {
  todos: TodoType[];
  setTodos: (todos: TodoType[]) => void;
  categories: TodoCategoryType[];
  setCategories: (categories: TodoCategoryType[]) => void;
  selectedCategory: TodoCategoryType | null;
  setSelectedCategory: (category: TodoCategoryType | null) => void;
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
} = {
  todos: [],
  setTodos: () => {},
  categories: [],
  setCategories: () => {},
  selectedCategory: null,
  setSelectedCategory: () => {},
  selectedDate: new Date(),
  setSelectedDate: () => {},
};

const TodosContext = createContext(initialTodosContext);

const TodosProvider = ({ children }: { children: React.ReactNode }) => {
  const [todos, setTodos] = useState<TodoType[]>([]);
  const [categories, setCategories] = useState<TodoCategoryType[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
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
        selectedDate,
        setSelectedDate,
      }}
    >
      {children}
    </TodosContext.Provider>
  );
};

export const useTodosContext = () => {
  const context = useContext(TodosContext);

  if (!context) {
    throw new Error("useTodosContext must be used within a TodosProvider");
  }
  return context;
};

export default TodosProvider;
