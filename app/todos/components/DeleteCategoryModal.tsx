import ButtonOuttline from "@/app/components/ButtonOuttline";

const DeleteCategoryModal = ({
  onYesClick,
  onNoClick,
}: {
  onYesClick: () => void;
  onNoClick: () => void;
}) => {
  return (
    <div className="fixed inset-0 z-100 bg-black/50 flex justify-center items-center backdrop-blur-sm">
      <div className="bg-white dark:bg-black/20 px-4 py-6 rounded-md flex flex-col items-center justify-center gap-4 text-dark dark:text-light">
        <h1 className="text-2xl font-bold text-red-500">Delete Category</h1>
        <p className="text-sm">
          Are you sure you want to delete this category?
        </p>
        <div className="flex justify-center gap-2 w-full">
          <ButtonOuttline text="Yes" onClick={onYesClick} className="w-1/3" />
          <ButtonOuttline text="No" onClick={onNoClick} className="w-1/3" />
        </div>
      </div>
    </div>
  );
};

export default DeleteCategoryModal;
