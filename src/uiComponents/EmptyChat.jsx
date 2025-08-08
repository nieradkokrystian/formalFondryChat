import ShinyText from "./ShinyText";
import "./emptychat.css";
import { extractNameFromEmail } from "../utils/extractName";
import { useUser } from "../AuthContext";
import GlassPanel from "./Pulsing";

const EmptyChat = () => {
  const { username, logout } = useUser();
  const name = extractNameFromEmail(username);

  return (
    <div className="empty-chat">
      <div className="empty-chat-wrap mt-140">
        <GlassPanel className="w-fit h-fit" />
      </div>
    </div>
  );
};
export default EmptyChat;
