import "../components/chat/chat.css";
import { useRef } from "react";
// import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import LogsView from "../components/chat/LogsView";
import ChatView from "../components/chat/ChatView";

const ChatPage = () => {
  const isLogView = useSelector((s) => s.ui.isLogView);
  // const { chatId } = useParams();
  const containerRef = useRef(false);

  return (
    <div
      className="Chat relative mx-auto w-full max-w-[750px] lg:w-[750px] h-[90vh] overflow-y-scroll pb-[60px] max-h-[100%]"
      ref={containerRef}
    >
      {isLogView && <LogsView scrollBottom={containerRef} />}
      {!isLogView && <ChatView scrollBottom={containerRef} />}
    </div>
  );
};

export default ChatPage;
