import { useState } from "react";

import "../App.css";
import { useNavigate } from "react-router-dom";
import LightRays from "../uiComponents/FUN";
import { useUser } from "../AuthContext"; // Import useUser hook
import axios from "axios";

const LoginPage = ({ setId }) => {
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

      try {
        const response = await axios.post(`${API_LINK}/auth`, {
          login: username,
        });
        if (response.status === 200) {
          login(username);
          setId(response.data.user_id);

          navigate("/home", {
            state: { username: username },
          });
        }
      } catch (err) {
        setErrorMessage(
          "coś poszło nie tak. Sprawdź swoje dane, i spróbuj ponownie"
        );
        console.error(err);
      }
    }
  };

  return (
    <>
      <LightRays
        raysColor="#6b46c1"
        // className="bg-white"

        followMouse={true}
        pulsating={true}
        rayLength={6}
      />
      <div className="login-page relative p-0 ">
        <div className=" flex flex-col login-container-wrap p-4 fixed  md:w-100 w-[90vw] h-fit bg-white items-start justify-start rounded-2xl shadow-lg contain-layout top-[50%] left-[50%] translate-[-50%]">
          <div className="w-fit h-fit rounded-2xl bg-white ">
            <h1 className="text-2xl tracking-wide flex text-shadow-white  w-fit text-blue-[var(color-primary)]">
              Please log in to continue
            </h1>
          </div>

          <div className="w-fit ">
            <form
              className="login-form bg-white w-full h-fit "
              onSubmit={handleSubmit}>
              <label
                htmlFor="username"
                className="text-sm text-gray-600 tracking-wider">
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
    </>
  );
};

export { LoginPage };
