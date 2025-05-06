export default function EventCard({ title }) {
  return (
    <div className="bg-white border rounded shadow-sm">
      <div className="p-4 text-center text-lg font-medium">{title}</div>
      <div className="bg-gray-700 text-white text-center py-2 text-sm">
        Manage Event
      </div>
    </div>
  );
}
