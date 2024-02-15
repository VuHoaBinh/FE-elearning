import React from "react";
import { Outlet } from "react-router-dom";
import DashboardHeader from "./DashboardHeader";
import "./DashboardLayout.scss";
import DashboardSidebar from "./DashboardSidebar";

const DashboardLayout = () => {
  return (
    <div className="dashboard-layout">
      <div className="dashboard-header">
        <DashboardHeader />
      </div>
      <div className="dashboard-content">
        <div className="sidebar">
          <DashboardSidebar />
        </div>
        <div className="content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
