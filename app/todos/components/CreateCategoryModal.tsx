import Modal from "@/app/components/Modal";
import CreateCategoryForm from "./CreateCategoryForm";

const CreateCategoryModal = ({
  onCancelClick,
}: {
  onCancelClick: () => void;
}) => {
  return (
    <Modal width="w-[350px]" height="h-[330px]" onCancel={onCancelClick}>
      <p className="text-xl font-bold">Add new category</p>
      <CreateCategoryForm onCancelClick={onCancelClick} />
    </Modal>
  );
};

export default CreateCategoryModal;
