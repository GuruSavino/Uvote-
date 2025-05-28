import React, { useState } from "react";
//import { Line } from "react-chartjs-2";
import TicketTabcontent from "./ticketManagement";
import VotingTabcontent from "./votingManagement";
import MarketingTabcontent from "./marketingManagement";
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

export default function ManageEventTabcontent() {
  const [activeTab, setActiveTab] = useState("Voting");
  const tabs = ["Voting", "Ticket Management", "Marketing"];

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
      {/* Tabs */}
      <div className="flex space-x-2 mb-4">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`px-6 py-4 font-semibold text-white rounded-t ${
              tab === "Voting"
                ? "bg-purple-600"
                : tab === "Ticket Management"
                ? "bg-blue-500"
                : "bg-gray-500"
            } ${
              activeTab === tab
                ? "opacity-100 border-b-8 border-b-blue-700"
                : "opacity-60"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Active Tab Content */}
      {activeTab === "Voting" && <VotingTabcontent />}

      {activeTab === "Ticket Management" && <TicketTabcontent />}
      {activeTab === "Marketing" && <MarketingTabcontent />}
    </div>
  );
}
