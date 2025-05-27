import { Link } from "react-router-dom";

export default function VoterNavbar() {
  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">
          Uvote.com
        </Link>
      </div>
    </nav>
  );
}
