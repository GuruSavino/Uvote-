import StatCard from "./statCard";
import EventCard from "./eventCard";
import { useEffect, useState } from "react";

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

  return (
    <div className="grid grid-cols-12 min-h-screen p-6 gap-6 bg-gray-50">
      {/* Left Pane - 9/12 columns */}
      <div className="col-span-9 space-y-6">
        {/* Stats */}
        <div className="flex gap-4">
          <StatCard label="Total Events" count={2} color="purple" />
          <StatCard label="Live Contests" count={1} color="green" />
          <StatCard label="Live Tickets" count={20} color="blue" />
        </div>

        {/* Event Sections */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl font-semibold">Current Events</h2>
            <div className="flex gap-4 text-sm">
              <button className="text-green-600 font-medium">
                + New Event
              </button>
              <button className="text-red-600 font-medium">
                + Modify Event
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
        <div className="flex gap-4 justify-end">
          <div className="w-6 h-6 bg-black rounded-full"></div>
          <div className="w-6 h-6 bg-black rounded-full"></div>
        </div>

        {/* Ongoing Contests */}

        {/* <div>
          <h2 className="text-lg font-semibold mb-2">Ongoing Contests</h2>
          <div className="border rounded p-3">
            <p className="font-medium">Ghana’s Most Beautiful 2026</p>
            <p className="text-sm text-gray-600">
              40,000 votes{" "}
              <span className="text-red-500 ml-2">28 days more</span>
            </p>
          </div>
        </div> */}

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
    </div>
  );
}
