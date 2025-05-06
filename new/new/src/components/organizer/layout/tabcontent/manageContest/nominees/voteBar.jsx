export default function VoteBar({ percent }) {
  let color = "#ef4444"; // red
  if (percent >= 66) color = "#22c55e"; // green
  else if (percent >= 33) color = "#3b82f6"; // blue

  return (
    <div className="h-3 w-full bg-gray-200">
      <div
        className="h-full transition-all duration-300"
        style={{ width: `${percent}%`, backgroundColor: color }}
      />
    </div>
  );
}
