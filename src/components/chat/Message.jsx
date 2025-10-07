import "./Message.css";
import MessageUser from "./MessageUser";
import MessageSystem from "./MessageSystem";

const Message = ({ content, tag, error, success, last }) => {
  const isUserMessage = tag === "UserMessage" || tag === "UserRes";

  return (
    <>
      {isUserMessage && <MessageUser content={content} tag={tag} last={last} />}

      {!isUserMessage && (
        <MessageSystem
          tag={tag}
          content={content}
          error={error}
          success={success}
          last={last}
        />
      )}
    </>
  );
};

export default Message;
