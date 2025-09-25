import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

function MessageHighlight({ text }) {
  const codeString = typeof text == String ? text.toString() : text.toString();

  const customStyle = {
    whiteSpace: "pre-wrap",
    wordBreak: "break-word",
    fontSize: "0.8rem",
  };

  if (codeString.includes("Agda snippet inline: ")) {
    let trimmed = codeString.replace(/[\/\\]/g, "");
    let textSplit = trimmed.split("Agda snippet inline:");
    return (
      <>
        <p>{textSplit[0]}</p>
        <SyntaxHighlighter
          language="agda"
          style={oneDark}
          customStyle={customStyle}
          showInlineLineNumbers={true}
          startingLineNumber={3}
        >
          {textSplit[1]}
        </SyntaxHighlighter>
      </>
    );
  }

  return (
    <>
      <SyntaxHighlighter
        language="agda"
        style={oneDark}
        customStyle={customStyle}
        showInlineLineNumbers={true}
        startingLineNumber={3}
      >
        {codeString}
      </SyntaxHighlighter>
    </>
  );
}

export default MessageHighlight;
