import "./ActiveChat.css";
import React from "react";
import Message from "./Message";
import { getMessageContent } from "../../utils/messageHelpers";

function ActiveChat({ messages }) {
  return (
    <div className="screen-messages">
      <div className="messages">
        {messages.length > 0 &&
          messages.map((message, index) => {
            const isLastMsg = index === messages.length - 1;
            const cmMsgSuccess = message.cmMsgWS?.contents.tag !== "TCSuccess";

            const hasCmdWS = message.cmCmdWS && cmMsgSuccess;
            const hasMsgWS = message.cmMsgWS && cmMsgSuccess;

            return (
              <React.Fragment key={index}>
                {hasCmdWS && (
                  <div className={isLastMsg && !hasMsgWS ? "mb-[100px]" : ""}>
                    <Message
                      content={getMessageContent(message.cmCmdWS)}
                      type={message.taskStatWS}
                      tag={message.cmCmdWS.tag}
                      step={index + 1}
                    />
                  </div>
                )}

                {hasMsgWS && (
                  <div className={isLastMsg ? "mb-[100px]" : ""}>
                    <Message
                      content={getMessageContent(message.cmMsgWS)}
                      type={message.taskStatWS}
                      tag={message.cmMsgWS.tag}
                      errorTag={message.cmMsgWS.contents.tag}
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
