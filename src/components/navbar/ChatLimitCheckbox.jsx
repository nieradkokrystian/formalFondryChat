import "./ChatLimitCheckbox.css";
import { useDispatch, useSelector } from "react-redux";
import { chatActions } from "../../store/features/chatSlice";

const ChatLimitCheckbox = () => {
  const dispatch = useDispatch();
  const isChecked = useSelector((s) => s.chat.limitTo100);

  return (
    <div className="messages-toggle">
      <h1>Last Hundred Messages?</h1>
      <input
        className="messages-toggle-input"
        type="checkbox"
        id="checkTrimmedArray"
        checked={isChecked}
        onChange={() => dispatch(chatActions.toggleLimitTo100())}
      />
    </div>
  );
};

export default ChatLimitCheckbox;
