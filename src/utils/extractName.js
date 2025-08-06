export function extractNameFromEmail(emailString) {
  if (!emailString) return "";

  const displayNameMatch = emailString.match(/"([^"]+)"\s*<[^>]+>/);
  if (displayNameMatch && displayNameMatch[1]) {
    return displayNameMatch[1];
  }

  const angleBracketMatch = emailString.match(/<([^>]+)>/);
  if (angleBracketMatch && angleBracketMatch[1]) {
    emailString = angleBracketMatch[1];
  }

  const atIndex = emailString.indexOf("@");
  let namePart =
    atIndex !== -1 ? emailString.substring(0, atIndex) : emailString;

  namePart = namePart.replace(/[._-]/g, " ");

  return namePart;
}
