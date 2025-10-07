import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

function MessageHighlight({ text, white }) {
  const codeString = String(text ?? "");

  const customStyle = {
    whiteSpace: "pre-wrap",
    wordBreak: "break-word",
    fontSize: "0.8rem",
  };

  return (
    <SyntaxHighlighter
      language={white ? "" : "agda"}
      style={oneDark}
      customStyle={customStyle}
    >
      {codeString}
    </SyntaxHighlighter>
  );
}

export default MessageHighlight;
