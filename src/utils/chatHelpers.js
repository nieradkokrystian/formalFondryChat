export const canUserRespond = (messageList) => {
  if (!messageList || messageList.length === 0) return true;
  const lastMessage = messageList[messageList.length - 1];
  const lastMsgStatus = lastMessage?.taskStatWS;

  if (lastMsgStatus === "exceeded" || lastMsgStatus === "resolved") {
    return false;
  }

  return lastMessage?.cmCmdWS?.tag === "UserReq";
};

export const shouldStopPolling = (messageList) => {
  if (!messageList || messageList.length === 0) return false;
  const lastMessage = messageList[messageList.length - 1];
  const lastMsgStatus = lastMessage?.taskStatWS;
  return lastMsgStatus === "exceeded" || lastMsgStatus === "resolved";
};
