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
    return (
      <div className="screen-messages  sm:w-[100%] w-full h-full  max-h-full overflow-none ">
        <div
          className="messages w-full  h-full   max-h-full sm:w-[100%] "
          ref={ref}>
          {messages &&
            messages.map((message, index) => {
              const isLastMessage = index === messages.length - 1;
              const hasCmdWS =
                message.cmCmdWS && message.cmMsgWS?.contents.tag != "TCSuccess";
              const hasMsgWS =
                message.cmMsgWS && message.cmMsgWS.contents.tag != "TCSuccess";

              return (
                <React.Fragment key={index}>
                  {hasCmdWS && (
                    <div
                      className={isLastMessage && !hasMsgWS ? "mb-[60px]" : ""}>
                      <Message
                        content={getMessageContent(message.cmCmdWS)}
                        type={message.taskStatWS}
                        tag={message.cmCmdWS.tag}
                        step={index + 1}
                      />
                    </div>
                  )}

                  {hasMsgWS && (
                    <div className={isLastMessage ? "mb-[60px]" : ""}>
                      <Message
                        content={getMessageContent(message.cmMsgWS)}
                        type={message.taskStatWS}
                        tag={message.cmMsgWS.tag}
                        errorTag={message.cmMsgWS.contents.tag}
                        taskNumber={taskNumber}
                        step={index + 1}
                      />
                    </div>
                  )}
                </React.Fragment>
              );
            })}
        </div>
      </div>
    );
  })
);

export default ChatActive;
