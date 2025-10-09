import { useSelector } from "react-redux";
import "./SidebarItem.css";

function SidebarItem({ icon, text, ...props }) {
  const expanded = useSelector((s) => s.ui.isSidebarOpen);

  return (
    <div {...props} className="sidebar-item">
      {icon}

      <span
        className={`sidebar-item-text ${expanded ? "expanded" : "collapsed"}`}
      >
        {text}
      </span>

      {!expanded && <div className="sidebar-item-tooltip">{text}</div>}
    </div>
  );
}

export default SidebarItem;
