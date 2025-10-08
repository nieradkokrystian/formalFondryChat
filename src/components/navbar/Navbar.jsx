import "./Navbar.css";
import { useDispatch } from "react-redux";
import { uiActions } from "../../store/features/uiSlice";
import { GridIcon } from "@radix-ui/react-icons";
import DropdownMenu from "./DropdownMenu";
import CreateTaskScreen from "../tasks/CreateTaskScreen";
import { useLocation } from "react-router";
import ChatLogSwitch from "./ChatLogSwitch";

const Navbar = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const isChatPath = location.pathname.includes("/chat");

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
      <div className="nav-wrap place-center">
        {isChatPath && <ChatLogSwitch />}
      </div>
      <div className="nav-wrap"></div>
    </nav>
  );
};

export default Navbar;
