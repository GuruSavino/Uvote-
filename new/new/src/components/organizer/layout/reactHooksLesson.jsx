import { useState, useEffect, createContext, useContext } from "react";

export default function HookLesson() {
  const userContext = createContext();

  const [userDetails, setuserDetails] = useState({
    username: "Kofi",
    userage: "24",
  });
  return (
    <userContext.Provider value={userDetails}>
      <h1>{`hello ${userDetails.username}`}</h1>
      <Component1 />
    </userContext.Provider>
  );
}

function Component1() {
  let [timer, setTimer] = useState(0);
  const upgrade = () => setTimer(timer++);
  //   useEffect(() => alert("i effect"));

  return (
    <div>
      {timer}
      <p>
        <button className="border p-5" onClick={() => setTimer(timer++)}>
          increase timer
        </button>
      </p>
      {/* <h1>{`hello ${userDetails.username}`}</h1> */}
    </div>
  );
}
