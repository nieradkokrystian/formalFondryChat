import { useState } from "react";
import { countCollapsible } from "../../utils/messageHelpers";
import { ChevronDownIcon } from "@radix-ui/react-icons";

const MessageUser = ({ content }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const isCollapsible = countCollapsible(content);
  const isCollapsed = isCollapsible && !isExpanded;

  return (
    <div className="message-user">
      <p className={isCollapsed ? "message-collapsed" : ""}>
        {content.length > 1 ? content : "Confirmed"}
      </p>
      {isCollapsible && (
        <div className="message-user-expand-wrapper">
          <ChevronDownIcon
            onClick={() => setIsExpanded((prev) => !prev)}
            className={`cursor-pointer ${isExpanded ? "rotate-180" : ""}`}
            width={50}
            height={20}
          />
        </div>
      )}
    </div>
  );
};

export default MessageUser;
