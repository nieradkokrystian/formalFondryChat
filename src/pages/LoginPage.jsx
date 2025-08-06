import { useState } from "react";
import ShinyText from "../uiComponents/ShinyText";
import "../App.css";
import { useNavigate } from "react-router-dom";
import Logo from "../uiComponents/Logo";
import { useUser } from "../AuthContext"; // Import useUser hook
import axios from "axios";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // State for error message
  const navigate = useNavigate();
  const { login } = useUser(); // Get the login function from context

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (username.trim() === "") {
      setErrorMessage("Please enter a username to log in."); // Set error message
      return;
    } else {
      const API_LINK = import.meta.env.VITE_API_BASE;

      // try {
      //   const response = await axios.post(`${API_LINK}/auth`, {
      //     login: username,
      //   });
      //   if (response.status === 200) {
      login(username);
      navigate("/home");
      //   }
      // } catch (err) {
      //   setErrorMessage("coś poszło nie tak.");
      //   console.error(err);
      // }
    }
  };

  return (
    <div className="login-page relative">
      <div className=" flex flex-col login-container-wrap p-4 fixed  w-100 h-fit bg-white items-start justify-start rounded-2xl shadow-lg contain-layout top-[50%] left-[50%] translate-[-50%]">
        <div className="w-fit h-fit rounded-2xl bg-white ">
          <h1 className="text-2xl tracking-wide flex w-fit text-blue-[var(color-primary)]">
            Please log in to continue
          </h1>
        </div>

        <div className="w-40 ">
          <form className="login-form bg-white " onSubmit={handleSubmit}>
            <label htmlFor="username" className="text-sm ">
              Username:
            </label>
            <input
              type="text"
              id="username"
              value={username}
              className=" inputButton g-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
              onChange={(e) => setUsername(e.target.value)}
            />
            {errorMessage && (
              <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
            )}{" "}
            <button className="bg-purple-400 " type="submit">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export { LoginPage };
