import "./Message.css";
import {
  CheckIcon,
  CommitIcon,
  KeyboardIcon,
  ChevronDownIcon,
  MagicWandIcon,
} from "@radix-ui/react-icons";
import { useState } from "react";
import { countCollapsible, trimCode } from "../../utils/messageHelpers";
import MessageUser from "./MessageUser";
import MessageHighlight from "./MessageHighlight";

const Message = ({ content, type, tag, errorTag, step }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const isCollapsible = countCollapsible(content);
  const isError = tag === "TCErr";
  const isUserMessage = tag === "UserMessage" || tag === "UserRes";
  const isUserRequest = tag === "UserReq";

  const shouldHighlight =
    errorTag === "TCErr" ||
    (tag === "UserReq" && content.includes("Agda snippet"));
  const isCollapsed =
    isCollapsible &&
    content.includes("import") &&
    !isExpanded &&
    tag !== "UserReq";

  let bgColor;
  let icon;

  if (isUserRequest) {
    bgColor = "bg-blue-100";
    icon = (
      <div className="bg-blue-500 rounded-full">
        <KeyboardIcon className="m-2 text-white" width={20} height={20} />
      </div>
    );
  } else {
    switch (type) {
      case "running":
        bgColor = "bg-violet-200";
        icon = isUserMessage ? (
          <KeyboardIcon width={20} height={20} />
        ) : (
          <div className="bg-violet-500 rounded-full">
            <MagicWandIcon
              color="white"
              width={20}
              height={20}
              className="m-2"
            />
          </div>
        );
        break;
      case "pending":
        bgColor = "bg-blue-300";
        icon = isUserMessage ? (
          <KeyboardIcon width={20} height={20} />
        ) : (
          <CommitIcon width={20} height={20} />
        );
        break;
      case "completed":
        bgColor = "bg-green-300";
        icon = isUserMessage ? (
          <KeyboardIcon width={20} height={20} />
        ) : (
          <CheckIcon width={20} height={20} />
        );
        break;
      default:
        bgColor = "bg-purple-100";
        icon = (
          <div className="rounded-full">
            <MagicWandIcon color="black" width={20} height={20} />
          </div>
        );
        break;
    }
  }

  return (
    <>
      {isUserMessage && <MessageUser content={content} step={step} />}

      {!isUserMessage && (
        <div className={`message ${bgColor}`}>
          {(tag === "LLMRes" || tag === "TCReq") && (
            <>
              <div className="message-header">
                {tag === "LLMRes" && (
                  <h1 className="message-header-text">
                    {icon}
                    LLM Response
                  </h1>
                )}

                {tag === "TCReq" && (
                  <h1 className="message-header-text">
                    {icon}
                    TC Request
                  </h1>
                )}

                {isError && (
                  <h1 className="message-header-text error">Error</h1>
                )}
              </div>

              <div className={`message-content ${isError ? "error" : ""}`}>
                {content.includes("import") && (
                  <MessageHighlight text={trimCode(content)}></MessageHighlight>
                )}

                {!content.includes("import") && (
                  <span>{trimCode(content)}</span>
                )}
              </div>
            </>
          )}

          {tag !== "LLMRes" && tag !== "TCReq" && (
            <div className={isCollapsed ? "message-collapsed" : ""}>
              <div className="message-header">
                {tag === "UserReq" && (
                  <>
                    {icon}
                    <h1 className="message-header-text clarification">
                      Clarifications Requested
                    </h1>
                  </>
                )}

                {tag === "LLMReq" && (
                  <h1 className="message-header-text">
                    {icon}
                    LLM Request
                  </h1>
                )}

                {tag === "TCRes" && (
                  <h1 className="message-header-text">
                    {icon}
                    TC Response
                  </h1>
                )}

                {isError && (
                  <h1 className="message-header-text error">
                    Error occurred in Agda code
                  </h1>
                )}
              </div>
              <div className={`message-content ${isError ? "error" : ""}`}>
                {shouldHighlight && <MessageHighlight text={content} />}
                {!shouldHighlight && <>{content}</>}
              </div>
            </div>
          )}

          {isCollapsible &&
            tag !== "UserReq" &&
            tag !== "LLMRes" &&
            tag !== "TCReq" && (
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
    </>
  );
};

export default Message;
