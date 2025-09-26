import "./InputComponent.css";
import { useState } from "react";
import { ArrowTopRightIcon } from "@radix-ui/react-icons";
import { toast } from "react-toastify";

const InputComponent = ({
  onSend,
  exceeded,
  isResolved,
  isExceeded,
  lastMsgIsUserReq,
  LLM,
  steps,
  currentSteps,
}) => {
  const [inputValue, setInputValue] = useState("");

  const getDisabledReason = () => {
    if (isResolved) return "resolved";
    if (isExceeded) return "exceeded";
    if (!lastMsgIsUserReq) return "no-user-req";
    return null;
  };

  const notifyResolved = () => {
    toast.success(
      " Task completed successfully! The task has been resolved. Create a new task to continue working.",
      {
        position: "bottom-center",
        closeOnClick: true,
        autoClose: 5000,
      }
    );
  };

  const notifyExceeded = () => {
    toast.error(
      " Task limit exceeded! You have reached the maximum number of interactions for this task. Create a new task to continue.",
      {
        position: "bottom-center",
        closeOnClick: true,
        autoClose: 5000,
      }
    );
  };

  const notifyNoUserReq = () => {
    toast.info(
      " Waiting for system response... The system is processing and not ready for your input yet.",
      {
        position: "bottom-center",
        closeOnClick: true,
        autoClose: 3000,
      }
    );
  };

  const scrollToBottom = () => {
    const chatElement = document.querySelector(".Chat");
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
    const disabledReason = getDisabledReason();

    if (disabledReason) {
      switch (disabledReason) {
        case "resolved":
          notifyResolved();
          break;
        case "exceeded":
          notifyExceeded();
          break;
        case "no-user-req":
          notifyNoUserReq();
          break;
      }
      return;
    }

    onSend(inputValue);
    setInputValue("");
    scrollToBottom();
  };

  const isInputDisabled = () => {
    return exceeded;
  };

  const getPlaceholderText = () => {
    if (isResolved) return "Task completed! Create a new task to continue...";
    if (isExceeded) return "Step limit exceeded! Create a new task...";
    if (!lastMsgIsUserReq) return "Waiting for system response...";
    return "Your prompt goes here!";
  };

  return (
    <>
      <div className="input-wrap">
        <div className="input-status">
          <span className="llm">{LLM}</span>
          <span className="divider"></span>
          <span className="steps">
            Steps: {currentSteps}/{steps}
          </span>
        </div>

        <textarea
          className="chat-input"
          placeholder={getPlaceholderText()}
          onChange={(e) => setInputValue(e.target.value)}
          value={inputValue}
          disabled={exceeded}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
        />
        <button
          className="submit-prompt"
          onClick={handleSend}
          disabled={isInputDisabled()}
        >
          <ArrowTopRightIcon />
        </button>
      </div>
    </>
  );
};

export default InputComponent;
