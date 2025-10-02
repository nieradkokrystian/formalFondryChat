import "./InputComponent.css";
import { useState } from "react";
import { ArrowTopRightIcon } from "@radix-ui/react-icons";

const InputComponent = ({ LLM, steps, currentSteps, onSend, messages }) => {
  const [inputValue, setInputValue] = useState("");

  const exceeded = messages.at(-1)?.taskStatWS === "exceeded";
  const resolved = messages.at(-1)?.taskStatWS === "resolved";
  const isUserReq = messages.at(-1)?.cmCmdWS?.tag === "UserReq";
  const disabled = exceeded || resolved || !isUserReq;

  const scrollToBottom = () => {
    const chatElement = document.querySelector(".chat-container");
    if (chatElement) {
      setTimeout(() => {
        chatElement.scrollTo({
          top: chatElement.scrollHeight,
          behavior: "smooth",
        });
      }, 100);
    }
  };

  const handleSend = () => {
    onSend(inputValue);
    setInputValue("");
    scrollToBottom();
  };

  const getPlaceholderText = () => {
    if (resolved) return "Task completed! Create a new task to continue...";
    if (exceeded) return "Step limit exceeded! Create a new task...";
    if (!isUserReq) return "Waiting for system response...";
    return "Your prompt goes here!";
  };

  return (
    <div className="input-wrap">
      <div className="input-status">
        <span>{LLM}</span>
        <span className="divider"></span>
        <span>
          Steps: {currentSteps}/{steps}
        </span>
      </div>

      <textarea
        className="chat-input"
        placeholder={getPlaceholderText()}
        onChange={(e) => setInputValue(e.target.value)}
        value={inputValue}
        disabled={disabled}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
          }
        }}
      />

      <button
        className={`submit-prompt ${disabled ? "disabled" : ""}`}
        onClick={handleSend}
        disabled={disabled}
      >
        <ArrowTopRightIcon />
      </button>
    </div>
  );
};

export default InputComponent;
