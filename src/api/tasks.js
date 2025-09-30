import axios from "axios";
// import axiosInstance from "./axios-cache";
const API_LINK = import.meta.env.VITE_API_BASE;

// Fetch task by user id
export async function fetchTasks(userId) {
  const response = await axios.get(`${API_LINK}/tasksall/${userId}`);
  return response.data;
}

// Fetch available tasks
export async function fetchAvailableTypes() {
  const response = await axios.get(`${API_LINK}/availableTasks`);
  return response.data;
}

// Fetch llm list
export async function fetchLlmList() {
  const response = await axios.get(`${API_LINK}/llm_list`);
  return response.data;
}

// Create task
export async function createTask(data) {
  const response = await axios.post(`${API_LINK}/tasks`, {
    task_type: data.task_type,
    task_name: data.task_name,
    user_id: data.user_id,
    envStart: data.envStart,
  });

  return response.data;
}

// Get latest task state
export async function getLatestTaskState(chatId) {
  const response = await axios.get(`${API_LINK}/tasks/${chatId}/states/latest`);
  return response.data;
}

// Get task environment
export async function getTaskEnvironment(chatId) {
  const response = await axios.get(`${API_LINK}/taskenv/${chatId}/env`);
  return response.data;
}

// Get messages history
export async function getMessagesHistory(chatId) {
  const response = await axios.get(
    `${API_LINK}/taskmsg/${chatId}/messages-history`
  );
  return response.data;
}

// Send user response
export async function sendUserResponse(chatId, content) {
  const response = await axios.put(
    `${API_LINK}/tasks/${chatId}/messages/latest/user-response`,
    {
      content: content,
      task_id: chatId,
    }
  );
  return response.data;
}
