import clsx from "clsx";

type AmountInputProps = {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
};

const AmountInput = ({ onChange, value }: AmountInputProps) => {
  return (
    <input
      type="number"
      placeholder="&#8364;"
      onChange={onChange}
      value={value}
      className={clsx(
        "outline-none",
        "font-lato",
        "drop-shadow-md",
        "border-[1px]",
        "rounded-md",
        "p-4",
        "h-[48px]",
        "text-center",
        "min-w-16",
        "w-full md:max-w-24",
        "bg-buttonBgLight focus:bg-buttonBgLightFocus",
        "transition-all",
        "duration-200",
        "dark:bg-buttonBgDark focus:dark:bg-buttonBgDarkFocus",
        "text-dark dark:text-light",
        "hover:border-buttonBorderLightHover",
        "dark:hover:border-buttonBorderDarkHover",
        "dark:border-buttonBorderDark",
        "dark:hover:border-buttonBorderDarkHover",
        "focus:outline-none",
        "focus:border-sky-400",
        "dark:focus:border-amber-400",
        "[appearance:textfield]",
        "[&::-webkit-outer-spin-button]:appearance-none",
        "[&::-webkit-inner-spin-button]:appearance-none"
      )}
    />
  );
};

export default AmountInput;
