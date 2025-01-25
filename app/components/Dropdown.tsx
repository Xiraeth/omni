import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import clsx from "clsx";

type DropdownPropsType = {
  options: string[];
  placeholder: string;
  onSelect: (option: string) => void;
  value: string;
};

const Dropdown = ({
  options,
  onSelect,
  placeholder,
  value,
}: DropdownPropsType) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(value);

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
        "grid grid-rows-[auto,0fr] [&.open]:grid-rows-[auto,1fr]",
        "font-lato drop-shadow-md border-[1px] rounded-md cursor-pointer transition-all duration-200 min-w-40 w-full md:max-w-72 text-dark dark:text-light",
        {
          "dark:border-amber-400 dark:hover:border-amber-400 border-sky-400 hover:border-sky-400 dark:bg-buttonBgDark dark:hover:bg-buttonBgDarkHover bg-buttonBgLight hover:bg-buttonBorderLightHover":
            isOpen,
          "hover:border-buttonBorderLightHover dark:border-buttonBorderDark dark:hover:border-buttonBorderDarkHover dark:bg-buttonBgDark bg-buttonBgLight":
            !isOpen,
          open: isOpen,
        }
      )}
      onClick={handleToggleDropdown}
      ref={dropdownRef}
    >
      <div className="h-[48px] flex items-center justify-between px-4">
        <span>{selectedOption || placeholder}</span>
        {isOpen ? (
          <FontAwesomeIcon icon={faChevronUp} width={20} height={20} />
        ) : (
          <FontAwesomeIcon icon={faChevronDown} width={20} height={20} />
        )}
      </div>

      <div className="overflow-hidden">
        <div
          className={clsx(
            "bg-white/80 dark:bg-slate-900 border-t border-slate-400/80 dark:border-slate-600"
          )}
        >
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
      </div>
    </div>
  );
};

export default Dropdown;
