import classNames from "classnames";
import React from "react";
import { NavLink } from "react-router-dom";
import { Router } from "src/types";

import "./NavLinks.scss";

interface NavLinksProps {
  links: Router[];
  className?: string;
}

const NavLinks: React.FC<NavLinksProps> = ({ links, className }) => {
  const renderLinks = (links: Router[]) => {
    return (
      links.length > 0 &&
      links.map((link: Router, index) => (
        <NavLink key={index} to={link.path}>
          {link.name}
        </NavLink>
      ))
    );
  };

  return (
    <div className={classNames("link-navigate", className)}>
      {renderLinks(links)}
    </div>
  );
};

export default NavLinks;
