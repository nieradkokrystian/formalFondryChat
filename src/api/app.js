import axiosInstance from "./axios-cache";
const API_LINK = import.meta.env.VITE_API_BASE;

export async function fetchLlmList() {
  const response = await axiosInstance.get(`${API_LINK}/llm_list`);
  return response.data;
}
