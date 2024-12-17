import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const NavbarButton = ({
  text,
  onClick,
  icon,
  className = "cursor-pointer",
  isDropdown,
  mt = 0,
}: {
  text: string;
  onClick?: () => void;
  icon: IconProp;
  className?: string;
  isDropdown?: boolean;
  mt?: number;
}) => {
  return (
    <button
      onClick={onClick}
      className={`w-full flex gap-2 items-center justify-start px-2 py-1 mt-${mt} rounded-lg hover:bg-slate-200/80 font-lato text-sm sm:text-base dark:hover:bg-slate-600/80 transition-[background-color] duration-200 ${className}`}
    >
      <div className="w-4 h-4 flex items-center justify-center transition-transform duration-200">
        <FontAwesomeIcon icon={icon} className="w-full h-full" />
      </div>
      {text}
      {isDropdown && (
        <FontAwesomeIcon
          icon={faChevronDown}
          className="w-4 h-4 ml-auto arrow-icon transition-transform duration-200"
        />
      )}
    </button>
  );
};

export default NavbarButton;
