import { Link } from "react-router";
import SeparatorDemo from "../../uiComponents/Separator";
import Search from "../DocsComponents/Search";
const Sidebar = () => {
  const introLinks = [
    { name: "Introduction", path: "/docs/introduction" },
    { name: "Getting Started", path: "/docs/getting-started" },
    { name: "Features", path: "/docs/features" },
    { name: "FAQ", path: "/docs/faq" },
  ];
  const deepLinks = [
    { name: "Task Types", path: "/docs/advanced-usage" },
    { name: "Additional Settings", path: "/docs/troubleshooting" },
    { name: "Contributing", path: "/docs/contributing" },
  ];

  return (
    <div className="sidebar w-80 bg-gray-100 p-4 h-full">
      <h2 className="sidebar-title text-3xl">Documentation </h2>
      <SeparatorDemo />
      <Search />
      <ul className="sidebar-introLinks flex flex-col gap-2 text-gray-700">
        {introLinks.map((link, index) => (
          <Link
            key={index}
            to={link.path}
            className="text-gray-600 text-lg hover:underline hover:italic p-1 rounded-xs  hover:bg-violet-400 hover:text-white ">
            {link.name}
          </Link>
        ))}
      </ul>
      <SeparatorDemo />
      <ul className="sidebar-introLinks flex flex-col gap-2 text-gray-700">
        {deepLinks.map((link, index) => (
          <Link
            key={index}
            to={link.path}
            className="text-gray-600 text-lg hover:underline hover:italic p-1 rounded-xs  hover:bg-violet-400 hover:text-white ">
            {link.name}
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
