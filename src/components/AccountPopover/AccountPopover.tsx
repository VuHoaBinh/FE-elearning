import { Avatar, Divider, IconButton, MenuItem, Paper } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import { avatarNone } from "src/assets";
import { useClickOutSide } from "src/hooks";
import Logout from "src/pages/AuthPage/Logout";
import { selectAuthorization } from "src/reducers";
import { Router } from "src/types";
import "./AccountPopover.scss";

interface AccountPopoverProps {
  routes: Router[];
}

const AccountPopover: React.FC<AccountPopoverProps> = ({ routes }) => {
  const { nodeRef, show, setShow } = useClickOutSide();

  const { isRole, userInfo } = useSelector(selectAuthorization);

  return (
    <Box className="account-popup">
      <IconButton ref={nodeRef} onClick={() => setShow(!show)}>
        <Avatar src={userInfo.avatar || avatarNone} alt="avatar user" />
      </IconButton>

      {show && (
        <Paper className="account-popover">
          {routes.map(
            (route: Router) =>
              (route.role === isRole || route.role === "user") && (
                <MenuItem
                  style={{ width: "100%" }}
                  key={route.name}
                  to={route.path}
                  component={RouterLink}
                  onClick={() => setShow(false)}
                >
                  {route.name}
                </MenuItem>
              )
          )}
          <Divider className="divider" />
          <Logout
            style={{
              width: "100%",
              minWidth: "max-content",
            }}
          />
        </Paper>
      )}
    </Box>
  );
};
export default AccountPopover;
