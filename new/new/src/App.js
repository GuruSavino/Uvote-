import React from "react";
import { BellIcon, ShareIcon } from "@heroicons/react/24/outline";

export default function Dashboard() {
  return (
    <div className="flex h-screen bg-gray-100" style={{ fontSize: "24px" }}>
      {/* Sidebar */}
      <aside className="w-64 bg-black text-white p-4 flex flex-col">
        <div className="mb-6">
          <div className="w-16 h-16 bg-gray-400 rounded-full mx-auto"></div>
          <h2 className="text-center mt-2">Ghana Students Chemical Society</h2>
        </div>
        <nav className="space-y-2">
          {[
            "Main Dashboard",
            "Standings",
            "Add Contest",
            "Analytics",
            "Get Plaques",
            "Notifications",
            "Marketplace",
          ].map((item, index) => (
            <button
              key={index}
              className="block w-full text-left px-4 py-2 bg-red-500 hover:bg-red-600 rounded"
            >
              {item}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-auto">
        {/* Stats */}
        <div className="flex space-x-4 my-4">
          <div className="bg-purple-500 text-white p-4 rounded shadow w-1/3 text-center">
            <p>Total Events</p>
            <h2 className="text-xl font-bold">2</h2>
          </div>
          <div className="bg-green-500 text-white p-4 rounded shadow w-1/3 text-center">
            <p>Live Contests</p>
            <h2 className="text-xl font-bold">1</h2>
          </div>
          <div className="bg-blue-500 text-white p-4 rounded shadow w-1/3 text-center">
            <p>Live Tickets</p>
            <h2 className="text-xl font-bold">20</h2>
          </div>
        </div>

        {/* Events & Contests */}
        <div>
          <h2 className="text-xl font-bold">Current Events</h2>
          <div className="flex space-x-4 my-2">
            {["Ghana’s Most Beautiful", "Ghana’s Most Beautiful"].map(
              (event, index) => (
                <div key={index} className="bg-white shadow p-4 rounded w-1/3">
                  <p>{event}</p>
                  <button className="mt-2 bg-gray-700 text-white py-1 px-3 rounded">
                    Manage Event
                  </button>
                </div>
              )
            )}
          </div>

          <h2 className="text-xl font-bold mt-4">Previous Events</h2>
          <div className="flex space-x-4 my-2">
            {["Ghana’s Most Beautiful", "Ghana’s Most Beautiful"].map(
              (event, index) => (
                <div key={index} className="bg-white shadow p-4 rounded w-1/3">
                  <p>{event}</p>
                  <button className="mt-2 bg-gray-700 text-white py-1 px-3 rounded">
                    Manage Event
                  </button>
                </div>
              )
            )}
          </div>

          <h2 className="text-xl font-bold mt-4">Current Contests</h2>
          <div className="bg-white shadow p-4 rounded w-1/3">
            <p>Ghana’s Most Beautiful</p>
            <button className="mt-2 bg-gray-700 text-white py-1 px-3 rounded">
              Manage Event
            </button>
          </div>
        </div>

        {/* Ongoing Contests */}
        <div className="mt-4 border-t pt-4">
          <h2 className="text-xl font-bold">Ongoing Contests</h2>
          <div className="bg-white shadow p-4 rounded w-1/3">
            <p>Ghana’s Most Beautiful 2026</p>
            <p>
              40,000 votes | <span className="text-red-500">28 days more</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
