import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import clsx from "clsx";

type DropdownPropsType = {
  options: string[];
  placeholder: string;
  onSelect: (option: string) => void;
};

const Dropdown = ({ options, onSelect, placeholder }: DropdownPropsType) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

  const [isFocused, setIsFocused] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        isFocused
      ) {
        setIsOpen(false);
        setIsFocused(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  });

  const handleOptionClick = (option: string) => {
    onSelect(option);
    setSelectedOption(option);
    setIsOpen(false);
    setIsFocused(false);
  };

  const handleToggleDropdown = () => {
    setIsOpen(!isOpen);
    setIsFocused(!isFocused);
  };

  return (
    <div
      className={clsx(
        "dropdownContainer",
        "font-lato",
        "drop-shadow-md",
        "border-[1px]",
        "rounded-md",
        "p-4",
        "cursor-pointer",
        "bg-white/80",
        "transition-all",
        "duration-200",
        "relative",
        "min-w-40",
        "dark:bg-slate-900",
        "text-dark dark:text-light",
        {
          "dark:border-amber-400 dark:hover:border-amber-400 border-sky-400 hover:border-sky-400 ":
            isOpen,
          "hover:border-slate-400/80 dark:hover:border-slate-600/80 dark:border-slate-600 dark:hover:border-slate-500":
            !isOpen,
        }
      )}
      onClick={handleToggleDropdown}
      ref={dropdownRef}
    >
      <div className="dropdownButton flex items-center gap-4 justify-between">
        {selectedOption || placeholder}
        {isOpen ? (
          <FontAwesomeIcon icon={faChevronUp} width={20} height={20} />
        ) : (
          <FontAwesomeIcon icon={faChevronDown} width={20} height={20} />
        )}
      </div>
      {isOpen && (
        <div className="dropdownOptions absolute top-[60px] bg-white/80 w-full left-0 rounded-md border-[1px] border-slate-400/80 dark:border-slate-600 dark:bg-slate-900">
          {options.map((option, index) => {
            const isLast = index === options.length - 1;
            const isFirst = index === 0;

            return (
              <div
                className={clsx(
                  "cursor-pointer px-4 py-2 hover:bg-slate-200/80 dark:hover:bg-slate-800 transition-all duration-200",
                  {
                    "rounded-t-md": isFirst,
                    "rounded-b-md": isLast,
                  }
                )}
                key={option}
                onClick={() => handleOptionClick(option)}
              >
                {option}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
