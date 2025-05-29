import React from "react";
import {
  ChartBarIcon,
  BuildingStorefrontIcon,
  BellAlertIcon,
  TrophyIcon,
  ChartPieIcon,
  CreditCardIcon,
  BellIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="h-full w-full border-r bg-white flex flex-col items-center py-0">
      <div className="min-w-full m-0">
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
          {
            label: "Dashboard",
            icon: <CreditCardIcon className=" inline size-7 pe-2 m-0" />,
            destination: "/dashboard",
            isActive: true,
          },
          {
            label: "Standings",
            icon: <ChartBarIcon className=" inline size-7 pe-2 m-0" />,
          },
          {
            label: "Add Contest",
            icon: <ChartBarIcon className=" inline size-7 pe-2 m-0" />,
          },
          {
            label: "Analytics",
            icon: <ChartPieIcon className=" inline size-7 pe-2 m-0" />,
          },
          {
            label: "Get Plaques",
            icon: <TrophyIcon className=" inline size-7 pe-2 m-0" />,
          },
          {
            label: "Notifications",
            icon: <BellAlertIcon className=" inline size-7 pe-2 m-0" />,
          },
          {
            label: "Marketplace",
            icon: (
              <BuildingStorefrontIcon className=" inline size-7 pe-2 m-0" />
            ),
          },
        ].map((item, index) => (
          <Link to={item.destination}>
            <div
              key={index}
              className={`py-2 ps-12 text-gray-900 text-left font-semibold border ${
                item.isActive ? "bg-gray-300" : ""
              } border-gray-300 hover:bg-gray-300 cursor-pointer`}
            >
              <span>{item.icon}</span>
              {item.label}
            </div>
          </Link>
        ))}

        {/* Spacer / Fill Bottom */}
        {/* <div className="flex-1 bg-yellow-500 border border-white"></div> */}
      </nav>
    </div>
  );
};

export default Sidebar;
