// AuthContext.jsx
import { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [username, setUsername] = useState(null);
  // Add a new state for the user ID
  const [id, setId] = useState(null);
  const [isAuthReady, setIsAuthReady] = useState(false);

  useEffect(() => {
    // Check for both username and ID in local storage
    const storedUsername = localStorage.getItem("username");
    const storedId = localStorage.getItem("id");
    if (storedUsername) {
      setUsername(storedUsername);
      // Set the ID from local storage
      setId(storedId);
    }
    setIsAuthReady(true);
  }, []);

  // Update the login function to accept and save the ID
  const login = (newUsername, newId) => {
    setUsername(newUsername);
    setId(newId);
    localStorage.setItem("username", newUsername);
    localStorage.setItem("id", newId);
  };

  const logout = () => {
    setUsername(null);
    setId(null);
    localStorage.removeItem("username");
    localStorage.removeItem("id");
  };

  return (
    <UserContext.Provider value={{ username, id, login, logout, isAuthReady }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
