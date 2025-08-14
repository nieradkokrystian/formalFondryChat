import React, { forwardRef, memo, useState } from "react";
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

const ChatActive = memo(
  forwardRef(({ messages, taskNumber }, ref) => {
    const [stepCount, setStepCount] = useState("");
    return (
      <div className="screen-messages mt-[60px] sm:w-[100%] w-full overflow-auto ">
        <div className="messages w-full mt-[60px] sm:w-[100%]" ref={ref}>
          {messages &&
            messages.map((message, index) => (
              <React.Fragment key={index}>
                {message.cmCmdWS &&
                  message.cmMsgWS?.contents.tag != "TCSuccess" && (
                    <Message
                      content={getMessageContent(message.cmCmdWS)}
                      type={message.taskStatWS}
                      tag={message.cmCmdWS.tag}
                      step={index + 1}
                    />
                  )}

                {message.cmMsgWS &&
                  message.cmMsgWS.contents.tag != "TCSuccess" && (
                    <Message
                      content={getMessageContent(message.cmMsgWS)}
                      type={message.taskStatWS}
                      tag={message.cmMsgWS.tag}
                      errorTag={message.cmMsgWS.contents.tag}
                      taskNumber={taskNumber}
                      step={index + 1}
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
