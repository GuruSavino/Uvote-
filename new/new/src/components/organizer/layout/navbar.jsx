import React from "react";
import { ArrowUturnLeftIcon } from "@heroicons/react/24/outline";

const Navbar = () => {
  return (
    <nav className="w-full h-[7lvh] bg-gradient-to-r from-lime-600 via-orange-500 to-red-500 px-12 py-2 flex justify-between items-center text-white shadow-md">
      {/* <nav className="w-full h-[7lvh] bg-indigo-600 px-6 py-2 flex justify-between items-center text-white shadow-md"> */}
      <div className="font-bold text-lg">
        <span className="text-white uppercase text-2xl">Votive</span>
      </div>

      <div className="md:flex gap-6">
        <div className="cursor-pointer">
          <span>ADMININISTRATOR</span>
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
