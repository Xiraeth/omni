import clsx from "clsx";

type DateInputProps = {
  /**
   * Callback function triggered when the date value changes
   * @param value - The selected date value as string
   */
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  /**
   * Optional default value for the date input
   */
  value: string;
};

const DateInput = ({ onChange, value }: DateInputProps) => {
  return (
    <input
      type="date"
      value={value}
      onChange={onChange}
      className={clsx(
        "outline-none",
        "font-lato",
        "drop-shadow-md",
        "border-[1px]",
        "rounded-md",
        "p-4",
        "text-center",
        "min-w-40",
        "w-full md:max-w-60",
        "h-[48px]",
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
        // Date input specific styles
        "[&::-webkit-calendar-picker-indicator]:dark:filter",
        "[&::-webkit-calendar-picker-indicator]:dark:invert",
        "[&::-webkit-calendar-picker-indicator]:cursor-pointer",
        "[&::-webkit-calendar-picker-indicator]:opacity-70",
        "[&::-webkit-calendar-picker-indicator]:hover:opacity-100"
      )}
    />
  );
};

export default DateInput;
