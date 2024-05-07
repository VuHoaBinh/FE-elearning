import React from "react";
import { Router } from "src/types";
import { Link as LinkScroll } from "react-scroll";
import "./HeaderNavigation.scss";

interface HeaderNavigationProps {
  links: Router[];
}

const HeaderNavigation: React.FC<HeaderNavigationProps> = ({ links }) => {
  if (links.length === 0) return <div></div>;
  return (
    <React.Fragment>
      {links.map((link, index) => (
        <LinkScroll
          className="link-scroll"
          activeClass="active"
          key={index}
          to={link.href as string}
          spy={true}
          smooth={true}
          duration={400}
          style={{ textDecoration: "none" }}
        >
          {link.name}
        </LinkScroll>
      ))}
    </React.Fragment>
  );
};

export default HeaderNavigation;
