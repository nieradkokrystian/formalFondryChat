import { trimCode, countCollapsible } from "../../utils/messageHelpers";
import MessageHighlight from "./MessageHighlight";

const MessageContent = ({ tag, content, isExpanded, isError }) => {
  const isImport = content.includes("import");
  const isCollapsible = countCollapsible(content);
  const isCollapsed =
    isCollapsible && isImport && !isExpanded && tag !== "UserReq";
  const shouldHighlight =
    isError || (tag === "UserReq" && content.includes("Agda snippet"));

  return (
    <>
      {(tag === "LLMRes" || tag === "TCReq") && (
        <div className={`message-content ${isError ? "error" : ""}`}>
          {isImport && <MessageHighlight text={trimCode(content)} />}
          {!isImport && <span>{trimCode(content)}</span>}
        </div>
      )}

      {tag !== "LLMRes" && tag !== "TCReq" && (
        <div
          className={`message-content ${isError ? "error" : ""} ${
            isCollapsed ? "message-collapsed" : ""
          }`}
        >
          {shouldHighlight && <MessageHighlight text={content} />}
          {!shouldHighlight && <>{content}</>}
        </div>
      )}
    </>
  );
};

export default MessageContent;
