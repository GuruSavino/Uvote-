import { Link } from "react-router-dom";

const categories = [
  "Most Famous Student",
  "Personality of the Year",
  "Fashionable Student",
  "Quiz Boy of the Year",
  "Executive of the Year",
  "Class of the Year",
  "Hall of the Year",
];

export default function Categories() {
  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
      <div className="p-8">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-blue-600 mb-2">Uvote.com</h1>
          <h2 className="text-xl font-semibold mb-4">
            GSCS Dinner and Awards Night
          </h2>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-4">Award Categories</h3>
          <ul className="space-y-3">
            {categories.map((category, index) => (
              <li key={index}>
                <Link
                  to={`home/nominees/${encodeURIComponent(category)}`}
                  className="block bg-gray-100 hover:bg-gray-200 p-3 rounded-lg transition"
                >
                  {category}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6 text-center text-sm text-gray-500">
          <p>
            Please Note: Voting automatically closes on 5th June 2024, 11:59pm
          </p>
          <div className="mt-4">
            <p>GSCS Dinner and Awards Night</p>
            <p>Upvote.com - Flexible and easy voting platform</p>
            <p>Date: 5th June 2024 | Time: 9:00pm</p>
          </div>
        </div>
      </div>
    </div>
  );
}
