import clsx from "clsx";
import { useState } from "react";
import { TodoCategoryType } from "../lib/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useUser } from "@/app/context/UserContext";
import useCustomToast from "@/hooks/useCustomToast";
import { useTodosContext } from "../context/TodosProvider";
import Modal from "@/app/components/Modal";
import CreateCategoryModal from "./CreateCategoryModal";
import CategoriesList from "./CategoriesList";

const CategoriesSection = ({
  todoCategories,
}: {
  todoCategories: TodoCategoryType[];
}) => {
  const { user } = useUser();
  const queryClient = useQueryClient();
  const [isDeleteCategoryOpen, setIsDeleteCategoryOpen] =
    useState<boolean>(false);
  const [isCreateCategoryOpen, setIsCreateCategoryOpen] =
    useState<boolean>(false);

  const [deleteCategoryId, setDeleteCategoryId] = useState<string | null>(null);
  const [clickedCategoryToEdit, setClickedCategoryToEdit] =
    useState<TodoCategoryType | null>(null);

  const { selectedCategory, setSelectedCategory } = useTodosContext();

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
    <div
      className={clsx(
        "leftPart pt-14 lg:pt-6 bg-slate-400/15 border-r-[1px] border-r-black/20 dark:bg-black/20 hidden md:flex flex-col items-center transition-all duration-300 ease-out w-[150px] lg:w-[200px] xl:w-[250px]"
      )}
    >
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

      {(isCreateCategoryOpen || clickedCategoryToEdit) && (
        <CreateCategoryModal
          onCancelClick={() => {
            setIsCreateCategoryOpen(false);
            setClickedCategoryToEdit(null);
          }}
          initialValues={clickedCategoryToEdit || undefined}
        />
      )}

      <CategoriesList
        todoCategories={todoCategories}
        handleCategoryClick={handleCategoryClick}
        selectedCategory={selectedCategory}
        setIsCreateCategoryOpen={setIsCreateCategoryOpen}
        isDeleteCategoryOpen={isDeleteCategoryOpen}
        setIsDeleteCategoryOpen={setIsDeleteCategoryOpen}
        setClickedCategoryToEdit={setClickedCategoryToEdit}
        setDeleteCategoryId={setDeleteCategoryId}
      />
    </div>
  );
};

export default CategoriesSection;
