// import React from "react";
// import ReactDOM from "react-dom/client";
// import Dashboard from "./App";
// import reportWebVitals from "./reportWebVitals";
import "./assets/output.css";
import Authpage from "./components/organizer/layout/auth/Authpage";
import Layout from "./components/organizer/layout/layout";
import ManageContestDashboard from "./components/organizer/layout/tabcontent/manageContest/manageContestDashboard";
import ManageEventTabcontent from "./components/organizer/layout/tabcontent/manageEvent/manageEventTabContent";
import NomineeBoard from "./components/organizer/layout/tabcontent/manageContest/nominees/nomineeBoard";
import MainDashboard from "./components/organizer/layout/tabcontent/mainDashboard/mainDashboard";
import Nominees from "./components/voter/nominees";
import VoterLayout from "./components/voter/voterlayout";
import Categories from "./components/voter/categories";
import Checkout from "./components/voter/checkout";
import VoterHome from "./components/voter/homepage";
import SomeComponent from "./components/organizer/layout/tabcontent/manageContest/nominees/modaltest";
// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(
//   <React.StrictMode>
//     {/* <Layout /> */}
//     <AuthLayout />
//   </React.StrictMode>
// );

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

// src/main.jsx or src/App.jsx (depending on your setup)
import React from "react";
import ReactDOM from "react-dom/client";
import { Navigate } from "react-router-dom";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// import ManageEventTabcontent from "../layout/tabcontent/manageEvent/manageEventTabContent";
// import ProtectedRoute from "./components/protected-route";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Authpage />,
  },
  {
    path: "/home",
    element: <VoterLayout />,
    children: [
      { index: true, element: <VoterHome /> },
      { path: "categories", element: <Categories /> },
      { path: "nominees/:category", element: <Nominees /> },
      { path: "checkout/:nomineeId", element: <Checkout /> },
    ],
  },

  {
    path: "/dashboard",
    element: <Layout />,
    // element: <SomeComponent />,
    children: [
      {
        index: true,
        element: <MainDashboard />,
      },
      {
        path: "managecontest",
        element: <ManageContestDashboard />,
      },
      {
        path: "manageevent",
        element: <ManageEventTabcontent />,
      },
      {
        path: "nomineeboard",
        element: <NomineeBoard />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
