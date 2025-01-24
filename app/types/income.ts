export type IncomeFormDataType = {
  name: string;
  amount: string;
  date: string;
  category: string;
  userId: string;
};

export type IncomeFormErrorsType = {
  [key: string]: string;
};

export type IncomeDataType = {
  id: string;
  name: string;
  amount: number;
  date: string;
  category: string;
  userId: string;
};
