import React from "react";
import ModalWrapper from "../../molecules/modalWrapper";

const CategoryInfoModal = ({ category, onClose }) => {
  return (
    <ModalWrapper onClose={onClose}>
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Category Information</h2>
        <ul className="space-y-2">
          <li>
            <strong>Name:</strong> {category.name}
          </li>
          <li>
            <strong>Contestants:</strong> {category.contestants}
          </li>
          <li>
            <strong>Total Votes:</strong> {category.votes}
          </li>
          <li>
            <strong>Created:</strong> {category.createdAt}
          </li>
        </ul>
        <div className="flex justify-end mt-4">
          <button
            className="text-blue-600 hover:text-blue-800"
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

//// old version without the infomodal wrapper

// import React from "react";

// const CategoryInfoModal = ({ category, onClose }) => {
//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//       <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
//         <h2 className="text-xl font-semibold mb-4">Category Information</h2>
//         <ul className="space-y-2">
//           <li>
//             <strong>Name:</strong> {category.name}
//           </li>
//           <li>
//             <strong>Contestants:</strong> {category.contestants}
//           </li>
//           <li>
//             <strong>Total Votes:</strong> {category.votes}
//           </li>
//           <li>
//             <strong>Created:</strong> {category.createdAt}
//           </li>
//         </ul>
//         <button className="mt-4 text-blue-500" onClick={onClose}>
//           Close
//         </button>
//       </div>
//     </div>
//   );
// };

// export default CategoryInfoModal;
