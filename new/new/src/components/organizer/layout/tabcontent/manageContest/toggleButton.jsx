import React from "react";

const ToggleButton = ({ isOn, toggle }) => (
  <div
    className={`w-12 h-6 flex items-center bg-gray-300 rounded-full p-1 cursor-pointer ${
      isOn ? "bg-green-400" : "bg-gray-400"
    }`}
    onClick={toggle}
  >
    <div
      className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ${
        isOn ? "translate-x-6" : "translate-x-0"
      }`}
    ></div>
  </div>
);

export default ToggleButton;
