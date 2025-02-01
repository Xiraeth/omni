import { getDateInfo } from "@/app/common/functions/getTemporalInfo";
import { TodoSortByType, TodoSortOrderType, TodoType } from "../lib/types";
import Dropmenu from "@/app/components/Dropmenu";
import { useState } from "react";
import { SORT_BY_OPTIONS } from "../lib/constants";
import AddTodoModal from "./UpsertTodoModal";
import { useTodosContext } from "../context/TodosProvider";
import TodosList from "./TodosList";
import { faSort } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { handleTodoSort } from "../lib/functions";

const TodosSection = ({ todos }: { todos: TodoType[] }) => {
  const { day: todaysDay, dayOfWeekShort: todaysDayOfWeekShort } = getDateInfo(
    new Date()
  );

  const [sortBy, setSortBy] = useState<TodoSortByType>(null);
  const [sortOrder, setSortOrder] = useState<TodoSortOrderType>("asc");
  const [isAddTodoOpen, setIsAddTodoOpen] = useState(false);

  const { categories, selectedCategory, selectedDate } = useTodosContext();

  const numberOfTasksForToday = todos.filter((todo) => {
    const { DDMMYYYY: todoDDMMYYYY } = getDateInfo(new Date(todo?.dateFor));
    const { DDMMYYYY: todaysDDMMYYYY } = getDateInfo(new Date());
    return todoDDMMYYYY === todaysDDMMYYYY;
  }).length;

  const sortedTodos = handleTodoSort(todos, sortBy || "time", sortOrder);

  const filteredTodos = sortedTodos
    .filter((todo) => {
      const { DDMMYYYY: todoDDMMYYYY } = getDateInfo(new Date(todo?.dateFor));
      const { DDMMYYYY: selectedDateDDMMYYYY } = getDateInfo(selectedDate);
      return todoDDMMYYYY === selectedDateDDMMYYYY;
    })
    ?.filter((todo) => {
      if (selectedCategory) {
        return todo?.category?._id === selectedCategory?._id;
      }
      return true;
    });

  const isCategoryEmpty =
    Boolean(selectedCategory) && filteredTodos?.length === 0;

  return (
    <div className="centerPart pt-6 grow min-w-[300px] flex flex-col items-center">
      {/* modal for adding a new todo */}
      {isAddTodoOpen && (
        <AddTodoModal
          onClose={() => setIsAddTodoOpen(false)}
          todoCategories={categories}
        />
      )}

      {/* header */}
      <div className="text-xl w-10/12 lg:w-8/12 mx-auto text-center font-bold flex flex-col lg:flex-row items-center justify-center gap-2 lg:gap-6 border-b-[1px] border-black/15 dark:border-white/15 pb-8 mb-8">
        <div className="flex flex-row lg:flex-col gap-4 lg:gap-0 justify-center items-center">
          <p className="font-bold text-sm lg:text-lg">{todaysDayOfWeekShort}</p>
          <p className="font-bold text-lg lg:text-3xl">{todaysDay}</p>
        </div>
        <p className="text-lg lg:text-2xl font-bold">
          You have{" "}
          {numberOfTasksForToday === 1
            ? `1 task `
            : `${numberOfTasksForToday} tasks `}
          for today
        </p>
      </div>

      {/* input button for adding a new todo and sorting button */}
      <div className="w-8/12 flex flex-row items-center gap-4 mb-4 justify-between">
        <button
          className="bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white px-2 lg:px-4 py-1 rounded-md flex gap-1 items-center drop-shadow-lg transition-colors duration-200 min-w-[90px] lg:min-w-[115px] text-xs lg:text-sm h-[30px] lg:h-[36px]"
          onClick={() => setIsAddTodoOpen(true)}
        >
          <span className="text-xl">+</span>
          New task
        </button>

        <div className="flex gap-4 items-center">
          <Dropmenu
            options={SORT_BY_OPTIONS}
            placeholder="Sort by"
            onSelect={(option) => {
              setSortBy(option as TodoSortByType);
            }}
            value={sortBy || ""}
            width="w-20 lg:w-28"
            height="h-[30px] lg:h-[36px]"
            className="text-xs lg:text-sm"
          />

          <div
            className="size-6 lg:size-8 text-xs lg:text-sm rounded-full flex items-center justify-center text-dark dark:text-light bg-buttonBgLight dark:bg-buttonBgDark border-[1px] dark:border-buttonBorderDark hover:border-buttonBorderLightHover dark:hover:border-buttonBorderDarkHover transition-all duration-200 cursor-pointer active:bg-buttonBgLightFocus dark:active:bg-buttonBgDarkFocus drop-shadow-md"
            onClick={() =>
              setSortOrder((sortOrder) =>
                sortOrder === "asc" ? "desc" : "asc"
              )
            }
          >
            <FontAwesomeIcon icon={faSort} />
          </div>
        </div>
      </div>

      {/* list of todos */}
      <TodosList
        todos={isCategoryEmpty ? [] : filteredTodos}
        categories={categories}
      />
    </div>
  );
};

export default TodosSection;
