import React, { useEffect, useState } from "react";
import TextContent from "src/components/TextContent";
import "./CourseDetailSideBar.scss";
import {
  CourseDetailSideBarItemType,
  CourseDetailSideBarProps,
} from "./CourseDetailSideBar.type";

const CourseDetailSideBar: React.FC<CourseDetailSideBarProps> = ({
  defaultSideBarId = "COURSE_INFORMATION",
  sideBarContent,
  getSideBarId,
  children,
}) => {
  const [navBar, setNavbar] = useState(defaultSideBarId);

  useEffect(() => {
    getSideBarId?.(navBar);
  }, [navBar]);

  return (
    <div className="sidebar">
      <TextContent.NormalText content="Danh sách các mục" />
      {sideBarContent.map((sideBarItem, index) => (
        <p
          className={sideBarItem.sideBarId === navBar ? "active" : ""}
          onClick={() =>
            setNavbar(sideBarItem.sideBarId as CourseDetailSideBarItemType)
          }
          key={index}
        >
          {sideBarItem.title}
        </p>
      ))}
      <React.Fragment>{children}</React.Fragment>
    </div>
  );
};

export default CourseDetailSideBar;
