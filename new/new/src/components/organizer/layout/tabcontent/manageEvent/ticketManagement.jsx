import React, { useState } from "react";
//import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";

// Register chart elements
ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

export default function TicketTabcontent() {
  const chartData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Votes Over Time",
        data: [100, 200, 150, 300, 250, 400, 500],
        fill: false,
        borderColor: "#7C3AED", // purple
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
  };

  return (
    <div className="w-full bg-gray-100 p-4 rounded shadow-md">
      {/* Active Tab Content */}

      <div className="space-y-4 p-4 rounded-b bg-white">
        {/* Contest Info */}
        <div className="space-y-2 text-sm">
          <div>
            <strong>Contest :</strong>{" "}
            <span className="font-bold">GSCS Awards Night - Tickets</span>
            <span className="ml-6 font-semibold">Ticketing Status :</span>{" "}
            <span className="inline-block bg-green-500 text-white px-2 py-1 rounded text-xs">
              LIVE
            </span>
            <span className="ml-6 font-semibold">Deadline :</span>{" "}
            <span className="text-red-600 font-bold">Dec 8, 2024</span>
          </div>
          <div>
            <span className="font-semibold">Total Votes:</span>{" "}
            <span className="text-blue-600 font-bold">500</span>
            <span className="ml-4 font-semibold">General Link:</span>{" "}
            <span className="text-gray-700">www.uvote.com/gmb</span>
            <button className="ml-2 bg-gray-300 text-xs px-2 rounded">
              share
            </button>
            <button className="ml-1 bg-gray-300 text-xs px-2 rounded">
              copy
            </button>
            <span className="ml-4 font-semibold">Amount Per vote :</span>{" "}
            <span>50p</span>
          </div>
        </div>

        {/* Chart */}
        <div className="bg-purple-50 p-4 rounded h-50">
          {/*<Line data={chartData} options={chartOptions} />*/}
        </div>

        {/* Settings */}
        <div>
          <h3 className="font-semibold mb-2">Settings</h3>
          <hr />
          <div className="flex flex-wrap gap-4 items-center text-sm mt-3">
            <button className="bg-gray-200 px-4 py-1 rounded">
              Edit Deadline
            </button>
            <button className="bg-gray-200 px-4 py-1 rounded">
              Go Live/Offline
            </button>
            <button className="bg-gray-200 px-4 py-1 rounded">
              Edit Amount Per vote
            </button>
            <div className="flex items-center">
              <span className="mr-2">Results Visibility</span>
              <span className="bg-green-500 w-10 h-5 rounded-full relative flex items-center">
                <span className="bg-white w-4 h-4 rounded-full absolute left-1 top-0.5"></span>
              </span>
              <span className="ml-1 text-xs text-gray-500">OFF</span>
            </div>
          </div>

          {/* Bottom Row */}
          <div className="mt-4 flex items-center gap-4">
            <button className="bg-orange-600 text-white px-4 py-2 rounded text-sm">
              Manage Contest
            </button>
            <span className="text-sm">
              <button className="bg-red-600 text-white px-4 py-2 rounded text-sm">
                Turn off voting
              </button>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
