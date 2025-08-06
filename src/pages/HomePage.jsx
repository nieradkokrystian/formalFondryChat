// src/pages/HomePage.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../AuthContext"; // Import useUser hook
import axios from "axios";

const HomePage = () => {
  const navigate = useNavigate();
  const { username, isAuthReady } = useUser(); // Get username and auth readiness from context
  const [redirect, setRedirect] = useState("");
  const [value, setValue] = useState([]);

  useEffect(() => {
    // Only navigate if auth state is ready and username is not present
    if (isAuthReady && !username) {
      navigate("/login");
    }
  }, [username, isAuthReady, navigate]); // Add navigate to dependency array

  if (!isAuthReady) {
    return <div>Loading authentication state...</div>; // Or a loading spinner
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
    <div className="landing-page">
      <h1>Welcome, {username || "Guest"}!</h1> {/* Display username */}
      <p>This is your home page.</p>
    </div>
  );
};

export { HomePage };
