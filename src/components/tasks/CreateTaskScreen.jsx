import "./CreateTaskScreen.css";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useUser } from "../../hooks/useUser";
import { Dialog } from "radix-ui";
import { Cross2Icon, PlusCircledIcon } from "@radix-ui/react-icons";
import { createTask, fetchAvailableTypes, fetchLlmList } from "../../api/tasks";
import CreateTaskJsonEditor from "./CreateTaskJsonEditor";
import { useDispatch } from "react-redux";
import { uiActions } from "../../store/features/uiSlice";
import { useNavigate } from "react-router";
import { getTasks } from "../../store/features/tasksSlice";
const API_GPT_KEY = import.meta.env.VITE_API_GPT_KEY;

const CreateTaskScreen = ({ text }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useUser();
  const [taskName, setTaskName] = useState("");
  const [taskType, setTaskType] = useState();
  const [avTypes, setAvTypes] = useState([]);
  const [availableModels, setAvailableModels] = useState([]);
  const [model, setModel] = useState("");
  const [prompt, setPrompt] = useState();

  const handleOpen = async (open) => {
    if (open) {
      try {
        const types = await fetchAvailableTypes();
        if (types.length > 0) {
          setAvTypes(types);
          setTaskType(types[0]);
          setPrompt(types[0].envExample);
        }
      } catch (error) {
        console.error("Failed to fetch available types: ", error);
      }

      try {
        const list = await fetchLlmList();
        if (list.length > 0) {
          const provider = list.find((prov) => prov.provider_name === "OpenAI");
          setAvailableModels(provider.models);
          setModel(provider.models[0]);
          setPrompt((prev) => ({ ...prev, _llmModel: provider.models[0] }));
        }
      } catch (error) {
        console.error("Failed to fetch LLM list:", error);
      }
    } else {
      resetModal();
    }
  };

  const handleCreateTask = async (e) => {
    if (!id) return;

    const uniqueId = Math.random().toString(36).substring(2, 9);
    const finalTaskName = taskName.trim() === "" ? uniqueId : taskName;

    const taskData = {
      task_type: taskType.taskName,
      task_name: finalTaskName,
      user_id: +id,
      envStart: { ...prompt, _apiGptKey: API_GPT_KEY },
    };

    try {
      const newTask = await createTask(taskData);

      if (newTask && newTask?.taskId) {
        const newTaskId = newTask.taskId;

        navigate(`/chat/${newTaskId}`);
        await dispatch(getTasks(id));
      } else {
        throw new Error("API did not return a valid task ID.");
      }
    } catch (error) {
      e.preventDefault();

      console.error("Failed to create task:", error);

      toast.error("Failed to create task. Please try again.", {
        position: "bottom-left",
        closeOnClick: true,
        autoClose: 1000,
        theme: "colored",
        className: " toast-1232",
      });
    }
  };

  const resetModal = () => {
    setTaskName("");
    setTaskType(undefined);
    setAvTypes([]);
    setAvailableModels([]);
    setModel("");
    setPrompt(undefined);
  };

  return (
    <Dialog.Root onOpenChange={handleOpen}>
      <Dialog.Trigger asChild>
        <button
          className="navbar-btn"
          onClick={() => dispatch(uiActions.closeSidebar())}
        >
          {text}
          <PlusCircledIcon
            alignmentBaseline="center"
            style={{ fontSize: "18px", width: "18px", height: "18px" }}
          />
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
            <label className="Label" htmlFor="name">
              Task Name
            </label>
            <input
              name="name"
              id="name"
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
              value={taskType?.taskName}
              onChange={(e) => {
                const type = avTypes.find((t) => t.taskName === e.target.value);
                setTaskType(type);
                setPrompt({ ...type.envExample, _llmModel: model });
              }}
            >
              {avTypes?.map((type) => {
                return (
                  <option key={type.taskName} value={type.taskName}>
                    {type.taskName}
                  </option>
                );
              })}
            </select>
          </fieldset>

          <fieldset className="Fieldset">
            <label className="Label" htmlFor="model">
              LLM model:
            </label>
            <select
              name="model"
              className="Input"
              id="model"
              value={model}
              onChange={(e) => {
                const newModel = e.target.value;
                setModel(newModel);
                setPrompt((prevPrompt) => ({
                  ...prevPrompt,
                  _llmModel: newModel,
                }));
              }}
            >
              {availableModels.map((model) => (
                <option key={model} value={model}>
                  {model}
                </option>
              ))}
            </select>
          </fieldset>

          <fieldset className="Fieldset-json">
            <label className="Label">Your Custom Prompt (JSON format):</label>
            <CreateTaskJsonEditor prompt={prompt} setPrompt={setPrompt} />
          </fieldset>

          <Dialog.Close asChild>
            <button className="create-task-btn" onClick={handleCreateTask}>
              Create Task
            </button>
          </Dialog.Close>

          <Dialog.Close asChild>
            <button className="create-task-btn-close">
              <Cross2Icon />
            </button>
          </Dialog.Close>

          <ToastContainer
            position="bottom-left"
            closeOnClick
            autoClose={17000}
          />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default CreateTaskScreen;
