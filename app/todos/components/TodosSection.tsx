import { getDateInfo } from "@/app/common/functions/getDateInfo";
import { TodoSortByType, TodoType } from "../types";
import Dropmenu from "@/app/components/Dropmenu";
import { useState } from "react";
import { SORT_BY_OPTIONS } from "../constants";
import AddTodoModal from "./AddTodoModal";
import { useTodos } from "../context/TodosProvider";

const TodosSection = ({ todos }: { todos: TodoType[] }) => {
  const { day: todaysDay, dayOfWeekShort: todaysDayOfWeekShort } = getDateInfo(
    new Date()
  );

  const [sortBy, setSortBy] = useState<TodoSortByType>("time");
  const [isAddTodoOpen, setIsAddTodoOpen] = useState(false);

  const { categories } = useTodos();

  const numberOfTasksForToday = todos.filter((todo) => {
    const { DDMMYYYY: todoDDMMYYYY } = getDateInfo(new Date(todo?.dateFor));
    const { DDMMYYYY: todaysDDMMYYYY } = getDateInfo(new Date());
    return todoDDMMYYYY === todaysDDMMYYYY;
  }).length;

  return (
    <div className="centerPart pt-6 grow flex flex-col items-center">
      {isAddTodoOpen && (
        <AddTodoModal
          onClose={() => setIsAddTodoOpen(false)}
          todoCategories={categories}
        />
      )}
      <div className="text-xl w-8/12 mx-auto text-center font-bold flex items-center justify-center gap-6 border-b-[1px] border-black/15 dark:border-white/15 pb-8 mb-8">
        <div className="text-sm flex flex-col justify-center items-center">
          <p className="font-bold text-lg">{todaysDayOfWeekShort}</p>
          <p className="font-bold text-3xl">{todaysDay}</p>
        </div>
        <p className="text-2xl font-bold">
          You have{" "}
          {numberOfTasksForToday === 1
            ? `1 task `
            : `${numberOfTasksForToday} tasks `}
          for today
        </p>
      </div>

      {/* placeholder for input for adding a new todo */}
      <div className="w-8/12 flex items-center gap-4 mb-4">
        <button
          className="bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white px-4 py-1 rounded-md text-sm flex gap-1 items-center drop-shadow-lg transition-colors duration-200 h-[36px]"
          onClick={() => setIsAddTodoOpen(true)}
        >
          <span className="text-xl">+</span>
          New task
        </button>

        <Dropmenu
          options={SORT_BY_OPTIONS}
          placeholder={sortBy}
          onSelect={(option) => {
            setSortBy(option as TodoSortByType);
          }}
          value={sortBy}
          height="h-[36px]"
        />
      </div>

      {/* placeholder for list of todos */}
      <div className="flex flex-col gap-4 w-8/12">
        {todos.map((todo) => {
          return (
            <div key={todo._id} className="p-2 bg-white/10 rounded-md w-full">
              <p className="text-base font-roboto font-bold">{todo.title}</p>
              <p className="text-sm font-geistSans">{todo.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TodosSection;
