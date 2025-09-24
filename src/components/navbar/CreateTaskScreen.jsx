import "./CreateTaskScreen.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useUser } from "../../hooks/useUser";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon, PlusCircledIcon } from "@radix-ui/react-icons";
import { createTask, fetchAvailableTasks } from "../../api/tasks";
import Popover from "./Popover";

const CreateTaskScreen = ({ text, active }) => {
  const navigate = useNavigate();
  const { username, id, logout } = useUser();
  const [taskName, setTaskName] = useState("");
  const [taskType, setTaskType] = useState("typeRefiner");
  const [taskList, setTaskList] = useState([]);
  const [provider, setProvider] = useState("OpenAI");
  const [model, setModel] = useState("gpt-3");
  const [prompt, setPrompt] = useState("");

  function isJson(str) {
    try {
      JSON.parse(str);
      return true;
    } catch {
      return false;
    }
  }

  useEffect(() => {
    const fetchAvTasks = async () => {
      try {
        const avTasks = await fetchAvailableTasks();
        setTaskList(avTasks);
      } catch (error) {
        console.error("Failed to fetch available tasks: ", error);
      }
    };

    fetchAvTasks();
  }, []);

  const handleCreateTask = async (e) => {
    if (isJson(prompt)) {
      const uniqueId = Math.random().toString(36).substring(2, 9);

      const finalTaskName = taskName.trim() === "" ? uniqueId : taskName;

      if (!username) {
        console.warn("User not logged in. Cannot create chat task.");
        logout();
        navigate("/login");
        return;
      }

      try {
        const newTask = await createTask(
          taskType,
          finalTaskName,
          id,
          provider,
          model
        );

        if (newTask && newTask.taskId) {
          const newTaskId = newTask.taskId;

          navigate(`/chat/${newTaskId}`, {
            state: {
              TaskName: finalTaskName,
              TaskType: taskType,
              username: username,
            },
          });
        } else {
          throw new Error("API did not return a valid task ID.");
        }
      } catch (error) {
        console.error("Failed to create task:", error);
      }
    } else {
      e.preventDefault();

      toast.error("Invalid JSON format. Please check your input.", {
        position: "bottom-left",
        closeOnClick: true,
        autoClose: 1000,
        theme: "colored",
        className: " toast-1232",
      });
    }
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="create-task-button lg:text-lg text-sm cursor-target">
          {text}
          <PlusCircledIcon
            alignmentBaseline="center"
            style={{ fontSize: "18px", width: "18px", height: "18px" }}
          />
        </button>
      </Dialog.Trigger>
      {active && (
        <Dialog.Portal>
          <Dialog.Overlay className="DialogOverlay" />
          <Dialog.Content className="DialogContent">
            <Dialog.Title className="DialogTitle">Create Task</Dialog.Title>
            <Dialog.Description className="DialogDescription">
              Bring your new task to life here! Click create when you're done.
            </Dialog.Description>
            <fieldset className="Fieldset">
              <label className="Label" htmlFor="Name">
                Task Name
              </label>
              <input
                className="Input"
                type="text"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
                placeholder="If empty, we'll set it to a generated name"
              />
            </fieldset>

            <fieldset className="Fieldset">
              <label className="Label" htmlFor="Type">
                Task Type
              </label>
              <select
                name="Type"
                className="Input"
                id="Type"
                onChange={(e) => setTaskType(e.target.value)}
                value={taskType}
              >
                {taskList?.map((name, index) => {
                  return (
                    <option key={index} value={name}>
                      {name}
                    </option>
                  );
                })}
              </select>
            </fieldset>
            <div
              style={{
                display: "flex",
                marginTop: 25,
                justifyContent: "end",
                alignItems: "center",
                width: "100%",
                gap: 10,
              }}
            >
              <label htmlFor="settings" className="Label w-fit text-violet-500">
                Additional Settings
              </label>
              <Popover
                setProvider={setProvider}
                setModel={setModel}
                setPrompt={setPrompt}
                prompt={prompt}
                id="settings"
              />
            </div>

            <div
              style={{
                display: "flex",
                marginTop: 25,
                justifyContent: "flex-end",
              }}
            >
              <Dialog.Close asChild>
                <button
                  className="Button green"
                  type="submit"
                  onClick={handleCreateTask}
                >
                  Create Task
                </button>
              </Dialog.Close>
            </div>
            <Dialog.Close asChild>
              <button className="IconButtonClose" aria-label="Close">
                <Cross2Icon />
              </button>
            </Dialog.Close>
            <ToastContainer
              position="bottom-left"
              closeOnClick
              autoClose={17000}
              className="toast-1232"
            />
          </Dialog.Content>
        </Dialog.Portal>
      )}
    </Dialog.Root>
  );
};

export default CreateTaskScreen;
