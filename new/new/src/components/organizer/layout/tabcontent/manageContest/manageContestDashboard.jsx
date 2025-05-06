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
// import CategoryInfoModal from "../components/CategoryInfoModal";
// import ModalWrapper from "../components/ModalWrapper";

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
          <div className="bg-gray-500 flex justify-start items-center p-4 rounded-lg shadow text-center">
            <p className="text-black-800 text-xl px-4">Categories</p>
            <p className="text-2xl text-black-800 font-semibold">
              {categories.length}
            </p>
          </div>
        </div>
        {/* Category Section */}
        <div className="flex justify-around items-center mb-4">
          <h1 className="text-2xl text-center font-bold">Categories</h1>
          <p className="flex items-center">
            <PlusCircleIcon className="size-7 me-0" />
            <span
              onClick={() => setShowAddModal(true)}
              className=" text-lime-600 font-bold px-4 py-2 hover:text-blue-700 ps-1"
            >
              Add Category
            </span>
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
              <button
                onClick={() => setSelectedCategory(cat)}
                className="text-blue-600 hover:underline text-sm"
              >
                Category Info
              </button>
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
          <button className="mt-4 w-full bg-green-500 text-white py-1 rounded">
            Get Plaques/Citations
          </button>
          <button className="mt-2 w-full bg-blue-500 text-white py-1 rounded">
            Edit Voting Details
          </button>
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

///// before the modal wrapper

// import React, { useState, useEffect } from "react";
// import AddCategoryForm from "./addCategoryForm";
// import CategoryCard from "./categoryCard";
// import CategoryInfoModal from "./categoryInfoModal";
// import { BellIcon, EnvelopeIcon } from "@heroicons/react/24/solid";
// //import { Bell, Mail } from "lucide-react";

// const ManageContestDashboard = () => {
//   const [showForm, setShowForm] = useState(false);
//   const [categories, setCategories] = useState([]);
//   const [votes, setVotes] = useState(0);
//   const [nominees, setNominees] = useState(0);
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [showResults, setShowResults] = useState(true);
//   const [notifications, setNotifications] = useState(5);
//   const [messages, setMessages] = useState(8);

//   useEffect(() => {
//     // Simulate API calls
//     setVotes(12000);
//     setNominees(71);
//     setCategories(
//       Array(6).fill({
//         name: "GENTLEMAN OF THE YEAR",
//         contestants: 5,
//         votes: 420,
//         createdAt: "2025-04-01",
//       })
//     );
//   }, []);

//   return (
//     <div className="p-6 bg-gray-100 min-h-screen">
//       <h1 className="text-center text-2xl font-bold mb-4">
//         GHANA'S MOST BEAUTIFUL 26 CONTEST
//       </h1>
//       <div className="grid grid-cols-3 gap-4 mb-6">
//         <div className="bg-blue-500 text-white p-4 rounded">
//           <p>Total Votes</p>
//           <h2 className="text-2xl font-bold">{votes}</h2>
//         </div>
//         <div className="bg-purple-500 text-white p-4 rounded">
//           <p>Nominees</p>
//           <h2 className="text-2xl font-bold">{nominees}</h2>
//         </div>
//         <div className="bg-gray-400 text-white p-4 rounded">
//           <p>Categories</p>
//           <h2 className="text-2xl font-bold">{categories.length}</h2>
//         </div>
//       </div>

//       <div className="flex items-center justify-between mb-4">
//         <h2 className="text-xl font-bold underline">Categories</h2>
//         <button
//           onClick={() => setShowForm(true)}
//           className="text-green-600 flex items-center space-x-1"
//         >
//           <span className="text-xl">+</span> <span>Add</span>
//         </button>
//       </div>

//       <div className="grid grid-cols-3 gap-4 mb-10">
//         {categories.map((cat, idx) => (
//           <CategoryCard
//             key={idx}
//             category={cat}
//             onInfoClick={setSelectedCategory}
//           />
//         ))}
//       </div>

//       <div className="absolute top-6 right-6 space-y-3">
//         <div className="flex justify-end space-x-4">
//           <div className="relative">
//             <BellIcon />
//             {notifications > 0 && (
//               <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 rounded-full">
//                 {notifications}
//               </span>
//             )}
//           </div>
//           <div className="relative">
//             <EnvelopeIcon />
//             {messages > 0 && (
//               <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 rounded-full">
//                 {messages}
//               </span>
//             )}
//           </div>
//         </div>

//         <div className="bg-white p-4 rounded shadow-md w-64">
//           <p className="mb-2">Show Results</p>
//           <ToggleButton
//             isOn={showResults}
//             toggle={() => setShowResults(!showResults)}
//           />
//           <p className="mt-4">Amount Per Vote</p>
//           <p className="font-semibold">Ghc 0.5</p>
//           <p className="mt-4">Voting Status</p>
//           <p className="text-green-600 font-bold">ONGOING</p>
//           <button className="mt-4 w-full bg-green-500 text-white py-1 rounded">
//             Get Plaques/Citations
//           </button>
//           <button className="mt-2 w-full bg-blue-500 text-white py-1 rounded">
//             Edit Voting Details
//           </button>
//         </div>
//       </div>

//       {showForm && <AddCategoryForm onClose={() => setShowForm(false)} />}
//       {selectedCategory && (
//         <CategoryInfoModal
//           category={selectedCategory}
//           onClose={() => setSelectedCategory(null)}
//         />
//       )}
//     </div>
//   );
// };

// export default ManageContestDashboard;
