import React, { forwardRef, memo } from "react";
import Message from "./Message";
import "./activechat.css";
import "./message.css";

const getMessageContent = (messageObject) => {
  if (!messageObject) {
    return "";
  }
  const { contents } = messageObject;
  if (typeof contents === "string") {
    return contents;
  }
  if (Array.isArray(contents)) {
    return contents.map((item) => item.content).join("\n");
  }
  if (typeof contents === "object" && contents !== null) {
    return contents.contents;
  }
  return "";
};

// Use forwardRef to receive the ref passed from the parent component
const ChatActive = memo(
  forwardRef(({ messages }, ref) => {
    return (
      // Attach the ref to the main scrolling container
      <div className="screen-messages mt-[60px] sm:w-[100%] lg:w-[700px] overflow-auto ">
        <div className="messages lg:w-[700px] mt-[60px] sm:w-[100%]" ref={ref}>
          {messages &&
            messages.map((message, index) => (
              <React.Fragment key={index}>
                {/* Render the command message */}
                {message.cmCmdWS && (
                  <Message
                    content={getMessageContent(message.cmCmdWS)}
                    type={message.taskStatWS}
                    tag={message.cmCmdWS.tag}
                  />
                )}
                {/* Render the response message */}
                {message.cmMsgWS && (
                  <Message
                    content={getMessageContent(message.cmMsgWS)}
                    type={message.taskStatWS}
                    tag={message.cmMsgWS.tag}
                    errorTag={message.cmMsgWS.contents.tag}
                  />
                )}
              </React.Fragment>
            ))}
        </div>
      </div>
    );
  })
);

export default ChatActive;
