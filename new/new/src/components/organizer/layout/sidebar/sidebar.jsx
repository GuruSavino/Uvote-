import React from "react";

const Sidebar = () => {
  return (
    <div className="h-full w-full bg-yellow-700 flex flex-col items-center py-0">
      <div className="bg-white min-w-full m-0">
        {/* Profile Circle */}
        <div className="w-20 h-20 bg-gray-500 rounded-full m-auto my-2"></div>

        {/* Society Name */}
        <h1 className="text-center text-md font-semibold px-2 mb-6">
          Ghana Students <br /> Chemical Society
        </h1>
      </div>

      {/* Navigation Links */}
      <nav className="flex flex-col w-full">
        {[
          { label: "Main Dashboard", bg: "bg-yellow-700" },
          { label: "Standings", bg: "bg-lime-800" },
          { label: "Add Contest", bg: "bg-lime-800" },
          { label: "Analytics", bg: "bg-lime-800" },
          { label: "Get Plaques", bg: "bg-lime-800" },
          { label: "Notifications", bg: "bg-lime-800" },
          { label: "Marketplace", bg: "bg-lime-800" },
        ].map((item, index) => (
          <div
            key={index}
            className={`w-full py-2 px-4 text-white text-center font-semibold border border-white ${item.bg}`}
          >
            {item.label}
          </div>
        ))}

        {/* Spacer / Fill Bottom */}
        <div className="flex-1 bg-yellow-500 border border-white"></div>
      </nav>
    </div>
  );
};

export default Sidebar;
