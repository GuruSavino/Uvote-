import { useEffect, useState } from "react";

export default function NomineeDetailsModal({ nominee, onClose }) {
  const [details, setDetails] = useState(null);

  useEffect(() => {
    if (!nominee) return;

    // Simulate backend fetch
    fetch(`/api/nominees/${nominee.id}`)
      .then((res) => res.json())
      .then((data) => setDetails(data))
      .catch(() => {
        // fallback if backend fails
        setDetails({
          ...nominee,
          code: nominee.code || "GD00000",
          voteLink: `https://votingapp.com/vote/${nominee.id}`,
        });
      });
  }, [nominee]);

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard");
  };

  if (!details) return <div className="p-4">Loading...</div>;

  return (
    <div className="p-4 max-w-md mx-auto">
      <img
        src={details.image}
        alt={details.name}
        className="w-full h-60 object-cover rounded"
      />
      <h2 className="mt-4 text-2xl font-bold">{details.name}</h2>
      <p className="mt-2 text-gray-600">{details.description}</p>

      <div className="mt-4">
        <div className="flex justify-between items-center">
          <span className="font-semibold">Nominee Code:</span>
          <div className="flex gap-2 items-center">
            <span>{details.code}</span>
            <button
              onClick={() => handleCopy(details.code)}
              className="text-blue-600 text-sm"
            >
              Copy
            </button>
          </div>
        </div>

        <div className="mt-3 flex justify-between items-center">
          <span className="font-semibold">Vote Link:</span>
          <div className="flex gap-2 items-center">
            <span className="truncate max-w-[150px] text-blue-700">
              {details.voteLink}
            </span>
            <button
              onClick={() => handleCopy(details.voteLink)}
              className="text-blue-600 text-sm"
            >
              Copy
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
