// src/utils/createTask.js
import axios from "axios";

export async function create(link, type, name, id) {
  try {
    const response = await axios.post(link, {
      task_type: type,
      task_name: name,
      user_id: id,
    });

    if (response.status === 201 || response.status === 200) {
      console.log("Task successfully created:", response.data);
      return response.data; // Return the entire task object, including the ID
    } else {
      console.error("Unexpected response status:", response.status);
      throw new Error("Failed to create task with a valid response.");
    }
  } catch (err) {
    console.error("Error creating task:", err);
    throw err; // Re-throw the error to be handled by the calling component
  }
}
