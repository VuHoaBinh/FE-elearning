import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import AccountPopover from "src/components/AccountPopover";
import MediaContent from "src/components/MediaContent";
import { linkUserProfile } from "src/data";
import { useClickOutSide } from "src/hooks";
import { setToggleStatus } from "src/reducers";
import "./DashboardHeader.scss";

const DashboardHeader = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { nodeRef, show, setShow } = useClickOutSide("div");

  useEffect(() => {
    dispatch(setToggleStatus(show));
  }, [dispatch, show]);

  return (
    <div className="dashboard-header">
      <div className="toggle">
        <div className="logo-large-screen" onClick={() => navigate("/")}></div>
        <div
          className="logo-small-screen"
          ref={nodeRef}
          onClick={() => setShow(!show)}
        >
          <MediaContent.Icon icon={!show ? "bars" : "close"} size={20} />
        </div>
      </div>
      <div className="content">
        <AccountPopover routes={linkUserProfile} />
      </div>
    </div>
  );
};
export default DashboardHeader;
