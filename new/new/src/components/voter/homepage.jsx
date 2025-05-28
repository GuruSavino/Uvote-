import { Link } from "react-router-dom";

export default function VoterHome() {
  return (
    <div className="max-w-md mx-auto bg-gradient-to-br from-green-700 to-red-500 via-orange-400 rounded-xl shadow-md overflow-hidden md:max-w-2xl">
      <div className="p-8 bg-white">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-orange-600 mb-2">
            VOTIVE.com
          </h1>
          <p className="text-gray-500">the No.1 Online Voting platform</p>
        </div>

        <div className="mb-8">
          <div className="bg-blue-100 p-4 rounded-lg mb-4">
            <h2 className="text-xl font-semibold text-center mb-2">
              Event Banner Design
            </h2>
          </div>
        </div>

        <div className="flex justify-center">
          <Link
            to="/home/categories"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full flex items-center"
          >
            Proceed ►►
          </Link>
        </div>

        <div className="mt-8 text-center text-lg text-gray-500">
          <p>GSCS Dinner and Awards Night</p>
          <p>Date: 5th June 2024</p>
          <p>Time: 9:00pm</p>
        </div>
      </div>
    </div>
  );
}
