import { useState, useEffect, useRef } from "react";
import { Link } from "react-router";
import axios from "axios";
import SeparatorDemo from "../uiComponents/Separator";
import { toast, ToastContainer } from "react-toastify";
import { useUser } from "../AuthContext";

const Admin = () => {
  const [taskListAdmin, setTaskListAdmin] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [taskListUser, setTaskListUser] = useState([]);
  const [selectId, setSelectId] = useState("1");
  const opt2 = useRef();
  const API_LINK = import.meta.env.VITE_API_BASE;

  useEffect(() => {
    const fetchTaskListAdmin = async () => {
      try {
        const response = await axios.get(`${API_LINK}/tasksOld`);
        setTaskListAdmin(response.data);
      } catch (error) {
        console.error("Failed to fetch task list:", error);
      }
    };
    fetchTaskListAdmin();
  }, [API_LINK]);

  useEffect(() => {
    const fetchTaskListUser = async () => {
      try {
        const response = await axios.get(`${API_LINK}/tasks/${selectId}`);
        setTaskListUser(response.data);
      } catch (error) {
        console.error("Failed to fetch task list:", error);
      }
    };
    fetchTaskListUser();
  }, [selectId, activeIndex]);

  const Record = ({ title, id, status, type }) => {
    const color =
      status == "running"
        ? "bg-indigo-100"
        : status == "resolved"
        ? "bg-green-100"
        : "bg-red-100";
    return (
      <div className="record flex flex-row bg-gray-100 w-[90%] p-3 mb-1 rounded-md items-center">
        id:{" "}
        <h1 className="w-5 aspect-square rounded-full flex justify-center items-center h-5 p-2 mr-4 bg-white ">
          {id}
        </h1>
        {title && (
          <>
            Name:
            <h1
              className={`w-50 bg-gray-50 ml-1 capitalize p-2 rounded-2xl justify-center mr-5  flex align-center `}
            >
              {" "}
              {title}
            </h1>
          </>
        )}
        <p>Status:</p>
        <h2
          className={`w-50 bg-gray-50 ml-1  capitalize p-2 rounded-2xl justify-center mr-5  flex align-center ${color}`}
        >
          {status}
        </h2>
        <p>Type:</p>{" "}
        <h2 className="capitalize ml-1 bg-indigo-300 p-2 rounded-2xl">
          {type}
        </h2>
      </div>
    );
  };
  console.table(taskListAdmin);

  const CreateUser = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [lastName, setLastName] = useState("");

    const handleCreate = (e) => {
      e.preventDefault();

      if (username.length < 1 || email.length < 1 || lastName.length < 1)
        return toast.warn("Your name is to short!");

      axios
        .post(`${API_LINK}/users`, {
          name: username,
          lastname: lastName,
          email: email,
        })
        .then((response) => {
          if (response.ok) {
            return toast.success("User Created Successfully");
          }
        })
        .catch((err) => {
          return toast.error(
            "error creating user, check your data and try again"
          );
        });
    };
    return (
      <form
        action=""
        className="flex flex-col gap-4 justify-start items-start w-2/4"
      >
        <h1 className="text-lg text-gray-500">Create a user:</h1>
        <div className="fieldset flex justify-between flex-row items-center gap-4 m-1 w-full">
          <label className="text-purple-400 text-lg " htmlFor="email">
            Email:
          </label>
          <input
            type="text"
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            className="inset-shadow-sm inset-shadow-gray-200 h-9 rounded-md "
          />
        </div>
        <div className="fieldset flex justify-between flex-row items-center gap-4 m-1 w-full">
          <label htmlFor="name" className="text-purple-400 text-lg ">
            Name:
          </label>
          <input
            type="text"
            onChange={(e) => setUsername(e.target.value)}
            id="name"
            className="inset-shadow-sm inset-shadow-gray-200 h-9 rounded-md "
          />
        </div>
        <div className="fieldset flex justify-between flex-row items-center gap-4 m-1 w-full">
          <label htmlFor="last" className="text-purple-400 text-lg ">
            Lastname:
          </label>
          <input
            type="text"
            onChange={(e) => setLastName(e.target.value)}
            id="last"
            className="inset-shadow-sm inset-shadow-gray-200 h-9 rounded-md "
          />
        </div>
        <input
          type="submit"
          onClick={handleCreate}
          className="w-full rounded-sm bg-purple-200  h-10 mt-7 text-purple-700"
        />
        <ToastContainer />
      </form>
    );
  };
  console.table(taskListUser);

  return (
    <div className="admin-page w-full h-full bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="content-admin h-full w-full mt-[60px] flex flex-row gap-5 flex-wrap justify-center items-center">
        <div className="bento p-3 w-[45%] h-[40%] flex flex-col items-start justify-start bg-white border-1 border-gray-200 shadow-xl  rounded-2xl">
          <h1 className="text-gray-600 text-2xl">Admin Panel Demo</h1>
        </div>
        <div className="bento p-3 w-[45%] h-[40%] flex flex-col items-center justify-center bg-white border-1 border-gray-200 shadow-xl   rounded-2xl">
          <CreateUser />
        </div>
        <div className="bento relative px-3   w-[91.3%] h-[40%]  mt-[-230px] flex flex-col items-start justify-start bg-white border-1 border-gray-200 shadow-xl overflow-y-scroll  rounded-2xl">
          <div className="wrap flex gap-1 border-b-1 p-3 border-gray-300 sticky top-0 w-full bg-white">
            <h1 className="text-gray-500 items-center flex">User id</h1>
            <input
              onChange={(e) => setSelectId(e.target.value)}
              type="number"
              name=""
              defaultValue={1}
              min="0"
              id="selectId"
            />
            <div className="smallnav w-fit  px-5 py-3 bg-white border-2 border-purple-500 rounded-md flex flex-row gap-3 relative ">
              <button
                className={`background transition-colors duration-300 ${
                  activeIndex === 0 ? "text-purple-600" : "text-gray-700"
                } `}
                onClick={() => setActiveIndex(0)}
              >
                tasks/Old
              </button>

              <button
                onClick={() => setActiveIndex(1)}
                className={`background transition-colors duration-300 ${
                  activeIndex === 0 ? "text-purple-600" : "text-gray-700"
                }} onClick={(e)=>shift("0%")`}
              >
                tasks/:user_id:
              </button>

              <span
                ref={opt2}
                className={` transition-transform duration-300 ease-in-out z-0 rounded-md absolute  top-0 left-0 w-1/2 h-full bg-purple-100 ${
                  activeIndex === 0
                    ? "transform translate-x-0"
                    : "transform translate-x-full"
                }`}
              ></span>
            </div>
          </div>

          {activeIndex === 0 ? (
            taskListAdmin.map((item, index) => (
              <Record
                key={index}
                id={item.taskId}
                status={item.taskStatus}
                type={item.taskType}
              />
            ))
          ) : activeIndex === 1 && taskListUser.length > 0 ? (
            taskListUser.map((item, index) => (
              <Record
                key={index}
                id={item.task_Id}
                status={item.task_Status}
                type={item.task_Type}
                title={item.task_Name}
              />
            ))
          ) : (
            <h1 className="mt-2 text-red-600">
              There are no tasks assigned to this id:{" "}
              <span className="bg-red-200 p-2 rounded-full">
                user id: {selectId}
              </span>
            </h1>
          )}
          {!taskListAdmin || taskListAdmin.length === 0
            ? "No task data available. Check the server."
            : ""}
        </div>
      </div>
    </div>
  );
};

export default Admin;
