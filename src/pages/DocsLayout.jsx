import "./DocsLayout.css";
import { Routes, Route } from "react-router-dom";
import DocsSidebar from "../components/docs/DocsSidebar";
import Introduction from "../documentation/mdxPages/Introduction.mdx";

const DocsLayout = () => {
  return (
    <div className="docs-layout">
      <DocsSidebar />
      <div className="docs-content">
        <div className="docs-content-wrapper">
          <Routes>
            <Route index element={<Introduction />} />
            <Route path="introduction" element={<Introduction />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default DocsLayout;
