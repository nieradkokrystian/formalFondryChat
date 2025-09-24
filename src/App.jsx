import "./App.css";
import { useUser } from "./hooks/useUser";
import { useState, useEffect, useCallback } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import Chat from "./pages/ChatPage";
import Admin from "./pages/AdminPage";
import Docs from "./pages/DocsPage";
import Navbar from "./components/navbar/Navbar";
import Sidebar from "./components/sidebar/Sidebar";
import Introduction from "./documentation/mdxPages/Introduction.mdx";
import { fetchTasks } from "./api/tasks";

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const [taskList, setTaskList] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { username, id, isAuthReady } = useUser();

  const fetchTaskList = useCallback(async () => {
    if (id) {
      try {
        const userTasks = await fetchTasks(id);
        setTaskList(userTasks);
      } catch (error) {
        console.error("Failed to fetch task list: ", error);
      }
    }
  }, [id]);

  useEffect(() => {
    if (username) {
      fetchTaskList();
    } else if (isAuthReady) {
      navigate("/");
    }
  }, [username, isAuthReady, fetchTaskList, navigate]);

  if (!isAuthReady) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-lg text-gray-700">Loading application...</p>
      </div>
    );
  }

  const handleToggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  const isAuthenticated = username && id != undefined;

  return (
    <>
      {isAuthenticated && (
        <>
          <Sidebar
            isOpen={isSidebarOpen}
            taskList={taskList}
            id={id}
            onToggleSidebar={handleToggleSidebar}
          />
          <div
            className={`Sidebar-backdrop ${isSidebarOpen ? "is-visible" : ""}`}
            onClick={handleToggleSidebar}
          ></div>
        </>
      )}

      <div className={`main-content ${isSidebarOpen ? "main-content" : ""}`}>
        {isAuthenticated && !location.pathname.includes("/docs") && (
          <Navbar
            id={id}
            onToggleSidebar={handleToggleSidebar}
            onTaskCreated={fetchTaskList}
          />
        )}

        {!isAuthenticated && (
          <Routes>
            <Route path="*" element={<AuthPage />} />
            <Route path="/login" element={<AuthPage />} />
          </Routes>
        )}

        {isAuthenticated && (
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/docs">
              <Route index element={<Docs />} />
              <Route
                path="introduction"
                element={<Docs page={<Introduction />} />}
              />
            </Route>

            <Route path="/chat/:chatId" element={<Chat />} />

            <Route
              path="/admin/326483545732548981349134gfjkdgf4783gf7ig437fg437fg437f64gf874fgohurghdf78gdft7gfd87ogoftd67"
              element={<Admin />}
            />

            <Route path="*" element={<HomePage />} />
          </Routes>
        )}
      </div>
    </>
  );
}

export default App;
