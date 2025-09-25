import { GridIcon } from "@radix-ui/react-icons";
import "./Navbar.css";
import DropdownMenu from "./DropdownMenu";
import CreateTaskScreen from "./CreateTaskScreen";

const Navbar = ({ onToggleSidebar }) => {
  return (
    <nav className="nav">
      <div className="nav-wrap">
        <button
          className="Sidebar-toggle cursor-target"
          onClick={onToggleSidebar}
        >
          <GridIcon width={20} height={20} />
        </button>

        <DropdownMenu />

        <CreateTaskScreen text={"Create Task"} />
      </div>
    </nav>
  );
};

export default Navbar;
