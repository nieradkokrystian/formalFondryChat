import React from "react";
import { useSelector } from "react-redux";
import { getMessageContent } from "../../utils/messageHelpers";
import Message from "./Message";

function ActiveChat({ messages }) {
  const isLimitTo100 = useSelector((s) => s.chat.limitTo100);
  const msgList = isLimitTo100 ? messages.slice(-100) : messages;

  return (
    <div className="messages-container">
      {msgList.length > 0 &&
        msgList.map((message, index) => {
          const isLastMsg = index === msgList.length - 1;
          const cmMsgSuccess = message.cmMsgWS?.contents.tag === "TCSuccess";

          const hasCmdWS = message.cmCmdWS && !cmMsgSuccess;
          const hasMsgWS = message.cmMsgWS && !cmMsgSuccess;

          return (
            <React.Fragment key={index}>
              {hasCmdWS && (
                <Message
                  content={getMessageContent(message.cmCmdWS)}
                  status={message.taskStatWS}
                  tag={message.cmCmdWS.tag}
                  step={index + 1}
                  isLast={isLastMsg && !hasMsgWS}
                />
              )}

              {hasMsgWS && (
                <Message
                  content={getMessageContent(message.cmMsgWS)}
                  status={message.taskStatWS}
                  tag={message.cmMsgWS.tag}
                  errorTag={message.cmMsgWS.contents.tag}
                  step={index + 1}
                  isLast={isLastMsg}
                />
              )}
            </React.Fragment>
          );
        })}
    </div>
  );
}

export default ActiveChat;
