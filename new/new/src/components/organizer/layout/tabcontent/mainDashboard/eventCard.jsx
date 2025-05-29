// import { Link } from "react-router-dom";
// import { PencilSquareIcon, FilmIcon } from "@heroicons/react/24/outline";
// import { useLocation } from "react-router-dom";

// export default function EventCard({ title }) {
//   const location = useLocation();
//   console.log(location); // Check what path you're actually on
//   return (
//     <div className="bg-white border rounded shadow-sm">
//       <div className="p-6 text-center text-lg font-medium">{title}</div>
//       <div className="grid grid-cols-2 gap-0 text-white text-center p-0 text-sm">
//         <Link to="/dashboard/manageevent">
//           <p className="w-full py-3 bg-indigo-500">
//             <FilmIcon className=" inline size-7 pe-2 m-0" />
//             Manage Event
//           </p>
//         </Link>
//         <p className="w-full py-3 bg-gray-600">
//           <PencilSquareIcon className=" inline size-7 pe-2 m-0" />
//           Modify Event
//         </p>
//       </div>
//     </div>
//   );
// }

import { Link } from "react-router-dom";
import { PencilSquareIcon, FilmIcon } from "@heroicons/react/24/outline";

export default function EventCard({ title }) {
  return (
    <div className="bg-white rounded drop-shadow-sm">
      <div className="p-6 text-center text-lg font-medium">{title}</div>
      <div className="grid grid-cols-2 gap-0 text-white text-center p-0 text-sm">
        <Link to="/dashboard/manageevent">
          <div className="block w-full py-3 bg-orange-600 hover:bg-orange-700 no-underline">
            <FilmIcon className="inline size-7 pe-2" />
            Manage Event
          </div>
        </Link>
        <div className="w-full">
          <button className="w-full py-3 bg-gray-600 hover:bg-gray-700">
            <PencilSquareIcon className="inline size-7 pe-2" />
            Modify Event
          </button>
        </div>
      </div>
    </div>
  );
}
