import "./Navbar.css";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import ChatLogSwitch from "./ChatLogSwitch";

const Navbar = () => {
  const location = useLocation();
  const isSidebarOpen = useSelector((s) => s.ui.isSidebarOpen);
  const isChatPath = location.pathname.includes("/chat");

  return (
    <nav className={`nav ${isSidebarOpen ? "sidebar-open" : ""}`}>
      <div className="nav-wrap place-center">
        {isChatPath && <ChatLogSwitch />}
      </div>
    </nav>
  );
};

export default Navbar;
