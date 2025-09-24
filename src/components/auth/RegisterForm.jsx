import { useState } from "react";
import { registerUser } from "../../api/auth";
import AuthFormInput from "./AuthFormInput";

function RegisterForm({ toggleMode }) {
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim() || !lastname.trim() || !email.trim()) {
      setErrorMessage("Please fill in all fields to register.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    setErrorMessage("");

    const registerData = { name, lastname, email };

    try {
      const response = await registerUser(registerData);

      if (response.status === "User created successfully") {
        toggleMode();
      } else {
        throw new Error("User not created");
      }
    } catch (error) {
      console.error("Registration failed: ", error);
      setErrorMessage("Registration failed. Please try again.");
    }
  };
  return (
    <form
      className="register-form bg-white w-full h-fit"
      onSubmit={handleSubmit}
      noValidate
    >
      <AuthFormInput
        text="Name"
        type="text"
        id={name}
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <AuthFormInput
        text="Lastname"
        type="text"
        id={lastname}
        value={lastname}
        onChange={(e) => setLastname(e.target.value)}
      />
      <AuthFormInput
        text="Email"
        type="email"
        id={email}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      {/* <label htmlFor="name" className="text-sm text-gray-600 tracking-wider">
        First Name:
      </label>
      <input
        type="text"
        id="name"
        value={name}
        className="inputButton g-blue-500 text-white font-bold py-2 rounded-lg px-3 transition duration-300 target-cursor outline-0"
        onChange={(e) => setName(e.target.value)}
      />

      <label
        htmlFor="lastname"
        className="text-sm text-gray-600 tracking-wider"
      >
        Last Name:
      </label>
      <input
        type="text"
        id="lastname"
        value={lastname}
        className="inputButton g-blue-500 text-white font-bold py-2 rounded-lg px-3 transition duration-300 target-cursor outline-0"
        onChange={(e) => setLastname(e.target.value)}
      />

      <label htmlFor="email" className="text-sm text-gray-600 tracking-wider">
        Email:
      </label>
      <input
        type="email"
        id="email"
        value={email}
        className="inputButton g-blue-500 text-white font-bold py-2 rounded-lg px-3 transition duration-300 target-cursor outline-0"
        onChange={(e) => setEmail(e.target.value)}
      /> */}

      {errorMessage && (
        <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
      )}

      <div className="w-fit mt-4 flex gap-3 items-center">
        <button type="submit">Register</button>
        <span>
          Already have an account?{" "}
          <a
            className="inline cursor-pointer underline text-purple-700"
            onClick={toggleMode}
          >
            Log in
          </a>
        </span>
      </div>
    </form>
  );
}

export default RegisterForm;
