import { IconButton, Tooltip } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useClickOutSide } from "src/hooks";
import { selectAuthorization } from "src/reducers";
import MediaContent from "../MediaContent";
import "./Notification.scss";

interface NotificationProps {
  type: "notify" | "message";
  sticky?: boolean;

  unRead_total?: number;
}

const Notification: React.FC<NotificationProps> = ({
  type,
  sticky = false,
  unRead_total = 0,
}) => {
  const { nodeRef, show, setShow } = useClickOutSide("p");

  const navigate = useNavigate();
  const { isRole, isAuth } = useSelector(selectAuthorization);

  const goToMessage = () => {
    if (!isAuth) {
      navigate("/login");
    } else {
      navigate(`/${isRole}/message`);
    }
  };

  return (
    <>
      {type === "notify" ? (
        <div className="notification">
          <Tooltip title="Thông báo">
            <IconButton ref={nodeRef} onClick={() => setShow(!show)}>
              <MediaContent.Icon
                icon="envelope-open"
                size={28}
                color="#3265b7"
              />
            </IconButton>
          </Tooltip>
          <span className="unread_amount">9</span>

          {show && (
            <p className="notification-popover">
              Hệ thống sẽ cập nhật thêm chức năng notify
            </p>
          )}
        </div>
      ) : (
        <div className="notification" onClick={goToMessage}>
          <Tooltip title="Tin nhắn">
            <IconButton ref={nodeRef} onClick={() => setShow(!show)}>
              <MediaContent.Icon
                icon="commenting-o"
                size={28}
                color="#3265b7"
              />
            </IconButton>
          </Tooltip>
          {unRead_total > 0 && (
            <span className="unread_amount">{unRead_total}</span>
          )}
          {show && (
            <p className="notification-popover">
              Hệ thống sẽ cập nhật thêm chức năng message
            </p>
          )}
        </div>
      )}
    </>
  );
};
export default Notification;
