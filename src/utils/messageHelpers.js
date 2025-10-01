const COLLAPSIBLE_LENGTH_LIMIT = 250;

export const countCollapsible = (content) =>
  (typeof content === "string" && (content.match(/\n/g) || []).length > 3) ||
  content?.length > COLLAPSIBLE_LENGTH_LIMIT;

export const trimCode = (code) =>
  code.replace(/```/, "").replace(/```$/, "").replace(/```/, "");

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
