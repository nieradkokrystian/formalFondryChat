import {
  FileIcon,
  GearIcon,
  CheckIcon,
  CommitIcon,
  PersonIcon,
  ChevronDownIcon,
} from "@radix-ui/react-icons";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useState, memo } from "react";
import "./message.css";

const Message = memo(({ content, type, tag, errorTag }) => {
  let color;
  let icon;
  let hasShadow = true;
  const [isCode, setIsCode] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  function Highlight({ text }) {
    const codeString =
      typeof text == String ? text.toString() : text.toString();
    text = codeString.split("import");
    // console.log("first", text[0])
    const customStyle = {
      whiteSpace: "pre-wrap", // This is the key property for wrapping
      wordBreak: "break-word", // Ensures long words also break
      fontSize: "0.8rem",
    };

    return (
      <>
        <h1 className="">{text[0]}</h1>
        <SyntaxHighlighter
          language="agda"
          style={dracula}
          customStyle={customStyle} // Apply the styles here
        >
          {codeString}
          {/* {text[1]} */}
        </SyntaxHighlighter>
      </>
    );
  }
  const TrimCode = (code) => {
    return code.replace(/```/, "").replace(/```$/, "").replace(/```/, "");
  };
  const COLLAPSIBLE_LENGTH_LIMIT = 200;
  const isCollapsible =
    (typeof content === "string" && (content.match(/\n/g) || []).length > 3) ||
    toString(content).length > COLLAPSIBLE_LENGTH_LIMIT;

  const isUserMessage = tag === "UserMessage" || tag === "UserRes";

  const isUserRequest = tag === "UserReq";

  const MessageUser = ({ content }) => {
    return (
      <div className="message-user message max-w-[80%]  whitespace-pre-wrap   text-gray-900 mt-6 bg-indigo-100 w-fit min-h-fit h-fit p-4 rounded-4xl rounded-tr-xs wrap-normal flex justify-start relative">
        <p
          className={`leading-normal whitespace-pre-wrap ${
            isCollapsible && !isExpanded ? "max-h-[5.5em] overflow-hidden" : ""
          }`}>
          {content}
        </p>
        {isCollapsible && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className={`absolute top-2 right-2 text-gray-500 hover:text-gray-900 transition-transform duration-200 ${
              isExpanded ? "rotate-180" : ""
            }`}>
            <ChevronDownIcon width={20} height={20} />
          </button>
        )}
      </div>
    );
  };

  if (isUserRequest) {
    color = "bg-red-100 border-red-600";
    icon = <PersonIcon className="pulse" width={40} height={40} />;
    hasShadow = false;
  } else {
    switch (type) {
      case "running":
        color = "bg-violet-200 border-violet-600";
        icon = isUserMessage ? (
          <PersonIcon width={40} className="pulse" height={40} />
        ) : (
          <GearIcon
            width={40}
            height={40}
            className={tag == "LLM_Thinking" ? "spin" : ""}
          />
        );
        break;
      case "pending":
        color = "bg-blue-300 border-blue-600";
        icon = isUserMessage ? (
          <PersonIcon className="pulse" width={40} height={40} />
        ) : (
          <CommitIcon width={40} height={40} />
        );
        break;
      case "completed":
        color = "bg-green-300 border-green-600";
        icon = isUserMessage ? (
          <PersonIcon className="pulse" width={40} height={40} />
        ) : (
          <CheckIcon width={40} height={40} />
        );
        break;
      default:
        color = "bg-purple-100 border-gray-300";
        icon = <GearIcon width={40} height={40} />;
        break;
    }
  }

  return (
    <>
      {isUserMessage ? (
        <div className="flex max-w-[100%] justify-end  lg:w-[100%]  h-fit items-center relative">
          <MessageUser content={content} />
        </div>
      ) : (
        <div
          className={`message h-fit rounded-tl-none lg:w-[85%] max-w-[90%] lg:overflow-x-hidden  z-8 p-2  border-1 rounded-lg flex items-start space-x-3 transition-colors duration-200 ${color} mt-6 relative ${
            hasShadow ? "shadow-md" : "shadow-none"
          } `}>
          <div className="flex-1 relative overflow-x-hidden ">
            {tag == "LLMRes" || tag == "TCReq" ? (
              <div
                className={`text-sm text-grey-500  font-semibold leading-normal whitespace-pre-wrap ${
                  isCollapsible && !content.includes("import") && !isExpanded
                    ? "max-h-[5.5em] overflow-hidden "
                    : "max-h-fit"
                }  `}>
                <div className="flexflex-row  items-center text-gray-700 text-3xl">
                  <span className="text-xs  flex justify-start items-center flex-row w-fit">
                    {icon}
                    {tag}
                    {content.includes("import") ? (
                      <h1 className="text-gray-700">
                        {" "}
                        [extend to see the code]
                      </h1>
                    ) : (
                      ""
                    )}
                  </span>
                </div>

                <div
                  className={`codeWrap   mt-[10px] rounded-md p-1    ${
                    errorTag == "TCErr" ? "text-red-500 " : ""
                  }`}>
                  {" "}
                  {console.log(errorTag)}
                  {content.includes("import") ? (
                    <Highlight
                      className=" max-w-[100%] overflow-x-hidden"
                      text={TrimCode(content)}></Highlight>
                  ) : (
                    <code className="">{TrimCode(content)}</code>
                  )}
                </div>
              </div>
            ) : (
              // {not LLMReq or LLMRes}
              <div
                className={`text-xs text-grey-500 font-semibold leading-normal whitespace-pre-wrap ${
                  isCollapsible && content.includes("import") && !isExpanded
                    ? "max-h-[5.5em] overflow-hidden "
                    : "max-h-fit"
                }`}>
                <div className="flex  flex-row  items-center text-gray-700 text-3xl">
                  <span
                    className={`text-xs flex justify-start items-center flex-row w-fit `}>
                    {icon}
                    {tag}
                  </span>
                </div>
                <div
                  className={`${errorTag == "TCErr" ? "text-red-500 " : ""}`}>
                  {errorTag == "TCErr" ? (
                    <Highlight text={content} />
                  ) : (
                    <>{content}</>
                  )}
                </div>
              </div>
            )}

            {isCollapsible && (
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className={`absolute top-2 right-2 text-gray-500 hover:text-gray-900 transition-transform duration-200 ${
                  isExpanded ? "rotate-180" : ""
                }`}>
                <ChevronDownIcon width={20} height={20} />
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
});

export default Message;
