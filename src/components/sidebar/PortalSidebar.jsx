import "./PortalSidebar.css";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../../store/features/uiSlice";
import CreateTaskScreen from "../tasks/CreateTaskScreen";
import PortalSidebarBottom from "./PortalSidebarBottom";
import MenuItem from "./MenuItem";

function PortalSidebar() {
  const dispatch = useDispatch();
  const isOpen = useSelector((s) => s.ui.isSidebarOpen);
  const tasks = useSelector((s) => s.tasks.tasks);

  return (
    <>
      <div className={`PortalSidebar ${isOpen ? "is-open" : ""}`}>
        <div className="PortalSidebar-Header relative justify-between flex">
          <h1>My Tasks</h1>
          <div className="w-4 h-4 overflow-clip aspect-square flex justify-center items-center">
            <CreateTaskScreen text={""} />
          </div>
        </div>
        <div className="PortalSidebar-Body">
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
            <div className="PortalSidebar-item p-2 text-center text-gray-500">
              No tasks yet.
            </div>
          )}
        </div>
        <PortalSidebarBottom />
      </div>

      <div
        className={`PortalSidebar-backdrop ${isOpen ? "is-visible" : ""}`}
        onClick={() => dispatch(uiActions.closeSidebar())}
      ></div>
    </>
  );
}

export default PortalSidebar;
