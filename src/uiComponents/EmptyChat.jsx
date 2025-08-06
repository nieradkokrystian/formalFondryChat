import ShinyText from "./ShinyText";
import "./emptychat.css";
import { extractNameFromEmail } from "../utils/extractName";
import { useUser } from "../AuthContext";

const EmptyChat = () => {
  const { username, logout } = useUser();
  const name = extractNameFromEmail(username);

  return (
    <div className="empty-chat">
      <div className="empty-chat-wrap mt-140">
        <ShinyText className="text-7xl" text={"Hello, " + name} />
        <span>Share your questions with us!</span>
        <div className="button-wrap"></div>
      </div>
    </div>
  );
};
export default EmptyChat;
