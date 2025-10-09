import "./SidebarTaskItem.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { uiActions } from "../../store/features/uiSlice";
import Tooltip from "./Tooltip";

const SidebarTaskItem = ({ task }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const findStatusColor = () => {
    const status = task.task_Status;
    if (status === "resolved") return "bg-green-500";
    if (status === "exceeded") return "bg-red-500";
    if (status === "stopped") return "bg-slate-500";
    return "bg-blue-400";
  };

  return (
    <div
      className="sidebar-task-item"
      onClick={() => {
        navigate(`chat/${task.task_Id}`);
        dispatch(uiActions.disableLogView());
      }}
    >
      <div className={`task-item-circle ${findStatusColor()}`} />

      <div className="task-item-text">{task.task_Name}</div>

      <div className="task-item-status">
        <Tooltip type={task.task_Type} status={task.task_Status} />
      </div>
    </div>
  );
};

export default SidebarTaskItem;
