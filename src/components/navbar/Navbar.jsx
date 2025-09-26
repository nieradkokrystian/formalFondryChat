import "./Navbar.css";
import { useDispatch } from "react-redux";
import { uiActions } from "../../store/features/uiSlice";
import { GridIcon } from "@radix-ui/react-icons";
import DropdownMenu from "./DropdownMenu";
import CreateTaskScreen from "./CreateTaskScreen";

const Navbar = () => {
  const dispatch = useDispatch();

  return (
    <nav className="nav">
      <div className="nav-wrap">
        <button
          className="Sidebar-toggle cursor-target"
          onClick={() => dispatch(uiActions.openSidebar())}
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
