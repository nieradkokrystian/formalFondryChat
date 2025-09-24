import App from "./App.jsx";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { UserProvider } from "./context/AuthContext.jsx";
import { BrowserRouter } from "react-router";

import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </UserProvider>
  </StrictMode>
);
