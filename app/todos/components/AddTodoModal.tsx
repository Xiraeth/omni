import ButtonOuttline from "@/app/components/ButtonOuttline";
import Modal from "@/app/components/Modal";

const AddTodoModal = ({
  isOpen,
  onClose,
  onAddTodo,
}: {
  isOpen: boolean;
  onClose: () => void;
  onAddTodo: () => void;
}) => {
  return (
    <Modal onCancel={onClose}>
      <p>Add new category</p>
    </Modal>
  );
};

export default AddTodoModal;
