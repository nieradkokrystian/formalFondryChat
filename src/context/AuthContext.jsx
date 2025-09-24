import { createContext, useState, useEffect } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [username, setUsername] = useState(null);
  const [id, setId] = useState(null);
  const [isAuthReady, setIsAuthReady] = useState(false);

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    const storedId = localStorage.getItem("id");

    if (storedUsername) {
      setUsername(storedUsername);
      setId(storedId);
    }

    setIsAuthReady(true);
  }, []);

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

export default UserContext;
