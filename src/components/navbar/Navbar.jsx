import "./Navbar.css";
import { useDispatch } from "react-redux";
import { uiActions } from "../../store/features/uiSlice";
import { GridIcon } from "@radix-ui/react-icons";
import DropdownMenu from "./DropdownMenu";
import CreateTaskScreen from "./CreateTaskScreen";
import ChatLimitCheckbox from "./ChatLimitCheckbox";
import { useLocation } from "react-router";
import ChatLogSwitch from "./ChatLogSwitch";

const Navbar = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  return (
    <nav className="nav">
      <div className="nav-wrap">
        <button
          className="navbar-btn toggle"
          onClick={() => dispatch(uiActions.openSidebar())}
        >
          <GridIcon width={20} height={20} />
        </button>
        <DropdownMenu />

        <CreateTaskScreen text={"Create Task"} />
      </div>
      <div className="nav-wrap">
        {location.pathname.includes("/chat") && <ChatLogSwitch />}
      </div>
      <div className="nav-wrap">
        {location.pathname.includes("/chat") && <ChatLimitCheckbox />}
      </div>
    </nav>
  );
};

export default Navbar;
