import clsx from "clsx";

type DateInputProps = {
  /**
   * Callback function triggered when the date value changes
   * @param value - The selected date value as string
   */
  onChange?: (value: string) => void;
  /**
   * Optional default value for the date input
   */
  defaultValue?: string;
};

const DateInput = ({ onChange, defaultValue }: DateInputProps) => {
  return (
    <input
      type="date"
      defaultValue={defaultValue}
      className={clsx(
        "outline-none",
        "font-lato",
        "drop-shadow-md",
        "border-[1px]",
        "rounded-md",
        "p-4",
        "text-center",
        "min-w-40", // Slightly wider to accommodate date format
        "max-w-48",
        "bg-white/80",
        "transition-all",
        "duration-200",
        "dark:bg-slate-900",
        "text-dark dark:text-light",
        "hover:border-slate-400/80",
        "dark:hover:border-slate-600/80",
        "dark:border-slate-600",
        "dark:hover:border-slate-500",
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
      onChange={(e) => onChange?.(e.target.value)}
    />
  );
};

export default DateInput;
