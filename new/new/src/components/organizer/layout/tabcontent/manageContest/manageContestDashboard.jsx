import React, { useState, useEffect } from "react";
import {
  BellIcon,
  EnvelopeIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/outline";
import AddCategoryForm from "./addCategoryForm";
import CategoryInfoModal from "./categoryInfoModal";
import ModalWrapper from "../../molecules/modalWrapper";
import ToggleButton from "./toggleButton";
import { Link } from "react-router-dom";

const ManageContestDashboard = () => {
  const [categories, setCategories] = useState([]);
  const [votes, setVotes] = useState(0);
  const [nominees, setNominees] = useState(0);
  const [notifications, setNotifications] = useState([]);
  const [messages, setMessages] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    // Simulate backend fetches
    setVotes(1234);
    setNominees(57);
    setCategories([
      {
        id: 1,
        name: "Personality of the Year",
        contestants: 18,
        votes: 234,
        createdAt: "2024-01-01",
      },
      {
        id: 2,
        name: "Best in Academics",
        contestants: 36,
        votes: 180,
        createdAt: "2024-02-15",
      },
      {
        id: 1,
        name: "Best in Sports",
        contestants: 15,
        votes: 234,
        createdAt: "2024-01-01",
      },
      {
        id: 2,
        name: "Best Overall Student",
        contestants: 36,
        votes: 180,
        createdAt: "2024-02-15",
      },
      {
        id: 1,
        name: "Best Dressed",
        contestants: 5,
        votes: 234,
        createdAt: "2024-01-01",
      },
      {
        id: 2,
        name: "Most Talented",
        contestants: 12,
        votes: 180,
        createdAt: "2024-02-15",
      },
    ]);
    setNotifications([1]);
    setMessages([1]);
  }, []);

  return (
    <div className="min-h-screen grid grid-rows-1 grid-cols-[6fr_2fr] bg-gray-100 p-6">
      <div>
        {/* Top Bar */}
        <h1 className="text-2xl mb-6 text-center">MANAGE CONTEST DASHBOARD</h1>
        <hr /> <br />
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-violet-800 flex justify-start items-center p-4 rounded-lg shadow text-center">
            <p className="text-white px-4 text-xl">Total Votes</p>
            <p className="text-2xl text-white font-semibold">{votes}</p>
          </div>
          <div className="bg-blue-700 flex justify-start items-center p-4 rounded-lg shadow text-center">
            <p className="text-white px-4 text-xl">Nominees</p>
            <p className="text-2xl text-white font-semibold">{nominees}</p>
          </div>
          <div className="text-white bg-gray-500 flex justify-start items-center p-4 rounded-lg shadow text-center">
            <p className="text-xl px-4">Categories</p>
            <p className="text-2xl text-black-800 font-semibold">
              {categories.length}
            </p>
          </div>
        </div>
        {/* Category Section */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl text-center font-bold">Categories</h1>
          <p className="flex items-center">
            <button
              onClick={() => setShowAddModal(true)}
              className="text-lime-600 font-bold px-4 py-2 hover:text-lime-800 cursor-pointer transition-all ease-in duration-100"
            >
              <PlusCircleIcon className="inline size-7 me-1" />
              Add Category
            </button>
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="bg-white p-4 rounded-lg border border-gray-300 shadow-sm"
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold">{cat.name}</h3>
                <span className="bg-gray-200 text-xs px-2 py-1 rounded-full">
                  N-{cat.contestants}
                </span>
              </div>
              <p className="flex justify-between">
                <button
                  onClick={() => setSelectedCategory(cat)}
                  className="text-gray-600 hover:text-blue-400 text-sm cursor-pointer transition-all ease-in duration-100"
                >
                  Summary
                </button>
                <button className="text-orange-600 hover:text-orange-400 text-sm cursor-pointer transition-all ease-in duration-100">
                  <Link to="/dashboard/nomineeboard">Manage</Link>
                </button>
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Side Pane */}
      <div className="justify-items-center">
        {/*Icons */}
        <div className="flex items-center space-x-4 relative">
          <div className="relative">
            <BellIcon className="h-6 w-6 text-gray-600" />
            {notifications.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {notifications.length}
              </span>
            )}
          </div>
          <div className="relative">
            <EnvelopeIcon className="h-6 w-6 text-gray-600" />
            {messages.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {messages.length}
              </span>
            )}
          </div>
        </div>
        <br />
        {/**icons end */}

        {/**right controls */}
        <div className="bg-white p-4 rounded shadow-md w-64">
          <p className="mb-2">Show Results</p>
          <ToggleButton
            isOn={showResults}
            toggle={() => setShowResults(!showResults)}
          />
          <p className="mt-4">Amount Per Vote</p>
          <p className="font-semibold">Ghc 0.5</p>
          <p className="mt-4">Voting Status</p>
          <p className="text-green-600 font-bold">ONGOING</p>
          <button className="mt-4 w-full bg-green-500 text-white py-1 rounded cursor-pointer hover:bg-green-700 transition-all ease-in duration-100">
            Get Plaques/Citations
          </button>
          <Link to="/dashboard/manageevent">
            <button className="mt-2 w-full bg-blue-500 text-white py-1 rounded hover:bg-orange-600 cursor-pointer transition-all ease-in duration-100">
              Edit Voting Details
            </button>
          </Link>
        </div>
        {/**end right controsl */}
      </div>

      {/* Modals */}
      {showAddModal && (
        <ModalWrapper onClose={() => setShowAddModal(false)}>
          <AddCategoryForm onClose={() => setShowAddModal(false)} />
        </ModalWrapper>
      )}

      {selectedCategory && (
        <ModalWrapper onClose={() => setSelectedCategory(null)}>
          <CategoryInfoModal
            category={selectedCategory}
            onClose={() => setSelectedCategory(null)}
          />
        </ModalWrapper>
      )}
    </div>
  );
};

export default ManageContestDashboard;
