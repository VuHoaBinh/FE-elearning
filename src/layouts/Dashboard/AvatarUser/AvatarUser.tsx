import { Avatar } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectAuthorization } from "src/reducers/authSlice";
import translateVi from "src/utils/translateVi";
import "./AvatarUser.scss";

const AvatarUser = () => {
  const { isRole, userInfo } = useSelector(selectAuthorization);

  return (
    <Link className="user" to="/">
      <Avatar
        className="user-avatar"
        src={userInfo.avatar}
        alt={userInfo.fullName}
      />
      <div className="user-info">
        <span className="name">{userInfo.fullName}</span>

        <span className="role">
          {isRole && <span> {translateVi(isRole)}</span>}
        </span>
      </div>
    </Link>
  );
};

export default AvatarUser;
