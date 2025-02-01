import { Controller, useForm } from "react-hook-form";
import {
  TodoCategoryType,
  TodoFormDataReturnType,
  TodoFormDataType,
} from "../lib/types";
import FormElement from "@/app/components/FormElement";
import { useUser } from "@/app/context/UserContext";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useCustomToast from "@/hooks/useCustomToast";
import ButtonOuttlined from "@/app/components/ButtonOuttlined";
import Loader from "@/app/components/Loader";

const CategoryForm = ({
  onCancelClick,
  initialValues,
}: {
  onCancelClick: () => void;
  initialValues?: TodoCategoryType;
}) => {
  console.log(initialValues);
  const { user } = useUser();
  const queryClient = useQueryClient();
  const successMessage = initialValues
    ? "Category updated"
    : "Category created";

  const successToast = useCustomToast({
    type: "success",
    message: successMessage,
  });

  const errorToast = useCustomToast({
    type: "error",
  });

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TodoFormDataType>({
    defaultValues: initialValues || { name: "", description: "" },
    mode: "onSubmit",
  });

  // Create mutation
  const { mutate: createCategory, isPending: isCreating } = useMutation({
    mutationFn: async (data: TodoFormDataType) => {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/upsertTodoCategory`,
        data
      );

      if (response.data.error) {
        throw new Error(response.data.error);
      }

      return response.data;
    },
    onSuccess: (data: TodoFormDataReturnType) => {
      queryClient.setQueryData(
        ["todoCategories"],
        (oldData: TodoCategoryType[] | undefined) => {
          return [...(oldData || []), data.category];
        }
      );
      onCancelClick();
      successToast();
    },
    onError: (error: Error) => {
      errorToast(error.message);
    },
  });

  // Update mutation
  const { mutate: updateCategory, isPending: isUpdating } = useMutation({
    mutationFn: async (data: TodoFormDataType) => {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/upsertTodoCategory`,
        data
      );

      if (response.data.error) {
        throw new Error(response.data.error);
      }

      return response.data;
    },
    onSuccess: (data: TodoFormDataReturnType) => {
      queryClient.setQueryData(
        ["todoCategories"],
        (oldData: TodoCategoryType[] | undefined) => {
          if (!oldData) return [data.category];
          return oldData.map((category) =>
            category._id === data.category._id ? data.category : category
          );
        }
      );
      onCancelClick();
      successToast();
    },
    onError: (error: Error) => {
      errorToast(error.message);
    },
  });

  const onSubmit = (data: TodoFormDataType) => {
    const dataToSend = {
      ...data,
      userId: user?.id || "",
      categoryId: initialValues?._id, // Include id for updates
    };

    if (initialValues) {
      updateCategory(dataToSend);
    } else {
      createCategory(dataToSend);
    }
  };

  return isCreating || isUpdating ? (
    <Loader />
  ) : (
    <div className="w-full">
      <p className="text-xl font-bold text-center flex justify-center mb-4">
        {initialValues ? "Edit category" : "Add new category"}
      </p>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 w-full text-sm items-center"
      >
        <Controller
          control={control}
          name="name"
          rules={{ required: "Name is required" }}
          render={({ field: { onChange, value } }) => (
            <div className="flex flex-col items-center w-full">
              <label htmlFor="name" className="text-center xl:text-start">
                Name
              </label>

              <FormElement
                errorMsg={errors?.name?.message}
                width="w-full md:w-10/12"
              >
                <input
                  {...register("name")}
                  id="name"
                  value={value || ""}
                  onChange={(e) => onChange(e.target.value)}
                  className="font-lato drop-shadow-md border-[1px] rounded-md p-2 w-full transition-all duration-200 min-w-32 text-dark dark:text-light hover:border-buttonBorderLightHover dark:border-slate-600 dark:hover:border-slate-500 dark:bg-buttonBgDark bg-buttonBgLight focus:dark:border-amber-400 focus:border-sky-400 focus:dark:bg-buttonBgDarkFocus focus:bg-buttonBgLightFocus outline-none"
                  autoComplete="off"
                />
              </FormElement>
            </div>
          )}
        />

        <Controller
          control={control}
          name="description"
          render={({ field: { onChange, value } }) => (
            <div className="flex flex-col items-center w-full">
              <label
                htmlFor="description"
                className="text-center xl:text-start"
              >
                Description
              </label>

              <FormElement
                errorMsg={errors?.description?.message}
                width="w-full md:w-10/12"
              >
                <input
                  {...register("description")}
                  id="description"
                  value={value || ""}
                  onChange={(e) => onChange(e.target.value)}
                  className="font-lato drop-shadow-md border-[1px] rounded-md p-2 w-full transition-all duration-200 min-w-32 text-dark dark:text-light hover:border-buttonBorderLightHover dark:border-slate-600 dark:hover:border-slate-500 dark:bg-buttonBgDark bg-buttonBgLight focus:dark:border-amber-400 focus:border-sky-400 focus:dark:bg-buttonBgDarkFocus focus:bg-buttonBgLightFocus outline-none"
                  autoComplete="off"
                />
              </FormElement>
            </div>
          )}
        />

        <div className="flex flex-col md:flex-row justify-center w-full gap-4 mt-4 text-xs">
          <ButtonOuttlined text="Cancel" onClick={onCancelClick} />
          <ButtonOuttlined
            text={initialValues ? "Update" : "Create"}
            type="submit"
          />
        </div>
      </form>
    </div>
  );
};

export default CategoryForm;
