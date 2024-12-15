const Button = ({
  text,
  onClick,
  color,
}: {
  text: string;
  onClick: () => void;
  color: string;
}) => {
  const buttonClasses = [
    "px-2 py-1 bg-transparent hover:bg-white/20 rounded-md transition-all duration-200 cursor-pointer",
    `text-${color}-500`,
  ];

  const buttonClass = buttonClasses.join(" ");

  return (
    <button onClick={onClick} className={buttonClass}>
      {text}
    </button>
  );
};

export default Button;
