import "./DocsFooter.css";
import { Link } from "react-router";

import {
  TwitterLogoIcon,
  LinkedInLogoIcon,
  GitHubLogoIcon,
} from "@radix-ui/react-icons";

const DocsFooter = () => {
  return (
    <div className="docs-footer-main">
      <div className="docs-footer-column">
        <img
          src="/formal-foundry-logo.svg"
          className="docs-footer-logo"
          alt="logo"
        />
        <p className="docs-footer-address-line">Formal Foundry, LLC. </p>
        <p className="docs-footer-address-line">
          218 NW 24th Street, 2nd Floor
        </p>
        <p className="docs-footer-address-line">Miami FL 33127</p>
        <Link className="docs-footer-email-link" to={``}>
          info@formalfoundry.ai
        </Link>
      </div>

      <div className="docs-footer-column">
        <h1 className="docs-footer-section-heading">Learn our tool</h1>
        <ul className="docs-footer-list">
          <li className="docs-footer-list-item">
            <Link>Introduction</Link>
          </li>
          <li className="docs-footer-list-item">
            <Link>Getting Started</Link>
          </li>
          <li className="docs-footer-list-item">
            <Link>Features</Link>
          </li>
          <li className="docs-footer-list-item">
            <Link>Faq</Link>
          </li>
        </ul>
      </div>

      <div className="docs-footer-column">
        <h1 className="docs-footer-section-heading">More</h1>
        <ul className="docs-footer-list">
          <li className="docs-footer-list-item">
            <Link>Terms of Service</Link>
          </li>
          <li className="docs-footer-list-item">
            <Link>Formal Foundry</Link>
          </li>
          <li className="docs-footer-list-item">
            <Link>Contact</Link>
          </li>
          <li className="docs-footer-list-item">
            <Link>Legal </Link>
          </li>
        </ul>
      </div>

      <div className="docs-footer-column">
        <h1 className="docs-footer-section-heading">API Reference</h1>
        <ul className="docs-footer-list">
          <li className="docs-footer-list-item">
            <Link>Used API's</Link>
          </li>
        </ul>

        <h1 className="docs-footer-section-heading mt-4">Community</h1>
        <div className="docs-footer-socials">
          <Link
            className="docs-footer-social-link"
            to={`https://x.com/FormalFoundry`}
          >
            <TwitterLogoIcon />
          </Link>
          <Link
            className="docs-footer-social-link"
            to={`https://www.linkedin.com/company/formalfoundry/`}
          >
            <LinkedInLogoIcon />
          </Link>
          <Link
            className="docs-footer-social-link"
            to={`https://github.com/nieradkokrystian/`}
          >
            <GitHubLogoIcon />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DocsFooter;
