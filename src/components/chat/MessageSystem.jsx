import { useState, useRef, useEffect } from "react";
import { useMessageConfig } from "../../hooks/useMessageConfig";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import MessageHeader from "./MessageHeader";
import MessageContent from "./MessageContent";

const MSG_HEIGHT = 102;

const MessageSystem = ({ tag, content, error, success, last }) => {
  const contentRef = useRef(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showButton, setShowButton] = useState(false);

  const { bgColor, icon } = useMessageConfig(tag);

  useEffect(() => {
    if (contentRef.current && ["LLMReq", "TCRes"].includes(tag)) {
      setShowButton(contentRef.current.scrollHeight > MSG_HEIGHT);
    }
  }, [content, tag]);

  return (
    <div
      className={`message ${bgColor} ${last ? "mb-[110px]" : ""} ${
        tag === "LLM_Thinking" ? "animate-pulse" : ""
      } `}
    >
      <MessageHeader tag={tag} icon={icon} error={error} success={success} />

      <MessageContent
        ref={contentRef}
        tag={tag}
        content={content}
        isExpanded={isExpanded}
        error={error}
      />

      {showButton && (
        <div className="message-expand-wrapper">
          <ChevronDownIcon
            onClick={() => setIsExpanded((prev) => !prev)}
            className={`cursor-pointer ${isExpanded ? "rotate-180" : ""}`}
            width={50}
            height={20}
          />
        </div>
      )}
    </div>
  );
};

export default MessageSystem;
