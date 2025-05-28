import React, { useState } from "react";
import { Link } from "react-router-dom";
import LineChart from "./lineChart";
import { ShareIcon, ClipboardIcon } from "@heroicons/react/24/outline";
import ToggleButton from "../manageContest/toggleButton";

export default function VotingTabcontent() {
  const [showResults, setShowResults] = useState(false);

  return (
    <div className="w-full bg-gray-100 p-4 rounded shadow-md">
      <div className="space-y-4 p-4 rounded-b bg-white">
        {/* Contest Info */}
        <div className="space-y-2 text-sm">
          <div>
            <strong className="uppercase"> Contest :</strong>{" "}
            <span className="font-bold text-lg uppercase">
              GSCS Awards Night
            </span>
            <span className="ml-6 font-semibold">Voting Status :</span>{" "}
            <span className="inline-block bg-green-500 text-white px-4 py-1 rounded text-xs">
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
            <button className="ml-4 p-1 bg-gray-100 cursor-pointer">
              <ClipboardIcon className="size-4 font-black" /> {""}
            </button>{" "}
            Copy Voter Link
            <span className="ml-4 font-semibold">Amount Per vote :</span>{" "}
            <span>50p</span>
          </div>
        </div>

        {/* Chart */}
        <div className="bg-purple-50 p-4 rounded h-50">
          <LineChart />
        </div>

        {/* Settings */}
        <div>
          <h3 className="font-semibold mb-2">Settings</h3>
          <hr />
          <div className="flex flex-wrap gap-4 items-center text-sm mt-3">
            <button className="bg-gray-100 px-4 py-1 border rounded hover:bg-green-300 cursor-pointer">
              Edit Deadline
            </button>

            <button className="bg-gray-100 px-4 py-1 border rounded hover:bg-red-300 cursor-pointer">
              Edit Amount Per vote
            </button>
            <div className="flex items-center">
              <span className="mr-2">Results Visibility</span>
              <ToggleButton
                isOn={showResults}
                toggle={() => setShowResults(!showResults)}
              />
            </div>
          </div>

          {/* Bottom Row */}
          <div className="mt-4 flex items-center gap-4">
            <Link to="/dashboard/managecontest">
              <button className="bg-orange-600 text-white px-4 py-2 rounded text-sm cursor-pointer hover:bg-orange-700">
                Manage Contest
              </button>
            </Link>
            <span className="text-sm">
              <button className="bg-red-600 text-white px-4 py-2 rounded text-sm hover:bg-red-700">
                Turn off voting
              </button>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
