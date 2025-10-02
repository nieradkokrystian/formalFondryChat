import "./ChatLogSwitch.css";
import { Switch } from "radix-ui";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../../store/features/uiSlice";

function ChatLogSwitch() {
  const dispatch = useDispatch();
  const isLogView = useSelector((s) => s.ui.isLogView);

  return (
    <div className="switch-wrapper">
      <label
        className={`switch-label ${isLogView ? "active" : ""}`}
        onClick={() => dispatch(uiActions.setLogView())}
      >
        Logs
      </label>
      <Switch.Root
        className="SwitchRoot"
        checked={!isLogView}
        onCheckedChange={() => dispatch(uiActions.toggleLogView())}
      >
        <Switch.Thumb className="SwitchThumb" />
      </Switch.Root>
      <label
        className={`switch-label ${!isLogView ? "active" : ""}`}
        onClick={() => dispatch(uiActions.disableLogView())}
      >
        Chat
      </label>
    </div>
  );
}

export default ChatLogSwitch;
