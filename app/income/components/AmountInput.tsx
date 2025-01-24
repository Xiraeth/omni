import clsx from "clsx";

type AmountInputProps = {
  onChange?: (value: string) => void;
};

const AmountInput = ({ onChange }: AmountInputProps) => {
  return (
    <input
      type="number"
      className={clsx(
        "outline-none",
        "font-lato",
        "drop-shadow-md",
        "border-[1px]",
        "rounded-md",
        "p-4",
        "text-center",
        "min-w-16",
        "max-w-32",
        "bg-white/80",
        "transition-all",
        "duration-200",
        "dark:bg-slate-800 focus:dark:bg-slate-900",
        "text-dark dark:text-light",
        "hover:border-slate-400/80",
        "dark:hover:border-slate-600/80",
        "dark:border-slate-600",
        "dark:hover:border-slate-500",
        "focus:outline-none",
        "focus:border-sky-400",
        "dark:focus:border-amber-400",
        "[appearance:textfield]",
        "[&::-webkit-outer-spin-button]:appearance-none",
        "[&::-webkit-inner-spin-button]:appearance-none"
      )}
      placeholder="&#8364;"
      onChange={(e) => onChange?.(e.target.value)}
    />
  );
};

export default AmountInput;
