import { Link } from "react-router";
const SidebarBottom = () => {
  const date = new Date();
  const year = date.getFullYear();
  return (
    <div className="absolute bottom-3 w-full flex flex-col item-center text-xs text-gray-500">
      <div className="gap-2 flex flex-col">
        <p>
          <Link className="hover:text-purple-400">Formal Foundry© {year}</Link>
        </p>
        <p>
          <Link className="hover:text-purple-400">Privacy Policy</Link>
        </p>
        <p>
          <Link className="hover:text-purple-400">Terms of Service</Link>
        </p>
      </div>
    </div>
  );
};

export default SidebarBottom;
