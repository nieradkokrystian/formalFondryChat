import "./DocsLayout.css";
import { Routes, Route, Navigate } from "react-router-dom";
import DocsSidebar from "../components/docs/DocsSidebar";
import Introduction from "../documentation/mdxPages/Introduction.mdx";
import GettingStarted from "../documentation/mdxPages/GettingStarted.mdx";
import Features from "../documentation/mdxPages/Features.mdx";
import Faq from "../documentation/mdxPages/Faq.mdx";

const DocsLayout = () => {
  return (
    <div className="docs-layout">
      <DocsSidebar />
      <div className="docs-content">
        <div className="docs-content-wrapper">
          <Routes>
            <Route index element={<Introduction />} />
            <Route path="introduction" element={<Introduction />} />
            <Route path="getting-started" element={<GettingStarted />} />
            <Route path="features" element={<Features />} />
            <Route path="faq" element={<Faq />} />

            <Route path="*" element={<Navigate to="/docs" replace />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default DocsLayout;
