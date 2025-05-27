import { Outlet } from "react-router-dom";
import VoterNavbar from "./voterNav";

export default function VoterLayout() {
  return (
    <div className="min-h-screen bg-gray-100">
      <VoterNavbar />
      <main className="container mx-auto px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
}
