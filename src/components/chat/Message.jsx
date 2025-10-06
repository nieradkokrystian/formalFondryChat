import "./Message.css";
import { useState } from "react";
import { countCollapsible } from "../../utils/messageHelpers";
import { useMessageConfig } from "../../hooks/useMessageConfig";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import MessageUser from "./MessageUser";
import MessageHeader from "./MessageHeader";
import MessageContent from "./MessageContent";

const Message = ({ content, status, tag, errorTag, step, isLast }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const isCollapsible = countCollapsible(content);
  const isUserMessage = tag === "UserMessage" || tag === "UserRes";

  const showExpandBtn =
    isCollapsible && tag !== "UserReq" && tag !== "LLMRes" && tag !== "TCReq";

  const { bgColor, icon } = useMessageConfig(tag === "UserReq", status);

  return (
    <div
      className={`
        ${isLast ? "message-last" : ""} 
        ${tag === "LLM_Thinking" ? "animate-pulse" : ""}`}
    >
      {isUserMessage && <MessageUser content={content} step={step} />}

      {!isUserMessage && (
        <div className={`message ${bgColor}`}>
          <MessageHeader tag={tag} icon={icon} isError={errorTag === "TCErr"} />

          <MessageContent
            tag={tag}
            content={content}
            isExpanded={isExpanded}
            isError={errorTag === "TCErr"}
          />

          {showExpandBtn && (
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
      )}
    </div>
  );
};

export default Message;
