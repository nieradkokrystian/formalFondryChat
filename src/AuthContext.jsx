// src/AuthContext.js
import React, { createContext, useState, useEffect, useContext } from "react";

// Create a Context object for user authentication
const UserContext = createContext(null);

/**
 * UserProvider component to manage and provide user authentication state.
 * It uses localStorage to persist the username across sessions.
 * @param {object} { children } - React children to be rendered within the provider' */
export const UserProvider = ({ children }) => {
  // State to hold the current username
  const [username, setUsername] = useState(null);
  // State to track if the authentication state has been initialized (e.g., from localStorage)
  const [isAuthReady, setIsAuthReady] = useState(false);

  // Effect to load username from localStorage on initial component mount
  useEffect(() => {
    try {
      const storedUsername = localStorage.getItem("username");
      if (storedUsername) {
        setUsername(storedUsername);
      }
    } catch (error) {
      console.error("Failed to load username from localStorage:", error);
    } finally {
      setIsAuthReady(true); // Mark authentication as ready after attempting to load
    }
  }, []);

  /**
   * Function to handle user login.
   * Stores the username in state and localStorage.
   * @param {string} name - The username to set
   */
  const login = (name) => {
    setUsername(name);
    try {
      localStorage.setItem("username", name);
    } catch (error) {
      console.error("Failed to save username to localStorage:", error);
    }
  };

  /**
   * Function to handle user logout.
   * Clears the username from state and localStorage.
   */
  const logout = () => {
    setUsername(null);
    try {
      localStorage.removeItem("username");
    } catch (error) {
      console.error("Failed to remove username from localStorage:", error);
    }
  };

  // Provide the username, login, logout functions, and auth readiness status to children
  return (
    <UserContext.Provider value={{ username, login, logout, isAuthReady }}>
      {children}
    </UserContext.Provider>
  );
};

/**
 * Custom hook to consume the UserContext.
 * Provides easy access to username, login, and logout functions.
 * @returns {object} - An object containing username, login, logout, and isAuthReady
 */
export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
