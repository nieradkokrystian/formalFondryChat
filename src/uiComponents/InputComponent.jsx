import { useState } from "react";
import { ArrowTopRightIcon } from "@radix-ui/react-icons";
import { ToastContainer, toast } from "react-toastify";
import "./input.css";

const InputComponent = ({ onSend, exceeded }) => {
  const [inputValue, setInputValue] = useState("");
  const notify = () => {
    toast.warn(
      `You have exceeded the task's limit, or resolved it or are trying to write when user Request isn't present. Create a new task if needed.`,
      { position: "bottom-center", closeOnClick: "true" }
    );
  };
  const handleSend = () => {
    if (inputValue.trim() || !exceeded) {
      onSend(inputValue);
      // window.scrollTo({
      //   top: document.documentElement.scrollHeight,
      //   behavior: "smooth",
      // });
      setInputValue("");
    } else {
      console.log("either exceeded or empty");
    }
  };

  return (
    <div className="input-wrap">
      <textarea
        placeholder="Your prompt goes here!"
        onChange={(e) => {
          setInputValue(e.target.value);
        }}
        value={inputValue}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
          }
        }}></textarea>
      <button
        className="SubmitPrompt"
        onClick={() => {
          handleSend();
          notify();
        }}
        disabled={!inputValue.trim()}>
        <ArrowTopRightIcon />
      </button>
      <ToastContainer />
    </div>
  );
};
export default InputComponent;
