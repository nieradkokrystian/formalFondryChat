import "./App.css";
import { useUser } from "./hooks/useUser";
import { useEffect } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getTasks } from "./store/features/tasksSlice";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import ChatPage from "./pages/ChatPage";
import Admin from "./pages/AdminPage";
import Navbar from "./components/navbar/Navbar";
import Sidebar from "./components/sidebar/Sidebar";
import DocsLayout from "./pages/DocsLayout";

function App() {
  const dispatch = useDispatch();
  const location = useLocation();

  const { username, id, isAuthReady } = useUser();

  useEffect(() => {
    if (!username || !id) return;

    async function fetchTasksList() {
      try {
        await dispatch(getTasks(id)).unwrap();
      } catch (error) {
        console.error("Failed to fetch task list: ", error);
      }
    }

    fetchTasksList();
  }, [dispatch, username, id]);

  if (!isAuthReady) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-lg text-gray-700">Loading application...</p>
      </div>
    );
  }

  const isAuthenticated = username && id != undefined;

  return (
    <div className="app-layout">
      {isAuthenticated && !location.pathname.includes("/docs") && <Sidebar />}

      <div className="main-content">
        {isAuthenticated && location.pathname.includes("/chat") && <Navbar />}

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
            <Route path="/docs/*" element={<DocsLayout />} />
            <Route path="/chat/:chatId" element={<ChatPage />} />

            <Route
              path="/admin/326483545732548981349134gfjkdgf4783gf7ig437fg437fg437f64gf874fgohurghdf78gdft7gfd87ogoftd67"
              element={<Admin />}
            />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        )}
      </div>
    </div>
  );
}

export default App;
