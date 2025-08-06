import { useState } from "react";
import { ArrowTopRightIcon } from "@radix-ui/react-icons";
import "./input.css";

const InputComponent = ({ onSend }) => {
  const [inputValue, setInputValue] = useState("");

  const handleSend = () => {
    if (inputValue.trim()) {
      onSend(inputValue);
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth",
      });
      setInputValue("");
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
        onClick={handleSend}
        disabled={!inputValue.trim()}>
        <ArrowTopRightIcon />
      </button>
    </div>
  );
};
export default InputComponent;
