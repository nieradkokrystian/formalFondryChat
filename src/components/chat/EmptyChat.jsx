import "./EmptyChat.css";
import GlassPanel from "./GlassPanel";

const EmptyChat = () => {
  return (
    <div className="empty-chat">
      <div className="empty-chat-wrap mt-140">
        <GlassPanel className="w-fit h-fit" />
      </div>
    </div>
  );
};
export default EmptyChat;
