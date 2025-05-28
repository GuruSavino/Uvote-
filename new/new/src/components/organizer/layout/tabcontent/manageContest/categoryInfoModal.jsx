import React from "react";
import ModalWrapper from "../../molecules/modalWrapper";

const CategoryInfoModal = ({ category, onClose }) => {
  return (
    <ModalWrapper onClose={onClose}>
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Category Information</h2>
        <hr className="mb-2" />
        <ul className="space-y-2">
          <li className="text-orange-700">{category.name}</li>
          <li>Contestants: {category.contestants}</li>
          <li>Total Votes: {category.votes}</li>
          <li>Created: {category.createdAt}</li>
        </ul>
        <div className="flex justify-end mt-4">
          <button
            className="text-blue-600 hover:text-red-500 cursor-pointer"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </ModalWrapper>
  );
};

export default CategoryInfoModal;
