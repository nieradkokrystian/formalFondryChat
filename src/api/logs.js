import axios from "axios";
const API_LINK = import.meta.env.VITE_API_BASE;

// Fetch logs by task id
export async function fetchLogs(taskId, params = {}) {
  console.log("FETCH LOGS!!!");

  try {
    const query = {};
    if (params.level !== 20 && params.level) {
      query.level = params.level;
    }
    if (params.tags && params.tags.length > 0) {
      query.tags = params.tags.join(",");
    }
    const response = await axios.get(`${API_LINK}/taskLog/${taskId}/logs`, {
      params: query,
    });
    return response.data;
  } catch (error) {
    if (error.response?.status === 404) {
      return [];
    }
    throw error;
  }
}

// Fetch available tags
export async function fetchAvTags(taskId) {
  const response = await axios.get(`${API_LINK}/taskTags/${taskId}`);
  return response.data;
}
