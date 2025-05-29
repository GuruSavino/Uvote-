import React from "react";
import ModalWrapper from "../../molecules/modalWrapper";

const AddCategoryForm = ({ onClose }) => {
  return (
    <ModalWrapper onClose={onClose}>
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Add New Category</h2>
        <form className="space-y-4">
          <input
            className="w-full border border-gray-300 p-2 rounded"
            placeholder="Category Name"
          />
          <input
            className="w-full border border-gray-300 p-2 rounded"
            placeholder="Number of Contestants"
            type="number"
          />
          <input
            className="w-full border border-gray-300 p-2 rounded"
            placeholder="Category Description"
          />
          <div className="flex justify-end space-x-4">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Submit
            </button>
            <button
              type="button"
              onClick={onClose}
              className="text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </ModalWrapper>
  );
};

export default AddCategoryForm;
