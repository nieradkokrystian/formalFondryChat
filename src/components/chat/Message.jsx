import "./Message.css";
import {
  CheckIcon,
  CommitIcon,
  KeyboardIcon,
  ChevronDownIcon,
  MagicWandIcon,
} from "@radix-ui/react-icons";
import { useState } from "react";
import { countCollapsible, trimCode } from "../../utils/messagesFormating";
import MessageUser from "./MessageUser";
import MessageHighlight from "./MessageHighlight";

const Message = ({ content, type, tag, errorTag, taskNumber, step }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const isCollapsible = countCollapsible(content);
  const isUserMessage = tag === "UserMessage" || tag === "UserRes";
  const isUserRequest = tag === "UserReq";
  let color;
  let icon;
  let hasShadow = false;

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
      {isUserMessage && (
        <div className="flex max-w-[100%] justify-end  lg:w-[100%]  h-fit items-baseline relative">
          <MessageUser content={content} step={step} />
        </div>
      )}

      {!isUserMessage && (
        <div
          className={`message h-fit rounded-tl-none lg:w-[85%] max-w-[90%] lg:overflow-x-hidden  z-8 lg:p-4 p-2 rounded-4xl flex items-start space-x-3 transition-colors duration-200 ${color} mt-6 relative ${
            hasShadow ? "shadow-md" : "shadow-none"
          } `}
        >
          <div className="flex-1  relative overflow-x-hidden ">
            {tag == "LLMRes" || tag == "TCReq" ? (
              <div
                className={`text-xs lg:text-sm text-grey-500 leading-normal whitespace-pre-wrap ${
                  isCollapsible &&
                  !content.includes("open import") &&
                  !isExpanded &&
                  tag == "UserReq"
                    ? "max-h-[6.4em] overflow-hidden "
                    : "max-h-fit"
                }  `}
              >
                <div className="flexflex-row mb-1  items-center text-gray-700 ">
                  <span className="text-xs lg:text-sm  flex justify-start items-center flex-row w-fit">
                    {taskNumber?.length > 0 ? `${taskNumber}/20` : ""}

                    {tag == "LLMRes" ? (
                      <h1 className=" text-gray-700 p-1 pl-2 justify-between  flex items-center pr-2 border-1  bg-[transparent] border-purple-200">
                        {" "}
                        {icon}
                        LLM Response
                      </h1>
                    ) : (
                      ""
                    )}
                    {tag == "LLMReq" ? (
                      <h1 className=" text-gray-700 p-1 pl-2 justify-start flex items-center pr-2 border-1  bg-[transparent] border-purple-200">
                        {" "}
                        {icon}
                        LLM Request
                      </h1>
                    ) : (
                      ""
                    )}
                    {tag == "TCReq" ? (
                      <h1 className=" text-gray-700 p-1 pl-2 justify-start flex items-center pr-2 border-1  bg-[transparent] border-purple-200">
                        {" "}
                        {icon}
                        LLM Request
                      </h1>
                    ) : (
                      ""
                    )}
                    {tag == "TCRes" ? (
                      <h1 className=" text-gray-700 p-1 pl-2 justify-start flex items-center pr-2 border-1  bg-[transparent] border-purple-200">
                        {" "}
                        {icon}
                        TC Response
                      </h1>
                    ) : (
                      ""
                    )}
                    {errorTag == "TCErr" ? (
                      <h1 className="text-white p-1 pl-2 justify-start flex items-center rounded-2xl  bg-red-500 border-red-800">
                        {" "}
                        Error
                      </h1>
                    ) : (
                      ""
                    )}
                  </span>
                </div>

                <div
                  className={`codeWrap  text-sm p-2 rounded-md ${
                    errorTag == "TCErr" ? "text-red-500 " : ""
                  }`}
                >
                  {" "}
                  {content.includes("import") ? (
                    <MessageHighlight
                      className=" max-w-[100%] overflow-x-hidden"
                      text={trimCode(content)}
                    >
                      {/* {(shouldExpand = false)} */}
                    </MessageHighlight>
                  ) : (
                    <code className="">{trimCode(content)}</code>
                  )}
                </div>
              </div>
            ) : (
              // {not LLMReq or LLMRes}
              <div
                className={`text-xs lg:text-sm text-grey-500 pb-4  mb-1 leading-normal whitespace-pre-wrap ${
                  isCollapsible &&
                  content.includes("import") &&
                  !isExpanded &&
                  tag != "UserReq"
                    ? "max-h-[6.4em] overflow-hidden "
                    : "max-h-fit"
                }`}
              >
                <div className="flex mb-2 flex-row   items-center text-gray-700 text-3xl">
                  <span
                    className={`text-xs lg:text-sm flex justify-start items-center flex-row w-fit `}
                  >
                    {tag == "UserReq" ? (
                      <>
                        {" "}
                        {icon}
                        <h1 className=" text-white p-1 pl-2 justify-start flex items-center pr-2 rounded-2xl  bg-orange-500 border-blue-800">
                          {" "}
                          Clarifications Requested
                        </h1>
                      </>
                    ) : (
                      ""
                    )}
                    {tag == "LLMRes" ? (
                      <h1 className=" text-gray-700 p-1 pl-2 justify-start flex items-center pr-2 border-1  bg-[transparent] border-purple-200">
                        {" "}
                        {icon}
                        LLM Response
                      </h1>
                    ) : (
                      ""
                    )}
                    {tag == "LLMReq" ? (
                      <h1 className=" text-gray-700 p-1 pl-2 justify-start flex items-center pr-2 border-1  bg-[transparent] border-purple-200">
                        {" "}
                        {icon}
                        LLM Request
                      </h1>
                    ) : (
                      ""
                    )}
                    {tag == "TCReq" ? (
                      <h1 className=" text-gray-700 p-1 pl-2 justify-start flex items-center pr-2 border-1  bg-[transparent] border-purple-200">
                        {" "}
                        {icon}
                        LLM Request
                      </h1>
                    ) : (
                      ""
                    )}
                    {tag == "TCRes" ? (
                      <h1 className=" text-gray-700 p-1 pl-2 justify-start flex items-center pr-2 border-1  bg-[transparent] border-purple-200">
                        {" "}
                        {icon}
                        LLM Response
                      </h1>
                    ) : (
                      ""
                    )}
                    {errorTag == "TCErr" ? (
                      <h1 className="text-white p-1 rounded-2xl  bg-red-500 border-red-800">
                        {" "}
                        Error occurred in Agda code
                      </h1>
                    ) : (
                      ""
                    )}
                  </span>
                </div>
                <div
                  className={`${
                    errorTag == "TCErr" ? "text-red-500 " : ""
                  } mb-3`}
                >
                  {errorTag == "TCErr" ? (
                    <MessageHighlight text={content} />
                  ) : tag == "UserReq" && content.includes("Agda snippet") ? (
                    <MessageHighlight text={content} />
                  ) : (
                    <>{content}</>
                  )}
                </div>
              </div>
            )}

            {isCollapsible && (
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className={`absolute bottom-10 left-0 text-gray-500 hover:text-gray-900 transition-transform duration-200 `}
              >
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
};

export default Message;
