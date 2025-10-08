import MessageHighlight from "./MessageHighlight";
import { boldAgda } from "../../hooks/useBoldAgda";

const MSG_HEIGHT = 102;

const MessageContent = ({ ref, tag, content, isExpanded, isError }) => {
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
      {/* DARK THEME, COLORED FONT */}
      {tag === "TCReq" && <MessageHighlight text={content} />}

      {/* DARK THEME, WHITE FONT */}
      {tag === "TCRes" && <MessageHighlight text={content} white={true} />}

      {/* NORMAL */}
      {["LLMRes", "LLMReq", "UserReq", "UserRes"].includes(tag) && (
        <>{boldAgda(content)}</>
      )}

      {/* LLM Thinking */}
      {tag === "LLM_Thinking" && <>{content}</>}
    </div>
  );
};

export default MessageContent;
