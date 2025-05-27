import { Link, useParams } from "react-router-dom";

// Mock data - in a real app, this would come from an API
const nomineesData = {
  "Most Famous Student": [
    { id: "GD-209876", name: "Richmond Nyamedi" },
    { id: "GD-209877", name: "John Doe" },
    { id: "GD-209878", name: "Jane Smith" },
  ],
  // Other categories would have their own nominees
};

export default function Nominees() {
  const { category } = useParams();
  const nominees = nomineesData[category] || [];

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
      <div className="p-8">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-blue-600 mb-2">Uvote.com</h1>
          <h2 className="text-xl font-semibold mb-4">Award Nominees</h2>
          <h3 className="text-lg font-medium mb-4">{category}</h3>
        </div>

        <div className="mb-6">
          <h4 className="text-md font-medium mb-3">Select Nominee</h4>
          <ul className="space-y-3">
            {nominees.map((nominee, index) => (
              <li key={index}>
                <Link
                  to={`/checkout/${nominee.id}`}
                  className="block bg-gray-100 hover:bg-gray-200 p-3 rounded-lg transition"
                >
                  <p className="font-medium">{nominee.name}</p>
                  <p className="text-sm text-gray-600">Code: {nominee.id}</p>
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
