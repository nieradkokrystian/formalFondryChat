const COLLAPSIBLE_LENGTH_LIMIT = 200;

export const countCollapsible = (content) =>
  (typeof content === "string" && (content.match(/\n/g) || []).length > 3) ||
  content?.length > COLLAPSIBLE_LENGTH_LIMIT;

export const trimCode = (code) =>
  code.replace(/```/, "").replace(/```$/, "").replace(/```/, "");
