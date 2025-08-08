import "./App.css";
import { LoginPage } from "./pages/LoginPage";
import { HomePage } from "./pages/HomePage";
import { Chat } from "./pages/Chat";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./uiComponents/Navbar";
import { UserProvider, useUser } from "./AuthContext";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import SidebarComponent from "./uiComponents/Sidebar";

function AppContent() {
  const { username, isAuthReady } = useUser();
  const [taskList, setTaskList] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [id, setId] = useState("");
  const API_LINK = import.meta.env.VITE_API_BASE;

  const fetchTaskList = useCallback(async () => {
    try {
      const response = await axios.get(`${API_LINK}/tasks/${id}`);
      setTaskList(response.data);
    } catch (error) {
      console.error("Failed to fetch task list:", error);
    }
  }, [API_LINK]);

  useEffect(() => {
    fetchTaskList();
  }, [fetchTaskList]);

  if (!isAuthReady) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-lg text-gray-700">Loading application...</p>
      </div>
    );
  }

  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      {username && (
        <>
          <SidebarComponent
            isOpen={isSidebarOpen}
            taskList={taskList}
            id={id}
            onToggleSidebar={handleToggleSidebar}
          />
          <div
            className={`Sidebar-backdrop ${isSidebarOpen ? "is-visible" : ""}`}
            onClick={handleToggleSidebar}></div>
        </>
      )}
      <div className={`main-content ${isSidebarOpen ? "main-content" : ""}`}>
        {username && (
          <Navbar
            id={id}
            onToggleSidebar={handleToggleSidebar}
            onTaskCreated={fetchTaskList}
          />
        )}
        <Routes>
          <Route path="/" element={<LoginPage setId={setId} />} />
          <Route path="/login" element={<LoginPage setId={setId} />} />
          <Route path="/home" element={<HomePage />} />
          <Route
            path="/chat/:chatId"
            element={
              <Chat
                id={id}
                isSidebarOpen={isSidebarOpen}
                onToggleSidebar={handleToggleSidebar}
                onTaskCreated={fetchTaskList}
              />
            }
          />
        </Routes>
      </div>
    </>
  );
}

function App() {
  return (
    <UserProvider>
      <Router>
        <AppContent />
      </Router>
    </UserProvider>
  );
}

export default App;
