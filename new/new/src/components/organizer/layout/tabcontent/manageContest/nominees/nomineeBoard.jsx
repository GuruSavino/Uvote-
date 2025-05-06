import { useEffect, useState } from "react";
import NomineeCard from "./nomineeCard";
import ModalWrapper from "./modalWrapper";
import EditNomineeModal from "./editNomineeModal";
import DeleteNomineeModal from "./deleteNomineeModal";
import AddNomineeModal from "./addNomineeModal";
import NomineeDetailsModal from "./nomineeDetailsModal";

import {
  BellIcon,
  EnvelopeIcon,
  PlusCircleIcon,
  PencilSquareIcon,
  EyeSlashIcon,
} from "@heroicons/react/24/outline";

export default function NomineeBoard() {
  const [notifications, setNotifications] = useState([]); // should go into the dashboard
  const [addOpen, setAddOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [nominees, setNominees] = useState([]);
  const [showVotes, setShowVotes] = useState(true);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedNominee, setSelectedNominee] = useState(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  //   useEffect(() => {
  //     fetch("/api/nominees?category=gentleman")
  //       .then((res) => res.json())
  //       .then(setNominees);
  //   }, []);

  useEffect(() => {
    // Mocked placeholder nominees
    const nominees = [
      {
        id: 1,
        name: "Samuel Nyonator",
        code: "GD12345",
        image: "https://i.ibb.co/ZYW3VTp/brown-brim.png", // placeholder image
        votes: 50,
      },
      {
        id: 2,
        name: "Nathan Nathan",
        code: "GD23456",
        image: "https://i.ibb.co/ypkgK0X/blue-beanie.png",
        votes: 130,
      },
      {
        id: 3,
        name: "Silas Silasman",
        code: "GD34567",
        image: "https://i.ibb.co/QdJwgmp/brown-cowboy.png",
        votes: 160,
      },
      {
        id: 3,
        name: "Faith Amegbo",
        code: "GD34567",
        image: "https://i.ibb.co/QdJwgmp/brown-cowboy.png",
        votes: 150,
      },
      {
        id: 3,
        name: "Jude Bellingham",
        code: "GD34567",
        image: "https://i.ibb.co/QdJwgmp/brown-cowboy.png",
        votes: 150,
      },
    ];

    setNominees(nominees);
    setNotifications([1]);
    setMessages([1]);
  }, []);

  const totalVotes = nominees.reduce((acc, n) => acc + n.votes, 0);

  const handleNomineeClick = (nominee) => {
    setSelectedNominee(nominee);
    setDetailsOpen(true);
  };

  return (
    <div className=" overflow-scroll grid grid-rows-1 grid-cols-[5fr_2fr] bg-gray-100 p-6">
      <div>
        <div className="flex justify-between ">
          <h1 className="text-2xl pb-3">Gentleman of the Year</h1>
          <p onClick={() => setAddOpen(true)} className="text-green-600">
            <PlusCircleIcon className="size-8 inline-block text-lime-700" />{" "}
            <span>Add Nominee</span>
          </p>
        </div>
        <hr /> <br />
        <div className="grid md:grid-cols-3 gap-4">
          {nominees.map((nominee) => (
            <NomineeCard
              key={nominee.id}
              nominee={nominee}
              totalVotes={totalVotes}
              showVotes={showVotes}
              onClick={() => handleNomineeClick(nominee)}
            />
          ))}
        </div>
        <br />
        <br />
        <br />
      </div>

      {/**controls */}

      {/* Side Pane */}
      <div className="justify-items-center sticky top-0">
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
          <br />
          <br />
          <div className="flex flex-col items-center gap-1">
            <button onClick={() => setEditOpen(true)} className="text-blue-600">
              <PencilSquareIcon className="size-7 inline" /> Edit Nominee
            </button>
            <button
              onClick={() => setDeleteOpen(true)}
              className="text-red-500"
            >
              Delete Nominee
            </button>
            <button
              onClick={() => setShowVotes(!showVotes)}
              className="text-gray-700"
            >
              <EyeSlashIcon className="size-7 inline" />
              {showVotes ? "Hide Votes" : "Show Votes"}
            </button>
          </div>
        </div>
        {/**end right controsl */}
      </div>

      <ModalWrapper open={addOpen} onClose={() => setAddOpen(false)}>
        <AddNomineeModal
          onClose={() => setAddOpen(false)}
          onAdd={(newNominee) => setNominees((prev) => [...prev, newNominee])}
        />
      </ModalWrapper>

      <ModalWrapper open={editOpen} onClose={() => setEditOpen(false)}>
        <EditNomineeModal
          onClose={() => setEditOpen(false)}
          nominees={nominees}
          refresh={() => window.location.reload()}
        />
      </ModalWrapper>

      <ModalWrapper open={deleteOpen} onClose={() => setDeleteOpen(false)}>
        <DeleteNomineeModal
          onClose={() => setDeleteOpen(false)}
          nominees={nominees}
          refresh={() => window.location.reload()}
        />
      </ModalWrapper>

      <ModalWrapper open={detailsOpen} onClose={() => setDetailsOpen(false)}>
        <NomineeDetailsModal
          nominee={selectedNominee}
          onClose={() => setDetailsOpen(false)}
        />
      </ModalWrapper>
    </div>
  );
}
