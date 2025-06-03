import { Link } from "react-router-dom";

export default function VoterLandingPage() {
  return (
    <div className="max-w-md mx-auto bg-gradient-to-br from-green-700 to-red-500 via-orange-400 rounded-xl shadow-md overflow-hidden md:max-w-2xl">
      <div className="p-5 bg-white">
        {/* title cotent */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-orange-600 mb-2">VOTIVE</h1>
          <p className="text-gray-500 font-bold">
            The Number 1 Online Voting platform
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="mb-8 mx-auto min-h-30 min-w-full">
            <div className="bg-blue-100 rounded-lg ">hello</div>
          </div>

          <div className="self-start items-center">
            <div>
              <Link
                to="/home/categories"
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-3 rounded-full flex items-center"
              >
                Proceed to Vote
              </Link>
            </div>

            <div className="mt-1 text-start text-lg">
              <p className="font-bold">Event Details</p>
              <p>Event Name</p>
              <p>Date: 5th June 2024</p>
              <p>Time: 9:00pm</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
