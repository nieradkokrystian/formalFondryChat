import {
  FileIcon,
  GearIcon,
  CheckIcon,
  CommitIcon,
  KeyboardIcon,
  ChevronDownIcon,
  MagicWandIcon,
} from "@radix-ui/react-icons";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useState, memo } from "react";
import "./message.css";

const Message = memo(({ content, type, tag, errorTag, taskNumber }) => {
  let color;
  let icon;
  let hasShadow = false;
  const [isCode, setIsCode] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  let shouldExpand = true || false;

  function Highlight({ text }) {
    const codeString =
      typeof text == String ? text.toString() : text.toString();
    text = codeString.split("import");

    const customStyle = {
      whiteSpace: "pre-wrap", // This is the key property for wrapping
      wordBreak: "break-word", // Ensures long words also break
      fontSize: "0.8rem",
    };

    return (
      <>
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
    content.length > COLLAPSIBLE_LENGTH_LIMIT;

  const isUserMessage = tag === "UserMessage" || tag === "UserRes";

  const isUserRequest = tag === "UserReq";

  const MessageUser = ({ content }) => {
    return (
      <div className="message-user message max-w-[80%] text-sm whitespace-pre-wrap   text-gray-900 mt-6 bg-indigo-100 w-fit min-h-fit h-fit p-4 rounded-4xl rounded-tr-xs wrap-normal flex justify-start relative">
        <p
          className={`leading-normal whitespace-pre-wrap ${
            isCollapsible && !isExpanded ? "max-h-[6.4em] overflow-hidden" : ""
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
    color = " text-gray-700  bg-blue-100";
    icon = (
      <div className=" bg-blue-500  rounded-full mr-1.5">
        <KeyboardIcon className=" m-2 text-white" width={20} height={20} />
      </div>
    );
    // hasShadow = false;
  } else {
    switch (type) {
      case "running":
        color = "bg-violet-200 mb-2";
        icon = isUserMessage ? (
          <KeyboardIcon width={20} className="pulse" height={20} />
        ) : (
          <div className="bg-violet-500 flex  rounded-full mr-1.5">
            <MagicWandIcon
              color="white "
              width={20}
              height={20}
              className={`${
                tag == "LLM_Thinking" ? "animate-pulse" : ""
              } aspect-square m-2`}
            />{" "}
          </div>
        );
        break;
      case "pending":
        color = "bg-blue-300 mb-2";
        icon = isUserMessage ? (
          <KeyboardIcon className="pulse" width={20} height={20} />
        ) : (
          <CommitIcon width={20} height={20} />
        );
        break;
      case "completed":
        color = "bg-green-300 mb-2";
        icon = isUserMessage ? (
          <KeyboardIcon className="pulse" width={20} height={20} />
        ) : (
          <CheckIcon width={20} height={20} />
        );
        break;
      default:
        color = "bg-purple-100 mb-2";
        icon = (
          <div className=" flex  rounded-full mr-1.5">
            <MagicWandIcon
              color="black "
              width={20}
              height={20}
              className={`${
                tag == "LLM_Thinking" ? "animate-pulse" : ""
              } aspect-square `}
            />{" "}
          </div>
        );
        break;
    }
  }

  return (
    <>
      {isUserMessage ? (
        <div className="flex max-w-[100%] justify-end  lg:w-[100%]  h-fit items-baseline relative">
          <MessageUser content={content} />
        </div>
      ) : (
        <div
          className={`message h-fit rounded-tl-none lg:w-[85%] max-w-[90%] lg:overflow-x-hidden  z-8 p-4 rounded-4xl flex items-start space-x-3 transition-colors duration-200 ${color} mt-6 relative ${
            hasShadow ? "shadow-md" : "shadow-none"
          } `}>
          <div className="flex-1 relative overflow-x-hidden ">
            {tag == "LLMRes" || tag == "TCReq" ? (
              <div
                className={`text-sm text-grey-500 leading-normal whitespace-pre-wrap ${
                  isCollapsible &&
                  !content.includes("open import") &&
                  !isExpanded &&
                  tag == "UserReq"
                    ? "max-h-[6.4em] overflow-hidden "
                    : "max-h-fit"
                }  `}>
                <div className="flexflex-row mb-2  items-center text-gray-700 ">
                  <span className="text-sm  flex justify-start items-center flex-row w-fit">
                    {taskNumber?.length > 0 ? `${taskNumber}/20` : ""}

                    {tag == "LLMRes" ? (
                      <h1 className=" text-gray-700 p-1 pl-2 justify-between  flex items-center pr-2 border-1 ml-1 bg-[transparent] border-purple-200">
                        {" "}
                        {icon}
                        LLM Response
                      </h1>
                    ) : (
                      ""
                    )}
                    {tag == "LLMReq" ? (
                      <h1 className=" text-gray-700 p-1 pl-2 justify-between flex items-center pr-2 rounded-2xl ml-1 bg-[transparent] border-blue-800">
                        {" "}
                        {icon}
                        LLM Request
                      </h1>
                    ) : (
                      ""
                    )}
                    {tag == "TCReq" ? (
                      <h1 className=" text-gray-700 p-1 pl-2 justify-between flex items-center pr-2 rounded-2xl ml-1 bg-[transparent] border-blue-800">
                        {" "}
                        {icon}
                        LLM Request
                      </h1>
                    ) : (
                      ""
                    )}
                    {tag == "TCRes" ? (
                      <h1 className=" text-gray-700 p-1 pl-2 justify-between flex items-center pr-2 rounded-2xl ml-1 bg-[transparent] border-blue-800">
                        {" "}
                        {icon}
                        TC Response
                      </h1>
                    ) : (
                      ""
                    )}
                    {errorTag == "TCErr" ? (
                      <h1 className="text-white p-1 pl-2 justify-between flex items-center rounded-2xl ml-1 bg-red-500 border-red-800">
                        {" "}
                        Error
                      </h1>
                    ) : (
                      ""
                    )}
                  </span>
                </div>

                <div
                  className={`codeWrap  text-sm  mt-[10px] rounded-md p-1    ${
                    errorTag == "TCErr" ? "text-red-500 " : ""
                  }`}>
                  {" "}
                  {content.includes("import") ? (
                    <Highlight
                      className=" max-w-[100%] overflow-x-hidden"
                      text={TrimCode(content)}>
                      {(shouldExpand = false)}
                    </Highlight>
                  ) : (
                    <code className="">{TrimCode(content)}</code>
                  )}
                </div>
              </div>
            ) : (
              // {not LLMReq or LLMRes}
              <div
                className={`text-sm text-grey-500  mb-2 leading-normal whitespace-pre-wrap ${
                  isCollapsible &&
                  content.includes("import") &&
                  !isExpanded &&
                  tag != "UserReq"
                    ? "max-h-[6.4em] overflow-hidden "
                    : "max-h-fit"
                }`}>
                <div className="flex mb-2 flex-row  items-center text-gray-700 text-3xl">
                  <span
                    className={`text-sm flex justify-start items-center flex-row w-fit `}>
                    {tag == "UserReq" ? (
                      <>
                        {" "}
                        {icon}
                        <h1 className=" text-gray-700 p-1 pl-2 justify-between flex items-center pr-2 rounded-2xl ml-1 bg-orange-500 border-blue-800">
                          {" "}
                          Clarifications Requested
                        </h1>
                      </>
                    ) : (
                      ""
                    )}
                    {tag == "LLMRes" ? (
                      <h1 className=" text-gray-700 p-1 pl-2 justify-between flex items-center pr-2 rounded-2xl ml-1 bg-[transparent] border-blue-800">
                        {" "}
                        {icon}
                        LLM Response
                      </h1>
                    ) : (
                      ""
                    )}
                    {tag == "LLMReq" ? (
                      <h1 className=" text-gray-700 p-1 pl-2 justify-between flex items-center pr-2 rounded-2xl ml-1 bg-[transparent] border-blue-800">
                        {" "}
                        {icon}
                        LLM Request
                      </h1>
                    ) : (
                      ""
                    )}
                    {tag == "TCReq" ? (
                      <h1 className=" text-gray-700 p-1 pl-2 justify-between flex items-center pr-2 rounded-2xl ml-1 bg-[transparent] border-blue-800">
                        {" "}
                        {icon}
                        LLM Request
                      </h1>
                    ) : (
                      ""
                    )}
                    {tag == "TCRes" ? (
                      <h1 className=" text-gray-700 p-1 pl-2 justify-between flex items-center pr-2 rounded-2xl ml-1 bg-[transparent] border-blue-800">
                        {" "}
                        {icon}
                        LLM Response
                      </h1>
                    ) : (
                      ""
                    )}
                    {errorTag == "TCErr" ? (
                      <h1 className="text-white p-1 rounded-2xl ml-1 bg-red-500 border-red-800">
                        {" "}
                        Error occurred in Agda code
                      </h1>
                    ) : (
                      ""
                    )}
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
                className={`absolute top-2 right-2 text-gray-500 hover:text-gray-900 transition-transform duration-200 `}>
                {tag != "UserReq" && tag != "LLMRes" && tag != "TCReq" ? ( //! BETTER SOLUTION NEEDED IN THE FUTURE
                  <ChevronDownIcon
                    className={isExpanded ? "rotate-180" : ""}
                    width={20}
                    height={20}
                  />
                ) : (
                  ""
                )}
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
});

export default Message;
