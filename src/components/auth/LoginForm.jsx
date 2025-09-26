import { useState } from "react";
import { useNavigate } from "react-router";
import { useUser } from "../../hooks/useUser";
import { loginUser } from "../../api/auth";
import AuthFormInput from "./AuthFormInput";

function LoginForm({ toggleMode }) {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const { login } = useUser();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (username.trim() === "") {
      setErrorMessage("Please enter a username to log in.");
      return;
    }
    setErrorMessage("");

    try {
      const response = await loginUser(username);
      const userId = response.user_id;
      login(username, userId);
      navigate("/home");
    } catch (error) {
      console.error("Authentication failed: ", error);
      setErrorMessage(
        "Something went wrong. Check your credentials again, and ensure they are correct."
      );
    }
  };

  return (
    <form className="login-form bg-white w-full h-fit" onSubmit={handleSubmit}>
      <AuthFormInput
        text="Username"
        type="text"
        id={username}
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      {errorMessage && (
        <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
      )}

      <div className="w-fit mt-4 flex gap-3 items-center">
        <button className="auth-submit-btn" type="submit">
          Login
        </button>
        <span>
          Don't have an account?{" "}
          <a
            className="inline cursor-pointer underline text-purple-700"
            onClick={toggleMode}
          >
            Register
          </a>
        </span>
      </div>
    </form>
  );
}

export default LoginForm;
