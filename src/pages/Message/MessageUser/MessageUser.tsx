import { Avatar } from "@mui/material";
import classNames from "classnames";
import React from "react";
import { useSelector } from "react-redux";
import { selectAuthorization } from "src/reducers/authSlice";
import { IMessage } from "src/types/chat";
import { IUser } from "src/types/user";
import "./MessageUser.scss";

interface MessageUserProps {
  receiver?: IUser;
  indexActive?: boolean;
  message?: IMessage;
  onClick?: () => void;
}

const MessageUser: React.FC<MessageUserProps> = ({
  receiver,
  indexActive = false,
  message,
  onClick,
}) => {
  // console.log("message: ", message);
  // console.log("receiver: ", receiver);
  // console.log("index lấy được là", indexActive);
  const { userInfo } = useSelector(selectAuthorization);

  return (
    <div
      className={classNames("user-item", indexActive ? "active" : "")}
      onClick={onClick}
    >
      <Avatar
        className="avatar"
        alt={receiver?.fullName}
        src={receiver?.avatar}
      />
      <div className="user-info">
        <span className="name">{receiver?.fullName}</span>
        <span
          className={classNames(
            "last-message",
            userInfo._id !== message?.sender && !message?.seen
              ? "unseen"
              : "seen"
          )}
        >
          {userInfo._id === message?.sender ? "Bạn: " : ""}
          {message?.text}
        </span>
      </div>
    </div>
  );
};
export default MessageUser;
