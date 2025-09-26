import React from "react";
import Message from "./Message";
import "./ActiveChat.css";

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

function ActiveChat({ messages, taskNumber, ref }) {
  return (
    <div className="screen-messages">
      <div className="messages" ref={ref}>
        {messages &&
          messages.map((message, index) => {
            const isLastMessage = index === messages.length - 1;
            const hasCmdWS =
              message.cmCmdWS && message.cmCmdWS?.contents.tag != "TCSuccess";
            // const hasCmdWS =
            //   message.cmCmdWS && message.cmMsgWS?.contents.tag != "TCSuccess";
            const hasMsgWS =
              message.cmMsgWS && message.cmMsgWS.contents.tag != "TCSuccess";

            return (
              <React.Fragment key={index}>
                {hasCmdWS && (
                  <div
                    className={isLastMessage && !hasMsgWS ? "mb-[100px]" : ""}
                  >
                    <Message
                      content={getMessageContent(message.cmCmdWS)}
                      type={message.taskStatWS}
                      tag={message.cmCmdWS.tag}
                      step={index + 1}
                    />
                  </div>
                )}

                {hasMsgWS && (
                  <div className={isLastMessage ? "mb-[100px]" : ""}>
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
}

export default ActiveChat;
