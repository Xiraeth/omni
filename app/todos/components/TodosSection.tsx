import { getDateInfo } from "@/app/common/functions/getTemporalInfo";
import {
  TodoCategoryType,
  TodoSortByType,
  TodoSortOrderType,
  TodoType,
} from "../lib/types";
import Dropmenu from "@/app/components/Dropmenu";
import { useState } from "react";
import { SORT_BY_OPTIONS } from "../lib/constants";
import AddTodoModal from "./UpsertTodoModal";
import { useTodosContext } from "../context/TodosProvider";
import TodosList from "./TodosList";
import { faSort, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getAmountOfTodosColor, handleTodoSort } from "../lib/functions";
import { format, isPast, isToday } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import ButtonOuttlined from "@/app/components/ButtonOuttlined";
import { LucideCalendar, LucideList } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import CategoriesList from "./CategoriesList";
import { Button } from "@/components/ui/button";
import { useUser } from "@/app/context/UserContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useCustomToast from "@/hooks/useCustomToast";
import axios from "axios";
import CreateCategoryModal from "./CreateCategoryModal";
import Modal from "@/app/components/Modal";

const TodosSection = ({ todos }: { todos: TodoType[] }) => {
  const { user } = useUser();
  const queryClient = useQueryClient();

  const [sortBy, setSortBy] = useState<TodoSortByType>(null);
  const [sortOrder, setSortOrder] = useState<TodoSortOrderType>("asc");
  const [isAddTodoOpen, setIsAddTodoOpen] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [isDeleteCategoryOpen, setIsDeleteCategoryOpen] =
    useState<boolean>(false);
  const [isCreateCategoryOpen, setIsCreateCategoryOpen] =
    useState<boolean>(false);

  const [deleteCategoryId, setDeleteCategoryId] = useState<string | null>(null);
  const [clickedCategoryToEdit, setClickedCategoryToEdit] =
    useState<TodoCategoryType | null>(null);

  const {
    categories,
    selectedCategory,
    selectedDate,
    setSelectedDate,
    setSelectedCategory,
  } = useTodosContext();

  const numberOfTasksForSelectedDate = todos.filter((todo) => {
    const { DDMMYYYY: todoDDMMYYYY } = getDateInfo(new Date(todo?.dateFor));
    const { DDMMYYYY: selectedDateDDMMYYYY } = getDateInfo(selectedDate);
    return todoDDMMYYYY === selectedDateDDMMYYYY;
  }).length;

  const isSelectedDateInThePast = isPast(selectedDate);
  const isSelectedDateToday = isToday(selectedDate);

  const todaysDayOfWeek = getDateInfo(new Date()).dayOfWeekShort;
  const todaysDayOfMonth = getDateInfo(new Date()).day;

  const formattedSelectedDate = format(selectedDate, "dd/MM/yyyy");

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

  const amountOfTodosColor = getAmountOfTodosColor(filteredTodos?.length);

  const toggleCalendar = () => {
    setIsCalendarOpen((prev) => !prev);
  };

  const deleteSuccessToast = useCustomToast({
    message: "Category deleted successfully",
    type: "success",
  });

  const deleteErrorToast = useCustomToast({
    type: "error",
  });

  const { mutate: deleteTodoCategoryMutation, isPending: isDeleteInProgress } =
    useMutation({
      mutationFn: async (categoryId: string) => {
        const response = await axios.delete(
          `${process.env.NEXT_PUBLIC_API_URL}/deleteTodoCategory`,
          { data: { categoryId, userId: user?.id } }
        );
        return response.data;
      },
      onSuccess: (data: TodoCategoryType) => {
        setIsDeleteCategoryOpen(false);
        deleteSuccessToast();
        queryClient?.setQueryData(
          ["todoCategories"],
          (oldData: TodoCategoryType[]) => {
            return oldData.filter(
              (category: TodoCategoryType) => category._id !== data._id
            );
          }
        );
      },
      onError: (error: Error) => {
        if (axios.isAxiosError(error)) {
          deleteErrorToast(
            error.response?.data?.error || "Error deleting category"
          );
        } else {
          deleteErrorToast("Error deleting category");
        }
        setIsDeleteCategoryOpen(false);
      },
    });

  const handleDeleteTodoCategory = (id: string) => {
    deleteTodoCategoryMutation(id);
  };

  const handleCategoryClick = (category: TodoCategoryType) => {
    if (selectedCategory?._id === category._id) {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(category);
    }
  };

  return (
    <>
      {isCalendarOpen && (
        <div className="absolute w-screen h-screen bg-black/40 z-50">
          <Calendar
            mode="single"
            selected={selectedDate}
            className="absolute top-4 right-4 z-40 bg-white/80 dark:bg-black/80 backdrop-blur-sm rounded-md p-4"
            footer={
              <ButtonOuttlined
                className="text-xs py-1 w-full mt-2"
                hasPadding={false}
                text="Jump to today"
                onClick={() => {
                  setSelectedDate(new Date());
                  setIsCalendarOpen(false);
                }}
              />
            }
            onSelect={(date) => {
              if (date) {
                setSelectedDate(date);
                setIsCalendarOpen(false);
              }
            }}
          />

          <FontAwesomeIcon
            icon={faXmark}
            className="absolute top-2 right-2 size-4 bg-white dark:bg-black text-dark dark:text-light z-50 rounded-full p-1"
            onClick={toggleCalendar}
          />
        </div>
      )}

      {(isCreateCategoryOpen || clickedCategoryToEdit) && (
        <CreateCategoryModal
          onCancelClick={() => {
            setIsCreateCategoryOpen(false);
            setClickedCategoryToEdit(null);
          }}
          initialValues={clickedCategoryToEdit || undefined}
        />
      )}

      {isDeleteCategoryOpen && (
        <Modal
          width="w-[350px]"
          height="h-[250px]"
          onConfirm={() =>
            deleteCategoryId && handleDeleteTodoCategory(deleteCategoryId)
          }
          isPending={isDeleteInProgress}
          onCancel={() => setIsDeleteCategoryOpen(false)}
          header={isDeleteInProgress ? "" : "Delete Category"}
          text={
            isDeleteInProgress
              ? ""
              : "Are you sure you want to delete this category?"
          }
        />
      )}

      <div className="centerPart pt-6 grow min-w-[300px] flex flex-col items-center">
        {/* modal for adding a new todo */}
        {isAddTodoOpen && (
          <AddTodoModal
            onClose={() => setIsAddTodoOpen(false)}
            todoCategories={categories}
          />
        )}

        {!isCalendarOpen && (
          <div className="ml-auto absolute z-10 top-6 right-6 text-md sm:text-xl md:hidden text-dark dark:text-light">
            <LucideCalendar onClick={toggleCalendar} />
          </div>
        )}

        {/* header */}
        <div className="text-xl w-10/12 lg:w-8/12 mx-auto text-center font-bold flex flex-col lg:flex-row items-center justify-center gap-2 lg:gap-20 border-b-[1px] border-black/15 dark:border-white/15 pb-8 mb-6 md:mb-8">
          <div className="flex flex-row lg:flex-col gap-4 lg:gap-0 justify-center items-center text-teal-600 dark:text-teal-500 md:w-auto w-full">
            <p className="font-bold text-2xl md:text-lg md:ml-0">
              {todaysDayOfWeek}
            </p>
            <p className="font-bold text-xl md:text-3xl">{todaysDayOfMonth}</p>
          </div>
          <p className="text-lg md:text-2xl font-bold">
            You{" "}
            {isSelectedDateToday
              ? "have"
              : isSelectedDateInThePast
              ? "had"
              : "have"}{" "}
            <span className={amountOfTodosColor}>
              {numberOfTasksForSelectedDate === 1
                ? `1 task `
                : `${numberOfTasksForSelectedDate} tasks `}
            </span>
            for {isSelectedDateToday ? "today" : formattedSelectedDate}
          </p>
        </div>

        <Popover open={isCategoriesOpen} onOpenChange={setIsCategoriesOpen}>
          <PopoverTrigger asChild>
            <div className="mb-4 w-10/12 h-8 flex flex-col items-center justify-center md:hidden">
              <Button variant="default" className="w-full">
                <LucideList size={16} />
                Categories
              </Button>

              {selectedCategory && (
                <p className="text-xs italic opacity-90 my-1">
                  <span>Selected category:</span> {selectedCategory.name}
                </p>
              )}
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-80 bg-slate-100/95 dark:bg-slate-800/95 backdrop-blur-sm z-10">
            <CategoriesList
              todoCategories={categories}
              handleCategoryClick={handleCategoryClick}
              selectedCategory={selectedCategory}
              setIsCreateCategoryOpen={setIsCreateCategoryOpen}
              isDeleteCategoryOpen={isDeleteCategoryOpen}
              setIsDeleteCategoryOpen={setIsDeleteCategoryOpen}
              setClickedCategoryToEdit={setClickedCategoryToEdit}
              setDeleteCategoryId={setDeleteCategoryId}
            />
          </PopoverContent>
        </Popover>

        {/* input button for adding a new todo and sorting button */}
        <div className="w-10/12 md:w-8/12 flex flex-row items-center gap-4 mb-4 justify-between">
          <button
            className="bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white px-2 lg:px-4 py-1 rounded-md flex gap-1 items-center drop-shadow-lg transition-colors duration-200 min-w-[90px] lg:min-w-[115px] text-xs lg:text-sm h-[30px] lg:h-[36px]"
            onClick={() => setIsAddTodoOpen(true)}
          >
            <span className="text-xl">+</span>
            New task
          </button>

          <div className="flex gap-2 md:gap-4 items-center">
            <Dropmenu
              options={SORT_BY_OPTIONS}
              placeholder="Sort by"
              onSelect={(option) => {
                setSortBy(option as TodoSortByType);
              }}
              value={sortBy || ""}
              width="w-fit lg:w-28"
              height="h-[30px] lg:h-[36px]"
              className="text-xs lg:text-sm min-w-[90px]"
            />

            <div
              className="size-7 lg:size-8 text-xs lg:text-sm rounded-full flex items-center justify-center text-dark dark:text-light bg-buttonBgLight dark:bg-buttonBgDark border-[1px] dark:border-buttonBorderDark hover:border-buttonBorderLightHover dark:hover:border-buttonBorderDarkHover transition-all duration-200 cursor-pointer active:bg-buttonBgLightFocus dark:active:bg-buttonBgDarkFocus drop-shadow-md"
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
    </>
  );
};

export default TodosSection;
