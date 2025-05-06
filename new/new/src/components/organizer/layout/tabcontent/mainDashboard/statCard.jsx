export default function StatCard({ label, count, color = "gray" }) {
  const colorMap = {
    purple: "bg-purple-600",
    green: "bg-green-600",
    blue: "bg-blue-600",
    gray: "bg-gray-600",
  };

  return (
    <div className={`text-white px-4 py-2 rounded shadow ${colorMap[color]}`}>
      <p className="text-sm">{label}</p>
      <p className="text-xl font-bold">{count}</p>
    </div>
  );
}
