import clsx from "clsx";

const ButtonOuttlined = ({
  text,
  onClick,
  type = "button",
  className,
}: {
  text: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
}) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className={clsx(
        "px-4 py-2 bg-transparent border-[1px] border-dark rounded-md hover:bg-dark hover:text-white dark:border-white/30 dark:hover:bg-light dark:hover:text-dark transition-colors duration-150 shadow-md",
        className
      )}
    >
      {text}
    </button>
  );
};

export default ButtonOuttlined;
