import React from "react";

export interface SideBarItem {
  // sideBarId?: string | number;
  sideBarId?: CourseDetailSideBarItemType;
  className?: string;
  onClick?: () => void;
  title?: string;
}
export interface CourseDetailSideBarProps {
  defaultSideBarId?: CourseDetailSideBarItemType;
  sideBarContent: SideBarItem[];
  getSideBarId?: (sideBarId: CourseDetailSideBarItemType) => void;
  children?: React.ReactNode;
}

export type CourseDetailSideBarItemType =
  | "COURSE_INFORMATION"
  | "INTENDED_LEARNERS"
  | "LEARNING_CONTENT"
  | "REQUIREMENTS"
  | "TARGETS";
