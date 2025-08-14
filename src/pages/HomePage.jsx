import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../AuthContext";
import axios from "axios";

const HomePage = () => {
  const navigate = useNavigate();
  const { username, isAuthReady } = useUser();
  const [redirect, setRedirect] = useState("");
  const [value, setValue] = useState([]);

  useEffect(() => {
    if (isAuthReady && !username) {
      navigate("/login");
    }
  }, [username, isAuthReady, navigate]);

  if (!isAuthReady) {
    return <div>Loading authentication state...</div>;
  }

  // useEffect(() => {
  //   const API_LINK = import.meta.env.VITE_API_BASE;
  //   axios.get(`${API_LINK}/tasks`).then((response) => {
  //     setValue(response.data);
  //     console.log("data", response.data);
  //     navigate(`/chat/${getLastId(value)}`);
  //   });
  // }, []);

  // function getLastId(list) {
  //   console.log(Object.values(list));
  //   return Object.values(list).length > 0
  //     ? list[Object.values(list) - 1].taskId
  //     : 1;
  // }

  return (
    <div className="landing-page m-auto p-8 rounded-2xl  bg-purple-200 w-2xl h-2xl mt-100">
      <h1 className="text-3xl mb-3">Welcome, {username || "Guest"}!</h1>{" "}
      <p className="text-lg">
        This is a homepage. To access{" "}
        <span className="text-white p-1 rounded-sm bg-pink-500">tasks</span> ,
        choose a chat from existing, or create a new one.
      </p>
    </div>
  );
};

export { HomePage };
