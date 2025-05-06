import VoteBar from "./voteBar";

// export default function NomineeCard({ nominee, totalVotes, showVotes, onClick }) {
//   const percent = totalVotes ? (nominee.votes / totalVotes) * 100 : 0;

//   return (
//     <div className="bg-white rounded-lg shadow-md overflow-hidden">
//       <img
//         src={nominee.image}
//         alt={nominee.name}
//         className="w-full h-60 object-cover"
//       />
//       <div className="p-4">
//         <h3 className="text-lg font-semibold">{nominee.name}</h3>
//         <p className="text-sm text-gray-600">Code: {nominee.code}</p>
//         <button className="mt-2 w-full bg-gray-800 text-white py-1 rounded">
//           Get Nominee Link
//         </button>
//       </div>
//       {showVotes && <VoteBar percent={percent} />}
//     </div>
//   );
// }

export default function NomineeCard({
  nominee,
  totalVotes,
  showVotes,
  onClick,
}) {
  const percent = totalVotes ? (nominee.votes / totalVotes) * 100 : 0;

  return (
    <div
      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition"
      onClick={onClick}
    >
      <img
        src={nominee.image}
        alt={nominee.name}
        className="w-full h-60 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold">{nominee.name}</h3>
        <p className="text-sm text-gray-600">Code: {nominee.code}</p>
        <button className="mt-2 w-full bg-gray-800 text-white py-1 rounded">
          Get Nominee Link
        </button>
      </div>
      {showVotes && <VoteBar percent={percent} />}
    </div>
  );
}
