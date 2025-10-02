export const canUserRespond = (messageList) => {
  if (!messageList || messageList.length === 0) return true;
  const lastMsgStatus = messageList.at(-1)?.taskStatWS;

  if (lastMsgStatus === "exceeded" || lastMsgStatus === "resolved") {
    return false;
  }

  return messageList.at(-1)?.cmCmdWS?.tag === "UserReq";
};

export const shouldStopPolling = (messageList) => {
  if (!messageList || messageList.length === 0) return false;
  const lastMsgStatus = messageList.at(-1)?.taskStatWS;
  return lastMsgStatus === "exceeded" || lastMsgStatus === "resolved";
};
