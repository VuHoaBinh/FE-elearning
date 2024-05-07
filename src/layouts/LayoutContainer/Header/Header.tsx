import { Button, Divider } from "@mui/material";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import AccountPopover from "src/components/AccountPopover";
import MediaContent from "src/components/MediaContent";
import { linkHeader, linkUserProfile } from "src/data";
import { useClickOutSide } from "src/hooks";
import Logout from "src/pages/AuthPage/Logout";
import HeaderNavigation from "../HeaderNavigation";
import "./Header.scss";
import { useSelector } from "react-redux";
import { selectAuthorization } from "src/reducers";

interface HeaderProps {
  titleShow?: boolean;
}

const Header: React.FC<HeaderProps> = ({ titleShow = true }) => {
  const navigate = useNavigate();

  const { nodeRef, show, setShow } = useClickOutSide();
  const { isAuth } = useSelector(selectAuthorization);

  return (
    <React.Fragment>
      {/* for website */}
      <div className="header">
        <div
          className="header-img"
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
          <p className="header-logoTitle">SPARKLE ENGLISH CENTER</p>
        </div>

        <div className="header-links">
          {titleShow && <HeaderNavigation links={linkHeader} />}
        <Link
          to="/blog"
          className="header-blogs"
          style={{ textDecoration: "none" }}
        >
          Bài viết
        </Link>
        </div>


        <div className="header-profile">
          {isAuth ? (
            <AccountPopover routes={linkUserProfile} />
          ) : (
            <Link to="/login">
              <Button variant="contained" className="btn-login">
                Đăng nhập
              </Button>
            </Link>
          )}
        </div>
      </div>
      {/* for mobile */}
      <div className="header-mobile">
        <div
          className="icon-toggle"
          ref={nodeRef}
          onClick={() => setShow(!show)}
        >
          <MediaContent.Icon
            icon={!show ? "align-justify" : "close"}
            size={30}
          />
        </div>

        {show && (
          <div className="header-mobile-links">
            <HeaderNavigation links={linkHeader} />
            <Divider />
            <Logout />
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default Header;
