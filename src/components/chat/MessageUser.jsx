import { useState } from "react";
import { countCollapsible } from "../../utils/messagesFormating";

const MessageUser = ({ content }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const isCollapsible = countCollapsible(content);

  return (
    <div className="message-user message max-w-[80%] text-sm whitespace-pre-wrap   text-gray-900 mt-6 bg-indigo-100 w-fit min-h-fit h-fit p-4 rounded-4xl rounded-tr-xs wrap-normal flex justify-start relative">
      <p
        className={`leading-normal whitespace-pre-wrap ${
          isCollapsible && !isExpanded ? "max-h-[6.4em] overflow-hidden" : ""
        }`}
      >
        {content.length > 1 ? content : "Confirmed"}
        {/* <span className="absolute bottom-0.7 right-1 text-xs"> {step} </span> */}
      </p>
      {isCollapsible && (
        <button
          onClick={() => setIsExpanded((prev) => !prev)}
          className={`absolute top-2 right-2 text-gray-500 hover:text-gray-900 transition-transform duration-200 ${
            isExpanded ? "rotate-180" : ""
          }`}
        >
          <ChevronDownIcon width={20} height={20} />
        </button>
      )}
    </div>
  );
};

export default MessageUser;
