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

          const hasCmdWS = message.cmCmdWS;
          const hasMsgWS = message.cmMsgWS;

          return (
            <React.Fragment key={index}>
              {/* UserReq, LLMReq, TCReq */}
              {hasCmdWS && (
                <Message
                  content={getMessageContent(message.cmCmdWS)}
                  tag={message.cmCmdWS.tag}
                  last={isLastMsg && !hasMsgWS}
                />
              )}

              {/* UserRes, LLMRes, TCRes, LLM_Thinking - TCSuccess, TCErr */}
              {hasMsgWS && (
                <Message
                  content={getMessageContent(message.cmMsgWS)}
                  tag={message.cmMsgWS.tag}
                  error={message.cmMsgWS.contents.tag === "TCErr"}
                  success={message.cmMsgWS?.contents.tag === "TCSuccess"}
                  last={isLastMsg}
                />
              )}
            </React.Fragment>
          );
        })}
    </div>
  );
}

export default ActiveChat;
