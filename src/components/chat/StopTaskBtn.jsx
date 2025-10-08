import { useParams } from "react-router";
import { stopTask } from "../../api/tasks";

const StopTaskBtn = () => {
  const { chatId } = useParams();

  const handleStopTask = async () => {
    if (!chatId) return;

    try {
      await stopTask(chatId);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="stop-task-btn" onClick={handleStopTask}>
      Stop Task
    </div>
  );
};

export default StopTaskBtn;
