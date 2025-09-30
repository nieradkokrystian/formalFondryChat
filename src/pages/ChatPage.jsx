import "../components/chat/chat.css";
import { useRef } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import LogsView from "../components/chat/LogsView";
import ChatView from "../components/chat/ChatView";

const ChatPage = () => {
  const isLogView = useSelector((s) => s.ui.isLogView);
  const { chatId } = useParams();
  const containerRef = useRef(false);

  return (
    <div className="chat-container" ref={containerRef}>
      {isLogView && <LogsView containerRef={containerRef} />}
      {!isLogView && <ChatView key={chatId} containerRef={containerRef} />}
    </div>
  );
};

export default ChatPage;
