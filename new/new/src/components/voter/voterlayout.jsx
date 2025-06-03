import { Outlet } from "react-router-dom";

export default function VoterLayout() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-700 to-red-500 via-orange-400">
      <main className="container mx-auto px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
}
