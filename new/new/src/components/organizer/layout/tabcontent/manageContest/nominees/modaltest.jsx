import { useState } from "react";
import Modal from "../../../molecules/modal";
import AddNomineeModal from "./addNomineeModal";

const SomeComponent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="p-8">
      <button
        onClick={() => setIsModalOpen(true)}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
      >
        Open Modal
      </button>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <AddNomineeModal />
      </Modal>

      {/* Background content to demonstrate transparency */}
      <div className="mt-8 space-y-4">
        <div className="p-4 bg-gray-100 rounded-lg">
          <h3 className="font-medium">Page Content</h3>
          <p>This content will be visible but darkened when modal is open</p>
        </div>
        <div className="p-4 bg-blue-50 rounded-lg">
          <p>More content that remains partially visible behind the modal</p>
        </div>
      </div>
    </div>
  );
};

export default SomeComponent;
