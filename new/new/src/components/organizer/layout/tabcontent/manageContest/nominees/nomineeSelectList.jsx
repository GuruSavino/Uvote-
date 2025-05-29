export default function NomineeSelectList({ nominees, onSelect }) {
  return (
    <div className="">
      <h3 className="text-lg font-semibold mb-2">Select a Nominee</h3>
      <ul className="space-y-2">
        {nominees.map((nominee) => (
          <li
            key={nominee.id}
            className="cursor-pointer border p-2 rounded hover:bg-gray-100"
            onClick={() => onSelect(nominee)}
          >
            {nominee.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
