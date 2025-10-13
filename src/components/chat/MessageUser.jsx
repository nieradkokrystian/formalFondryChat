import { useState, useRef, useEffect } from "react";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { useMessageConfig } from "../../hooks/useMessageConfig";

const MSG_HEIGHT = 102;

const MessageUser = ({ content, tag, last }) => {
  const contentRef = useRef(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    if (contentRef.current) {
      setShowButton(contentRef.current.scrollHeight > MSG_HEIGHT);
    }
  }, [content]);

  const { bgColor } = useMessageConfig(tag);

  return (
    <div className={`message-user ${bgColor} ${last ? "mb-[170px]" : ""}`}>
      <div
        className="message-content"
        style={{
          maxHeight: isExpanded
            ? `${contentRef.current?.scrollHeight}px`
            : `${MSG_HEIGHT}px`,
        }}
        ref={contentRef}
      >
        {content.length > 1 ? content : "Confirmed"}
      </div>

      {showButton && (
        <div className="message-expand-wrapper">
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
