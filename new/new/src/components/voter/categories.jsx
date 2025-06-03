import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const categories = [
  "Most Famous Student",
  "Personality of the Year",
  "Fashionable Student",
  "Quiz Boy of the Year",
  "Executive of the Year",
  "Class of the Year",
  "Hall of the Year",
  "Most Famous Student",
  "Personality of the Year",
  "Fashionable Student",
  "Quiz Boy of the Year",
  "Executive of the Year",
  "Class of the Year",
  "Hall of the Year",
];

export default function Categories() {
  const navigate = useNavigate();

  return (
    <div className="max-w-md max-h-[70vh] px-4 mx-auto bg-white rounded-xl overflow-hidden shadow-md md:max-w-2xl flex flex-col">
      {/* Non-scrollable header section */}
      <div className="pt-4 pb-2">
        <p className="text-center">
          <h1 className="text-3xl font-bold text-orange-600 mb-2">VOTIVE</h1>
          <h2 className="text-lg font-semibold mb-4">
            The number 1 online voting platform!
          </h2>
        </p>
      </div>

      {/* Scrollable categories list */}
      <div className="flex-1 overflow-y-auto mb-4">
        <h3 className="text-2xl text-orange-600 font-bold mb-4 sticky top-0 bg-white py-2 z-10">
          Select Award Category to Vote
        </h3>
        <ul className="space-y-3 pr-2">
          {" "}
          {/* Added padding for scrollbar */}
          {categories.map((category, index) => (
            <li key={index}>
              <Link
                //to={`home/nominees/${encodeURIComponent(category)}`}
                className="block bg-gray-100 hover:bg-gray-200 p-3 rounded-lg transition"
                onClick={() =>
                  navigate(`/home/nominees/${encodeURIComponent(category)}`)
                }
              >
                {category}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Non-scrollable footer section */}
      <div className="pt-4 pb-6 border-t border-gray-200">
        <p className="text-green-500 font-bold text-sm">
          Please Note: Voting automatically closes on 5th June 2024, 11:59pm
        </p>
        <div className="mt-4 text-lg">
          <p className="font-bold">GSCS Dinner and Awards Night</p>
          <p>Date: 5th June 2024 | Time: 9:00pm</p>
        </div>
      </div>
    </div>
  );
}
