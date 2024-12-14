import Link from "next/link";

type ColorVariant = "red" | "blue" | "black" | "purple";

interface LinkButtonProps {
  text: string;
  href: string;
  className?: string;
  color: ColorVariant;
}

const LinkButton = ({ text, href, className, color }: LinkButtonProps) => {
  const colorClasses = {
    red: "border-red-500 text-red-500 hover:bg-red-500 active:bg-red-400",
    blue: "border-blue-500 text-blue-500 hover:bg-blue-500 active:bg-blue-400",
    black:
      "border-black text-black hover:bg-black dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-black active:bg-slate-700 active:text-white",
    purple:
      "border-purple-500 text-purple-500 hover:bg-purple-500 active:bg-purple-400",
  };

  return (
    <Link
      href={href}
      className={`border-2 rounded-md w-32 text-center hover:text-white py-2 px-4 text-md transition-all duration-200 drop-shadow-lg shadow-black ${
        colorClasses[color]
      } ${className ?? ""}`}
    >
      {text}
    </Link>
  );
};

export default LinkButton;
