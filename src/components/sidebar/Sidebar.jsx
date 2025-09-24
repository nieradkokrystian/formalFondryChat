import { PlusIcon, InfoCircledIcon } from "@radix-ui/react-icons";
import "./Sidebar.css";
import { Link } from "react-router-dom";
import Tooltip from "./Tooltip";
import CreateTaskScreen from "../navbar/CreateTaskScreen";
import SidebarBottom from "./SidebarBottom";

function SidebarComponent({
  isOpen,
  // onCreateNewTaskClick,
  taskList,
  // id,
  onTaskCreated,
}) {
  const MenuItem = ({ title, status, id, type }) => {
    return (
      <Link
        className={`group relative h-[30px] pl-3 w-full Sidebar-item p-1 flex items-center justify-between last:mb-30 overflow-x-clip pr-3 cursor-target`}
        discover="none"
        to={`/chat/${id}`}
        prefetch="render"
        preventScrollReset
      >
        <div
          className={`orb w-2 h-2 rounded-full left-[1px] absolute  aspect-square ${
            status == "resolved"
              ? "bg-green-500"
              : status == "exceeded"
              ? "bg-red-500"
              : "bg-blue-400"
          }`}
        ></div>
        <h1 className="w-[70%] overflow-hidden">{title}</h1>

        <div className="hidden group-hover:block">
          <Tooltip type={type} status={status} />
        </div>
      </Link>
    );
  };

  return (
    <div className={`Sidebar ${isOpen ? "is-open" : ""}`}>
      <div className="Sidebar-Header relative justify-between flex">
        <h1>My Tasks</h1>
        <div className="w-4 h-4 overflow-clip aspect-square flex justify-center items-center">
          <CreateTaskScreen
            onTaskCreated={onTaskCreated}
            active={true}
            text={""}
          />
        </div>
      </div>
      <div className="Sidebar-Body ">
        {Object.keys(taskList).map((key) => (
          <MenuItem
            key={key}
            title={taskList[key].task_Name}
            status={taskList[key].task_Status}
            id={taskList[key].task_Id}
            type={taskList[key].task_Type}
          />
        ))}
        {Object.keys(taskList).length === 0 && (
          <div className="Sidebar-item p-2 text-center text-gray-500">
            No tasks yet.
          </div>
        )}
      </div>
      <SidebarBottom />
    </div>
  );
}

export default SidebarComponent;
