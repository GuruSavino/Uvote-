import Sidebar from "./sidebar/sidebar";
import ManageEventTabcontent from "../layout/tabcontent/manageEvent/manageEventTabContent";
import ManageContestDashboard from "./tabcontent/manageContest/manageContestDashboard";
import Navbar from "./navbar";
import NomineeBoard from "./tabcontent/manageContest/nominees/nomineeBoard";
import MainDashboard from "./tabcontent/mainDashboard/mainDashboard";

export default function Layout() {
  return (
    <>
      <Navbar />
      <div className="font-bold text-lg grid grid-rows-1 grid-cols-[1.3fr_7fr] bg-gray-100 min-h-lvh max-h-lvh">
        <Sidebar />
        {/* <ManageEventTabcontent /> */}
        {/* <ManageContestDashboard /> */}
        {/* <NomineeBoard /> */}
        <MainDashboard />
      </div>
    </>
  );
}
