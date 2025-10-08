import "./InputComponent.css";
import { useRef, useState, useEffect } from "react";
import { PaperPlaneIcon } from "@radix-ui/react-icons";
import { LlmLoader } from "../ui/Loader";
import StopTaskBtn from "./StopTaskBtn";
import ChatLimitCheckbox from "../navbar/ChatLimitCheckbox";
import { countMessages } from "../../utils/messageHelpers";

const InputComponent = ({ LLM, steps, currentSteps, onSend, messages }) => {
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef(null);

  const exceeded = messages.at(-1)?.taskStatWS === "exceeded";
  const resolved = messages.at(-1)?.taskStatWS === "resolved";
  const stopped = messages.at(-1)?.taskStatWS === "stopped";
  const isUserReq = messages.at(-1)?.cmCmdWS?.tag === "UserReq";
  const disabled = exceeded || resolved || !isUserReq || stopped;
  const showLoader = !resolved && !exceeded && !isUserReq && !stopped;
  const showStopBtn = !resolved && !exceeded && !stopped;
  const showLimitBtn = countMessages(messages) > 100;

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
    if (stopped) return "Task stopped! Create a new task...";
    if (!isUserReq) return "Waiting for system response...";
    return "Your prompt goes here!";
  };

  const handleInputChange = (e) => {
    const el = e.target;
    setInputValue(el.value);

    el.style.height = "auto";
    el.style.height = el.scrollHeight + "px";
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = "auto";
      inputRef.current.style.height = inputRef.current.scrollHeight + "px";
    }
  }, [inputValue]);

  return (
    <div className="input-wrap">
      {showLoader && (
        <div className="input-loader">
          <LlmLoader />
        </div>
      )}

      <div className="input-top">
        <textarea
          ref={inputRef}
          className="chat-input"
          placeholder={getPlaceholderText()}
          onChange={handleInputChange}
          value={inputValue}
          disabled={disabled}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
        />
      </div>

      <div className="input-bot">
        <div className="input-bot-left">
          {showStopBtn && <StopTaskBtn />}
          {showLimitBtn && <ChatLimitCheckbox />}
        </div>

        <div className="input-bot-right">
          <div className="input-status">
            <span>{LLM}</span>
            <span className="divider"></span>
            <span>
              Steps: {currentSteps}/{steps}
            </span>
          </div>

          <div className="input-submit">
            <button
              className={`submit-prompt ${disabled ? "disabled" : ""}`}
              onClick={handleSend}
              disabled={disabled}
            >
              <PaperPlaneIcon />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InputComponent;
