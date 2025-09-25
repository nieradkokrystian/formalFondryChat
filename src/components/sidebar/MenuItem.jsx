import { Link } from "react-router-dom";
import Tooltip from "./Tooltip";

const MenuItem = ({ title, status, id, type }) => {
  return (
    <Link
      className={`group relative h-[30px] pl-3 w-full Sidebar-item p-1 flex items-center justify-between last:mb-30 overflow-x-clip pr-3 cursor-target`}
      discover="none"
      to={`/chat/${id}`}
      prefetch="render"
      preventScrollReset
    >
      <div
        className={`orb w-2 h-2 rounded-full left-[1px] absolute  aspect-square ${
          status == "resolved"
            ? "bg-green-500"
            : status == "exceeded"
            ? "bg-red-500"
            : "bg-blue-400"
        }`}
      ></div>
      <h1 className="w-[70%] overflow-hidden">{title}</h1>

      <div className="hidden group-hover:block">
        <Tooltip type={type} status={status} />
      </div>
    </Link>
  );
};

export default MenuItem;
