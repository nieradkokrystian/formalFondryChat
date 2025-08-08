// src/uiComponents/Navbar.jsx
import { PlusCircledIcon, GridIcon } from "@radix-ui/react-icons";
import "../styles/navbar.css";
import "./sidebar.css";
import DropdownMenuDemo from "./DropdownMenu";
import CreateTaskScreen from "./CreateTaskScreen";
import { useUser } from "../AuthContext";

const Navbar = ({ onToggleSidebar, onTaskCreated, id }) => {
  const { username } = useUser();

  return (
    <nav className="nav">
      <div className="nav-wrap">
        <button className="Sidebar-toggle" onClick={onToggleSidebar}>
          <GridIcon width={20} height={20} />
        </button>
        <div className="nav-links">
          <li>
            <DropdownMenuDemo username={username} />
          </li>
        </div>
        <ul className="nav-links">
          <li>
            <CreateTaskScreen id={id} onTaskCreated={onTaskCreated} />
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
