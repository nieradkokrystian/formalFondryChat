import * as React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon, PlusCircledIcon } from "@radix-ui/react-icons";
import PopoverSettings from "./Popover";
import "../uiComponents/dialog.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../AuthContext";
import { create } from "../utils/createTask";
// You were importing the standard axios, which will not use the cache.
// import axios from "axios";
import axiosInstance from "./axios-cache"; // This is the key!

const CreateTaskScreen = ({ onTaskCreated }) => {
  const navigate = useNavigate();
  const { username, id } = useUser();
  const [TaskName, setTaskName] = useState("");
  const [TaskType, setTaskType] = useState("typeRefiner");
  const [taskList, setTaskList] = useState([]);
  const API_LINK = import.meta.env.VITE_API_BASE;

  console.log("id", id);

  React.useEffect(() => {
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

  const handleCreateTask = async () => {
    const finalTaskName = TaskName.trim() === "" ? `GetFourFirst()` : TaskName;

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
        id
      );
      console.log(`Task created with ID: ${newTask.taskId}`);

      if (newTask && newTask.taskId) {
        const newTaskId = newTask.taskId;
        console.log(`Task created with ID: ${newTaskId}, ID USER: ${id}`);
        onTaskCreated(newTask);
        navigate(`/chat/${newTaskId}`, {
          state: {
            TaskName: finalTaskName,
            TaskType,
            username: username,
          },
        });
        console.log("Task Created and navigating to ID:", newTaskId);
      } else {
        throw new Error("API did not return a valid task ID.");
      }
    } catch (error) {
      console.error("Failed to create task:", error);
    }
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="create-task-button">
          Create Task{" "}
          <PlusCircledIcon
            alignmentBaseline="center"
            style={{ fontSize: "18px", width: "18px", height: "18px" }}
          />{" "}
        </button>
      </Dialog.Trigger>
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
              value={TaskType}>
              {taskList.map((name, index) => {
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
            }}>
            <label htmlFor="settings" className="Label w-fit text-violet-500">
              Additional Settings
            </label>
            <PopoverSettings id="settings" />
          </div>

          <div
            style={{
              display: "flex",
              marginTop: 25,
              justifyContent: "flex-end",
            }}>
            <Dialog.Close asChild>
              <button
                className="Button green"
                type="submit"
                onClick={handleCreateTask}>
                Create Task
              </button>
            </Dialog.Close>
          </div>
          <Dialog.Close asChild>
            <button className="IconButtonClose" aria-label="Close">
              <Cross2Icon />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default CreateTaskScreen;
