import "./Sidebar.css";
import { useSelector } from "react-redux";
import CreateTaskScreen from "../navbar/CreateTaskScreen";
import SidebarBottom from "./SidebarBottom";
import MenuItem from "./MenuItem";

function Sidebar({ isOpen }) {
  const tasks = useSelector((s) => s.tasks.tasks);

  return (
    <div className={`Sidebar ${isOpen ? "is-open" : ""}`}>
      <div className="Sidebar-Header relative justify-between flex">
        <h1>My Tasks</h1>
        <div className="w-4 h-4 overflow-clip aspect-square flex justify-center items-center">
          <CreateTaskScreen text={""} />
        </div>
      </div>
      <div className="Sidebar-Body">
        {tasks.length > 0 &&
          tasks.map((task) => (
            <MenuItem
              key={task.task_Id}
              title={task.task_Name}
              status={task.task_Status}
              id={task.task_Id}
              type={task.task_Type}
            />
          ))}

        {!tasks.length && (
          <div className="Sidebar-item p-2 text-center text-gray-500">
            No tasks yet.
          </div>
        )}
      </div>
      <SidebarBottom />
    </div>
  );
}

export default Sidebar;
