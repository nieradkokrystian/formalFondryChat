import axios from "axios";
const API_LINK = import.meta.env.VITE_API_BASE;

export async function loginUser(login) {
  const response = await axios.post(`${API_LINK}/auth`, { login });
  return response.data;
}

export async function registerUser(data) {
  const response = await axios.post(`${API_LINK}/users`, {
    name: data.name,
    lastname: data.lastname,
    email: data.email,
  });

  return response.data;
}
