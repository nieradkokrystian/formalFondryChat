import "./ChatLimitCheckbox.css";
import { useDispatch, useSelector } from "react-redux";
import { chatActions } from "../../store/features/chatSlice";

const ChatLimitCheckbox = () => {
  const dispatch = useDispatch();
  const isChecked = useSelector((s) => s.chat.limitTo100);

  return (
    <div className="msg-limit">
      <h1>Last 100 Messages?</h1>
      <input
        className="msg-limit-input"
        type="checkbox"
        checked={isChecked}
        onChange={() => dispatch(chatActions.toggleLimitTo100())}
      />
    </div>
  );
};

export default ChatLimitCheckbox;
