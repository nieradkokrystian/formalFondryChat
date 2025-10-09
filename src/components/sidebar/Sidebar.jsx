import "./Sidebar.css";
import {
  LogOut,
  ChevronLast,
  ChevronFirst,
  House,
  CirclePlus,
  Book,
} from "lucide-react";
import { useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { uiActions } from "../../store/features/uiSlice";
import { useUser } from "../../hooks/useUser";
import UserAvatar from "./UserAvatar";
import SidebarItem from "./SidebarItem";
import CreateTaskScreen from "../tasks/CreateTaskScreen";
import SidebarTaskItem from "./SidebarTaskItem";

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const tasks = useSelector((s) => s.tasks.tasks);
  const expanded = useSelector((s) => s.ui.isSidebarOpen);

  const { username, logout } = useUser();

  // const date = new Date();
  // const year = date.getFullYear();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <aside className={`sidebar ${expanded ? "expanded" : ""}`}>
      <nav className="sidebar-nav">
        {/* Logo */}
        <div className="sidebar-header">
          <img
            src="/formal-foundry-logo.svg"
            className={`sidebar-logo ${expanded ? "expanded" : "collapsed"}`}
            alt="logo"
          />
          <button
            onClick={() => dispatch(uiActions.toggleSidebar())}
            className="sidebar-toggle-btn"
          >
            {expanded ? <ChevronFirst /> : <ChevronLast />}
          </button>
        </div>

        {/* Items */}
        <div className="sidebar-items">
          <SidebarItem
            icon={<House size={20} />}
            text="Home"
            onClick={() => navigate("home")}
          />
          <SidebarItem
            icon={<Book size={20} />}
            text="Documentation"
            onClick={() => navigate("docs")}
          />
          <CreateTaskScreen
            text={
              <SidebarItem icon={<CirclePlus size={20} />} text="Add Task" />
            }
          />
        </div>

        <hr className="sidebar-divider" />

        {/* List */}
        <div className="sidebar-tasks-list">
          {expanded &&
            tasks.length > 0 &&
            tasks.map((task) => (
              <SidebarTaskItem key={task.task_Id} task={task} />
            ))}

          {expanded && !tasks.length && (
            <div className="sidebar-task-empty">No tasks yet</div>
          )}
        </div>

        <hr className="sidebar-divider" />

        {/* User */}
        <div className="sidebar-user">
          <UserAvatar name={username} />
          <div
            className={`sidebar-user-info ${
              expanded ? "expanded" : "collapsed"
            }`}
          >
            <div className="sidebar-username">{username}</div>
            <button onClick={handleLogout} className="sidebar-logout-btn">
              <LogOut size={20} />
            </button>
          </div>
        </div>

        {/* Policy */}
        {/* <div className="sidebar-policy">
          <div
            className={`sidebar-policy-content ${
              expanded ? "expanded" : "collapsed"
            }`}
          >
            <p>
              <Link className="sidebar-policy-link">
                Formal Foundry© {year}
              </Link>
            </p>
            <p>
              <Link className="sidebar-policy-link">Privacy Policy</Link>
            </p>
            <p>
              <Link className="sidebar-policy-link">Terms of Service</Link>
            </p>
          </div>
        </div> */}
      </nav>
    </aside>
  );
};

export default Sidebar;
