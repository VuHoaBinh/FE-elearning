import React from "react";
import { Link } from "react-router-dom";
import { listFooter } from "src/data/mainPageInfo";
import "./Footer.scss";

type ContactType = "communication" | "contact";
interface ContactProps {
  name: string;
  href: string;
}
interface FooterProps {
  info?: Record<ContactType, ContactProps[]>;
}

const Footer: React.FC<FooterProps> = ({ info = listFooter }) => {
  return (
    <div className="footer">
      <h3 className="footer-title">Thông tin liên hệ</h3>
      <div className="footer-description">
        <div className="introduction">
          {info.communication.map((contactInfo, index) => (
            <Link to={contactInfo.href} key={index}>
              {contactInfo.name}
            </Link>
          ))}
        </div>
        <div className="contact">
          {info.contact.map((contactInfo, index) => (
            <Link to={contactInfo.href} key={index}>
              {contactInfo.name}
            </Link>
          ))}
        </div>
        <div className="contact">
          {info.contact.map((contactInfo, index) => (
            <Link to={contactInfo.href} key={index}>
              {contactInfo.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Footer;
