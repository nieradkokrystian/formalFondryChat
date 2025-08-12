import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LightRays from "../uiComponents/FUN";
import { useUser } from "../AuthContext";
import axios from "axios";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const { login } = useUser();
  const API_LINK = import.meta.env.VITE_API_BASE;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (username.trim() === "") {
      setErrorMessage("Please enter a username to log in.");
      return;
    }
    setErrorMessage("");

    try {
      const response = await axios.post(`${API_LINK}/auth`, {
        login: username,
      });
      if (response.status === 200) {
        const userId = response.data.user_id;
        login(username, userId);
        navigate("/home");
      }
    } catch (err) {
      setErrorMessage(
        "Something went wrong. Check your credentials again, and ensure they are correct."
      );
      console.error(err);
    }
  };

  return (
    <>
      <LightRays raysColor="#6b46c1" followMouse={true} />
      <div className="login-page relative p-0">
        <div className=" flex flex-col login-container-wrap p-4 fixed z-50 md:w-100 w-[90vw] h-fit bg-white items-start justify-start rounded-2xl shadow-lg contain-layout top-[50%] left-[50%] translate-[-50%]">
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
              )}
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

export default LoginPage;
