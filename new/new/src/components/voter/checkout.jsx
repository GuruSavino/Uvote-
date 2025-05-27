import { useParams } from "react-router-dom";
import { useState } from "react";

// Mock data - in a real app, this would come from an API
const nominees = {
  "GD-209876": {
    name: "Richmond Nyamedi",
    category: "Most Famous Student",
    image: "/path/to/image.jpg", // You would replace this with actual image path
  },
};

export default function Checkout() {
  const { nomineeId } = useParams();
  const nominee = nominees[nomineeId];
  const [momoNumber, setMomoNumber] = useState("");
  const [selectedNetwork, setSelectedNetwork] = useState("Airtel");

  if (!nominee) {
    return <div className="text-center py-8">Nominee not found</div>;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle payment submission
    alert(`Vote submitted for ${nominee.name}`);
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
      <div className="p-8">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-blue-600 mb-2">Uvote.com</h1>
          <h2 className="text-xl font-semibold mb-4">Voting For</h2>
        </div>

        <div className="mb-6 text-center">
          <div className="bg-gray-100 p-4 rounded-lg inline-block mb-4">
            {/* Nominee image would go here */}
            <div className="w-24 h-24 bg-gray-300 rounded-full mx-auto mb-2"></div>
            <h3 className="font-bold">{nominee.name}</h3>
            <p className="text-sm">{nominee.category}</p>
          </div>

          <div className="mb-4">
            <p className="font-medium">Number of Votes</p>
            <p className="text-sm text-gray-600">
              Please Note: 1 vote is 50 Peaewas
            </p>
          </div>

          <div className="mb-4">
            <p className="font-bold">TOTAL : Ghc 0.5</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mb-6">
          <h3 className="text-lg font-semibold mb-3">Payment Procedure</h3>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Select Mobile Network
            </label>
            <select
              value={selectedNetwork}
              onChange={(e) => setSelectedNetwork(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="Airtel">Airtel</option>
              <option value="Tigo">Tigo</option>
              <option value="MTN">MTN</option>
              <option value="Vodafone">Vodafone</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Enter Momo Number for payment
            </label>
            <input
              type="tel"
              value={momoNumber}
              onChange={(e) => setMomoNumber(e.target.value)}
              placeholder="0550988226"
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded"
          >
            Cast Vote
          </button>
        </form>

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
