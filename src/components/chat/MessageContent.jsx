import { trimCode } from "../../utils/messageHelpers";
import MessageHighlight from "./MessageHighlight";

const MSG_HEIGHT = 102;

const MessageContent = ({ ref, tag, content, isExpanded, isError }) => {
  const isImport = content.includes("import");
  const shouldHighlight =
    isError || (tag === "UserReq" && content.includes("Agda snippet"));

  const countMaxHeight =
    isExpanded || ["LLMRes", "TCReq"].includes(tag)
      ? `${ref.current?.scrollHeight}px`
      : `${MSG_HEIGHT}px`;

  return (
    <div
      className={`message-content ${isError ? "error" : ""} `}
      style={{ maxHeight: countMaxHeight }}
      ref={ref}
    >
      {(tag === "LLMRes" || tag === "TCReq") && (
        <>
          {isImport && <MessageHighlight text={trimCode(content)} />}
          {!isImport && <span>{trimCode(content)}</span>}
        </>
      )}

      {tag !== "LLMRes" && tag !== "TCReq" && (
        <>
          {shouldHighlight && <MessageHighlight text={content} />}
          {!shouldHighlight && <>{content}</>}
        </>
      )}
    </div>
  );
};

export default MessageContent;
