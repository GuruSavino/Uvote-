import React from "react";

const CategoryCard = ({ category, onInfoClick }) => {
  return (
    <div className="border rounded-2xl p-4 flex flex-col items-center justify-between bg-white shadow-md">
      <p className="font-bold text-center">GENTLEMAN OF THE YEAR</p>
      <div className="text-center font-semibold my-2">
        N - {category.contestants}
      </div>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={() => onInfoClick(category)}
      >
        Category Info
      </button>
    </div>
  );
};

export default CategoryCard;
