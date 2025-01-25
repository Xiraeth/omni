import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import clsx from "clsx";

type DropmenuPropsType = {
  options: string[];
  placeholder: string;
  onSelect: (option: string) => void;
  value: string;
  width?: string;
};

const Dropmenu = ({
  options,
  onSelect,
  placeholder,
  value,
  width = "full",
}: DropmenuPropsType) => {
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
    <div className={`relative w-${width}`} ref={dropdownRef}>
      <div
        className={clsx(
          "font-lato drop-shadow-md border-[1px] rounded-md cursor-pointer transition-all duration-200 min-w-32 w-full md:max-w-72 text-dark dark:text-light",
          {
            "dark:border-amber-400 dark:hover:border-amber-400 border-sky-400 hover:border-sky-400 dark:bg-slate-900 bg-white/80":
              isOpen,
            "hover:border-slate-400/80 dark:hover:border-slate-600/80 dark:border-slate-600 dark:hover:border-slate-500 dark:bg-slate-800 bg-white/60":
              !isOpen,
          }
        )}
        onClick={handleToggleDropdown}
      >
        <div className="h-[48px] flex items-center justify-between px-4">
          <span>{selectedOption || placeholder}</span>
          {isOpen ? (
            <FontAwesomeIcon icon={faChevronUp} width={20} height={20} />
          ) : (
            <FontAwesomeIcon icon={faChevronDown} width={20} height={20} />
          )}
        </div>
      </div>

      {isOpen && (
        <div className="absolute top-[52px] left-0 w-full z-50">
          <div
            className={clsx(
              "bg-white dark:bg-slate-900 border-[1px] border-slate-400/80 dark:border-slate-600 rounded-md overflow-hidden"
            )}
          >
            {options.map((option, index) => {
              const isLast = index === options.length - 1;
              const isFirst = index === 0;

              return (
                <div
                  className={clsx(
                    "cursor-pointer px-4 py-2 hover:bg-slate-200/80 dark:hover:bg-slate-800 text-dark dark:text-light transition-all duration-200",
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
      )}
    </div>
  );
};

export default Dropmenu;
