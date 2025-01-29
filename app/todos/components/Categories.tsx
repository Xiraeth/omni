import CreateCategoryForm from "./CreateCategoryForm";

import clsx from "clsx";
import DeleteCategoryModal from "./DeleteCategoryModal";
import { useState } from "react";
import { TodoCategoryType } from "../types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useUser } from "@/app/context/UserContext";
import useCustomToast from "@/hooks/useCustomToast";
import { useTodos } from "../context/TodosProvider";

const Categories = ({
  todoCategories,
}: {
  todoCategories: TodoCategoryType[];
}) => {
  const { user } = useUser();
  const queryClient = useQueryClient();
  const [isDeleteCategoryOpen, setIsDeleteCategoryOpen] = useState(false);
  const [isCreateCategoryOpen, setIsCreateCategoryOpen] = useState(false);

  const { selectedCategory, setSelectedCategory } = useTodos();

  const deleteSuccessToast = useCustomToast({
    message: "Category deleted successfully",
    type: "success",
  });

  const deleteTodoCategoryMutation = useMutation({
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
  });

  const handleDeleteTodoCategory = (categoryId: string) => {
    deleteTodoCategoryMutation.mutate(categoryId);
  };

  return (
    <div
      className={clsx(
        "leftPart pt-6 bg-slate-400/10 dark:bg-black/20 flex flex-col items-center transition-all duration-300 ease-out w-[150px] lg:w-[200px] xl:w-[250px]"
      )}
    >
      {isDeleteCategoryOpen && (
        <DeleteCategoryModal
          onYesClick={() =>
            handleDeleteTodoCategory(selectedCategory?._id || "")
          }
          onNoClick={() => setIsDeleteCategoryOpen(false)}
        />
      )}
      <div className="w-full flex flex-col">
        <p className="text-xl font-bold mx-auto mb-6 pb-4 border-b-[1px] border-b-black/15 w-8/12 text-center">
          Categories
        </p>
        <div className="mb-2 flex flex-col gap-4 px-8">
          {todoCategories?.map((category: TodoCategoryType) => (
            <div
              onClick={() => setSelectedCategory(category)}
              key={category._id}
              className={clsx(
                "flex justify-between items-center rounded-md px-4 py-2 hover:bg-slate-200/60 transition-colors duration-200 cursor-pointer dark:hover:bg-black/30",
                selectedCategory?._id === category._id &&
                  "border-[1px] border-sky-400 dark:border-amber-400 bg-slate-200/60 dark:bg-black/30",
                selectedCategory?._id !== category._id &&
                  "bg-slate-200/10 dark:bg-black/20"
              )}
            >
              <p className="font-montserrat text-lg">{category.name}</p>
              <p
                onClick={() => setIsDeleteCategoryOpen(true)}
                className="text-xl text-dark dark:text-light hover:text-red-500 cursor-pointer dark:hover:text-red-500 font-bold font-montserrat transition-colors duration-200"
              >
                x
              </p>
            </div>
          ))}
        </div>
        {!isCreateCategoryOpen && (
          <p
            onClick={() => setIsCreateCategoryOpen(true)}
            className={clsx(
              "opacity-70 lg:text-base text-sm cursor-pointer py-2 w-full flex items-center gap-1 justify-center hover:opacity-50 transition-opacity duration-200 relative",
              isDeleteCategoryOpen ? "-z-10" : "z-100"
            )}
          >
            <span className="lg:text-2xl text-base">+</span> New category
          </p>
        )}
        {isCreateCategoryOpen && (
          <CreateCategoryForm
            onCancelClick={() => setIsCreateCategoryOpen(false)}
          />
        )}
      </div>
    </div>
  );
};

export default Categories;
