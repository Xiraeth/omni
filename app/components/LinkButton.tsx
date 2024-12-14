import Link from "next/link";

const LinkButton = ({
  text,
  href,
  className,
}: {
  text: string;
  href: string;
  className?: string;
}) => {
  return (
    <Link
      href={href}
      className={`border-2 border-blue-500 rounded-md hover:bg-blue-500 hover:text-white py-2 px-4 text-blue-500 text-lg  transition-all duration-100 dark:text-blue-400 dark:hover:text-white drop-shadow-lg shadow-black ${className}`}
    >
      {text}
    </Link>
  );
};

export default LinkButton;
