import StatCard from "./statCard";
import EventCard from "./eventCard";
import { useEffect, useState } from "react";
import {
  BellIcon,
  EnvelopeIcon,
  PlusCircleIcon,
  AdjustmentsHorizontalIcon,
} from "@heroicons/react/24/outline";

import NewEventModal from "./newEventModal";
import ModifyEventModal from "./modifyEventModal";
import ModalWrapper from "../../molecules/modalWrapper";

export default function MainDashboard() {
  const [contests, setContests] = useState([
    {
      eventName: "Ghana’s Most Beautiful 2026",
      votes: 40000,
      daysRemaining: 28,
    },
    {
      eventName: "Talented Kids Awards",
      votes: 70000,
      daysRemaining: 17,
    },
  ]);

  useEffect(() => {
    fetch("/api/ongoing-contests") // fetch contest details
      .then((res) => res.json())
      .then(setContests);
  }, []);

  const [newEventOpen, setNewEventOpen] = useState(false);
  // const [modifyEventOpen, setModifyEventOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleOpenNewEventModal = () => setNewEventOpen(true);
  // const handleOpenModifyEventModal = (clickedEvent) => {
  //   setSelectedEvent(clickedEvent);
  //   setModifyEventOpen(true);
  // };

  const handleCloseModal = () => {
    setNewEventOpen(false);
    // setModifyEventOpen(false);
  };

  const handleSubmitEvent = (clickedEvent) => {
    // Update your event list here (state update)
  };

  return (
    <div className="grid grid-cols-12 min-h-screen p-6 gap-6 bg-gray-50">
      {/* Left Pane - 9/12 columns */}
      <div className="col-span-9 space-y-6">
        <p className="text-center text-xl my-2">GENERAL DASHBOARD</p>
        <hr />
        {/* Stats */}
        <div className="grid md:grid-cols-3 w-80 gap-4">
          <StatCard label="Total Events" count={2} color="purple" />
          <StatCard label="Live Contests" count={1} color="green" />
          <StatCard label="Live Tickets" count={20} color="blue" />
        </div>

        {/* Event Sections */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl font-semibold">Current Events</h2>
            <div className="flex gap-4 text-sm">
              <button
                onClick={handleOpenNewEventModal}
                className="text-green-600 font-medium cursor-pointer"
              >
                <PlusCircleIcon className="inline size-8" /> New Event
              </button>
              <button
                // onClick={() => handleOpenModifyEventModal(clickedEvent)}
                className="text-red-600 font-medium cursor-pointer"
              >
                <AdjustmentsHorizontalIcon className="inline size-8" /> Modify
                Event
              </button>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <EventCard title="Ghana’s Most Beautiful" />
            <EventCard title="Talented kids show" />
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">Previous Events</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <EventCard title="Ghana Music Awards" />
          </div>
        </div>
      </div>

      {/* Right Pane - 3/12 columns */}
      <div className="col-span-3 space-y-6">
        {/* Profile theme buttons */}
        {/* <div className="flex gap-4 justify-center">
          <div className="w-6 h-6 bg-black rounded-full"></div>
          <div className="w-6 h-6 bg-black rounded-full"></div>
        </div> */}
        <div className="flex gap-4">
          <div className="relative">
            <BellIcon className="h-6 w-6 text-gray-600" />
            <span className="relative -top-2 -left-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {1}
            </span>
          </div>
          <div className="relative">
            <EnvelopeIcon className="h-6 w-6 text-gray-600" />
            <span className="relative -top-2 -left-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {1}
            </span>
          </div>
        </div>

        {/* Ongoing Contests */}
        <div>
          <h2 className="text-xl pb-3">Live Voting Events</h2>
          <hr />
        </div>

        {contests.map((contest, idx) => (
          <div key={idx} className="border rounded p-3">
            <p className="font-medium">{contest.eventName}</p>
            <p className="text-sm text-gray-600">
              {contest.votes.toLocaleString()} votes{" "}
              <span className="text-red-500 ml-2">
                {contest.daysRemaining} days more
              </span>
            </p>
          </div>
        ))}
      </div>

      {/*Modals*/}
      <ModalWrapper open={newEventOpen} onClose={handleCloseModal}>
        <NewEventModal
          onClose={handleCloseModal}
          onSubmit={handleSubmitEvent}
        />
      </ModalWrapper>

      {/* <ModalWrapper open={modifyEventOpen} onClose={handleCloseModal}>
        <ModifyEventModal
          clickedEvent={selectedEvent}
          onClose={handleCloseModal}
          // onSubmit={handleSubmitEvent}
        />
      </ModalWrapper> */}
    </div>
  );
}

// export default function Dashboard() {

//   return (
//     <div>
//       {/* Dashboard content */}
//       <button onClick={handleOpenNewEventModal}>+ New Event</button>
//       <button onClick={() => handleOpenModifyEventModal(event)}>Modify Event</button>

//       {/* Modals */}

//     </div>
//   );
// }
