// import React from "react";
// import { Line } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";

// // Register ChartJS components
// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend
// );

// const LineChart = () => {
//   // Sample data
//   const data = {
//     labels: ["January", "February", "March", "April", "May", "June", "July"],
//     datasets: [
//       {
//         label: "Sales 2023",
//         data: [65, 59, 80, 81, 56, 55, 40],
//         fill: false,
//         backgroundColor: "rgb(75, 192, 192)",
//         borderColor: "rgba(75, 192, 192, 0.8)",
//         tension: 0.1,
//       },
//       {
//         label: "Sales 2022",
//         data: [28, 48, 40, 19, 86, 27, 90],
//         fill: false,
//         backgroundColor: "rgb(255, 99, 132)",
//         borderColor: "rgba(255, 99, 132, 0.8)",
//         tension: 0.1,
//       },
//     ],
//   };

//   const options = {
//     responsive: true,
//     plugins: {
//       legend: {
//         position: "top",
//       },
//       title: {
//         display: false,
//         text: "Sales Data",
//       },
//     },
//   };

//   return <Line data={data} options={options} />;
// };

// export default LineChart;

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
} from "chart.js";

// Register without Legend
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip
);

export default function LineChart() {
  const data = {
    labels: ["Mon", "Tue", "Wed", "Thurs", "Fri", "Sat", "Sun"],
    datasets: [
      {
        data: [65, 59, 80, 81, 56, 20, 58],
        borderColor: "rgb(75, 192, 192)",
      },
    ],
  };

  const options = {
    Response: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false, // Double protection
      },
    },
  };

  return <Line data={data} options={options} />;
}
