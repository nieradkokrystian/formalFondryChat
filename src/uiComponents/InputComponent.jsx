import { useState } from "react";
import { ArrowTopRightIcon } from "@radix-ui/react-icons";
import { ToastContainer, toast } from "react-toastify";
import "./input.css";

const InputComponent = ({
  onSend,
  exceeded,
  isResolved,
  isExceeded,
  lastMessageIsUserReq,
  LLM,
  steps,
  currentSteps,
}) => {
  const [inputValue, setInputValue] = useState("");

  const getDisabledReason = () => {
    if (isResolved) return "resolved";
    if (isExceeded) return "exceeded";
    if (!lastMessageIsUserReq) return "no-user-req";
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

    if (!inputValue.trim()) {
      return;
    }

    onSend(inputValue);
    setInputValue("");
    scrollToBottom();
  };

  const isInputDisabled = () => {
    return !inputValue.trim() || exceeded;
  };

  const getPlaceholderText = () => {
    if (isResolved) return "Task completed! Create a new task to continue...";
    if (isExceeded) return "Step limit exceeded! Create a new task...";
    if (!lastMessageIsUserReq) return "Waiting for system response...";
    return "Your prompt goes here!";
  };

  return (
    <>
      <div className="fixed  lg:left-500 left-4 top-13 flex items-center text-xs opacity-100 z-20 bg-white border-1 overflow-clip border-gray-400 lg:min-h-[40px] min-h-[16px] max-w-[60px] box-border h-7  min-w-fit text-md shadow-md rounded-4xl text-gray-500">
        <span className="lg:h-[40px] h-[16px] pr-1 text-base-sm/6  hover:text-gray-900 hover:bg-gray-300 p-3 flex items-center">
          {LLM}
        </span>
        <span className="lg:h-[40px]  w-[1px] h-full bg-gray-400 border-gray-400  hover:text-gray-900 hover:bg-gray-300"></span>
        <span className="lg:h-[40px]  pl-1 h-full  hover:text-gray-900 hover:bg-gray-300 p-3 flex items-center">
          Steps: {currentSteps}/{steps}
        </span>{" "}
      </div>
      <div
        className={`input-wrap ${exceeded || isResolved ? "opacity-0" : ""}`}>
        <textarea
          placeholder={getPlaceholderText()}
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
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
          className="SubmitPrompt"
          onClick={handleSend}
          disabled={isInputDisabled()}>
          <ArrowTopRightIcon />
        </button>
        <ToastContainer />
      </div>
    </>
  );
};

export default InputComponent;
