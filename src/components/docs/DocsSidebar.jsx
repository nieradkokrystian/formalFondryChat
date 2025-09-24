import { Link } from "react-router";
import Separator from "../ui/Separator";
import { useState } from "react";
// import Search from "./Search";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { routesLink } from "../../documentation/routes/routes";

const DocsSidebar = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const introLinks = [
    { name: "Introduction", path: "/docs/introduction" },
    { name: "Getting Started", path: "/docs/getting-started" },
    { name: "Features", path: "/docs/features" },
    { name: "FAQ", path: "/docs/faq" },
  ];
  const deepLinks = structuredClone(routesLink);
  const filteredIntroLinks = introLinks.filter((link) =>
    link.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const filteredDeepLinks = deepLinks.filter((link) =>
    link.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="sidebar w-[100%] bg-gray-100 p-4 h-full">
      <h2 className="sidebar-title text-3xl">Documentation </h2>
      <Separator />
      <div className="search-container mb-4">
        <div className="search-input flex items-center bg-white border border-gray-300 rounded-md p-2 ">
          <input
            type="text"
            placeholder="Search documentation..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full  p-2rounded focus:border-0 focus:outline-0"
          />
          <MagnifyingGlassIcon />
        </div>
      </div>
      <ul className="sidebar-introLinks flex flex-col gap-2 text-gray-700">
        {filteredIntroLinks.map((link, index) => (
          <Link
            key={index}
            to={link.path}
            className="text-gray-600 text-lg hover:underline hover:italic p-1 rounded-xs  hover:bg-violet-400 hover:text-white "
          >
            {link.name}
          </Link>
        ))}
      </ul>
      <Separator />
      <ul className="sidebar-introLinks flex flex-col gap-2 text-gray-700">
        {filteredDeepLinks.map((link, index) => (
          <Link
            key={index}
            to={link.path}
            className="text-gray-600 text-lg hover:underline hover:italic p-1 rounded-xs  hover:bg-violet-400 hover:text-white "
          >
            {link.name}
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default DocsSidebar;
