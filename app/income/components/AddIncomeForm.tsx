import { Controller } from "react-hook-form";
import { IncomeDataType, IncomeFormDataType } from "../types";
import { useForm } from "react-hook-form";
import FormElement from "@/app/components/FormElement";
import NameInput from "../../components/NameInput";
import AmountInput from "../../components/AmountInput";
import DateInput from "../../components/DateInput";
import GenericButton from "@/app/components/GenericButton";
import useCustomToast from "@/hooks/useCustomToast";
import { INCOME_CATEGORIES } from "@/app/constants/constants";
import Dropmenu from "@/app/components/Dropmenu";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useUser } from "@/app/context/UserContext";

const AddIncomeForm = () => {
  const { user } = useUser();
  const queryClient = useQueryClient();
  const successToast = useCustomToast({
    message: "Income added successfully",
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
    setError,
    setValue,
  } = useForm<IncomeFormDataType>({
    mode: "onSubmit",
    defaultValues: {
      name: "",
      amount: "",
      date: "",
      category: undefined,
      userId: "",
    },
  });

  const { mutate: createIncome } = useMutation({
    mutationFn: async (data: IncomeFormDataType) => {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/income`,
        data
      );
      if (response?.data?.error) {
        throw new Error(response.data.error);
      }
      return response.data.income;
    },
    onSuccess: (data) => {
      setValue("name", "");
      setValue("amount", "");
      setValue("date", "");
      setValue("category", undefined);
      queryClient.setQueryData(["incomeData"], (oldData: IncomeDataType[]) => {
        return [...oldData, data];
      });
      successToast();
    },
    onError: (error: Error) => {
      setError("root", { message: error.message });
    },
  });

  const onSubmit = async (data: IncomeFormDataType) => {
    const dataToSubmit = {
      ...data,
      userId: user?.id || "",
    };

    if (Object.keys(errors).length === 0) {
      createIncome(dataToSubmit);
    }
  };

  return (
    <form
      id="add-income-row"
      onSubmit={handleSubmit(onSubmit)}
      className="w-10/12 py-4 pb-16 mx-auto flex flex-col lg:flex-row items-center md:items-start mt-20 gap-4 relative z-10"
    >
      <div className="lg:w-1/2 w-full">
        <Controller
          control={control}
          name="name"
          rules={{
            required: "Name is required",
          }}
          render={({ field: { onChange, value } }) => (
            <FormElement errorMsg={errors?.name?.message}>
              <NameInput
                onChange={(e) => onChange(e.target.value)}
                value={value}
              />
            </FormElement>
          )}
        />
      </div>

      <div className="flex gap-4 md:flex-row flex-col w-full lg:justify-end">
        <Controller
          control={control}
          name="category"
          rules={{
            required: "Category is required",
          }}
          render={({ field: { onChange, value } }) => (
            <FormElement errorMsg={errors?.category?.message}>
              <Dropmenu
                options={INCOME_CATEGORIES}
                placeholder="Category"
                value={value || ""}
                width="w-full"
                onSelect={(option) => onChange(option)}
              />
            </FormElement>
          )}
        />

        <Controller
          control={control}
          name="amount"
          rules={{
            required: "Amount is required",
          }}
          render={({ field: { onChange, value } }) => (
            <FormElement errorMsg={errors?.amount?.message}>
              <AmountInput
                onChange={(e) => onChange(Number(e.target.value))}
                value={value}
              />
            </FormElement>
          )}
        />

        <Controller
          control={control}
          name="date"
          rules={{
            required: "Date is required",
          }}
          render={({ field: { onChange, value } }) => (
            <FormElement errorMsg={errors?.date?.message}>
              <DateInput
                onChange={(e) => onChange(e.target.value)}
                value={value}
              />
            </FormElement>
          )}
        />
        <GenericButton text="Add income" width="md" />
      </div>
    </form>
  );
};

export default AddIncomeForm;
