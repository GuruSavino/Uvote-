export default function StatCard({ label, count, color = "gray" }) {
  const colorMap = {
    purple: "bg-purple-600",
    green: "bg-green-600",
    blue: "bg-blue-600",
    gray: "bg-gray-600",
  };

  return (
    <div className={`text-white rounded shadow ${colorMap[color]}`}>
      <p className="py-4 px-4">
        {label} <span className="ms-3">{count}</span>
      </p>
      {/* <p className="text-sm">{label}</p>
      <p className="text-xl font-bold">{count}</p> */}
    </div>
  );
}
