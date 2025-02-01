import { Loader } from "lucide-react";

const CustomLoader = () => {
  return (
    <div className="flex justify-center items-center fixed inset-0">
      <Loader className="size-8 animate-spin text-dark dark:text-light" />
    </div>
  );
};

export default CustomLoader;
