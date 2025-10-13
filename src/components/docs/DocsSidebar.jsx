import "./DocsSidebar.css";
import { Link, useNavigate } from "react-router";
import { useState } from "react";
import { routesLink } from "../../documentation/routes/routes";
import { Undo2, BookOpenText, Search } from "lucide-react";

const DocsSidebar = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const introLinks = [
    { name: "Introduction", path: "/docs/introduction" },
    { name: "Getting Started", path: "/docs/getting-started" },
    { name: "Features", path: "/docs/features" },
    { name: "FAQ", path: "/docs/faq" },
  ];
  const deepLinks = structuredClone(routesLink);

  console.log(deepLinks);
  const filteredIntroLinks = introLinks.filter((link) =>
    link.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const filteredDeepLinks = deepLinks.filter((link) =>
    link.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="docs-sidebar">
      {/* HEADER */}
      <div className="docs-sidebar-header">
        <img src="/formal-foundry-logo.svg" alt="logo" />

        <div className="docs-sidebar-back" onClick={() => navigate("/home")}>
          <Undo2 />
          Back to Home
        </div>
      </div>

      <hr className="docs-sidebar-divider" />

      {/* SEARCH */}
      <div className="docs-sidebar-search">
        <div className="docs-sidebar-search-input">
          <input
            type="text"
            placeholder="Search documentation..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search size={15} />
        </div>
      </div>

      {/* TITLE */}
      <div className="docs-sidebar-title">
        <BookOpenText /> Documentation
      </div>

      {/* NAVIGATION */}
      <ul className="docs-sidebar-links">
        {filteredIntroLinks.map((link, index) => (
          <Link key={index} to={link.path} className="docs-sidebar-link">
            {link.name}
          </Link>
        ))}
      </ul>

      <hr className="docs-sidebar-divider" />

      {/* LINKS */}
      <ul className="docs-sidebar-links">
        {filteredDeepLinks.map((link, index) => (
          <Link key={index} to={link.path} className="docs-sidebar-link">
            {link.name}
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default DocsSidebar;
