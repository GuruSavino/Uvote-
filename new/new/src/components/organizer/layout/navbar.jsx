import React from "react";

const Navbar = () => {
  return (
    <nav className="w-full h-[7lvh] bg-gradient-to-r from-lime-600 via-orange-500 to-red-500 px-6 py-2 flex justify-between items-center text-white shadow-md">
      <div className="font-bold text-lg">
        <span className="text-white">Uvote.com</span>
      </div>

      <div className="hidden md:flex gap-6 text-sm">
        <div className="relative group cursor-pointer">
          <span>File ▾</span>
          {/* Add dropdown content here if needed */}
        </div>
        <div className="relative group cursor-pointer">
          <span>Menu ▾</span>
        </div>
        <div className="relative group cursor-pointer">
          <span>Settings ▾</span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
        <span className="text-sm">Admin (GSCS)</span>
      </div>
    </nav>
  );
};

export default Navbar;
