import { PlusCircledIcon, GridIcon } from "@radix-ui/react-icons";
import "./Navbar.css";
import DropdownMenu from "./DropdownMenu";
import CreateTaskScreen from "./CreateTaskScreen";
import { useUser } from "../../hooks/useUser";

const Navbar = ({ onToggleSidebar, onTaskCreated, id }) => {
  const { username } = useUser();

  return (
    <nav className="nav">
      <div className="nav-wrap">
        <button
          className="Sidebar-toggle cursor-target"
          onClick={onToggleSidebar}
        >
          <GridIcon width={20} height={20} />
        </button>

        <DropdownMenu username={username} />

        <CreateTaskScreen
          active={true}
          id={id}
          text={"Create Task"}
          onTaskCreated={onTaskCreated}
        />
      </div>
    </nav>
  );
};

export default Navbar;
