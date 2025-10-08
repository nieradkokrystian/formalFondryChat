export const getMessageContent = (messageObject) => {
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

export const countMessages = (messages) => {
  let counter = 0;
  messages.forEach((msg) => {
    if (msg.cmCmdWS) counter++;
    if (msg.cmMsgWS && msg.cmMsgWs?.tag !== "LLM_Thinking") counter++;
  });
  return counter;
};
