import { useState } from "react";
import { countCollapsible } from "../../utils/messageHelpers";

const MessageUser = ({ content }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const isCollapsible = countCollapsible(content);

  return (
    <div className="flex max-w-[100%] justify-end lg:w-[100%] h-fit items-baseline relative">
      <div className="message-user message max-w-[80%] text-sm whitespace-pre-wrap text-gray-900 mt-6 bg-indigo-100 w-fit min-h-fit h-fit p-4 rounded-4xl rounded-tr-xs wrap-normal flex justify-start relative">
        <p
          className={`leading-normal whitespace-pre-wrap ${
            isCollapsible && !isExpanded ? "max-h-[6.4em] overflow-hidden" : ""
          }`}
        >
          {content.length > 1 ? content : "Confirmed"}
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
    </div>
  );
};

export default MessageUser;
