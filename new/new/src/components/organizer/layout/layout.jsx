import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar/sidebar";
import Navbar from "./navbar";
import HookLesson from "./reactHooksLesson";

export default function Layout() {
  return (
    <>
      <Navbar />
      <div className="font-bold text-lg grid grid-rows-1 grid-cols-[1.3fr_7fr] bg-gray-50 min-h-lvh max-h-lvh">
        <Sidebar />
        <Outlet />
        {/* ///////////////////////////////////////////
/////////////////////////////////////////// */}
        {/* <HookLesson /> */}
      </div>
    </>
  );
}
