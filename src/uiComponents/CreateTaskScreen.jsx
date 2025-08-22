import * as React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon, PlusCircledIcon } from "@radix-ui/react-icons";
import PopoverSettings from "./Popover";
import "../uiComponents/dialog.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../AuthContext";
import { create } from "../utils/createTask";
import { ToastContainer, toast } from "react-toastify";
import axiosInstance from "./axios-cache";

const CreateTaskScreen = ({ onTaskCreated, text, active }) => {
  const navigate = useNavigate();
  const { username, id } = useUser();
  const [TaskName, setTaskName] = useState("");
  const [TaskType, setTaskType] = useState("typeRefiner");
  const [taskList, setTaskList] = useState([]);
  const [provider, setProvider] = useState("OpenAI");
  const [model, setModel] = useState("gpt-3");
  const [prompt, setPrompt] = useState("");
  const API_LINK = import.meta.env.VITE_API_BASE;
  console.log(taskList);
  function isJson(str) {
    try {
      JSON.parse(str);
      return true;
    } catch (e) {
      return false;
    }
  }

  useEffect(() => {
    const fetchAvailableTasks = async () => {
      try {
        const response = await axiosInstance.get(`${API_LINK}/availableTasks`);
        setTaskList(response.data);
      } catch (error) {
        console.error("Failed to fetch available tasks:", error);
      }
    };
    fetchAvailableTasks();
  }, [API_LINK]);

  const handleCreateTask = async (e) => {
    if (isJson(prompt)) {
      const uniqueId = Math.random().toString(36).substring(2, 9);

      const finalTaskName = TaskName.trim() === "" ? uniqueId : TaskName;

      if (!username) {
        console.warn("User not logged in. Cannot create chat task.");
        navigate("/login");
        return;
      }

      try {
        const newTask = await create(
          `${API_LINK}/tasks`,
          TaskType,
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
              TaskType,
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
          />{" "}
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
                value={TaskType}
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
              <PopoverSettings
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
