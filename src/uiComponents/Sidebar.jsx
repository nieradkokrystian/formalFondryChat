// SidebarComponent.jsx
import { PlusIcon } from "@radix-ui/react-icons";
import "./sidebar.css";
import { Link } from "react-router-dom";
import Tooltip from "./Tooltip";

// Accept taskList as a prop
function SidebarComponent({ isOpen, onCreateNewTaskClick, taskList }) {
  const MenuItem = ({ title, running, id }) => {
    return (
      <Link
        className="h-full w-full Sidebar-item p-1 flex items-center justify-between"
        discover="none"
        to={`/chat/${id}`}
        prefetch="render"
        preventScrollReset>
        <h1>{title}</h1>
        <Tooltip running={running} />
      </Link>
    );
  };

  return (
    <div className={`Sidebar ${isOpen ? "is-open" : ""}`}>
      <div className="Sidebar-Header">
        <h1>My Tasks</h1>
        <button onClick={onCreateNewTaskClick}>
          <PlusIcon />
        </button>
      </div>
      <div className="Sidebar-Body">
        {Object.keys(taskList).map((key) => (
          <MenuItem
            key={key}
            title={taskList[key].taskId}
            running={taskList[key].taskStatus}
            id={taskList[key].taskId}
            type={taskList[key].taskType}
          />
        ))}
        {Object.keys(taskList).length === 0 && (
          <div className="Sidebar-item p-2 text-center text-gray-500">
            No tasks yet.
          </div>
        )}
      </div>
    </div>
  );
}

export default SidebarComponent;
