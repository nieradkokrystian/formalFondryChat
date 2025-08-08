// SidebarComponent.jsx
import { PlusIcon } from "@radix-ui/react-icons";
import "./sidebar.css";
import { Link } from "react-router-dom";
import Tooltip from "./Tooltip";

// Accept taskList as a prop
function SidebarComponent({ isOpen, onCreateNewTaskClick, taskList, id }) {
  const MenuItem = ({ title, status, id, type }) => {
    return (
      <Link
        className={` h-[30px] w-full Sidebar-item p-1 flex items-center justify-between last:mb-30 ${
          status == "resolved"
            ? "bg-green-100"
            : "" || status == "exceeded"
            ? "bg-red-100"
            : ""
        }`}
        discover="none"
        to={`/chat/${id}`}
        prefetch="render"
        preventScrollReset>
        {console.log(title)}
        <h1>{title}</h1>
        <p>{type}</p>

        <Tooltip status={status} />
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
          <>
            {taskList[key].user_id == id ? (
              <MenuItem
                key={key}
                title={taskList[key].task_name}
                status={taskList[key].taskStatus}
                id={taskList[key].userId}
                type={taskList[key].taskType}
              />
            ) : (
              ""
            )}{" "}
          </>
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
