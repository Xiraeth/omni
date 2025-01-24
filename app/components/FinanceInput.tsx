interface FinanceInputProps {
  placeholder: string;
}

const FinanceInput = (inputProps: FinanceInputProps) => {
  return (
    <input
      className="outline-none bg-transparent w-10/12 border-b-[1px] border-b-black/50 dark:border-b-background-light px-4 py-2 transition-all duration-150 text-dark dark:text-light font-montserrat"
      placeholder={inputProps.placeholder}
    />
  );
};

export default FinanceInput;
