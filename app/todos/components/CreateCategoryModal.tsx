import Modal from "@/app/components/Modal";
import CategoryForm from "./CategoryForm";
import { TodoCategoryType } from "../lib/types";

const CreateCategoryModal = ({
  onCancelClick,
  initialValues,
}: {
  onCancelClick: () => void;
  initialValues?: TodoCategoryType;
}) => {
  return (
    <Modal
      width="w-[350px] md:w-[450px]"
      height="h-[330px]"
      onCancel={onCancelClick}
    >
      <CategoryForm
        onCancelClick={onCancelClick}
        initialValues={initialValues}
      />
    </Modal>
  );
};

export default CreateCategoryModal;
